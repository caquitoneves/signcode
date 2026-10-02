# Roteiro de vídeo — Aula 6.4: Acumuladores

**Módulo 6 — Repetições** · Duração alvo: ~5 min
Apresentação em Libras · Apoio: legenda e transcrição em português

---

## Objetivo da aula
- Usar um acumulador dentro de um loop

## Termos técnicos a preparar antes
- **Acumulador** — explicar: soma valores a cada volta (diferente do contador, que conta ocorrências).
- **+= ** — explicar: atalho para "soma = soma + ...".

## Visão geral de gravação
- **Ritmo geral:** médio.
- **Tom predominante:** comparativo (contador × acumulador).
- **Enquadramento:** meio-corpo; a comparação e o exemplo na tela.

## Roteiro (frase a frase)

### 1. Abertura · ~35s
*Expressão: clara · Ritmo: lento*
- "Um acumulador vai somando valores a cada volta."
- "Parecido com o contador, mas soma quantidades, não conta ocorrências."

### 2. Contador × acumulador · ~55s
*Expressão: comparativa · Ritmo: lento · Corpo: dois lados*
- `[MOSTRAR NA TELA: contador: conta++ (sobe de 1 em 1) · acumulador: soma = soma + i (soma o valor da volta)]`
- "Contador: mais mais, sobe de um em um."
- "Acumulador: soma recebe soma mais o valor da volta."

### 3. Exemplo · ~70s
*Expressão: concreta · Ritmo: lento*
- `[MOSTRAR NA TELA: let soma = 0; for (let i=1; i<=5; i++) { soma = soma + i; } → 15]`
- "soma começa em zero."
- "A cada volta, soma recebe soma mais i."
- "Somando um até cinco, dá quinze."
- "Dica: soma mais-igual i é um atalho para soma recebe soma mais i."

### 4. Fechamento · ~20s
*Expressão: conclusiva · Ritmo: lento*
- "Resumo: acumulador começa em zero e guarda um total que cresce dentro do loop."
- "Na próxima aula: interrompendo um loop."

**Soma estimada:** ~3m00s (alvo: ~5 min — acrescente um segundo exemplo se quiser)

## Checklist de gravação
- [ ] Tela de apoio: contador × acumulador + exemplo
- [ ] Explicar o atalho +=
- [ ] Diferenciar bem 'conta ocorrências' × 'soma valores'
