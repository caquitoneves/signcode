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
    // Concluir uma aula matricula automaticamente no curso.
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

  async listMyEnrollments(userId: string) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        createdAt: true,
        course: { select: { id: true, slug: true, title: true, description: true } },
      },
    });
    return enrollments.map((e) => ({ enrolledAt: e.createdAt, course: e.course }));
  }
}
