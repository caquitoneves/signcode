# Roteiro de vídeo — Aula 10.4: Validação

**Módulo 10 — JavaScript no Navegador** · Duração alvo: ~5m30s
Apresentação em Libras · Apoio: legenda e transcrição em português

---

## Objetivo da aula
- Validar entradas do usuário

## Termos técnicos a preparar antes
- **Validar** — conferir se os dados fazem sentido antes de usar.
- **.trim()** — tirar espaços das pontas.
- Regra de ouro do produto: erro com texto E ícone, nunca só a cor.

## Visão geral de gravação
- **Ritmo geral:** médio; forte ligação com o propósito do produto.
- **Tom predominante:** de missão (feedback acessível).
- **Enquadramento:** meio-corpo; exemplo e feedback acessível na tela.

## Roteiro (frase a frase)

### 1. Abertura · ~40s
*Expressão: clara · Ritmo: lento*
- "Validar é conferir se os dados fazem sentido antes de usá-los."
- "E avisar com clareza quando não fazem."

### 2. Exemplo · ~60s
*Expressão: didática · Ritmo: lento*
- `[MOSTRAR NA TELA: if (nome.trim() === "") { mostrarErro("Preencha o nome"); } else { seguir(); }]`
- "Se o nome, sem espaços, estiver vazio: mostrar erro 'Preencha o nome'."
- "Senão: seguir."
- "Ponto trim tira os espaços das pontas."

### 3. Feedback acessível · ~75s
*Expressão: enfática, missão do produto · Ritmo: lento · Corpo: só cor (ruim) × cor + ícone + texto (bom)*
- `[MOSTRAR NA TELA: só cor vermelha (ruim) × vermelho + ícone + texto "Preencha o nome" (bom)]`
- "Campo só ficar vermelho não basta. Isso é só cor."
- "O certo: campo vermelho, mais ícone, mais o texto do erro."
- "Dica: neste produto, o erro precisa de texto e ícone. Nunca só a cor."
- "Uma pessoa surda ou daltônica precisa ver a mensagem."

### 4. Fechamento · ~20s
*Expressão: conclusiva · Ritmo: lento*
- "Resumo: valide antes de aceitar."
- "Mostre o erro com texto e ícone, não só com cor."
- "Na próxima aula: alterar conteúdo e estilos."

**Soma estimada:** ~3m15s (alvo: ~5m30s)

## Checklist de gravação
- [ ] Tela de apoio: exemplo + feedback acessível
- [ ] Dar peso ao erro com texto + ícone (propósito do produto)
- [ ] Explicar .trim()
