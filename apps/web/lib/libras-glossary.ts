/**
 * Glossário de Libras: cada termo aponta para um vídeo curto (a pessoa
 * sinalizando). Um vídeo por termo é reutilizado em todas as aulas.
 *
 * Marcação no conteúdo (Markdown): [texto visível](libras:ID)
 * Ex.: "Um [algoritmo](libras:algoritmo) é uma sequência de passos."
 *
 * Os vídeos abaixo são EXEMPLOS (placeholder). Substitua a `video` de cada
 * termo pela sua gravação (ex.: URL no Cloudflare R2) quando tiver.
 */
export interface LibrasEntry {
  /** Rótulo do termo (para leitores de tela e título do popup). */
  term: string;
  /** URL de um vídeo curto em Libras. */
  video: string;
  /** Observação opcional (contexto/definição curta). */
  note?: string;
}

const SAMPLE = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';

export const LIBRAS_GLOSSARY: Record<string, LibrasEntry> = {
  programacao: {
    term: 'Programação',
    video: SAMPLE,
    note: 'Escrever instruções para resolver um problema.',
  },
  algoritmo: {
    term: 'Algoritmo',
    video: SAMPLE,
    note: 'Sequência de passos para chegar a um resultado.',
  },
  codigo: {
    term: 'Código',
    video: SAMPLE,
    note: 'Instruções escritas em uma linguagem de programação.',
  },
  hardware: { term: 'Hardware', video: SAMPLE, note: 'A parte física do computador.' },
  software: { term: 'Software', video: SAMPLE, note: 'Os programas e instruções.' },
  cliente: { term: 'Cliente', video: SAMPLE, note: 'Quem faz a requisição (ex.: o navegador).' },
  servidor: { term: 'Servidor', video: SAMPLE, note: 'Quem recebe a requisição e responde.' },
  variavel: { term: 'Variável', video: SAMPLE, note: 'Um espaço com nome que guarda um valor.' },
};

export function resolveLibras(id: string): LibrasEntry | null {
  return LIBRAS_GLOSSARY[id] ?? null;
}
