# DECISIONS (ADR) — Projeto X

Registro de decisões arquiteturais relevantes. Formato: Contexto / Opções / Decisão /
Consequências / Reversibilidade.

---

## ADR-0001 — Monólito modular em vez de microserviços

- **Contexto:** fundador solo, custo mínimo, mas fundação profissional e preparada para crescer.
- **Opções:** microserviços; monólito simples; **monólito modular**.
- **Decisão:** monólito modular com fronteiras de domínio fortes.
- **Consequências:** simples de operar e barato agora; extração de serviço no futuro é viável
  porque módulos não cruzam fronteiras. Exige disciplina de não acessar tabela de outro módulo.
- **Reversibilidade:** alta (extrair um módulo é trabalho localizado).

## ADR-0002 — API-first com NestJS separado do Next.js

- **Contexto:** visão de longo prazo inclui mobile, parceiros, integrações e laboratório de código.
- **Opções:** Next.js full-stack; **NestJS separado (API-first)**.
- **Decisão:** backend NestJS tratado como API de produto; web é apenas o primeiro cliente.
- **Consequências:** custo extra de operação (dois deploys, CORS, auth entre origens), compensado
  por reuso da API em mobile/parceiros/lab. Justificado pela visão declarada.
- **Reversibilidade:** média.

## ADR-0003 — Monorepo com pnpm + Turborepo

- **Decisão:** um repositório, tipos compartilhados entre web e api, builds incrementais.
- **Consequências:** DX melhor e contratos compartilhados; um pouco mais de configuração inicial.
- **Reversibilidade:** alta.

## ADR-0004 — PostgreSQL + Prisma

- **Decisão:** banco relacional (dados educacionais são relacionais) com Prisma (migrations + tipos).
- **Reversibilidade:** Prisma alta; Postgres é padrão e permanece.

## ADR-0005 — OpenAPI como fonte de verdade; client do frontend gerado

- **Contexto:** evitar duplicar DTOs manualmente entre back e front.
- **Decisão:** NestJS + `@nestjs/swagger` expõe o OpenAPI (`/docs` e `openapi.json`).
  O frontend gera tipos/client a partir desse documento (ex.: `openapi-typescript`) em
  `packages/contracts/src/generated`. A geração roda por script; nada é escrito à mão em duplicidade.
- **Consequências:** um único contrato; tipos do front sempre alinhados à API. Exige um passo de geração.
- **Reversibilidade:** alta (é ferramenta de build).
- **Status Incremento 1:** Swagger habilitado e endpoint exposto; a wiring de geração automática
  do client é ativada quando houver endpoints reais (a partir do Incremento 2).

## ADR-0006 — Autenticação própria (não "simplificada")

- **Decisão:** auth própria profissional (Argon2id, access curto + refresh rotativo, cookies HttpOnly,
  CSRF, rate limiting, recuperação, invalidação de sessão, RBAC). Ver SECURITY.md.
- **Alternativa:** provedor gerenciado (ex.: Clerk) — mantido como opção futura pela fronteira do módulo `auth`.
- **Reversibilidade:** média (migrar auth é sempre sensível).

## ADR-0007 — Libras como modalidade linguística de primeira classe

- **Decisão:** conteúdo modelado por idioma (`LessonTranslation`, `LessonVideo` com `languageCode`),
  não como tradução acoplada. Libras é um vídeo de primeira classe.
- **Reversibilidade:** baixa (é decisão de modelo de dados — por isso é tomada cedo).

## ADR-0008 — Vídeo em serviço especializado; storage em Cloudflare R2

- **Decisão:** vídeo nunca no servidor da app; provider de streaming a definir. Arquivos em R2 (S3-compatível, sem egress).
- **Reversibilidade:** alta (R2 é S3-compatível; provider de vídeo é abstraído por `media`).

## ADR-0009 — Docker só para desenvolvimento no MVP; staging adiado

- **Decisão:** Docker para Postgres local (e serviços de dev). Staging/infra paga só quando houver versão utilizável.
- **Reversibilidade:** alta.

---

### Incremento 1 — nota de escopo

Postgres entra como serviço de `docker-compose` + Prisma configurado (datasource/generator),
**sem modelos ainda** e **sem conectar no boot da API**. Os modelos e o `PrismaService` entram no
Incremento 2 (auth), quando há uso real. Isso mantém o Incremento 1 executável e testável sem banco,
e evita construir wiring antes da necessidade (anti-overengineering).
