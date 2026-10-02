# Roteiro de vídeo — Aula 10.7: Armazenando dados no navegador

**Módulo 10 — JavaScript no Navegador** · Duração alvo: ~6m30s
Apresentação em Libras · Apoio: legenda e transcrição em português

---

## Objetivo da aula
- Usar localStorage

## Termos técnicos a preparar antes
- **localStorage / setItem / getItem** — datilologia; guardar e ler.
- **JSON.stringify / JSON.parse** — objeto/array vira texto e volta.
- Alertas: só guarda texto; não usar para dados sensíveis.

## Visão geral de gravação
- **Ritmo geral:** médio.
- **Tom predominante:** prático, com dois alertas.
- **Enquadramento:** meio-corpo; os comandos na tela.

## Roteiro (frase a frase)

### 1. Abertura · ~40s
*Expressão: 'veja que útil' · Ritmo: lento*
- "O localStorage guarda dados no navegador."
- "Eles continuam lá depois de fechar e reabrir a página."

### 2. Guardar e ler · ~55s
*Expressão: didática · Ritmo: lento*
- `[MOSTRAR NA TELA: localStorage.setItem("nome", "Ana"); const nome = localStorage.getItem("nome"); → "Ana"]`
- "setItem guarda: a chave nome, com o valor Ana."
- "getItem lê: pela chave nome, devolve Ana."

### 3. Só guarda texto · ~80s
*Expressão: alerta · Ritmo: lento*
- `[MOSTRAR NA TELA: localStorage.setItem("tarefas", JSON.stringify(lista)); const lista = JSON.parse(localStorage.getItem("tarefas"));]`
- "Atenção: o localStorage guarda só texto."
- "Para objeto ou array, use JSON."
- "JSON.stringify vira texto ao salvar."
- "JSON.parse volta a ser objeto ao ler."

### 4. Cuidados · ~40s
*Expressão: conselho · Ritmo: lento*
- "Dica: ótimo para preferências e rascunhos."
- "Não use para dados sensíveis. Fica visível no navegador."

### 5. Fechamento · ~20s
*Expressão: conclusiva · Ritmo: lento*
- "Resumo: localStorage guarda texto que sobrevive ao recarregar."
- "Use JSON para objetos e listas."
- "Na próxima aula: debugging no navegador."

**Soma estimada:** ~3m55s (alvo: ~6m30s)

## Checklist de gravação
- [ ] Datilologia de localStorage, setItem, getItem, JSON
- [ ] Tela de apoio: guardar/ler + JSON
- [ ] Marcar os dois alertas (só texto; nada sensível)
