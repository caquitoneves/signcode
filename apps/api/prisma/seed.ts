import { CourseStatus, PrismaClient } from '@prisma/client';
import { COURSE } from './seed-content';

const prisma = new PrismaClient();

// Vídeos de exemplo (Google sample bucket) por papel, até termos as gravações em Libras.
const SAMPLE = {
  content: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  interpreter: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
};

/**
 * Seed "Programação do Zero" — Módulos 0, 1 e 2 (piloto).
 * Orientado a dados: o conteúdo vive em seed-content.ts.
 * Idempotente: recria os módulos do curso a cada execução.
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

  // Recria a árvore de conteúdo (apaga módulos/aulas antigas em cascata).
  await prisma.module.deleteMany({ where: { courseId: course.id } });

  let totalLessons = 0;
  let totalExercises = 0;

  for (let mi = 0; mi < COURSE.modules.length; mi++) {
    const mod = COURSE.modules[mi]!;
    const createdModule = await prisma.module.create({
      data: {
        courseId: course.id,
        title: mod.title,
        description: mod.description,
        order: mi,
      },
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
  }

  console.log(
    `Seed concluído: "${course.title}" — ${COURSE.modules.length} módulos, ${totalLessons} aulas, ${totalExercises} exercícios.`,
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
