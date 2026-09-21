/** Rótulos e ordenação de idiomas. Libras vem sempre primeiro (língua de 1ª classe). */
const LABELS: Record<string, string> = {
  libras: 'Libras',
  'pt-BR': 'Português',
};

const PRIORITY: Record<string, number> = {
  libras: 0,
  'pt-BR': 1,
};

export function languageLabel(code: string): string {
  return LABELS[code] ?? code;
}

export function orderLanguages(codes: string[]): string[] {
  return [...new Set(codes)].sort((a, b) => (PRIORITY[a] ?? 99) - (PRIORITY[b] ?? 99));
}
