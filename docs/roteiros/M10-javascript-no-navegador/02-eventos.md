# Roteiro de vídeo — Aula 10.2: Eventos

**Módulo 10 — JavaScript no Navegador** · Duração alvo: ~6m30s
Apresentação em Libras · Apoio: legenda e transcrição em português

---

## Objetivo da aula
- Ouvir eventos com addEventListener

## Termos técnicos a preparar antes
- **Evento** — algo que acontece: clique, tecla, envio.
- **addEventListener / callback** — datilologia; escutar e reagir.
- Ponto-chave: o callback só roda quando o evento acontece.

## Visão geral de gravação
- **Ritmo geral:** médio.
- **Tom predominante:** 'a mágica da interação'.
- **Enquadramento:** meio-corpo; o padrão na tela. Ideal: demo com botão.

## Roteiro (frase a frase)

### 1. Abertura · ~40s
*Expressão: animada · Ritmo: lento*
- "Evento é algo que acontece na página."
- "Um clique, uma tecla, o envio de um formulário."
- "O JavaScript escuta e reage."

### 2. Ouvindo um clique · ~80s
*Expressão: didática · Ritmo: lento*
- `[MOSTRAR NA TELA: const botao = document.querySelector("#curtir"); botao.addEventListener("click", () => { console.log("Curtiu!"); });]`
- "Pega o botão com querySelector."
- "botao ponto addEventListener, click, e uma função."
- "Quando a pessoa clica, mostra 'Curtiu'."

### 3. O padrão · ~55s
*Expressão: didática · Ritmo: lento · Corpo: aponte cada parte*
- `[MOSTRAR NA TELA: elemento . addEventListener( "evento" , função ) → click · o que fazer]`
- "O elemento, ponto addEventListener."
- "Primeiro, o nome do evento, por exemplo click."
- "Depois, a função: o que fazer."
- "Dica: a função só roda quando o evento acontece. Não na hora que você a escreve."

### 4. Pergunta de fixação · ~30s
*Expressão: pergunta, depois confirmação*
- `[MOSTRAR NA TELA: "Como o JS reage a um clique?"]`
- "Como o JavaScript reage a um clique num botão?" *(pausa)*
- "Resposta: com addEventListener, click, e uma função."

### 5. Fechamento · ~20s
*Expressão: conclusiva · Ritmo: lento*
- "Resumo: elemento ponto addEventListener click função faz a página reagir."
- "Na próxima aula: botões e formulários."

**Soma estimada:** ~3m45s (alvo: ~6m30s — ideal demonstrar um botão reagindo ao vivo)

## Checklist de gravação
- [ ] Datilologia de addEventListener
- [ ] Tela de apoio: exemplo + padrão
- [ ] Ideal: demo de botão reagindo
- [ ] Pausa na pergunta de fixação
