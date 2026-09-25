import { CourseStatus, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seed "Programação do Zero".
 * Vídeos são PLACEHOLDERS. Cada aula pode ter 3 telas simultâneas:
 * CONTENT (monitor/conteúdo), INSTRUCTOR (professor) e INTERPRETER (Libras).
 * Idempotente: recria os módulos do curso.
 */
async function main(): Promise<void> {
  const course = await prisma.course.upsert({
    where: { slug: 'programacao-do-zero' },
    update: {
      title: 'Programação do Zero',
      description:
        'Do zero até construir um pequeno projeto funcional. Conteúdo, professor e intérprete de Libras lado a lado.',
      status: CourseStatus.PUBLISHED,
      order: 0,
    },
    create: {
      slug: 'programacao-do-zero',
      title: 'Programação do Zero',
      description:
        'Do zero até construir um pequeno projeto funcional. Conteúdo, professor e intérprete de Libras lado a lado.',
      status: CourseStatus.PUBLISHED,
      order: 0,
    },
  });

  await prisma.module.deleteMany({ where: { courseId: course.id } });

  const modulo1 = await prisma.module.create({
    data: { courseId: course.id, title: 'Como funciona a programação', order: 0 },
  });

  const lesson1 = await prisma.lesson.create({
    data: {
      moduleId: modulo1.id,
      slug: 'o-que-e-programacao',
      order: 0,
      durationSeconds: 300,
      translations: {
        create: [
          {
            languageCode: 'pt-BR',
            title: 'O que é programação?',
            summary: 'Uma introdução visual à ideia de dar instruções a um computador.',
            bodyMarkdown:
              '# O que é programação?\n\n_(conteúdo placeholder — texto de apoio real virá da Trilha B)._',
            caption: '[placeholder de legenda]',
            transcript: '[placeholder de transcrição]',
            objectives: ['Entender o que é um programa', 'Reconhecer exemplos do dia a dia'],
          },
          {
            languageCode: 'libras',
            title: 'O que é programação? (Libras)',
            summary: 'Introdução em Libras.',
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
            externalId: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          },
          {
            role: 'INSTRUCTOR',
            languageCode: 'pt-BR',
            provider: 'file',
            externalId:
              'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          },
          {
            role: 'INTERPRETER',
            languageCode: 'libras',
            provider: 'file',
            externalId:
              'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          },
        ],
      },
      materials: {
        create: [
          { title: 'Slides da aula', url: 'https://example.com/slides-aula-1.pdf', order: 0 },
        ],
      },
    },
  });

  await prisma.lesson.create({
    data: {
      moduleId: modulo1.id,
      slug: 'como-o-computador-executa',
      order: 1,
      durationSeconds: 360,
      translations: {
        create: [
          {
            languageCode: 'pt-BR',
            title: 'Como o computador executa instruções',
            summary: 'Passo a passo: o computador segue instruções em ordem.',
            objectives: ['Entender execução sequencial'],
          },
          { languageCode: 'libras', title: 'Como o computador executa (Libras)', objectives: [] },
        ],
      },
      videos: {
        create: [
          {
            role: 'CONTENT',
            languageCode: 'pt-BR',
            provider: 'file',
            externalId: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          },
          {
            role: 'INTERPRETER',
            languageCode: 'libras',
            provider: 'file',
            externalId:
              'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          },
        ],
      },
    },
  });

  const modulo2 = await prisma.module.create({
    data: { courseId: course.id, title: 'Lógica de programação', order: 1 },
  });

  await prisma.lesson.create({
    data: {
      moduleId: modulo2.id,
      slug: 'sequencia-de-passos',
      order: 0,
      durationSeconds: 420,
      translations: {
        create: [
          {
            languageCode: 'pt-BR',
            title: 'Sequência de passos',
            summary: 'Montando uma sequência lógica para resolver um problema.',
            objectives: ['Descrever um problema em passos'],
          },
          { languageCode: 'libras', title: 'Sequência de passos (Libras)', objectives: [] },
        ],
      },
      videos: {
        create: [
          {
            role: 'CONTENT',
            languageCode: 'pt-BR',
            provider: 'file',
            externalId: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          },
          {
            role: 'INSTRUCTOR',
            languageCode: 'pt-BR',
            provider: 'file',
            externalId:
              'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          },
          {
            role: 'INTERPRETER',
            languageCode: 'libras',
            provider: 'file',
            externalId:
              'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          },
        ],
      },
    },
  });

  await prisma.exercise.create({
    data: {
      lessonId: lesson1.id,
      order: 0,
      type: 'MULTIPLE_CHOICE',
      prompt: 'O que é um programa de computador?',
      explanation: 'Um programa é um conjunto de instruções que o computador executa em ordem.',
      options: {
        create: [
          { text: 'Uma sequência de instruções', isCorrect: true, order: 0 },
          { text: 'Um tipo de monitor', isCorrect: false, order: 1 },
          { text: 'Uma marca de computador', isCorrect: false, order: 2 },
        ],
      },
    },
  });

  await prisma.exercise.create({
    data: {
      lessonId: lesson1.id,
      order: 1,
      type: 'FILL_BLANK',
      prompt: 'Complete: um valor que pode mudar durante a execução chama-se ____.',
      explanation: 'Chamamos de variável.',
      acceptedAnswers: ['variável', 'variavel'],
    },
  });

  console.log(`Seed concluído: curso "${course.title}" com módulos, aulas (3 telas) e exercícios.`);
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
