# ARCHITECTURE — Projeto X

## Forma geral

Monólito modular, **API-first**, dois deployables:

```
[ Next.js (web) ]  --REST/OpenAPI-->  [ NestJS (API) ]  -->  [ PostgreSQL ]
                                            |
                                     [ R2 storage ] [ Stream de vídeo ]
```

- **NestJS** como monólito modular. Regra de ouro: **um módulo nunca acessa a tabela de outro
  diretamente** — só conversa pela interface pública do outro módulo. É isso que torna
  "extrair um serviço" um trabalho de horas no futuro, não de meses.
- **REST + OpenAPI** como contrato. O OpenAPI é a **fonte de verdade**; o frontend usa tipos/client
  **gerados** a partir dele (ver DECISIONS.md, ADR-0005) — sem DTOs duplicados à mão.

## Monorepo

- `apps/web` — Next.js (App Router)
- `apps/api` — NestJS (módulos de domínio)
- `packages/contracts` — tipos compartilhados + client gerado do OpenAPI
- `packages/ui` — componentes compartilhados (cresce com o player)
- `packages/config` — presets de tsconfig/eslint

## Módulos de domínio (API)

Implementados no MVP, em ordem de incremento:
`auth` -> `users` -> `courses` -> `modules` -> `lessons` -> `content` -> `media` ->
`enrollments` -> `progress` -> `exercises`.

Fronteira reservada (esqueleto, sem implementar): `glossary`, `lab`, `ai`, `payments`, `partners`.

## Modelo de conteúdo (peça central)

Uma aula **não é apenas um vídeo**. `Lesson` guarda o que é neutro de idioma (ordem, duração,
objetivos, pré-requisitos). O conteúdo linguístico vive em entidades por idioma:

```
Lesson
 ├── LessonTranslation (languageCode: 'pt-BR' | 'libras' | ...)
 │      ├── texto / markdown
 │      ├── legenda
 │      └── transcrição
 ├── LessonVideo (languageCode, provider, externalId, tipo)  # Libras é um vídeo de 1ª classe
 ├── LessonMaterial (arquivos, links)
 └── Exercise[]
```

Libras é **modalidade linguística de primeira classe**, não uma tradução acoplada.
O modelo nasce preparado para múltiplas línguas sem refatoração.

## Exercícios e laboratório (preparado, não construído)

`Exercise -> Evaluator`. No MVP só existem avaliadores que **não executam código**
(quiz, múltipla escolha, preencher lacuna). No futuro: `CodeEvaluator -> execução isolada`,
em **serviço separado da API**, em container com limites estritos e sem rede.

## Vídeo

Nunca hospedado no servidor da aplicação. Upload via URL assinada do provider; guardamos apenas
id externo + metadados em `LessonVideo`. Legendas/transcrições como assets separados.

## Ambientes

`development` (local, Docker) -> `staging` (quando houver versão utilizável) -> `production`.
Staging e infra paga **não** são criados prematuramente.
