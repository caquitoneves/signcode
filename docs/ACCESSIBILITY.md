# ACCESSIBILITY — Projeto X

Acessibilidade é **requisito funcional** e faz parte da arquitetura.

## Princípios

- Libras é **língua de ensino de primeira classe**, não legenda nem "janela de intérprete".
- Nenhuma informação essencial depende de áudio. Todo feedback tem representação visual
  (ex.: "✓ Exercício concluído", nunca só um som).
- O português escrito é, para muitos surdos, **segunda língua** — a leitura não pode ser a única porta de entrada do conteúdo.

## Modelo de conteúdo por aula

Cada aula pode conter: vídeo em Libras, vídeo em português (quando necessário), legenda,
transcrição, texto, código, materiais, objetivos, exercício e recursos visuais.

## Player de aula (visão-alvo, construído por partes)

O player é uma das primeiras interfaces realmente importantes. Nasce pensando em:
vídeo em Libras, tamanho/prioridade do vídeo, PiP (futuro), controle de velocidade,
legenda, transcrição, sincronização, leitura visual, **navegação por teclado**, contraste,
responsividade e preferências salvas do aluno.

Não implementamos tudo no primeiro dia, mas a experiência **nasce** com essa visão.

## Padrões técnicos

- HTML semântico, foco visível, navegação por teclado, `prefers-reduced-motion`, `prefers-color-scheme`.
- Contraste mínimo WCAG AA; alvos de toque adequados no mobile.
- Legendas e transcrições sempre disponíveis; controles com rótulos claros.
- Preferências de acessibilidade guardadas no perfil do aluno.

## Regra pedagógica: Libras-first (não é tradução)

Libras faz parte da construção da explicação, não é uma janela adicional sobre uma aula em
português. Fluxo de cada conceito: Conceito -> Explicação visual -> Libras -> Demonstração ->
Código -> Prática. Sinais técnicos devem ser validados por pessoas surdas usuárias de Libras.

## Checklist de acessibilidade por aula (antes de publicar)

Vídeo: Libras presente; enquadramento e iluminação adequados; mãos e expressões visíveis; fundo
limpo; velocidade confortável; pausas entre conceitos.

Conteúdo: texto em português; transcrição; exemplos visuais; código copiável; imagens descritas
quando necessário; linguagem simples.

Exercícios: instrução clara; exemplo quando necessário; feedback visual; permitir nova tentativa;
explicar a resposta.

Interface: navegação por teclado; contraste suficiente; foco visível; responsivo; controles de
vídeo acessíveis; sem depender de áudio (feedback sempre visual).
