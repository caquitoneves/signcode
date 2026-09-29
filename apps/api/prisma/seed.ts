import { CourseStatus, PrismaClient } from '@prisma/client';
import { COURSE } from './seed-content';

const prisma = new PrismaClient();

// Vídeos de exemplo (Google sample bucket) por papel, até termos as gravações em Libras.
const SAMPLE = {
  content: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  interpreter: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
};

/** Formato dos blocos ```challenge embutidos no markdown das aulas. */
interface InlineChallenge {
  id: string;
  instructions?: string;
  starter?: string;
  tests?: { description: string; assert: string }[];
}

/** Extrai os desafios de código embutidos no corpo Markdown de uma aula. */
function parseInlineChallenges(body: string): InlineChallenge[] {
  const out: InlineChallenge[] = [];
  const re = /```challenge\s*\n([\s\S]*?)\n```/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    try {
      const parsed = JSON.parse(m[1]!.trim()) as InlineChallenge;
      if (parsed && typeof parsed.id === 'string') out.push(parsed);
    } catch {
      // bloco inválido é ignorado (mesmo comportamento do renderer no cliente)
    }
  }
  return out;
}

/**
 * Seed "Programação do Zero" — currículo + camada de experiência.
 * Orientado a dados: o conteúdo vive em seed-content.ts.
 * Idempotente: recria a árvore do curso a cada execução.
 */
async function main(): Promise<void> {
  const course = await prisma.course.upsert({
    where: { slug: COURSE.slug },
    update: {
      title: COURSE.title,
      description: COURSE.description,
      status: CourseStatus.PUBLISHED,
      order: 0,
    },
    create: {
      slug: COURSE.slug,
      title: COURSE.title,
      description: COURSE.description,
      status: CourseStatus.PUBLISHED,
      order: 0,
    },
  });

  // Recria a árvore (módulos cascateiam aulas/desafios/checkpoints/projetos-mini).
  await prisma.module.deleteMany({ where: { courseId: course.id } });
  // Itens no nível do curso (não cascateiam pelo módulo).
  await prisma.project.deleteMany({ where: { courseId: course.id } });
  await prisma.assessment.deleteMany({ where: { courseId: course.id } });

  let totalLessons = 0;
  let totalExercises = 0;
  let totalChallenges = 0;

  for (let mi = 0; mi < COURSE.modules.length; mi++) {
    const mod = COURSE.modules[mi]!;
    const createdModule = await prisma.module.create({
      data: { courseId: course.id, title: mod.title, description: mod.description, order: mi },
    });

    for (let li = 0; li < mod.lessons.length; li++) {
      const lesson = mod.lessons[li]!;
      const createdLesson = await prisma.lesson.create({
        data: {
          moduleId: createdModule.id,
          slug: lesson.slug,
          order: li,
          durationSeconds: lesson.duration,
          translations: {
            create: [
              {
                languageCode: 'pt-BR',
                title: lesson.title,
                summary: lesson.summary,
                bodyMarkdown: lesson.body,
                objectives: lesson.objectives,
              },
              {
                languageCode: 'libras',
                title: `${lesson.title} (Libras)`,
                summary: lesson.summary,
                objectives: [],
              },
            ],
          },
          videos: {
            create: [
              {
                role: 'CONTENT',
                languageCode: 'pt-BR',
                provider: 'file',
                externalId: SAMPLE.content,
              },
              {
                role: 'INTERPRETER',
                languageCode: 'libras',
                provider: 'file',
                externalId: SAMPLE.interpreter,
              },
            ],
          },
        },
      });
      totalLessons++;

      // Desafios de código embutidos no markdown desta aula (viram entidades Challenge).
      const inlineChallenges = parseInlineChallenges(lesson.body);
      for (let ci = 0; ci < inlineChallenges.length; ci++) {
        const ch = inlineChallenges[ci]!;
        await prisma.challenge.create({
          data: {
            id: ch.id,
            moduleId: createdModule.id,
            lessonId: createdLesson.id,
            order: ci,
            title:
              inlineChallenges.length > 1
                ? `Desafio ${ci + 1} \u2014 ${lesson.title}`
                : `Desafio \u2014 ${lesson.title}`,
            instructions: ch.instructions ?? '',
            starterCode: ch.starter ?? '',
            tests: ch.tests ?? [],
            languageCode: 'js',
          },
        });
        totalChallenges++;
      }

      for (let ei = 0; ei < lesson.exercises.length; ei++) {
        const ex = lesson.exercises[ei]!;
        await prisma.exercise.create({
          data: {
            lessonId: createdLesson.id,
            order: ei,
            type: ex.type,
            prompt: ex.prompt,
            explanation: ex.explanation ?? null,
            acceptedAnswers: ex.answers ?? [],
            ...(ex.options
              ? {
                  options: {
                    create: ex.options.map((o, oi) => ({
                      text: o.text,
                      isCorrect: o.correct,
                      order: oi,
                    })),
                  },
                }
              : {}),
          },
        });
        totalExercises++;
      }
    }

    // Checkpoint do módulo
    if (mod.checkpoint) {
      await prisma.checkpoint.create({
        data: {
          moduleId: createdModule.id,
          title: mod.checkpoint.title,
          description: mod.checkpoint.description ?? null,
          questions: {
            create: mod.checkpoint.questions.map((q, qi) => ({
              order: qi,
              prompt: q.prompt,
              explanation: q.explanation ?? null,
              options: {
                create: q.options.map((o, oi) => ({
                  text: o.text,
                  isCorrect: o.correct,
                  order: oi,
                })),
              },
            })),
          },
        },
      });
    }

    // Mini projeto do módulo
    if (mod.miniProject) {
      await prisma.project.create({
        data: {
          kind: 'MINI',
          moduleId: createdModule.id,
          order: 0,
          title: mod.miniProject.title,
          brief: mod.miniProject.brief,
          requirements: mod.miniProject.requirements,
        },
      });
    }
  }

  // Diagnóstico do curso
  if (COURSE.assessment) {
    await prisma.assessment.create({
      data: {
        courseId: course.id,
        title: COURSE.assessment.title,
        description: COURSE.assessment.description ?? null,
        questions: {
          create: COURSE.assessment.questions.map((q, qi) => ({
            order: qi,
            kind: q.kind,
            prompt: q.prompt,
            options: q.options
              ? { create: q.options.map((o, oi) => ({ text: o.text, order: oi })) }
              : undefined,
          })),
        },
      },
    });
  }

  // Projeto final do curso
  if (COURSE.finalProject) {
    await prisma.project.create({
      data: {
        kind: 'FINAL',
        courseId: course.id,
        order: 0,
        title: COURSE.finalProject.title,
        brief: COURSE.finalProject.brief,
        requirements: COURSE.finalProject.requirements,
      },
    });
  }

  console.log(
    `Seed concluído: "${course.title}" — ${COURSE.modules.length} módulos, ${totalLessons} aulas, ${totalExercises} exercícios, ${totalChallenges} desafios, checkpoints/mini-projetos/diagnóstico/projeto final incluídos.`,
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
