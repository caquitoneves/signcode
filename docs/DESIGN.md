# DESIGN — Projeto X (nome provisório)

> "projetox" é um nome de trabalho enquanto a marca é definida. Evitar cravar nome de marca
> nas telas; manter textos neutros até a identidade ser fechada.

## Referências de design

- **SignLab (https://signlab.co/)** — referência principal. Plataforma para a comunidade surda
  (ASL, fora do Brasil), focada em aprender língua de sinais. Interessa o design e a forma de
  tratar a experiência surda como centro do produto (não um "extra").
- **Rocketseat** — referência de edtech de tecnologia: trilhas, prática, comunidade forte,
  estética moderna e profissional.

## O que estudar dessas referências (quando chegarmos ao front/player)

- Hierarquia visual e uso de vídeo como elemento central.
- Tom profissional (não infantil), moderno, com bom contraste.
- Como equilibram densidade de informação com clareza.

## Princípios já definidos (ver ACCESSIBILITY.md)

- Libras como língua de 1ª classe; nada essencial depende de áudio; feedback sempre visual.
- Contraste WCAG AA, navegação por teclado, foco visível, responsivo (desktop + mobile).

## Sistema de design implementado (Incremento de UI)

Direção escolhida: **dark moderno (Rocketseat)** com accent **teal/esmeralda**.

- **Tokens** (Tailwind v4 `@theme` em `apps/web/app/globals.css`): `canvas`, `card`, `elevated`,
  `edge`, `ink`, `muted`, `brand`, `brand-strong`, `brand-fg`. Uso via utilitários (`bg-card`,
  `text-muted`, `border-edge`, `bg-brand`, …). Tema escuro por padrão (`color-scheme: dark`).
- **Ícones**: `lucide-react` (mesma família usada no Dudepay).
- **Componentes base** (`components/ui.tsx`): `Button` (primary/secondary/ghost/success), `Card`,
  `Badge`, `ProgressBar`, `SectionHeading` e `LibrasBadge` (selo com ícone de mão).
- **Ilustrações** (`components/illustrations.tsx`): composições em SVG/ícones + gradientes, sem
  imagens de terceiros.
- **Ênfase em Libras**: `LibrasBadge` nos cards de curso, no curso e no player; no player, o
  toggle de idioma destaca Libras com ícone de mão.
- **Acessibilidade mantida**: foco visível (ring teal), `aria-*`, `prefers-reduced-motion`,
  contraste alto no escuro.

Próximo passo de UI possível: fonte própria (ex.: via `next/font`) e refino das ilustrações.
