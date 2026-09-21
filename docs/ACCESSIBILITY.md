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
