// GERADO A PARTIR DO PACOTE PEDAGÓGICO v1 (Módulos 0, 1 e 2).
// Conteúdo de apoio das aulas. Vídeos são de exemplo até termos as gravações em Libras.
// Editar aqui e rodar `pnpm prisma db seed`.

export interface SeedExerciseOption {
  text: string;
  correct: boolean;
}
export interface SeedExercise {
  type: 'MULTIPLE_CHOICE' | 'FILL_BLANK';
  prompt: string;
  explanation?: string;
  options?: SeedExerciseOption[];
  answers?: string[];
}
export interface SeedLesson {
  slug: string;
  title: string;
  summary: string;
  duration: number;
  objectives: string[];
  body: string;
  exercises: SeedExercise[];
}
export interface SeedModule {
  title: string;
  description: string;
  lessons: SeedLesson[];
}
export interface SeedCourse {
  slug: string;
  title: string;
  description: string;
  modules: SeedModule[];
}

export const COURSE: SeedCourse = {
  slug: 'programacao-do-zero',
  title: 'Programação do Zero',
  description:
    'Aprenda os fundamentos da programação, crie seus primeiros projetos e dê os primeiros passos para uma carreira em tecnologia — com Libras como língua principal.',
  modules: [
    {
      title: 'Bem-vindo à Tecnologia',
      description:
        'Entender o que é programação, o que faz uma pessoa desenvolvedora, as áreas da tecnologia e como será a jornada de aprendizagem.',
      lessons: [
        {
          slug: 'bem-vindo-a-programacao',
          title: 'Bem-vindo à programação',
          summary:
            'Apresentação do curso e da sua jornada. Você não precisa saber programar para começar.',
          duration: 300,
          objectives: [
            'Conhecer a plataforma e a jornada',
            'Entender a metodologia do curso',
            'Reduzir a ansiedade de começar do zero',
          ],
          body: '## Objetivo\nApresentar o curso e mostrar que qualquer pessoa pode começar.\n\n## A ideia principal\nVocê **não precisa saber programar** para começar a aprender programação.\n\n## Sua jornada\n\n```\nVocê está aqui -> Aprender -> Praticar -> Errar -> Tentar de novo -> Construir -> Publicar -> Evoluir\n```\n\nProgramação não é decorar fórmulas. Você vai aprender a observar problemas, dividir em partes, criar soluções, testar e corrigir.\n\n## Pratique\nResponda para você: **por que você decidiu aprender programação?** Não existe resposta certa.\n\n## Resumo\nAprender programação é uma habilidade que se desenvolve com prática. Comece sem medo.',
          exercises: [],
        },
        {
          slug: 'o-que-e-programacao',
          title: 'O que é programação?',
          summary:
            'Programar é escrever instruções para resolver um problema — mas antes vem pensar na solução.',
          duration: 360,
          objectives: [
            'Compreender programação como criação de instruções',
            'Reconhecer algoritmos no dia a dia',
          ],
          body: '## Conceito\nProgramar é escrever instruções que um computador consegue executar. Antes de escrever código existe uma etapa importante: **pensar na solução**.\n\n## Exemplo do dia a dia\nPreparar um café:\n\n```\n1. Pegar uma xícara\n2. Colocar café\n3. Aquecer água\n4. Colocar água\n5. Misturar\n```\n\nIsso já tem as características de um algoritmo.\n\n## Do problema ao resultado\n\n```\nPROBLEMA -> PASSOS -> INSTRUÇÕES -> RESULTADO\n```\n\n## Pratique\nEscreva pelo menos 5 passos para **preparar-se para sair de casa**. Depois pergunte: se alguém seguir exatamente seus passos, consegue realizar a tarefa?\n\n## Resumo\nUma sequência organizada de instruções pode representar um algoritmo.',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'O que significa programar?',
              explanation:
                'Programar é escrever instruções que o computador executa para resolver um problema.',
              options: [
                {
                  text: 'Escrever instruções para resolver um problema',
                  correct: true,
                },
                {
                  text: 'Digitar rápido no teclado',
                  correct: false,
                },
                {
                  text: 'Consertar a parte física do computador',
                  correct: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'o-que-e-codigo',
          title: 'O que é código?',
          summary:
            'Diferenciar ideia, algoritmo e código — o código é só a forma final da solução.',
          duration: 360,
          objectives: ['Diferenciar ideia, algoritmo e código'],
          body: '## Conceito\n\n```\nIDEIA -> ALGORITMO -> CÓDIGO -> COMPUTADOR\n```\n\n## Exemplo\n- **Ideia:** quero mostrar uma mensagem.\n- **Algoritmo:** escrever uma mensagem na tela.\n- **Código:**\n\n```javascript\nconsole.log("Olá!");\n```\n\n## Ponto importante\nO código **não é** a ideia. Código é uma forma de transformar a solução em instruções que uma linguagem de programação entende.\n\n## Resumo\nPrimeiro a ideia, depois o algoritmo (os passos), e só então o código.',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'Qual é a ordem correta ao resolver um problema?',
              explanation: 'Primeiro a ideia, depois o algoritmo (os passos) e por fim o código.',
              options: [
                {
                  text: 'Ideia -> Algoritmo -> Código',
                  correct: true,
                },
                {
                  text: 'Código -> Ideia -> Algoritmo',
                  correct: false,
                },
                {
                  text: 'Código -> Algoritmo -> Ideia',
                  correct: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'o-que-faz-uma-pessoa-desenvolvedora',
          title: 'O que faz uma pessoa desenvolvedora?',
          summary: 'Desmistificar a profissão: desenvolver é muito mais do que digitar código.',
          duration: 360,
          objectives: ['Entender o ciclo de trabalho de quem desenvolve software'],
          body: '## O ciclo do desenvolvimento\n\n```\nEntender o problema -> Planejar -> Programar -> Testar -> Encontrar erros -> Corrigir -> Melhorar -> Entregar\n```\n\n## Importante\nUma pessoa desenvolvedora não passa o dia inteiro digitando código. Ela também:\n\n- consulta documentação;\n- pesquisa e testa;\n- conversa com outras pessoas;\n- lê código e corrige problemas;\n- aprende constantemente.\n\n## Pratique\nQual parte dessa profissão parece mais interessante para você?\n\n## Resumo\nDesenvolver é resolver problemas — programar é só uma das etapas.',
          exercises: [],
        },
        {
          slug: 'areas-da-tecnologia',
          title: 'Áreas da tecnologia',
          summary: 'Conhecer as possibilidades sem precisar escolher uma carreira agora.',
          duration: 420,
          objectives: ['Reconhecer as principais áreas da tecnologia'],
          body: '## Áreas\n- **Frontend** — cria a interface que a pessoa usuária utiliza.\n- **Backend** — cuida da lógica e dos serviços por trás da aplicação.\n- **Full Stack** — atua em frontend e backend.\n- **Mobile** — cria aplicativos para celulares.\n- **Dados** — análise e interpretação de dados.\n- **IA** — sistemas de inteligência artificial.\n- **Cloud / DevOps** — infraestrutura, automação e operação.\n- **Segurança** — protege sistemas e informações.\n\n## Pratique\nComplete: "Quero conhecer melhor...". Não é uma escolha definitiva.\n\n## Resumo\nExistem muitos caminhos. Você não precisa decidir agora.',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'Qual área cuida da interface que a pessoa usuária vê e utiliza?',
              explanation: 'O Frontend cuida da interface visível para a pessoa usuária.',
              options: [
                {
                  text: 'Frontend',
                  correct: true,
                },
                {
                  text: 'Backend',
                  correct: false,
                },
                {
                  text: 'Segurança',
                  correct: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'como-vamos-aprender',
          title: 'Como vamos aprender',
          summary: 'O método de estudo do curso: assistir não é aprender — é preciso praticar.',
          duration: 300,
          objectives: ['Entender o método de estudo do curso'],
          body: '## O método\n\n```\nAULA -> ENTENDER -> EXEMPLO -> PRATICAR -> DESAFIO -> EXPLICAR -> AVANÇAR\n```\n\n## Mensagem principal\nAssistir à aula **não** significa aprender. Aprender programação exige escrever, testar e errar.\n\n## Pratique\nExplique para outra pessoa: o que é programação? Se não conseguir explicar, volte ao conteúdo.\n\n## Resumo\nPrática e explicação são a prova de que você aprendeu.',
          exercises: [],
        },
        {
          slug: 'seu-primeiro-objetivo',
          title: 'Seu primeiro objetivo',
          summary: 'Criar um compromisso pessoal simples — o começo do seu perfil de aprendizagem.',
          duration: 300,
          objectives: ['Definir um objetivo pessoal de aprendizagem'],
          body: '## Atividade\nResponda para você:\n\n```\nMeu nome:\nPor que quero aprender tecnologia?\nO que gostaria de construir?\nQuanto tempo consigo estudar por semana?\nO que quero conseguir fazer ao terminar este curso?\n```\n\n## Resultado\nEsse é o primeiro registro do seu perfil de aprendizagem — vamos retomá-lo ao longo do curso.',
          exercises: [],
        },
      ],
    },
    {
      title: 'Como o Computador Funciona',
      description:
        'Criar um modelo mental simples de computador, software, arquivos, programas, internet, cliente/servidor e banco de dados.',
      lessons: [
        {
          slug: 'hardware-e-software',
          title: 'Hardware e software',
          summary: 'Diferenciar a parte física (hardware) das instruções e programas (software).',
          duration: 300,
          objectives: ['Diferenciar hardware e software'],
          body: '## Conceito\n- **Hardware** = parte física.\n- **Software** = programas e instruções.\n\n## Exemplos\n- Hardware: teclado, mouse, monitor, processador, memória, SSD.\n- Software: navegador, sistema operacional, editor de código, aplicativos.\n\n## Resumo\nHardware você toca; software são as instruções que rodam nele.',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'O navegador (Chrome, Firefox) é hardware ou software?',
              explanation: 'O navegador é um programa — portanto, software.',
              options: [
                {
                  text: 'Software',
                  correct: true,
                },
                {
                  text: 'Hardware',
                  correct: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'sistema-operacional',
          title: 'Sistema operacional',
          summary: 'Entender o papel do sistema operacional como camada entre você e o hardware.',
          duration: 300,
          objectives: ['Entender o papel do sistema operacional'],
          body: '## Conceito\nO sistema operacional coordena tudo entre você e o hardware.\n\n```\nUSUÁRIO -> APLICAÇÃO -> SISTEMA OPERACIONAL -> HARDWARE\n```\n\n## Exemplos\nWindows, macOS, Linux, Android, iOS.\n\n## Resumo\nQuando você abre um app, existem várias camadas entre a ação e o hardware.',
          exercises: [],
        },
        {
          slug: 'arquivos-e-pastas',
          title: 'Arquivos e pastas',
          summary: 'Criar familiaridade com arquivos, pastas, extensões e caminhos.',
          duration: 360,
          objectives: ['Entender arquivos, pastas, extensões e caminhos'],
          body: '## Conceito\nArquivos guardam informação; pastas organizam arquivos; a extensão indica o tipo.\n\n## Exemplo\n\n```\nmeu-projeto/\n  index.html\n  style.css\n  script.js\n```\n\n## Pratique\nImagine a estrutura de arquivos de um **projeto de portfólio**. Quais arquivos você criaria?',
          exercises: [],
        },
        {
          slug: 'programas-e-aplicativos',
          title: 'Programas e aplicativos',
          summary: 'Diferentes programas executam diferentes funções.',
          duration: 300,
          objectives: ['Perceber que cada programa tem uma função'],
          body: '## Exemplos\n\n```\nChrome  -> navegar\nVS Code -> escrever código\nGit     -> controlar versões\nSpotify -> reproduzir música\n```\n\n## Pratique\nEscolha três aplicativos que você usa todo dia e explique a função de cada um.',
          exercises: [],
        },
        {
          slug: 'navegador',
          title: 'Navegador',
          summary: 'O navegador interpreta a web e mostra a interface na tela.',
          duration: 300,
          objectives: ['Entender o papel do navegador'],
          body: '## Conceito\nO navegador interpreta recursos da web e apresenta uma interface.\n\n```\nSITE (HTML, CSS, JavaScript) -> NAVEGADOR -> TELA\n```\n\n## Exemplos\nChrome, Edge, Firefox, Safari.',
          exercises: [],
        },
        {
          slug: 'internet',
          title: 'Internet',
          summary: 'Um modelo mental básico: dispositivos se comunicando por redes.',
          duration: 300,
          objectives: ['Criar um modelo mental básico da internet'],
          body: '## Conceito\nA internet permite que dispositivos se comuniquem por redes.\n\n```\nCOMPUTADOR  <->  INTERNET  <->  SERVIDOR\n```\n\n## Por enquanto\nNão vamos nos aprofundar em TCP/IP, DNS ou roteamento. O objetivo é ter a base.',
          exercises: [],
        },
        {
          slug: 'cliente-e-servidor',
          title: 'Cliente e servidor',
          summary:
            'Um dos conceitos mais importantes do desenvolvimento web: requisição e resposta.',
          duration: 360,
          objectives: ['Entender o modelo cliente/servidor'],
          body: '## Conceito\n\n```\nCLIENTE (navegador)\n   | requisição\n   v\nSERVIDOR\n   | resposta\n   v\nCLIENTE\n```\n\n## Exemplo\nAo acessar `exemplo.com`, o navegador faz uma solicitação; o servidor processa e responde.\n\n## Pratique\nNesse exemplo, quem é o cliente? Quem é o servidor?',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'Quem faz a requisição em uma navegação na web?',
              explanation: 'O cliente (o navegador) faz a requisição; o servidor responde.',
              options: [
                {
                  text: 'O cliente (navegador)',
                  correct: true,
                },
                {
                  text: 'O servidor',
                  correct: false,
                },
                {
                  text: 'O banco de dados',
                  correct: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'o-caminho-de-uma-pagina',
          title: 'O caminho de uma página',
          summary: 'Juntar os conceitos: o que acontece quando você acessa um site.',
          duration: 420,
          objectives: ['Descrever o caminho de uma requisição web'],
          body: '## O caminho completo\n\n```\nVocê -> Navegador -> Internet -> Servidor -> Aplicação -> Banco de dados\n     -> Servidor -> Internet -> Navegador -> Tela\n```\n\n## Pratique\nExplique, com suas palavras, o que acontece quando você entra em uma rede social.',
          exercises: [],
        },
        {
          slug: 'o-que-e-banco-de-dados',
          title: 'O que é banco de dados?',
          summary: 'Onde as informações ficam armazenadas e organizadas — sem SQL ainda.',
          duration: 360,
          objectives: ['Entender para que serve um banco de dados'],
          body: '## Conceito\nUm banco de dados armazena e organiza informações.\n\n## Exemplo\n\n```\nUSUÁRIOS\nID | Nome | Email\n1  | Ana  | ana@email...\n2  | João | joao@email...\n```\n\n## Pratique\nQuais informações uma **plataforma de cursos** poderia guardar? (por exemplo: nome, email, curso, progresso, aulas concluídas).',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'Para que serve um banco de dados?',
              explanation: 'Um banco de dados serve para armazenar e organizar informações.',
              options: [
                {
                  text: 'Armazenar e organizar informações',
                  correct: true,
                },
                {
                  text: 'Mostrar vídeos',
                  correct: false,
                },
                {
                  text: 'Deixar o computador mais rápido',
                  correct: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'revisao-modulo-1',
          title: 'Revisão',
          summary: 'Fixar os conceitos do módulo com classificação e um desafio de completar.',
          duration: 300,
          objectives: ['Revisar hardware, software, servidor e banco de dados'],
          body: '## Classifique\n- Chrome -> software\n- Teclado -> hardware\n- Windows -> sistema operacional\n- Servidor -> sistema que fornece recursos\n- Banco de dados -> armazenamento e organização\n\n## Desafio\nComplete: ao acessar um site, meu ____ envia uma solicitação, que passa pela internet até o servidor.',
          exercises: [
            {
              type: 'FILL_BLANK',
              prompt: 'Ao acessar um site, meu ____ envia a solicitação para o servidor.',
              explanation: 'O navegador (o cliente) envia a solicitação.',
              answers: ['navegador', 'cliente'],
            },
          ],
        },
      ],
    },
    {
      title: 'Lógica de Programação',
      description:
        'Desenvolver o pensamento computacional: algoritmos, sequência, decisões, repetições, fluxogramas, pseudocódigo, decomposição e debugging.',
      lessons: [
        {
          slug: 'o-que-e-logica',
          title: 'O que é lógica?',
          summary: 'Lógica é organizar o pensamento para resolver problemas.',
          duration: 300,
          objectives: ['Entender lógica como organização do raciocínio'],
          body: '## Conceito\nLógica é organizar o pensamento para resolver um problema.\n\n## Exemplo\nChegar a um lugar:\n\n```\nOnde estou? -> Para onde vou? -> Qual caminho? -> Qual transporte? -> Cheguei?\n```\n\n## Resumo\nProgramação começa com problema e raciocínio, não com código.',
          exercises: [],
        },
        {
          slug: 'algoritmos',
          title: 'Algoritmos',
          summary: 'Criar sequências de passos para resolver tarefas.',
          duration: 360,
          objectives: ['Criar algoritmos simples com início, passos e resultado'],
          body: '## Exemplo\n\n```\nALGORITMO - FAZER CAFÉ\n1. Pegar xícara\n2. Pegar café\n3. Aquecer água\n4. Colocar café\n5. Adicionar água\n6. Misturar\n```\n\n## Pratique\nCrie o algoritmo para **escovar os dentes**. Ele deve ter início, passos e resultado.',
          exercises: [],
        },
        {
          slug: 'sequencia',
          title: 'Sequência',
          summary: 'A ordem das instruções muda o resultado.',
          duration: 300,
          objectives: ['Perceber a importância da ordem das instruções'],
          body: '## Conceito\nComputadores executam instruções em ordem. A ordem importa.\n\n## Exemplo\nErrado:\n\n```\n1. Colocar o sapato\n2. Colocar a meia\n```\n\nCerto:\n\n```\n1. Colocar a meia\n2. Colocar o sapato\n```',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'Qual é a ordem correta?',
              explanation: 'Primeiro a meia, depois o sapato — a ordem muda o resultado.',
              options: [
                {
                  text: 'Colocar a meia, depois o sapato',
                  correct: true,
                },
                {
                  text: 'Colocar o sapato, depois a meia',
                  correct: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'entrada-processamento-saida',
          title: 'Entrada, processamento e saída',
          summary: 'Um dos modelos fundamentais da programação.',
          duration: 360,
          objectives: ['Identificar entrada, processamento e saída'],
          body: '## Modelo\n\n```\nENTRADA -> PROCESSAMENTO -> SAÍDA\n```\n\n## Exemplo\nCalculadora:\n\n```\nEntrada: 10 + 5\nProcessamento: somar\nSaída: 15\n```\n\n## Pratique\nIdentifique entrada/processamento/saída em: login, calculadora, cadastro, compra online.',
          exercises: [],
        },
        {
          slug: 'decisoes',
          title: 'Decisões',
          summary: 'Programas tomam decisões com base em condições.',
          duration: 360,
          objectives: ['Entender decisões (se/senão)'],
          body: '## Exemplo do dia a dia\n\n```\nSE estiver chovendo\n    levar guarda-chuva\nSENÃO\n    não levar\n```\n\n## Visual\n\n```\n        Está chovendo?\n         /        \\\n       SIM        NÃO\n        |          |\n  Guarda-chuva     -\n```',
          exercises: [],
        },
        {
          slug: 'condicoes',
          title: 'Condições',
          summary: 'Condições são perguntas que resultam em verdadeiro ou falso.',
          duration: 360,
          objectives: ['Entender condições como verdadeiro/falso'],
          body: '## Conceito\nUma condição é uma pergunta com resposta verdadeiro ou falso.\n\n## Exemplos\n\n```\nidade >= 18\nsenha está correta?\nusuário está logado?\n```\n\n## Pratique\n"10 é maior que 5" -> verdadeiro. "2 é maior que 8" -> falso. Crie três condições do seu dia a dia.',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'A condição "10 é maior que 5" é verdadeira ou falsa?',
              explanation: '10 é maior que 5, então a condição é verdadeira.',
              options: [
                {
                  text: 'Verdadeira',
                  correct: true,
                },
                {
                  text: 'Falsa',
                  correct: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'repeticao',
          title: 'Repetição',
          summary: 'Quando uma tarefa precisa acontecer várias vezes.',
          duration: 360,
          objectives: ['Entender quando usar repetição'],
          body: '## Exemplo\n\n```\nRepetir 5 vezes:\n    mostrar "Olá"\n```\n\n## No dia a dia\nContar pessoas, processar vários produtos, mostrar vários nomes, repetir tentativas.\n\n## Pratique\nDescreva uma instrução para mostrar os números de 1 até 10.',
          exercises: [],
        },
        {
          slug: 'contadores',
          title: 'Contadores',
          summary: 'A ideia de contar durante uma repetição.',
          duration: 300,
          objectives: ['Entender a ideia de contador'],
          body: '## Exemplo\n\n```\ncontador = 0\na cada pessoa:\n    contador = contador + 1\n```\n\n## Aplicações\nNúmero de alunos, quantidade de tarefas, número de tentativas, itens de um carrinho.',
          exercises: [],
        },
        {
          slug: 'fluxogramas',
          title: 'Fluxogramas',
          summary: 'Representar algoritmos visualmente.',
          duration: 360,
          objectives: ['Ler e criar fluxogramas simples'],
          body: '## Símbolos\n\n```\n( ) Início/Fim\n[ ] Processo\n<> Decisão\n->  Fluxo\n```\n\n## Exemplo\n\n```\nINÍCIO -> Informar idade -> idade >= 18?\n   SIM -> Adulto\n   NÃO -> Menor de idade\n-> FIM\n```\n\n## Pratique\nCrie um fluxograma para **fazer login**.',
          exercises: [],
        },
        {
          slug: 'pseudocodigo',
          title: 'Pseudocódigo',
          summary: 'Escrever a solução perto da linguagem humana, antes do código.',
          duration: 360,
          objectives: ['Escrever soluções em pseudocódigo'],
          body: '## Exemplo\n\n```\nINÍCIO\n  pedir idade\n  SE idade >= 18\n      mostrar "Você é maior de idade"\n  SENÃO\n      mostrar "Você é menor de idade"\nFIM\n```\n\n## Importante\nPseudocódigo não segue uma linguagem específica. É uma ferramenta de raciocínio.',
          exercises: [],
        },
        {
          slug: 'decomposicao-de-problemas',
          title: 'Decomposição de problemas',
          summary: 'Quebrar problemas grandes em problemas menores.',
          duration: 420,
          objectives: ['Quebrar um problema grande em partes menores'],
          body: '## Conceito\nNão comece com "como faço uma plataforma inteira?". Divida:\n\n```\nCadastro\nLogin\nCursos\nMódulos\nAulas\nProgresso\nPerfil\n```\n\nDepois divida de novo:\n\n```\nCadastro\n  nome\n  email\n  senha\n```\n\n## Pratique\nDivida o problema "criar uma lista de tarefas" em partes menores.',
          exercises: [],
        },
        {
          slug: 'debugging',
          title: 'Debugging',
          summary: 'Erro faz parte. Debugging é investigar e corrigir.',
          duration: 360,
          objectives: ['Entender erro como parte normal e o processo de debugging'],
          body: '## Conceito\n- **Bug**: comportamento incorreto ou inesperado.\n- **Debugging**: investigar e corrigir o problema.\n\n## Processo\n\n```\nERRO -> Observar -> Reproduzir -> Investigar -> Hipótese -> Testar -> Corrigir -> Testar de novo\n```\n\n## Pratique\nEste algoritmo tem um problema. Qual?\n\n```\n1. Abrir porta\n2. Entrar no carro\n3. Colocar cinto\n4. Ligar carro\n5. Colocar chave na ignição\n```',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'No algoritmo do carro, qual é o problema?',
              explanation:
                'A chave precisa entrar na ignição ANTES de ligar o carro — a ordem está errada.',
              options: [
                {
                  text: 'Ligar o carro vem antes de colocar a chave na ignição',
                  correct: true,
                },
                {
                  text: 'Faltou abrir a porta',
                  correct: false,
                },
                {
                  text: 'Não há problema',
                  correct: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'desafio-final-logica',
          title: 'Desafio final: sistema de acesso',
          summary: 'Aplicar tudo: criar o algoritmo, o fluxograma e o pseudocódigo de um login.',
          duration: 600,
          objectives: ['Aplicar sequência, condição e resultado em um problema real'],
          body: '## Desafio\nCrie um algoritmo para verificar se uma pessoa pode entrar em um sistema.\n\n## Dados\n\n```\nemail\nsenha\n```\n\n## Regras\n\n```\nSE email estiver correto E senha estiver correta\n    permitir acesso\nSENÃO\n    mostrar mensagem de erro\n```\n\n## Entregáveis\n1. Algoritmo escrito\n2. Fluxograma\n3. Pseudocódigo\n\n## Critério\nNão é sobre "ficar bonito". Avalie: sequência, clareza, condição, resultado e sua capacidade de explicar a solução.',
          exercises: [],
        },
      ],
    },
  ],
};
