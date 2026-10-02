# Roteiro de vídeo — Aula 10.6: Estado simples

**Módulo 10 — JavaScript no Navegador** · Duração alvo: ~5m30s
Apresentação em Libras · Apoio: legenda e transcrição em português

---

## Objetivo da aula
- Entender o padrão estado → tela

## Termos técnicos a preparar antes
- **Estado** — o dado atual do app (um contador, uma lista).
- **render** — função que reflete o estado na tela.
- Padrão: mude o estado, chame render() num só lugar.
- Esta aula tem desafio de código (m10-incrementar).

## Visão geral de gravação
- **Ritmo geral:** lento; conceito que organiza tudo.
- **Tom predominante:** 'o padrão profissional'.
- **Enquadramento:** meio-corpo; o fluxo estado → tela na tela.

## Roteiro (frase a frase)

### 1. Abertura · ~40s
*Expressão: 'ideia poderosa' · Ritmo: lento*
- "Estado é o dado atual do app."
- "Um contador, uma lista."
- "A tela é um reflexo do estado."

### 2. O padrão · ~100s
*Expressão: didática · Ritmo: lento · Corpo: estado muda → tela atualiza*
- `[MOSTRAR NA TELA: estado 0 → mostra "0" · estado 1 → mostra "1"]`
- "O estado muda, a tela atualiza."
- `[MOSTRAR NA TELA: let contador = 0; function render() { ...textContent = contador; } botao.addEventListener("click", () => { contador = incrementar(contador); render(); });]`
- "contador começa em zero."
- "A função render mostra o contador na tela."
- "No clique: muda o contador e chama render."
- "Dica: mude o estado e chame render. Não saia mudando a tela em vários lugares — vira bagunça rápido."

### 3. Desafio de código · ~70s
*Expressão: incentivadora · Ritmo: lento*
- `[MOSTRAR NA TELA: desafio m10-incrementar — incrementar(estado) devolve estado + 1]`
- "No desafio: crie a função incrementar, que recebe um número."
- "Ela devolve esse número somado a um."
- "É o padrão para atualizar um contador de estado."
- "incrementar de zero é um. De quarenta e um é quarenta e dois."

### 4. Fechamento · ~20s
*Expressão: conclusiva · Ritmo: lento*
- "Resumo: guarde o estado numa variável; ao mudá-lo, atualize a tela num só lugar, o render."
- "Na próxima aula: armazenar dados no navegador."

**Soma estimada:** ~3m50s (alvo: ~5m30s)

## Checklist de gravação
- [ ] Tela de apoio: fluxo estado → tela + código + desafio m10-incrementar
- [ ] Marcar 'mude o estado, chame render num só lugar'
- [ ] Datilologia de 'estado' e 'render'
