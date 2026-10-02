# Roteiro de vídeo — Aula 5.5: O else if

**Módulo 5 — Operadores e Decisões** · Duração alvo: ~6 min
Apresentação em Libras · Apoio: legenda e transcrição em português

---

## Objetivo da aula
- Encadear condições com else if
- Entender que a ordem importa

## Termos técnicos a preparar antes
- **else if** — datilologia + explicar: "senão, se..." — testa um novo caso.
- Ponto-chave: o computador testa de cima para baixo e para no primeiro true.
- Esta aula tem desafio de código (m5-elseif).

## Visão geral de gravação
- **Ritmo geral:** lento; a "ordem importa" costuma confundir.
- **Tom predominante:** cuidadoso, com alerta.
- **Enquadramento:** meio-corpo; a cascata de decisões na tela.

## Roteiro (frase a frase)

### 1. Abertura · ~35s
*Expressão: clara · Ritmo: lento*
- "else if testa um novo caso quando o anterior foi falso."
- "Serve para vários caminhos."

### 2. Exemplo · ~80s
*Expressão: didática · Ritmo: lento · Corpo: desça pela cascata*
- `[MOSTRAR NA TELA: if nota>=9 "Excelente" · else if nota>=6 "Aprovado" · else "Reprovado"]`
- "Se a nota for maior ou igual a nove: 'Excelente'."
- "Senão, se for maior ou igual a seis: 'Aprovado'."
- "Senão: 'Reprovado'."
- "Com nota oito, roda o 'Aprovado'."

### 3. A ordem importa · ~80s
*Expressão: alerta · Ritmo: lento · Corpo: de cima para baixo, pare no primeiro true*
- `[MOSTRAR NA TELA: nota>=9? sim→Excelente · não→ nota>=6? sim→Aprovado · não→Reprovado]`
- "O computador testa de cima para baixo."
- "E para no primeiro que der verdadeiro."
- "Cuidado: coloque as condições mais específicas primeiro."
- "Se 'maior ou igual a seis' viesse antes de 'maior ou igual a nove', o 'Excelente' nunca apareceria."

### 4. Desafio de código · ~70s
*Expressão: incentivadora · Ritmo: lento*
- `[MOSTRAR NA TELA: desafio m5-elseif — hora vale 14; "manha" se <12, "tarde" se <18, senão "noite"]`
- "No desafio: a hora já vale catorze."
- "Guarde em periodo: 'manha' se a hora for menor que doze."
- "'tarde' se for menor que dezoito. Senão, 'noite'."

### 5. Fechamento · ~20s
*Expressão: conclusiva · Ritmo: lento*
- "Resumo: if, else if, else testam os casos em ordem e param no primeiro verdadeiro."
- "Na próxima aula: condições compostas."

**Soma estimada:** ~4m45s (alvo: ~6 min)

## Checklist de gravação
- [ ] Datilologia de else if combinada
- [ ] Tela de apoio: cascata + desafio m5-elseif
- [ ] Enfatizar bem 'a ordem importa'
