import { CourseStatus, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seed do curso "Programação do Zero".
 * Conteúdo textual/vídeos são PLACEHOLDERS — o conteúdo real (roteiro + vídeos em
 * Libras) vem da Trilha B (validação). Idempotente: recria os módulos do curso.
 */
async function main(): Promise<void> {
  const course = await prisma.course.upsert({
    where: { slug: 'programacao-do-zero' },
    update: {
      title: 'Programação do Zero',
      description:
        'Do zero até construir um pequeno projeto funcional. Aulas em Libras, com legenda, transcrição e texto de apoio.',
      status: CourseStatus.PUBLISHED,
      order: 0,
    },
    create: {
      slug: 'programacao-do-zero',
      title: 'Programação do Zero',
      description:
        'Do zero até construir um pequeno projeto funcional. Aulas em Libras, com legenda, transcrição e texto de apoio.',
      status: CourseStatus.PUBLISHED,
      order: 0,
    },
  });

  // Recria os módulos (cascade remove aulas/traduções/vídeos/materiais).
  await prisma.module.deleteMany({ where: { courseId: course.id } });

  const modulo1 = await prisma.module.create({
    data: { courseId: course.id, title: 'Como funciona a programação', order: 0 },
  });

  await prisma.lesson.create({
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
          { languageCode: 'libras', provider: 'youtube', externalId: 'PLACEHOLDER_LIBRAS_1' },
          { languageCode: 'pt-BR', provider: 'youtube', externalId: 'PLACEHOLDER_PT_1' },
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
          { languageCode: 'libras', provider: 'youtube', externalId: 'PLACEHOLDER_LIBRAS_2' },
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
          { languageCode: 'libras', provider: 'youtube', externalId: 'PLACEHOLDER_LIBRAS_3' },
        ],
      },
    },
  });

  console.log(`Seed concluído: curso "${course.title}" com módulos e aulas.`);
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
