# BACKLOG — Projeto X

Ideias registradas para não virarem feature creep. Só implementar quando fizer sentido para o
estágio atual (ver regras 35 e 36 das Master Instructions). Formato: ideia · problema · hipótese ·
valor · complexidade.

## Pós-piloto (dependem de feedback dos 30 alunos)

### Tutor de IA
- **Ideia:** assistente que explica erros, adapta a explicação ao nível do aluno e responde dúvidas.
- **Problema:** aluno trava sozinho e desiste sem ajuda imediata.
- **Hipótese:** ajuda contextual aumenta conclusão e satisfação.
- **Valor:** alto (percebido e real), mas só se conteúdo+Libras já provarem valor.
- **Complexidade:** alta — custo recorrente de tokens (× alunos), salvaguardas (limites, moderação),
  UX. **Adiado por ADR-0017.** Passo intermediário possível: helper "explique meu erro" com teto.

### Sandbox de execução multi-linguagem
- **Ideia:** rodar Python/JS/outras com execução isolada (Judge0/Piston, próprio ou gerenciado).
- **Problema:** editor client-side só roda JS; cursos futuros podem precisar de outras linguagens.
- **Hipótese:** demanda por outras linguagens aparece após o primeiro curso.
- **Valor:** médio agora; alto quando houver trilhas além de "Programação do Zero".
- **Complexidade:** alta — custo de infra, latência, segurança. **Adiado por ADR-0017.**

### Sincronização multi-usuário / persistência de avaliação
- **Ideia:** salvar avaliação por estrelas da aula no backend (hoje é local).
- **Valor:** métrica de satisfação por aula (útil no piloto).
- **Complexidade:** baixa. **Candidato a puxar para o piloto.**

### Comunidade nativa, pagamentos e bolsas B2B
- Mantidos fora do MVP conforme Master Instructions (18, 19, 21). Comunidade via Discord no piloto.

## Navbar estilo mega-menu (Rocketseat) — quando houver múltiplas trilhas

- **Ideia:** transformar "Cursos" em um dropdown categorizado (Por área / Por
  formato / Por nível) e adicionar um menu "Soluções" por público (indivíduos,
  escolas, empresas), no estilo Rocketseat.
- **Problema que resolve:** navegação e descoberta quando existirem várias
  trilhas e páginas dedicadas para cada público (B2C, escolas, B2B).
- **Hipótese:** com catálogo maior, um índice plano em /cursos fica difícil de
  escanear; categorias melhoram a descoberta e a conversão por público.
- **Valor:** médio (depende de ter conteúdo/públicos suficientes).
- **Complexidade:** média (mega-menu acessível + páginas de público).
- **Status:** adiado. Hoje há 1 curso — um mega-menu mostraria categorias
  vazias. Fica para quando existirem 3+ trilhas e as landing pages de público.

## Trilha B (segundo curso) — pós-validação do piloto

- **Ideia:** uma segunda trilha (ex.: Front-end/Web, Python/Dados) depois de
  "Programação do Zero".
- **Problema:** ampliar a oferta quando o primeiro curso provar o modelo.
- **Hipótese:** demanda por mais trilhas aparece após validar a primeira com
  pessoas surdas reais.
- **Valor:** alto no futuro; baixo agora.
- **Complexidade:** alta (todo o conteúdo + vídeos em Libras).
- **Status:** adiado. Master Instructions §5/§6/§23 — MVP é UM curso para provar
  o modelo antes de escalar. O aprofundamento dos 14 módulos do curso 1 está
  concluído (114 aulas, todas no nível rico).

## Content-sync idempotente (preservar progresso ao atualizar conteúdo)

- **Ideia:** um caminho de atualização de conteúdo baseado em upsert (por
  slug/id estáveis) que atualize módulos/aulas/desafios/projetos SEM apagar
  `LessonProgress` / `ChallengeSubmission` / `ProjectSubmission`.
- **Problema:** o `seed.ts` recria a árvore do curso a cada execução
  (`module.deleteMany` → cascata), o que zera todo o progresso e todas as
  submissões. É seguro no bootstrap/dev, perigoso contra um banco de piloto real.
- **Hipótese:** durante o piloto vamos querer corrigir/ampliar conteúdo com
  usuários já ativos, sem perder a prova do que fizeram.
- **Valor:** alto assim que houver alunos reais.
- **Complexidade:** média (upsert por chaves estáveis + reconciliação de itens
  removidos; os desafios já têm id estável, ex.: `m3-ola`).
- **Status:** adiado. Hoje o `seed` é ferramenta de dev; não rodar contra dados
  de piloto.
