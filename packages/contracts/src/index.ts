/**
 * Contratos compartilhados entre web e api.
 *
 * Estratégia (ADR-0005): o OpenAPI da API é a fonte de verdade. A partir do Incremento 2,
 * tipos/cliente serão gerados em `src/generated/` e re-exportados aqui. Por enquanto,
 * este arquivo carrega os poucos tipos-semente já estáveis.
 */

/** Resposta do healthcheck da API (GET /health). */
export interface HealthStatus {
  status: 'ok';
  service: string;
  version: string;
  timestamp: string;
}
