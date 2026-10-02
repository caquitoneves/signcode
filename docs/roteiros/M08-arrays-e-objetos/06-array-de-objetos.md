# Roteiro de vídeo — Aula 8.6: Array de objetos

**Módulo 8 — Arrays e Objetos** · Duração alvo: ~5m30s
Apresentação em Libras · Apoio: legenda e transcrição em português

---

## Objetivo da aula
- Trabalhar com listas de objetos

## Termos técnicos a preparar antes
- **Array de objetos** — explicar: lista de fichas. É como dados reais chegam.
- **lista[i].propriedade** — acesso combinado.

## Visão geral de gravação
- **Ritmo geral:** médio.
- **Tom predominante:** 'é assim que o mundo real chega'.
- **Enquadramento:** meio-corpo; a lista de objetos na tela.

## Roteiro (frase a frase)

### 1. Abertura · ~30s
*Expressão: clara · Ritmo: lento · Corpo: junte array + objeto*
- "Agora junte os dois."
- "Um array de objetos é como quase todo dado real chega."
- "Uma lista de fichas."

### 2. Exemplo · ~75s
*Expressão: didática · Ritmo: lento*
- `[MOSTRAR NA TELA: const alunos = [ {nome:"Ana",nota:9}, {nome:"Caio",nota:6}, {nome:"Bia",nota:8} ]; alunos[0].nome → Ana]`
- "alunos é uma lista de fichas."
- "Cada ficha tem nome e nota."
- "alunos colchete zero ponto nome dá Ana."

### 3. Percorrendo · ~60s
*Expressão: 'juntando tudo' · Ritmo: lento*
- `[MOSTRAR NA TELA: for (const aluno of alunos) { console.log(aluno.nome + ": " + aluno.nota); }]`
- "Com for...of, para cada aluno da lista:"
- "mostra o nome, dois-pontos, a nota."
- "Dica: é assim que chegam dados de uma API, de uma planilha, de um banco. Uma lista de objetos."

### 4. Fechamento · ~20s
*Expressão: conclusiva · Ritmo: lento*
- "Resumo: array de objetos é lista de fichas."
- "lista colchete i ponto propriedade chega a um dado específico."
- "Na próxima aula: manipulação de dados."

**Soma estimada:** ~3m05s (alvo: ~5m30s)

## Checklist de gravação
- [ ] Tela de apoio: array de objetos + percorrendo
- [ ] Reaproveitar for...of e objeto.propriedade
- [ ] Marcar 'é assim que o mundo real chega'
