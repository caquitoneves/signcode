# Projeto X — Plataforma de Educação em Tecnologia Acessível

Plataforma de educação em tecnologia construída **primariamente para pessoas surdas**,
com **Libras como língua de ensino de primeira classe** — não como legenda ou janela de intérprete.

> Regra que guia todo o projeto: **escopo pequeno + arquitetura profissional + evolução incremental.**

## Stack

- **Monorepo:** pnpm workspaces + Turborepo
- **Web:** Next.js + React + TypeScript + Tailwind
- **API:** NestJS + TypeScript (monólito modular, API-first, REST + OpenAPI)
- **Banco:** PostgreSQL + Prisma
- **Storage:** Cloudflare R2 (S3-compatível)
- **Vídeo:** serviço especializado de streaming (a definir)
- **Dev:** Docker (Postgres), GitHub Actions (CI)

## Estrutura

```
apps/
  web/        # Next.js
  api/        # NestJS
packages/
  contracts/  # tipos compartilhados / client gerado do OpenAPI
  ui/         # componentes compartilhados (cresce com o player)
  config/     # presets de tsconfig / eslint
docs/         # PRODUCT, ARCHITECTURE, ACCESSIBILITY, SECURITY, ROADMAP, DECISIONS, VALIDATION
docker/       # docker-compose e Dockerfiles de desenvolvimento
```

## Como rodar (desenvolvimento)

Pré-requisitos: **Node 22+**, **pnpm** (via `corepack enable`) e **Docker** (para o Postgres).

```bash
# 1. dependências
corepack enable
pnpm install

# 2. variáveis de ambiente (uma cópia por app)
cp .env.example .env                          # raiz: Postgres (docker)
cp apps/api/.env.example apps/api/.env        # api: gere segredos -> openssl rand -base64 48
cp apps/web/.env.example apps/web/.env.local  # web

# 3. banco (Postgres)
docker compose up -d

# 4. Prisma: gera o client e cria as tabelas (uma vez)
pnpm --filter @signcode/api prisma:migrate:dev

# 5. rodar tudo (web + api)
pnpm dev
```

- Web: http://localhost:3000
- API: http://localhost:3333
- Healthcheck: http://localhost:3333/health
- Documentação da API (Swagger): http://localhost:3333/docs

## Scripts úteis

```bash
pnpm build        # build de todos os pacotes
pnpm lint         # lint
pnpm typecheck    # checagem de tipos
pnpm test         # testes
pnpm format       # formatação (prettier)
```

## Documentação

Veja a pasta [`docs/`](./docs). Comece por `docs/PRODUCT.md` e `docs/ARCHITECTURE.md`.
Decisões técnicas ficam em `docs/DECISIONS.md`. Hipóteses a validar em `docs/VALIDATION.md`.
