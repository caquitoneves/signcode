# Roteiro de vídeo — Aula 6.6: Evitando loops infinitos

**Módulo 6 — Repetições** · Duração alvo: ~5 min
Apresentação em Libras · Apoio: legenda e transcrição em português

---

## Objetivo da aula
- Reconhecer e evitar loops infinitos

## Termos técnicos a preparar antes
- **Loop infinito** — explicar: o loop nunca para porque a condição nunca fica falsa.
- Reaproveite for, while, passo (i++).

## Visão geral de gravação
- **Ritmo geral:** médio.
- **Tom predominante:** de alerta prático.
- **Enquadramento:** meio-corpo; o erro clássico e o checklist na tela.

## Roteiro (frase a frase)

### 1. Abertura · ~35s
*Expressão: alerta · Ritmo: lento*
- "Loop infinito trava o programa."
- "O bloco roda para sempre, porque a condição nunca fica falsa."

### 2. O erro clássico · ~60s
*Expressão: 'veja o problema' · Ritmo: lento*
- `[MOSTRAR NA TELA: let i = 0; while (i < 5) { console.log(i); // esqueceu o i++ → nunca termina }]`
- "i começa em zero."
- "Enquanto i menor que cinco: mostra i."
- "Mas esqueceram o i mais mais."
- "O i nunca muda. O loop nunca termina."

### 3. Checklist para não travar · ~70s
*Expressão: metódica · Ritmo: lento · Corpo: conte os itens*
- `[MOSTRAR NA TELA: 1) o for tem passo (i++)? · 2) o while muda algo rumo ao fim? · 3) a condição um dia vira false?]`
- "O for tem um passo, o i mais mais?"
- "O while muda alguma coisa dentro do bloco, rumo ao fim?"
- "A condição um dia vira falsa?"
- "Dica: aqui na plataforma o executor avisa 'Tempo excedido'."
- "Mas fora daqui, um loop infinito pode travar a página inteira."

### 4. Pergunta de fixação · ~30s
*Expressão: pergunta, depois confirmação*
- `[MOSTRAR NA TELA: "O que causa um loop infinito?"]`
- "O que causa um loop infinito?" *(pausa)*
- "Resposta: a condição nunca vira falsa."

### 5. Fechamento · ~20s
*Expressão: conclusiva · Ritmo: lento*
- "Resumo: todo loop precisa chegar ao fim."
- "Garanta que a condição um dia vire falsa."
- "No próximo módulo: funções."

**Soma estimada:** ~3m35s (alvo: ~5 min)

## Checklist de gravação
- [ ] Tela de apoio: erro clássico + checklist
- [ ] Mostrar o aviso 'Tempo excedido' do executor
- [ ] Pausa na pergunta de fixação
