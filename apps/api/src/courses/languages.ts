/** Idiomas suportados. Adicionar um novo idioma = uma linha aqui (Libras é 1ª classe). */
export const SUPPORTED_LANGUAGES = ['pt-BR', 'libras'] as const;
export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number];

export function isSupportedLanguage(value: string): value is LanguageCode {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}
