# Roteiro de vídeo — Aula 10.3: Botões e formulários

**Módulo 10 — JavaScript no Navegador** · Duração alvo: ~5m30s
Apresentação em Libras · Apoio: legenda e transcrição em português

---

## Objetivo da aula
- Tratar o envio de um formulário

## Termos técnicos a preparar antes
- **submit / preventDefault / .value** — datilologia; capturar o envio.
- Ponto-chave: preventDefault impede a página de recarregar.

## Visão geral de gravação
- **Ritmo geral:** médio.
- **Tom predominante:** prático.
- **Enquadramento:** meio-corpo; o código do submit na tela.

## Roteiro (frase a frase)

### 1. Abertura · ~35s
*Expressão: clara · Ritmo: lento*
- "Ao enviar um formulário, o JavaScript captura os dados."
- "E evita o recarregamento padrão da página."

### 2. Tratando o envio · ~100s
*Expressão: didática · Ritmo: lento · Corpo: aponte cada linha*
- `[MOSTRAR NA TELA: form.addEventListener("submit", (evento) => { evento.preventDefault(); const nome = form.nome.value; console.log("Enviado:", nome); });]`
- "Pega o form. Escuta o evento submit."
- "Primeira linha: evento ponto preventDefault. Impede recarregar a página."
- "Depois: pega o que foi digitado, com ponto value."
- "E mostra o que foi enviado."

### 3. O detalhe que salva · ~45s
*Expressão: alerta útil · Ritmo: lento*
- "Dica importante:"
- "preventDefault é quase sempre a primeira linha no submit."
- "Sem ele, a página recarrega e você perde os dados."

### 4. Fechamento · ~20s
*Expressão: conclusiva · Ritmo: lento*
- "Resumo: no submit, use preventDefault e leia ponto value dos campos."
- "Na próxima aula: validação."

**Soma estimada:** ~3m20s (alvo: ~5m30s)

## Checklist de gravação
- [ ] Datilologia de submit, preventDefault, .value
- [ ] Tela de apoio: código do submit
- [ ] Marcar preventDefault como a primeira linha
