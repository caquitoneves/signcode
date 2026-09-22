# ROADMAP — Projeto X

Trabalho em incrementos pequenos. A cada incremento: explicar -> implementar -> testar ->
revisar -> mostrar alterações -> dizer como testar -> registrar decisões. Parar e apresentar.

## Incrementos

- **Incremento 1 — Fundação** _(concluído)_
  Monorepo, apps/web, apps/api, packages, Docker local, Postgres (compose), TypeScript, lint,
  formatter, Git, README, docs, healthcheck da API, primeira página do front, CI básico.
- **Incremento 2 — Auth completo** _(concluído)_
  Argon2id, access/refresh rotativo, cookies HttpOnly, CSRF, rate limiting, recuperação de senha,
  invalidação de sessão, RBAC. Prisma com modelos User/Session.
- **Incremento 3 — Courses -> Modules -> Lessons** _(concluído)_
  Modelo de conteúdo multilíngue (LessonTranslation/LessonVideo), seed de conteúdo, endpoints admin mínimos.
- **Incremento 4 — Primeiro player de aula** _(concluído)_
  Player acessível (Libras + legenda + transcrição + texto + código); base para PiP/velocidade/preferências.
- **Incremento 5 — Progress** _(concluído)_
  Conclusão de aula/módulo/curso, painel de progresso.
- **Incremento 6 — Exercises** _(concluído)_
  Quiz/lacuna, submissão, feedback; abstração Exercise -> Evaluator.
- **Incremento 7 — Dashboard**
  Painel do aluno; primeira experiência fim a fim.

## Horizonte de 6 meses (aprox.)

- Meses 1–4: incrementos 1–7 (fundação + experiência fim a fim).
- Mês 5: primeiro curso real em Libras, validação com alunos surdos, métricas básicas.
- Mês 6: refino por retenção/feedback; esqueletos de `glossary` e fronteira do `lab`;
  avaliar sinais de disposição a pagar antes de qualquer coisa de pagamento.

## Preparado, não construído agora

Glossário técnico em Libras, laboratório de código (execução isolada), IA educacional
(tutor, explicação, análise de erro, geração de exercícios, personalização), mobile, pagamentos, B2B/bolsas.
