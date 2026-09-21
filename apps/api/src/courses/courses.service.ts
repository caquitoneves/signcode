import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateCourseDto } from './dto/create-course.dto';
import type { UpdateCourseDto } from './dto/update-course.dto';
import type { CreateModuleDto } from './dto/create-module.dto';
import type { UpdateModuleDto } from './dto/update-module.dto';
import type { CreateLessonDto } from './dto/create-lesson.dto';
import type { UpdateLessonDto } from './dto/update-lesson.dto';
import type { UpsertLessonTranslationDto } from './dto/upsert-lesson-translation.dto';
import type { UpsertLessonVideoDto } from './dto/upsert-lesson-video.dto';
import type { CreateLessonMaterialDto } from './dto/create-lesson-material.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  // ---------- Leitura pública ----------

  listPublishedCourses() {
    return this.prisma.course.findMany({
      where: { status: CourseStatus.PUBLISHED },
      orderBy: { order: 'asc' },
      select: { id: true, slug: true, title: true, description: true, order: true },
    });
  }

  async getPublishedCourseBySlug(slug: string) {
    const course = await this.prisma.course.findUnique({
      where: { slug },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
              select: {
                id: true,
                slug: true,
                order: true,
                durationSeconds: true,
                translations: { select: { languageCode: true, title: true, summary: true } },
              },
            },
          },
        },
      },
    });
    if (!course || course.status !== CourseStatus.PUBLISHED) {
      throw new NotFoundException('Curso não encontrado');
    }
    return course;
  }

  async getLesson(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        translations: true,
        videos: true,
        materials: { orderBy: { order: 'asc' } },
        module: { include: { course: { select: { slug: true, status: true } } } },
      },
    });
    if (!lesson || lesson.module.course.status !== CourseStatus.PUBLISHED) {
      throw new NotFoundException('Aula não encontrada');
    }
    const { module, ...rest } = lesson;
    return { ...rest, courseSlug: module.course.slug, moduleId: module.id };
  }

  // ---------- Admin ----------

  getCourseForAdmin(id: string) {
    return this.prisma.course.findUniqueOrThrow({
      where: { id },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: { lessons: { orderBy: { order: 'asc' } } },
        },
      },
    });
  }

  createCourse(dto: CreateCourseDto) {
    return this.prisma.course.create({ data: dto });
  }

  updateCourse(id: string, dto: UpdateCourseDto) {
    return this.prisma.course.update({ where: { id }, data: dto });
  }

  async createModule(courseId: string, dto: CreateModuleDto) {
    await this.ensureCourse(courseId);
    return this.prisma.module.create({ data: { ...dto, courseId } });
  }

  updateModule(id: string, dto: UpdateModuleDto) {
    return this.prisma.module.update({ where: { id }, data: dto });
  }

  async createLesson(moduleId: string, dto: CreateLessonDto) {
    await this.ensureModule(moduleId);
    return this.prisma.lesson.create({ data: { ...dto, moduleId } });
  }

  updateLesson(id: string, dto: UpdateLessonDto) {
    return this.prisma.lesson.update({ where: { id }, data: dto });
  }

  async upsertTranslation(lessonId: string, languageCode: string, dto: UpsertLessonTranslationDto) {
    await this.ensureLesson(lessonId);
    return this.prisma.lessonTranslation.upsert({
      where: { lessonId_languageCode: { lessonId, languageCode } },
      create: { lessonId, languageCode, ...dto },
      update: { ...dto },
    });
  }

  async upsertVideo(lessonId: string, languageCode: string, dto: UpsertLessonVideoDto) {
    await this.ensureLesson(lessonId);
    return this.prisma.lessonVideo.upsert({
      where: { lessonId_languageCode: { lessonId, languageCode } },
      create: { lessonId, languageCode, ...dto },
      update: { ...dto },
    });
  }

  async addMaterial(lessonId: string, dto: CreateLessonMaterialDto) {
    await this.ensureLesson(lessonId);
    return this.prisma.lessonMaterial.create({ data: { ...dto, lessonId } });
  }

  // ---------- helpers ----------

  private async ensureCourse(id: string): Promise<void> {
    const found = await this.prisma.course.findUnique({ where: { id }, select: { id: true } });
    if (!found) throw new NotFoundException('Curso não encontrado');
  }
  private async ensureModule(id: string): Promise<void> {
    const found = await this.prisma.module.findUnique({ where: { id }, select: { id: true } });
    if (!found) throw new NotFoundException('Módulo não encontrado');
  }
  private async ensureLesson(id: string): Promise<void> {
    const found = await this.prisma.lesson.findUnique({ where: { id }, select: { id: true } });
    if (!found) throw new NotFoundException('Aula não encontrada');
  }
}
