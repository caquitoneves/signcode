import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private readonly prisma: PrismaService) {}

  async enroll(userId: string, courseSlug: string): Promise<{ enrolled: true }> {
    const course = await this.prisma.course.findUnique({
      where: { slug: courseSlug },
      select: { id: true, status: true },
    });
    if (!course || course.status !== CourseStatus.PUBLISHED) {
      throw new NotFoundException('Curso não encontrado');
    }
    await this.prisma.enrollment.upsert({
      where: { userId_courseId: { userId, courseId: course.id } },
      create: { userId, courseId: course.id },
      update: {},
    });
    return { enrolled: true };
  }

  async getCourseProgress(userId: string, courseSlug: string) {
    const course = await this.prisma.course.findUnique({
      where: { slug: courseSlug },
      select: {
        id: true,
        status: true,
        modules: { select: { lessons: { select: { id: true } } } },
      },
    });
    if (!course || course.status !== CourseStatus.PUBLISHED) {
      throw new NotFoundException('Curso não encontrado');
    }
    const lessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
    const [enrollment, done] = await Promise.all([
      this.prisma.enrollment.findUnique({
        where: { userId_courseId: { userId, courseId: course.id } },
        select: { id: true },
      }),
      this.prisma.lessonProgress.findMany({
        where: { userId, lessonId: { in: lessonIds } },
        select: { lessonId: true },
      }),
    ]);
    const completedLessonIds = done.map((d) => d.lessonId);
    return {
      enrolled: Boolean(enrollment),
      total: lessonIds.length,
      completed: completedLessonIds.length,
      completedLessonIds,
    };
  }

  async completeLesson(
    userId: string,
    lessonId: string,
  ): Promise<{ lessonId: string; completed: true }> {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      select: {
        id: true,
        module: { select: { courseId: true, course: { select: { status: true } } } },
      },
    });
    if (!lesson || lesson.module.course.status !== CourseStatus.PUBLISHED) {
      throw new NotFoundException('Aula não encontrada');
    }
    await this.prisma.enrollment.upsert({
      where: { userId_courseId: { userId, courseId: lesson.module.courseId } },
      create: { userId, courseId: lesson.module.courseId },
      update: {},
    });
    await this.prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      create: { userId, lessonId },
      update: {},
    });
    return { lessonId, completed: true };
  }

  async uncompleteLesson(
    userId: string,
    lessonId: string,
  ): Promise<{ lessonId: string; completed: false }> {
    await this.prisma.lessonProgress.deleteMany({ where: { userId, lessonId } });
    return { lessonId, completed: false };
  }

  /** Painel do aluno: cursos matriculados com progresso consolidado. */
  async getDashboard(userId: string) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        createdAt: true,
        course: {
          select: {
            id: true,
            slug: true,
            title: true,
            description: true,
            modules: { select: { lessons: { select: { id: true } } } },
          },
        },
      },
    });

    const allLessonIds = enrollments.flatMap((e) =>
      e.course.modules.flatMap((m) => m.lessons.map((l) => l.id)),
    );
    const done = await this.prisma.lessonProgress.findMany({
      where: { userId, lessonId: { in: allLessonIds } },
      select: { lessonId: true },
    });
    const doneSet = new Set(done.map((d) => d.lessonId));

    return enrollments.map((e) => {
      const lessonIds = e.course.modules.flatMap((m) => m.lessons.map((l) => l.id));
      const completed = lessonIds.filter((id) => doneSet.has(id)).length;
      return {
        enrolledAt: e.createdAt,
        course: {
          id: e.course.id,
          slug: e.course.slug,
          title: e.course.title,
          description: e.course.description,
        },
        total: lessonIds.length,
        completed,
      };
    });
  }

  /** Portfólio do aluno: prova do que ele fez (prática + projetos entregues). */
  async getPortfolio(userId: string) {
    const [lessonsCompleted, passedChallenges, submissions] = await Promise.all([
      this.prisma.lessonProgress.count({ where: { userId } }),
      this.prisma.challengeSubmission.findMany({
        where: { userId, passed: true },
        distinct: ['challengeId'],
        select: { challengeId: true },
      }),
      this.prisma.projectSubmission.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
        select: {
          repoUrl: true,
          liveUrl: true,
          notes: true,
          updatedAt: true,
          project: { select: { id: true, kind: true, title: true } },
        },
      }),
    ]);

    return {
      stats: {
        lessonsCompleted,
        challengesPassed: passedChallenges.length,
        projectsSubmitted: submissions.length,
      },
      projects: submissions.map((s) => ({
        id: s.project.id,
        kind: s.project.kind,
        title: s.project.title,
        repoUrl: s.repoUrl,
        liveUrl: s.liveUrl,
        notes: s.notes,
        submittedAt: s.updatedAt,
      })),
    };
  }
}
