# SECURITY — Projeto X

Segurança básica não é sacrificada por velocidade. A autenticação nasce profissional
(sem versão "simplificada de MVP").

## Autenticação (Incremento 2)

- Hash de senha com **Argon2id**.
- **Access token curto** (JWT) + **refresh token rotativo** (rotação a cada uso, detecção de reuso).
- Tokens em **cookies HttpOnly + Secure + SameSite** quando apropriado.
- **Proteção CSRF** para fluxos baseados em cookie.
- **Rate limiting** em login e recuperação de senha.
- **Recuperação de senha** por token de uso único com expiração.
- **Invalidação de sessões** (logout, logout global, revogação de refresh tokens).
- **RBAC** (`student` / `admin`) desde o início.

## Práticas gerais

- Validação de toda entrada (DTO + validação por schema).
- Autorização sempre no backend (guards), nunca confiando no cliente.
- Segredos fora do código (variáveis de ambiente / secret manager).
- Usuário do banco com menor privilégio; logs sem dados sensíveis.
- HTTPS em tudo; CORS restrito às origens conhecidas; `helmet`.
- Dependências monitoradas (Dependabot / `pnpm audit`).

## Registro

Decisões de segurança relevantes são registradas como ADR em `docs/DECISIONS.md`.
