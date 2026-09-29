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
