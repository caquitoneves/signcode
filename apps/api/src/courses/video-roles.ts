/** Papéis de vídeo de uma aula. As três telas: conteúdo, professor e intérprete de Libras. */
export const VIDEO_ROLES = ['CONTENT', 'INSTRUCTOR', 'INTERPRETER'] as const;
export type VideoRole = (typeof VIDEO_ROLES)[number];

export function isVideoRole(value: string): value is VideoRole {
  return (VIDEO_ROLES as readonly string[]).includes(value);
}
