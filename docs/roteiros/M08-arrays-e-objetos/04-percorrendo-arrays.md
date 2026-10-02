# Roteiro de vídeo — Aula 8.4: Percorrendo arrays

**Módulo 8 — Arrays e Objetos** · Duração alvo: ~6m30s
Apresentação em Libras · Apoio: legenda e transcrição em português

---

## Objetivo da aula
- Percorrer um array com for...of

## Termos técnicos a preparar antes
- **for...of** — datilologia + explicar: visita cada item, dá o valor direto.
- Reaproveite acumulador (Módulo 6).
- Esta aula tem desafio de código (m8-soma).

## Visão geral de gravação
- **Ritmo geral:** médio.
- **Tom predominante:** prático; conecta loop + array.
- **Enquadramento:** meio-corpo; exemplos na tela.

## Roteiro (frase a frase)

### 1. Abertura · ~35s
*Expressão: clara · Ritmo: lento*
- "Para visitar cada item, use um loop."
- "O for...of é o mais limpo para arrays."

### 2. for...of · ~60s
*Expressão: didática · Ritmo: lento*
- `[MOSTRAR NA TELA: const notas = [7,8,9]; for (const nota of notas) { console.log(nota); } → 7 8 9]`
- "for, const nota, of notas."
- "A cada volta, nota é um item da lista."
- "Mostra sete, oito, nove."

### 3. Somando com acumulador · ~75s
*Expressão: 'juntando o que você já sabe' · Ritmo: lento*
- `[MOSTRAR NA TELA: let total = 0; for (const nota of notas) { total += nota; } → 24]`
- "total começa em zero."
- "A cada nota, total mais-igual nota."
- "Sete mais oito mais nove dá vinte e quatro."
- "Dica: o for...of te dá o valor direto."
- "Se precisar da posição, use o for clássico com índice."

### 4. Desafio de código · ~75s
*Expressão: incentivadora · Ritmo: lento*
- `[MOSTRAR NA TELA: desafio m8-soma — somaTudo(numeros) retorna a soma de todos]`
- "No desafio: crie a função somaTudo, que recebe um array."
- "Ela retorna a soma de todos os números."
- "Dica: use um acumulador e um for...of."
- "somaTudo de um, dois, três é seis. De lista vazia, é zero."

### 5. Fechamento · ~20s
*Expressão: conclusiva · Ritmo: lento*
- "Resumo: for, const item, of lista, visita todos os itens, um a um."
- "Na próxima aula: objetos."

**Soma estimada:** ~4m25s (alvo: ~6m30s)

## Checklist de gravação
- [ ] Datilologia de for...of
- [ ] Reaproveitar acumulador do Módulo 6
- [ ] Tela de apoio: for...of + soma + desafio m8-soma
