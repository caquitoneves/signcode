import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateExerciseDto } from './dto/create-exercise.dto';
import type { SubmitAnswerDto } from './dto/submit-answer.dto';
import { resolveEvaluator } from './evaluators';

@Injectable()
export class ExercisesService {
  constructor(private readonly prisma: PrismaService) {}

  /** Lista pública: nunca revela a resposta correta. */
  async listForLesson(lessonId: string) {
    await this.ensurePublishedLesson(lessonId);
    return this.prisma.exercise.findMany({
      where: { lessonId },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        order: true,
        type: true,
        prompt: true,
        options: { orderBy: { order: 'asc' }, select: { id: true, text: true } },
      },
    });
  }

  async submit(userId: string, exerciseId: string, dto: SubmitAnswerDto) {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id: exerciseId },
      select: {
        id: true,
        type: true,
        acceptedAnswers: true,
        explanation: true,
        options: { select: { id: true, isCorrect: true } },
        lesson: { select: { module: { select: { course: { select: { status: true } } } } } },
      },
    });
    if (!exercise || exercise.lesson.module.course.status !== CourseStatus.PUBLISHED) {
      throw new NotFoundException('Exercício não encontrado');
    }

    const evaluator = resolveEvaluator(exercise.type);
    const { correct } = evaluator.evaluate(
      { type: exercise.type, acceptedAnswers: exercise.acceptedAnswers, options: exercise.options },
      { optionId: dto.optionId, text: dto.text },
    );

    const answer = dto.optionId ?? dto.text ?? '';
    await this.prisma.exerciseSubmission.create({
      data: { userId, exerciseId, answer, isCorrect: correct },
    });

    return { correct, explanation: exercise.explanation };
  }

  async createForLesson(lessonId: string, dto: CreateExerciseDto) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true },
    });
    if (!lesson) throw new NotFoundException('Aula não encontrada');

    return this.prisma.exercise.create({
      data: {
        lessonId,
        type: dto.type,
        prompt: dto.prompt,
        explanation: dto.explanation ?? null,
        order: dto.order ?? 0,
        acceptedAnswers: dto.acceptedAnswers ?? [],
        options: dto.options?.length
          ? {
              create: dto.options.map((o, i) => ({
                text: o.text,
                isCorrect: o.isCorrect,
                order: o.order ?? i,
              })),
            }
          : undefined,
      },
      include: { options: { orderBy: { order: 'asc' } } },
    });
  }

  private async ensurePublishedLesson(lessonId: string): Promise<void> {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { module: { select: { course: { select: { status: true } } } } },
    });
    if (!lesson || lesson.module.course.status !== CourseStatus.PUBLISHED) {
      throw new NotFoundException('Aula não encontrada');
    }
  }
}
