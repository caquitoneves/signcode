# CURRÍCULO — Escola de Tecnologia (Libras-first)

Baseado na pesquisa de referências (Rocketseat/Discover, Alura, Codecademy, freeCodeCamp e
SignLab). Princípio: **não copiar uma escola de programação para ouvintes com uma janelinha de
Libras**, e sim uma experiência **Libras-first + prática + portfólio + carreira**.

## Modelo do produto

```
Plataforma -> Jornada do aluno
   APRENDER (módulos/aulas, Libras + PT-BR)
   PRATICAR (exercícios/projetos, código)
        -> PORTFÓLIO -> GITHUB -> CARREIRA
```

Cada curso é uma **jornada** com ordem planejada (o aluno não precisa descobrir sozinho o que
estudar depois), mas **self-paced**. Ao concluir, a plataforma recomenda a próxima trilha.

## Roadmap de trilhas (visão, não implementação)

```
Programação do Zero -> Fundamentos Web -> Frontend / Backend -> Full Stack
   -> Cloud/DevOps · IA -> Carreira (GitHub, Portfólio, Entrevista, Vaga)
```

O primeiro curso **não** forma Full Stack: forma a base para se tornar desenvolvedor.

## Curso 1 — Programação do Zero

Público: pessoas surdas, especialmente usuárias de Libras, sem experiência prévia. Pré-requisito:
nenhum. Objetivo final: terminar tendo criado ao menos um projeto publicável e sabendo explicá-lo.

Linguagem: **JavaScript** (transição rápida da lógica para algo visual; conversa com HTML/CSS).

Mapa completo (12 módulos):

```
0  Bem-vindo à Tecnologia
1  Como o Computador Funciona
2  Lógica de Programação
3  Primeiro Código (JavaScript)
4  Variáveis e Dados
5  Operadores e Decisões
6  Repetições
7  Funções
8  Arrays e Objetos
9  HTML + CSS
10 JavaScript no Navegador (DOM)
11 Git e GitHub
12 Projeto Final
```

**Piloto:** produzir e validar apenas **Módulos 0, 1 e 2** (~30 aulas curtas) antes de seguir.
Ver `VALIDATION.md`. Conteúdo dos M0–2 já está no seed (`apps/api/prisma/seed-content.ts`).

## Modelo padrão de cada aula

```
Objetivo -> Abertura -> Explicação em Libras -> Representação visual -> Exemplo
-> Prática guiada -> Exercício independente -> Desafio -> Resumo -> Vocabulário -> Checkpoint
```

Mapeamento no modelo de dados atual: `LessonTranslation` (title, summary, objectives, bodyMarkdown,
caption, transcript), `LessonVideo` (CONTENT/INTERPRETER, futuramente INSTRUCTOR), `Exercise`
(MULTIPLE_CHOICE / FILL_BLANK hoje; CODE quando os módulos de código chegarem), `LessonMaterial`.

## Regra pedagógica: Libras não é tradução

Libras faz parte da construção da explicação, não é legenda nem janela adicional:

```
Conceito -> Explicação visual -> Libras -> Demonstração -> Código -> Prática
```

Termos técnicos precisam de sinais **validados por pessoas surdas** usuárias de Libras. Para cada
termo, registrar: termo em português, conceito, explicação visual, sinal usado no curso, variações,
exemplo e contexto. Isso alimentará o futuro Glossário técnico.
