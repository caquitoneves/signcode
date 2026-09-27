import { Injectable, NotFoundException } from '@nestjs/common';
import { AssessmentPhase, CourseStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { RespondAssessmentDto } from './dto/respond-assessment.dto';
import type { SubmitCheckpointDto } from './dto/submit-checkpoint.dto';
import type { SubmitChallengeDto } from './dto/submit-challenge.dto';
import type { SubmitProjectDto } from './dto/submit-project.dto';

interface ChallengeTest {
  description: string;
  assert: string;
}

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  // ---------- Desafios de código ----------

  async getChallenge(id: string) {
    const c = await this.prisma.challenge.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        instructions: true,
        starterCode: true,
        languageCode: true,
        tests: true,
      },
    });
    if (!c) throw new NotFoundException('Desafio não encontrado');
    return { ...c, tests: (c.tests as unknown as ChallengeTest[]) ?? [] };
  }

  async submitChallenge(userId: string, id: string, dto: SubmitChallengeDto) {
    const c = await this.prisma.challenge.findUnique({ where: { id }, select: { id: true } });
    if (!c) throw new NotFoundException('Desafio não encontrado');
    await this.prisma.challengeSubmission.create({
      data: { userId, challengeId: id, code: dto.code, passed: dto.passed },
    });
    return { ok: true };
  }

  // ---------- Checkpoint (quiz de módulo) ----------

  async getCheckpoint(id: string) {
    const cp = await this.prisma.checkpoint.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          include: {
            options: { orderBy: { order: 'asc' }, select: { id: true, text: true } },
          },
        },
      },
    });
    if (!cp) throw new NotFoundException('Checkpoint não encontrado');
    return {
      id: cp.id,
      title: cp.title,
      description: cp.description,
      questions: cp.questions.map((q) => ({ id: q.id, prompt: q.prompt, options: q.options })),
    };
  }

  async submitCheckpoint(userId: string, id: string, dto: SubmitCheckpointDto) {
    const cp = await this.prisma.checkpoint.findUnique({
      where: { id },
      include: { questions: { include: { options: true } } },
    });
    if (!cp) throw new NotFoundException('Checkpoint não encontrado');

    const chosen = new Map(dto.answers.map((a) => [a.questionId, a.optionId]));
    let score = 0;
    const corrections = cp.questions.map((q) => {
      const correct = q.options.find((o) => o.isCorrect) ?? null;
      if (correct && chosen.get(q.id) === correct.id) score++;
      return {
        questionId: q.id,
        correctOptionId: correct?.id ?? null,
        explanation: q.explanation,
      };
    });
    const total = cp.questions.length;
    const passed = total > 0 && score / total >= 0.6;

    await this.prisma.checkpointAttempt.create({
      data: { userId, checkpointId: id, score, total, passed },
    });
    return { score, total, passed, corrections };
  }

  // ---------- Avaliação diagnóstica ----------

  async getCourseAssessment(slug: string) {
    const course = await this.prisma.course.findUnique({
      where: { slug },
      select: {
        status: true,
        assessment: {
          include: {
            questions: {
              orderBy: { order: 'asc' },
              include: {
                options: { orderBy: { order: 'asc' }, select: { id: true, text: true } },
              },
            },
          },
        },
      },
    });
    if (!course || course.status !== CourseStatus.PUBLISHED) {
      throw new NotFoundException('Curso não encontrado');
    }
    if (!course.assessment) return null;
    const a = course.assessment;
    return {
      id: a.id,
      title: a.title,
      description: a.description,
      questions: a.questions.map((q) => ({
        id: q.id,
        kind: q.kind,
        prompt: q.prompt,
        options: q.options,
      })),
    };
  }

  async getAssessmentStatus(userId: string, slug: string) {
    const course = await this.prisma.course.findUnique({
      where: { slug },
      select: { status: true, assessment: { select: { id: true } } },
    });
    if (!course || course.status !== CourseStatus.PUBLISHED) {
      throw new NotFoundException('Curso não encontrado');
    }
    const assessmentId = course.assessment?.id ?? null;
    if (!assessmentId) return { assessmentId: null, respondedBefore: false };
    const r = await this.prisma.assessmentResponse.findUnique({
      where: {
        userId_assessmentId_phase: { userId, assessmentId, phase: AssessmentPhase.BEFORE },
      },
      select: { id: true },
    });
    return { assessmentId, respondedBefore: Boolean(r) };
  }

  async respondAssessment(userId: string, id: string, dto: RespondAssessmentDto) {
    const a = await this.prisma.assessment.findUnique({ where: { id }, select: { id: true } });
    if (!a) throw new NotFoundException('Avaliação não encontrada');
    const phase = dto.phase as AssessmentPhase;
    await this.prisma.assessmentResponse.upsert({
      where: { userId_assessmentId_phase: { userId, assessmentId: id, phase } },
      create: { userId, assessmentId: id, phase, answers: dto.answers },
      update: { answers: dto.answers },
    });
    return { ok: true };
  }

  // ---------- Projetos ----------

  async getProject(id: string) {
    const p = await this.prisma.project.findUnique({
      where: { id },
      select: { id: true, kind: true, title: true, brief: true, requirements: true },
    });
    if (!p) throw new NotFoundException('Projeto não encontrado');
    return p;
  }

  async getProjectSubmission(userId: string, id: string) {
    const s = await this.prisma.projectSubmission.findUnique({
      where: { userId_projectId: { userId, projectId: id } },
    });
    if (!s) return null;
    return { repoUrl: s.repoUrl, liveUrl: s.liveUrl, notes: s.notes, submittedAt: s.updatedAt };
  }

  async submitProject(userId: string, id: string, dto: SubmitProjectDto) {
    const p = await this.prisma.project.findUnique({ where: { id }, select: { id: true } });
    if (!p) throw new NotFoundException('Projeto não encontrado');
    const data = {
      repoUrl: dto.repoUrl ?? null,
      liveUrl: dto.liveUrl ?? null,
      notes: dto.notes ?? null,
    };
    const s = await this.prisma.projectSubmission.upsert({
      where: { userId_projectId: { userId, projectId: id } },
      create: { userId, projectId: id, ...data },
      update: data,
    });
    return { repoUrl: s.repoUrl, liveUrl: s.liveUrl, notes: s.notes, submittedAt: s.updatedAt };
  }
}
