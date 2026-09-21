import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CoursesService } from './courses.service';

function buildPrismaMock() {
  return {
    course: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    module: { findUnique: jest.fn(), create: jest.fn(), update: jest.fn(), deleteMany: jest.fn() },
    lesson: { findUnique: jest.fn(), create: jest.fn(), update: jest.fn() },
    lessonTranslation: { upsert: jest.fn() },
    lessonVideo: { upsert: jest.fn() },
    lessonMaterial: { create: jest.fn() },
  };
}

describe('CoursesService', () => {
  let prisma: ReturnType<typeof buildPrismaMock>;
  let service: CoursesService;

  beforeEach(() => {
    prisma = buildPrismaMock();
    service = new CoursesService(prisma as unknown as PrismaService);
  });

  it('listPublishedCourses filtra por PUBLISHED', async () => {
    prisma.course.findMany.mockResolvedValue([]);
    await service.listPublishedCourses();
    expect(prisma.course.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: 'PUBLISHED' } }),
    );
  });

  it('getPublishedCourseBySlug: curso rascunho => NotFound', async () => {
    prisma.course.findUnique.mockResolvedValue({ id: 'c1', status: 'DRAFT', modules: [] });
    await expect(service.getPublishedCourseBySlug('x')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('getPublishedCourseBySlug: inexistente => NotFound', async () => {
    prisma.course.findUnique.mockResolvedValue(null);
    await expect(service.getPublishedCourseBySlug('x')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('getPublishedCourseBySlug: publicado => retorna curso', async () => {
    const course = { id: 'c1', slug: 'x', status: 'PUBLISHED', modules: [] };
    prisma.course.findUnique.mockResolvedValue(course);
    await expect(service.getPublishedCourseBySlug('x')).resolves.toBe(course);
  });

  it('getLesson: curso não publicado => NotFound', async () => {
    prisma.lesson.findUnique.mockResolvedValue({
      id: 'l1',
      module: { id: 'm1', course: { slug: 'c', status: 'DRAFT' } },
      translations: [],
      videos: [],
      materials: [],
    });
    await expect(service.getLesson('l1')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('getLesson: publicado => shape com courseSlug/moduleId e sem module', async () => {
    prisma.lesson.findUnique.mockResolvedValue({
      id: 'l1',
      slug: 's',
      order: 0,
      durationSeconds: 10,
      translations: [],
      videos: [],
      materials: [],
      module: { id: 'm1', course: { slug: 'c', status: 'PUBLISHED' } },
    });
    const res = await service.getLesson('l1');
    expect(res.courseSlug).toBe('c');
    expect(res.moduleId).toBe('m1');
    expect((res as Record<string, unknown>).module).toBeUndefined();
  });

  it('createModule: curso inexistente => NotFound', async () => {
    prisma.course.findUnique.mockResolvedValue(null);
    await expect(service.createModule('c1', { title: 'M' })).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(prisma.module.create).not.toHaveBeenCalled();
  });

  it('createModule: curso existe => cria com courseId', async () => {
    prisma.course.findUnique.mockResolvedValue({ id: 'c1' });
    prisma.module.create.mockResolvedValue({ id: 'm1' });
    await service.createModule('c1', { title: 'M', order: 2 });
    expect(prisma.module.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ courseId: 'c1', title: 'M' }) }),
    );
  });

  it('upsertTranslation: aula inexistente => NotFound', async () => {
    prisma.lesson.findUnique.mockResolvedValue(null);
    await expect(service.upsertTranslation('l1', 'pt-BR', { title: 'T' })).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
