// GERADO A PARTIR DO PACOTE PEDAGÓGICO v1 (+ camada de experiência).
// Conteúdo de apoio das aulas (Markdown). Vídeos são de exemplo até termos as gravações em Libras.
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
export interface SeedCheckpointQuestion {
  prompt: string;
  explanation?: string;
  options: { text: string; correct: boolean }[];
}
export interface SeedCheckpoint {
  title: string;
  description?: string;
  questions: SeedCheckpointQuestion[];
}
export interface SeedMiniProject {
  title: string;
  brief: string;
  requirements: string[];
}
export interface SeedModule {
  title: string;
  description: string;
  lessons: SeedLesson[];
  checkpoint?: SeedCheckpoint;
  miniProject?: SeedMiniProject;
}
export interface SeedAssessmentQuestion {
  kind: 'SINGLE_CHOICE' | 'TEXT' | 'SCALE';
  prompt: string;
  options?: { text: string }[];
}
export interface SeedAssessment {
  title: string;
  description?: string;
  questions: SeedAssessmentQuestion[];
}
export interface SeedFinalProject {
  title: string;
  brief: string;
  requirements: string[];
}
export interface SeedCourse {
  slug: string;
  title: string;
  description: string;
  modules: SeedModule[];
  assessment?: SeedAssessment;
  finalProject?: SeedFinalProject;
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
        'Entender o que é programação, o que faz uma pessoa desenvolvedora, as áreas da tecnologia e como será a sua jornada.',
      lessons: [
        {
          slug: 'bem-vindo-a-programacao',
          title: 'Bem-vindo à programação',
          summary:
            'Apresentação do curso e da sua jornada. Você não precisa saber nada para começar.',
          duration: 300,
          objectives: [
            'Conhecer a plataforma e a jornada',
            'Entender a metodologia do curso',
            'Começar sem medo',
          ],
          body: '> **A ideia mais importante deste curso:** você **não precisa saber programar** para começar a aprender programação. Ninguém nasce sabendo — todo mundo começou do zero.\n\n## Sua jornada começa aqui\n\nAprender a programar é como aprender um caminho novo. Você vai passar por estas etapas — várias vezes:\n\n```\n   VOCÊ ESTÁ AQUI\n        │\n     Aprender  ──►  Praticar  ──►  Errar\n        ▲                            │\n        └──────  Tentar de novo  ◄───┘\n                     │\n                 Construir  ──►  Publicar  ──►  Evoluir\n```\n\n> **Errar faz parte.** Cada erro é uma pista que te aproxima da solução. Programadores experientes erram o dia inteiro — a diferença é que aprenderam a gostar de investigar.\n\n## O que você vai desenvolver\n\nNeste curso você **não** vai decorar fórmulas. Você vai treinar 4 habilidades:\n\n- **Observar** um problema com calma\n- **Dividir** ele em partes menores\n- **Criar** uma solução passo a passo\n- **Testar e corrigir** até funcionar\n\n## Pratique\n\nPare 1 minuto e responda para você mesmo:\n\n> **Por que você decidiu aprender programação?**\n\nNão existe resposta certa. Guarde essa motivação — ela vai te ajudar nos dias difíceis.\n\n## Resumo\n\nProgramação é uma **habilidade que se desenvolve com prática**, como dirigir ou cozinhar. Comece devagar, sem pressa e sem medo.',
          exercises: [],
        },
        {
          slug: 'o-que-e-programacao',
          title: 'O que é programação?',
          summary:
            'Programar é dar instruções para resolver um problema — e tudo começa pensando na solução.',
          duration: 360,
          objectives: [
            'Compreender programação como criação de instruções',
            'Reconhecer algoritmos no dia a dia',
          ],
          body: '> **Em uma frase:** programar é escrever **instruções** que um computador consegue seguir para resolver um problema.\n\n## Antes do código vem o pensamento\n\nO computador é rápido, mas não é esperto: ele faz **exatamente** o que você mandar, na ordem que você mandar. Por isso o passo mais importante não é digitar — é **pensar na solução**.\n\n## Você já cria algoritmos todo dia\n\nUm [algoritmo](libras:algoritmo) é só uma sequência de passos para chegar a um resultado. Fazer um café é um algoritmo:\n\n```\n    ☕ FAZER UM CAFÉ\n   ─────────────────\n   1. Pegar a xícara\n   2. Colocar o café\n   3. Aquecer a água\n   4. Colocar a água\n   5. Misturar\n   ─────────────────\n        ▼\n     Café pronto\n```\n\n## Do problema ao resultado\n\nTodo programa segue este caminho:\n\n```\n  PROBLEMA  ─►  PASSOS  ─►  INSTRUÇÕES  ─►  RESULTADO\n```\n\n## Pratique\n\nEscreva **pelo menos 5 passos** para *preparar-se para sair de casa*.\n\n> **Teste o seu algoritmo:** se outra pessoa seguir **exatamente** os seus passos, ela consegue realizar a tarefa? Se ficar confuso, falta um passo.\n\n## Resumo\n\nUma sequência organizada de instruções é um **algoritmo** — e é a base de toda programação.',
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
                  text: 'Digitar muito rápido no teclado',
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
            'Ideia, algoritmo e código são coisas diferentes — o código é a forma final da solução.',
          duration: 360,
          objectives: ['Diferenciar ideia, algoritmo e código'],
          body: '> **Cuidado com uma confusão comum:** código **não** é a mesma coisa que a ideia. O código é só o último passo.\n\n## Os três degraus\n\n```\n  💡 IDEIA        "quero mostrar uma mensagem"\n      │\n  📋 ALGORITMO    "escrever a mensagem na tela"\n      │\n  💻 CÓDIGO       console.log("Olá!")\n      │\n  🖥️ COMPUTADOR   mostra:  Olá!\n```\n\n## Vendo na prática\n\nA mesma ideia, descendo os degraus:\n\n- **Ideia:** quero cumprimentar quem abrir meu programa.\n- **Algoritmo:** escrever a frase "Olá!" na tela.\n- **Código:**\n\n```javascript\nconsole.log("Olá!");\n```\n\n> **Dica:** `console.log(...)` é o jeito do JavaScript de "escrever na tela" para o programador ver. Você vai usar muito isso.\n\n## Resumo\n\nPrimeiro a **ideia**, depois o **algoritmo** (os passos) e só então o **código**. Pular direto para o código é o que mais trava quem está começando.',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'Qual é a ordem correta ao resolver um problema?',
              explanation: 'Primeiro a ideia, depois o algoritmo (os passos) e por fim o código.',
              options: [
                {
                  text: 'Ideia → Algoritmo → Código',
                  correct: true,
                },
                {
                  text: 'Código → Ideia → Algoritmo',
                  correct: false,
                },
                {
                  text: 'Código → Algoritmo → Ideia',
                  correct: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'o-que-faz-uma-pessoa-desenvolvedora',
          title: 'O que faz uma pessoa desenvolvedora?',
          summary:
            'Desmistificando a profissão: desenvolver é resolver problemas, não só digitar código.',
          duration: 360,
          objectives: ['Entender o ciclo de trabalho de quem desenvolve software'],
          body: '> **Mito:** "programador passa o dia inteiro digitando código sem parar." **Realidade:** a maior parte do tempo é pensando, lendo e testando.\n\n## O ciclo do desenvolvimento\n\n```\n  Entender o problema\n        ▼\n     Planejar\n        ▼\n     Programar\n        ▼\n      Testar  ──►  Achou erro?  ──►  Corrigir\n        ▼               ▲                │\n     Melhorar           └────────────────┘\n        ▼\n     Entregar\n```\n\n## Um dia de quem desenvolve\n\nNo dia a dia, uma pessoa desenvolvedora:\n\n- **conversa** com outras pessoas para entender o problema\n- **pesquisa** e consulta documentação (ninguém decora tudo!)\n- **lê** código que já existe\n- **testa** e **corrige** o que quebrou\n- **aprende** algo novo o tempo todo\n\n> **Curiosidade:** grande parte do trabalho é *ler* código, não escrever. Saber ler é tão importante quanto saber escrever.\n\n## Pratique\n\nQual dessas partes da profissão parece **mais interessante** para você? Não há resposta errada.\n\n## Resumo\n\nDesenvolver é, acima de tudo, **resolver problemas**. Programar é apenas uma das etapas.',
          exercises: [],
        },
        {
          slug: 'areas-da-tecnologia',
          title: 'Áreas da tecnologia',
          summary: 'Um mapa das possibilidades — sem precisar escolher uma carreira agora.',
          duration: 420,
          objectives: ['Reconhecer as principais áreas da tecnologia'],
          body: '> **Relaxa:** você **não** precisa escolher uma área agora. Este é só um mapa para você saber que existem muitos caminhos.\n\n## O mapa das áreas\n\n| Área | O que faz |\n| --- | --- |\n| **Frontend** | Cria a interface que a pessoa usa (telas, botões) |\n| **Backend** | Cuida da lógica e dos serviços por trás da tela |\n| **Full Stack** | Atua no frontend **e** no backend |\n| **Mobile** | Cria aplicativos para celular |\n| **Dados** | Analisa e interpreta grandes quantidades de dados |\n| **IA** | Constrói sistemas de inteligência artificial |\n| **Cloud / DevOps** | Cuida da infraestrutura e da automação |\n| **Segurança** | Protege sistemas e informações |\n\n## Uma forma de imaginar\n\n```\n      🖥️ FRONTEND            ⚙️ BACKEND\n   (o que você vê)      (o que acontece por trás)\n        │                       │\n        └──────── conversam ────┘\n                  entre si\n```\n\n## Pratique\n\nComplete a frase: *"Quero conhecer melhor a área de ______."* É só curiosidade — pode mudar quando quiser.\n\n## Resumo\n\nExistem muitos caminhos na tecnologia. Comece pela base (este curso) e escolha sua direção mais adiante.',
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
          summary: 'O método do curso: assistir não é aprender — só a prática fixa o conhecimento.',
          duration: 300,
          objectives: ['Entender o método de estudo do curso'],
          body: '> **A verdade que ninguém conta:** assistir a uma aula **não** é aprender. Aprender acontece quando você escreve, erra e conserta com as próprias mãos.\n\n## O nosso ciclo de aprendizagem\n\n```\n  AULA ─► ENTENDER ─► EXEMPLO ─► PRATICAR ─► DESAFIO ─► EXPLICAR ─► AVANÇAR\n                                    ▲                        │\n                                    └──── se travar, volta ──┘\n```\n\n## Por que "explicar" está no ciclo?\n\nSe você consegue **explicar** um conceito para outra pessoa, você realmente aprendeu. Se não consegue, ainda falta algo — e tudo bem, é só voltar.\n\n> **Dica de ouro:** depois de cada aula, tente explicar o assunto em voz alta (ou em Libras) como se estivesse ensinando alguém. É o melhor teste que existe.\n\n## Pratique\n\nExplique, com suas palavras, para uma pessoa próxima: **o que é programação?**\n\n## Resumo\n\nEste curso é feito para **praticar**, não só assistir. Reserve tempo para escrever e testar.',
          exercises: [],
        },
        {
          slug: 'seu-primeiro-objetivo',
          title: 'Seu primeiro objetivo',
          summary: 'Um compromisso pessoal simples — o começo do seu perfil de aprendizagem.',
          duration: 300,
          objectives: ['Definir um objetivo pessoal de aprendizagem'],
          body: '> **Quem tem um objetivo claro desiste menos.** Vamos criar o seu agora.\n\n## Preencha o seu mapa\n\nResponda com calma — pode anotar no papel ou no celular:\n\n```\n  Meu nome: ______________________________\n\n  Por que quero aprender tecnologia?\n  ________________________________________\n\n  O que eu gostaria de construir um dia?\n  ________________________________________\n\n  Quanto tempo consigo estudar por semana?\n  ________________________________________\n\n  O que quero conseguir fazer ao terminar?\n  ________________________________________\n```\n\n> **Guarde essas respostas.** No fim do curso vamos comparar: você vai se surpreender com o quanto avançou.\n\n## Resumo\n\nEsse é o primeiro registro do seu **perfil de aprendizagem**. Um objetivo claro é o seu combustível.',
          exercises: [],
        },
      ],
      checkpoint: {
        title: 'Checkpoint — Bem-vindo à Tecnologia',
        description: 'Responda para fixar o que você aprendeu neste módulo.',
        questions: [
          {
            prompt: 'O que é programar?',
            explanation: 'Programar é escrever instruções para resolver um problema.',
            options: [
              {
                text: 'Escrever instruções para resolver um problema',
                correct: true,
              },
              {
                text: 'Digitar rápido',
                correct: false,
              },
              {
                text: 'Consertar o hardware',
                correct: false,
              },
            ],
          },
          {
            prompt: 'O que é um algoritmo?',
            explanation: 'Uma sequência organizada de passos para chegar a um resultado.',
            options: [
              {
                text: 'Uma sequência de passos para resolver algo',
                correct: true,
              },
              {
                text: 'Um tipo de computador',
                correct: false,
              },
              {
                text: 'Uma linguagem de programação',
                correct: false,
              },
            ],
          },
          {
            prompt: 'Qual área cuida da interface que a pessoa vê?',
            explanation: 'Frontend cuida da interface.',
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
                text: 'Dados',
                correct: false,
              },
            ],
          },
        ],
      },
    },
    {
      title: 'Como o Computador Funciona',
      description:
        'Um modelo mental simples de computador, software, arquivos, internet, cliente/servidor e banco de dados.',
      lessons: [
        {
          slug: 'hardware-e-software',
          title: 'Hardware e software',
          summary: 'A diferença entre a parte física (hardware) e os programas (software).',
          duration: 300,
          objectives: ['Diferenciar hardware e software'],
          body: '> **Regra fácil:** se você consegue **tocar**, é [hardware](libras:hardware). Se são **instruções** rodando, é software.\n\n## Os dois lados do computador\n\n```\n        💻 COMPUTADOR\n     ┌───────────────────┐\n     │  HARDWARE          │  parte física (você toca)\n     │  SOFTWARE          │  programas (instruções)\n     └───────────────────┘\n```\n\n## Exemplos lado a lado\n\n| Hardware (físico) | Software (programa) |\n| --- | --- |\n| Teclado, mouse | Navegador |\n| Monitor | Sistema operacional |\n| Processador, memória | Editor de código |\n| SSD (armazenamento) | Aplicativos |\n\n## Pratique\n\nOlhe ao seu redor: aponte **3 hardwares** e **3 softwares** que você usa agora.\n\n## Resumo\n\n**[Hardware](libras:hardware)** é o corpo; **[software](libras:software)** são as instruções que dão vida a ele.',
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
          summary: 'O maestro que coordena tudo entre você e o hardware.',
          duration: 300,
          objectives: ['Entender o papel do sistema operacional'],
          body: '> **Pense num maestro:** o sistema operacional (SO) organiza tudo para os programas e o hardware trabalharem juntos, sem bagunça.\n\n## As camadas\n\n```\n   👤 VOCÊ\n      ▼\n   📱 APLICAÇÃO        (o app que você abriu)\n      ▼\n   🧭 SISTEMA OPERACIONAL   (Windows, macOS, Linux, Android, iOS)\n      ▼\n   🔌 HARDWARE         (a parte física)\n```\n\n## Exemplos de sistemas operacionais\n\n- No computador: **Windows**, **macOS**, **Linux**\n- No celular: **Android**, **iOS**\n\n> **Curiosidade:** quando você toca num app do celular, sua ação passa por várias camadas até chegar ao hardware — tudo em uma fração de segundo.\n\n## Resumo\n\nO **sistema operacional** é o intermediário entre você e a máquina.',
          exercises: [],
        },
        {
          slug: 'arquivos-e-pastas',
          title: 'Arquivos e pastas',
          summary: 'Como a informação fica guardada e organizada no computador.',
          duration: 360,
          objectives: ['Entender arquivos, pastas, extensões e caminhos'],
          body: '> **Analogia:** o computador é um armário. **Arquivos** são as folhas; **pastas** são as gavetas que organizam as folhas.\n\n## Anatomia de um arquivo\n\n```\n   script.js\n   ───────  ──\n   nome      extensão (diz o tipo do arquivo)\n```\n\n- **.html** → uma página\n- **.css** → o estilo/visual\n- **.js** → o comportamento (JavaScript)\n\n## Uma pasta de projeto\n\n```\n   meu-projeto/\n   ├── index.html\n   ├── style.css\n   └── script.js\n```\n\n## Pratique\n\nImagine a estrutura de um **projeto de portfólio**. Quais arquivos você criaria dentro da pasta?\n\n```\n   portfolio/\n   ├── ?\n   ├── ?\n   └── ?\n```\n\n## Resumo\n\n**Arquivo** guarda a informação, **pasta** organiza, **extensão** diz o tipo.',
          exercises: [],
        },
        {
          slug: 'programas-e-aplicativos',
          title: 'Programas e aplicativos',
          summary: 'Cada programa foi criado para uma função diferente.',
          duration: 300,
          objectives: ['Perceber que cada programa tem uma função'],
          body: '> **Cada ferramenta, uma função** — como numa cozinha: faca corta, panela cozinha.\n\n## Ferramentas de quem programa\n\n```\n   🧭 Chrome   ─►  navegar na internet\n   📝 VS Code  ─►  escrever código\n   🌿 Git      ─►  controlar versões do projeto\n   🎵 Spotify  ─►  ouvir música\n```\n\n> **Você vai conhecer o VS Code e o Git mais para frente** — são as ferramentas do dia a dia de quem programa.\n\n## Pratique\n\nEscolha **três aplicativos** que você usa todo dia e escreva a função de cada um.\n\n## Resumo\n\nSoftware é feito de programas — e cada programa resolve um tipo de tarefa.',
          exercises: [],
        },
        {
          slug: 'navegador',
          title: 'Navegador',
          summary: 'O programa que transforma código da web em páginas na sua tela.',
          duration: 300,
          objectives: ['Entender o papel do navegador'],
          body: '> **O navegador é um tradutor:** ele pega HTML, CSS e JavaScript e transforma tudo na página bonita que você vê.\n\n## O que o navegador faz\n\n```\n   SITE\n   ├── HTML         (estrutura)\n   ├── CSS          (visual)\n   └── JavaScript   (comportamento)\n        ▼\n     🧭 NAVEGADOR   (interpreta tudo)\n        ▼\n     🖥️ TELA        (a página pronta)\n```\n\n## Exemplos\n\nChrome, Edge, Firefox, Safari — todos fazem o mesmo trabalho básico.\n\n> **Importante para nós:** o seu primeiro site vai rodar **dentro do navegador**. Ele é o seu palco.\n\n## Resumo\n\nO navegador **interpreta** os arquivos da web e **desenha** a página na tela.',
          exercises: [],
        },
        {
          slug: 'internet',
          title: 'Internet',
          summary: 'Uma rede gigante que conecta dispositivos no mundo todo.',
          duration: 300,
          objectives: ['Criar um modelo mental básico da internet'],
          body: '> **Imagine uma rede de estradas** ligando computadores do mundo inteiro. É isso que a internet é.\n\n## O básico\n\n```\n   💻 SEU COMPUTADOR\n        ▲   │\n        │   ▼\n      🌐 INTERNET\n        ▲   │\n        │   ▼\n   🗄️ SERVIDOR  (um computador que guarda o site)\n```\n\nQuando você acessa algo, seu computador **pede** e outro computador (o servidor) **responde**.\n\n> **Por enquanto, sem complicar:** não precisamos falar de TCP/IP, DNS ou roteadores. O objetivo é só ter a imagem na cabeça.\n\n## Resumo\n\nA internet permite que dispositivos **conversem** entre si por uma rede.',
          exercises: [],
        },
        {
          slug: 'cliente-e-servidor',
          title: 'Cliente e servidor',
          summary: 'Um dos conceitos mais importantes da web: quem pede e quem responde.',
          duration: 360,
          objectives: ['Entender o modelo cliente/servidor'],
          body: '> **Pense num restaurante:** você (cliente) faz o pedido; a cozinha (servidor) prepara e entrega. A web funciona igual.\n\n## Requisição e resposta\n\n```\n   🧑 CLIENTE (navegador)\n        │  1. requisição ("me mostra a página")\n        ▼\n   🗄️ SERVIDOR\n        │  2. resposta ("aqui está")\n        ▼\n   🧑 CLIENTE  →  mostra a página\n```\n\n## Exemplo real\n\nAo digitar `exemplo.com`, o navegador **faz uma solicitação**. O servidor **processa** e **responde** com a página.\n\n## Pratique\n\nNo restaurante, quem é o **cliente** e quem é o **servidor**? E ao abrir um site?\n\n## Resumo\n\n**[Cliente](libras:cliente)** pede, **[servidor](libras:servidor)** responde. Guarde bem isso — é a base de toda a web.',
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
          summary: 'Juntando tudo: o que acontece, passo a passo, quando você abre um site.',
          duration: 420,
          objectives: ['Descrever o caminho de uma requisição web'],
          body: '> **Tudo isso acontece em menos de 1 segundo** quando você abre uma rede social. Vamos ver em câmera lenta.\n\n## A viagem de ida e volta\n\n```\n   👤 Você\n    ▼  clica / digita o endereço\n   🧭 Navegador\n    ▼\n   🌐 Internet\n    ▼\n   🗄️ Servidor\n    ▼  precisa de dados?\n   💾 Banco de dados\n    ▲  devolve os dados\n   🗄️ Servidor\n    ▲  monta a resposta\n   🌐 Internet\n    ▲\n   🧭 Navegador\n    ▲\n   🖥️ Tela  →  página pronta!\n```\n\n## Pratique\n\nExplique, com suas palavras, essa viagem quando você abre uma **rede social**.\n\n## Resumo\n\nUma página é uma **viagem de ida e volta**: pedido → servidor → (banco) → resposta → tela.',
          exercises: [],
        },
        {
          slug: 'o-que-e-banco-de-dados',
          title: 'O que é banco de dados?',
          summary: 'Onde as informações ficam guardadas e organizadas — sem SQL ainda.',
          duration: 360,
          objectives: ['Entender para que serve um banco de dados'],
          body: '> **Pense numa planilha turbinada:** o banco de dados guarda informações organizadas para o programa consultar depois.\n\n## Como os dados ficam organizados\n\n```\n   TABELA: USUÁRIOS\n   ┌────┬───────┬──────────────────┐\n   │ ID │ Nome  │ Email            │\n   ├────┼───────┼──────────────────┤\n   │ 1  │ Ana   │ ana@email...     │\n   │ 2  │ João  │ joao@email...    │\n   └────┴───────┴──────────────────┘\n```\n\nCada **linha** é um registro; cada **coluna** é um tipo de informação.\n\n## Pratique\n\nQuais informações uma **plataforma de cursos** (como esta!) precisaria guardar?\n\n> **Resposta possível:** nome, email, curso, progresso, aulas concluídas. Repare: são as mesmas coisas que você vê no seu painel.\n\n## Resumo\n\nBanco de dados serve para **armazenar e organizar** informações que o sistema usa.',
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
          title: 'Revisão do módulo',
          summary: 'Fixando os conceitos com classificação e um desafio de completar.',
          duration: 300,
          objectives: ['Revisar hardware, software, servidor e banco de dados'],
          body: '> **Hora de checar:** se você acertar a maior parte, o Módulo 1 está dominado.\n\n## Classifique cada um\n\n| Item | O que é |\n| --- | --- |\n| Chrome | Software |\n| Teclado | Hardware |\n| Windows | Sistema operacional |\n| Servidor | Computador que fornece recursos |\n| Banco de dados | Armazenamento e organização de dados |\n\n## Desafio: complete a frase\n\n```\n   Ao acessar um site, meu _______ envia uma solicitação,\n   que passa pela internet até o _______,\n   que pode consultar um _______ e devolver a resposta.\n```\n\n> **Confira mentalmente** antes de ver a resposta no exercício abaixo.\n\n## Resumo\n\nVocê já tem um **modelo mental** de como o computador e a web funcionam. É base suficiente para começar a programar.',
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
      checkpoint: {
        title: 'Checkpoint — Como o Computador Funciona',
        description: 'Responda para fixar o que você aprendeu neste módulo.',
        questions: [
          {
            prompt: 'O navegador é hardware ou software?',
            explanation: 'É um programa: software.',
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
          {
            prompt: 'Quem faz a requisição na web?',
            explanation: 'O cliente (navegador) pede; o servidor responde.',
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
          {
            prompt: 'Para que serve um banco de dados?',
            explanation: 'Armazenar e organizar informações.',
            options: [
              {
                text: 'Armazenar e organizar informações',
                correct: true,
              },
              {
                text: 'Deixar o PC mais rápido',
                correct: false,
              },
              {
                text: 'Mostrar vídeos',
                correct: false,
              },
            ],
          },
        ],
      },
    },
    {
      title: 'Lógica de Programação',
      description:
        'O coração do curso: pensar como programador com algoritmos, decisões, repetições, fluxogramas, pseudocódigo e debugging.',
      lessons: [
        {
          slug: 'o-que-e-logica',
          title: 'O que é lógica?',
          summary: 'Lógica é organizar o pensamento para resolver problemas.',
          duration: 300,
          objectives: ['Entender lógica como organização do raciocínio'],
          body: '> **Boa notícia:** você já usa lógica todos os dias. Vamos só deixá-la mais organizada.\n\n## Lógica no dia a dia\n\nPara chegar a um lugar, seu cérebro faz assim:\n\n```\n   Onde estou?  ─►  Para onde vou?  ─►  Qual caminho?\n        ─►  Qual transporte?  ─►  Cheguei?\n```\n\nIsso é raciocínio lógico: uma sequência de perguntas e decisões.\n\n> **Guarde isto:** programação começa com **problema + raciocínio**, não com código.\n\n## Resumo\n\nLógica é **organizar o pensamento** para resolver um problema, passo a passo.',
          exercises: [],
        },
        {
          slug: 'algoritmos',
          title: 'Algoritmos',
          summary: 'Sequências de passos para resolver qualquer tarefa.',
          duration: 360,
          objectives: ['Criar algoritmos simples com início, passos e resultado'],
          body: '> **Algoritmo** é só uma **receita**: uma lista de passos que leva a um resultado.\n\n## Anatomia de um algoritmo\n\n```\n   ☕ FAZER CAFÉ\n   ── início ──\n   1. Pegar a xícara\n   2. Pegar o café\n   3. Aquecer a água\n   4. Colocar o café\n   5. Adicionar a água\n   6. Misturar\n   ── fim ──\n        ▼\n   Resultado: café pronto\n```\n\nTodo bom algoritmo tem **início**, **passos** e **resultado**.\n\n## Pratique\n\nCrie o algoritmo para **escovar os dentes**. Comece pelo início e termine no resultado.\n\n> **Desafio extra:** dê seu algoritmo para outra pessoa seguir ao pé da letra. Faltou algum passo?\n\n## Resumo\n\nAlgoritmo = receita de passos, com começo, meio e fim.',
          exercises: [],
        },
        {
          slug: 'sequencia',
          title: 'Sequência',
          summary: 'A ordem dos passos muda (ou quebra) o resultado.',
          duration: 300,
          objectives: ['Perceber a importância da ordem das instruções'],
          body: '> **A ordem importa!** O computador segue seus passos exatamente na ordem escrita.\n\n## Um exemplo que todo mundo entende\n\n```\n   ❌ ERRADO             ✅ CERTO\n   1. Colocar o sapato   1. Colocar a meia\n   2. Colocar a meia     2. Colocar o sapato\n```\n\nNo primeiro caso, o resultado fica errado — a meia por cima do sapato!\n\n> **Na programação é igual:** trocar a ordem de duas linhas pode mudar completamente o que o programa faz.\n\n## Pratique\n\nColoque estes passos na ordem certa: *misturar*, *quebrar os ovos*, *bater*, *pegar a tigela*.\n\n## Resumo\n\nSequência é a **ordem** dos passos — e ela decide o resultado.',
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
          summary: 'O modelo que descreve quase todo programa.',
          duration: 360,
          objectives: ['Identificar entrada, processamento e saída'],
          body: '> **Quase tudo em programação** segue este trio: recebe algo, faz algo, devolve algo.\n\n## O modelo\n\n```\n   ENTRADA  ─►  PROCESSAMENTO  ─►  SAÍDA\n   (dados)      (transformação)     (resultado)\n```\n\n## Exemplo: uma calculadora\n\n```\n   ENTRADA:        10 + 5\n   PROCESSAMENTO:  somar\n   SAÍDA:          15\n```\n\n## Pratique\n\nIdentifique **entrada / processamento / saída** em cada caso:\n\n| Situação | Entrada | Processamento | Saída |\n| --- | --- | --- | --- |\n| Login | email e senha | conferir | entra ou erro |\n| Compra online | ? | ? | ? |\n\nComplete as linhas que faltam.\n\n## Resumo\n\nTodo programa tende a **receber (entrada)**, **transformar (processamento)** e **devolver (saída)**.',
          exercises: [],
        },
        {
          slug: 'decisoes',
          title: 'Decisões',
          summary: 'Programas escolhem caminhos com base em condições.',
          duration: 360,
          objectives: ['Entender decisões (se/senão)'],
          body: '> **Programas tomam decisões** o tempo todo — igual a você quando olha para o céu antes de sair.\n\n## No dia a dia\n\n```\n   SE estiver chovendo\n       levar guarda-chuva\n   SENÃO\n       sair normalmente\n```\n\n## Visualizando a decisão\n\n```\n            Está chovendo?\n             /          \\\n           SIM          NÃO\n            ▼            ▼\n      Guarda-chuva   Sair normal\n```\n\n> **Toda decisão tem 2 caminhos:** o que fazer quando a resposta é **sim** e quando é **não**.\n\n## Resumo\n\nDecisão = escolher um caminho com base em uma condição (**se... senão...**).',
          exercises: [],
        },
        {
          slug: 'condicoes',
          title: 'Condições',
          summary: 'Perguntas que só têm duas respostas: verdadeiro ou falso.',
          duration: 360,
          objectives: ['Entender condições como verdadeiro/falso'],
          body: '> **Condição** é uma pergunta cuja resposta é sempre **verdadeiro** ou **falso** — nunca "mais ou menos".\n\n## Exemplos de condições\n\n```\n   idade >= 18          →  verdadeiro ou falso?\n   a senha está certa?  →  verdadeiro ou falso?\n   o produto acabou?    →  verdadeiro ou falso?\n```\n\n## Verdadeiro ou falso?\n\n| Condição | Resposta |\n| --- | --- |\n| 10 é maior que 5 | verdadeiro |\n| 2 é maior que 8 | falso |\n| 7 é igual a 7 | verdadeiro |\n\n## Pratique\n\nEscreva **três condições** do seu dia a dia que só possam ser verdadeiras ou falsas.\n\n## Resumo\n\nCondições devolvem **verdadeiro/falso** e alimentam as decisões do programa.',
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
          summary: 'Quando a mesma tarefa precisa acontecer várias vezes.',
          duration: 360,
          objectives: ['Entender quando usar repetição'],
          body: '> **Preguiça inteligente:** se algo se repete, o computador faz por você. Nunca copie-e-cole a mesma coisa 100 vezes.\n\n## A ideia\n\n```\n   Repetir 5 vezes:\n       mostrar "Olá"\n```\n\nResultado:\n\n```\n   Olá\n   Olá\n   Olá\n   Olá\n   Olá\n```\n\n## Onde aparece no dia a dia\n\n- contar pessoas numa fila\n- processar todos os produtos de um carrinho\n- mostrar todos os nomes de uma lista\n- tentar de novo até dar certo\n\n## Pratique\n\nDescreva uma instrução de repetição para **mostrar os números de 1 até 10**.\n\n## Resumo\n\nRepetição = fazer a mesma tarefa **várias vezes** sem reescrever tudo.',
          exercises: [],
        },
        {
          slug: 'contadores',
          title: 'Contadores',
          summary: 'Guardar e atualizar um número enquanto o programa repete.',
          duration: 300,
          objectives: ['Entender a ideia de contador'],
          body: '> **Contador** é como um marcador de gols: começa em zero e sobe a cada acontecimento.\n\n## Como funciona\n\n```\n   contador = 0\n   a cada pessoa que entra:\n       contador = contador + 1\n```\n\nDepois de 3 pessoas, `contador` vale **3**.\n\n## Onde usamos\n\n- número de alunos numa turma\n- quantidade de tarefas concluídas\n- número de tentativas de login\n- itens no carrinho de compras\n\n> **Dica:** quase toda repetição anda de mãos dadas com um contador.\n\n## Resumo\n\nContador = um número que você **atualiza** enquanto repete algo.',
          exercises: [],
        },
        {
          slug: 'fluxogramas',
          title: 'Fluxogramas',
          summary: 'Desenhar o algoritmo para enxergar a solução.',
          duration: 360,
          objectives: ['Ler e criar fluxogramas simples'],
          body: '> **Um desenho vale mais que mil linhas:** o fluxograma mostra o caminho do programa de forma visual.\n\n## Os símbolos básicos\n\n```\n   (  )  Início / Fim\n   [  ]  Processo (uma ação)\n   < >   Decisão (uma pergunta)\n   ─►    Fluxo (para onde vai)\n```\n\n## Exemplo: verificar a idade\n\n```\n        ( Início )\n            ▼\n     [ Informar idade ]\n            ▼\n       < idade >= 18? >\n        /          \\\n      SIM           NÃO\n       ▼             ▼\n   [ Adulto ]   [ Menor de idade ]\n        \\          /\n          ▼      ▼\n          ( Fim )\n```\n\n## Pratique\n\nDesenhe um fluxograma para **fazer login** (pensa: qual é a decisão?).\n\n## Resumo\n\nFluxograma = o **mapa visual** do seu algoritmo.',
          exercises: [],
        },
        {
          slug: 'pseudocodigo',
          title: 'Pseudocódigo',
          summary: 'Escrever a solução em linguagem quase humana, antes do código real.',
          duration: 360,
          objectives: ['Escrever soluções em pseudocódigo'],
          body: '> **Ponte entre a ideia e o código:** o pseudocódigo é escrito quase como você fala, mas já com estrutura.\n\n## Exemplo\n\n```\n   INÍCIO\n     pedir a idade\n     SE idade >= 18\n         mostrar "Você é maior de idade"\n     SENÃO\n         mostrar "Você é menor de idade"\n   FIM\n```\n\n## Por que usar?\n\n- Você organiza a lógica **sem se preocupar** com regras de uma linguagem\n- Fica fácil revisar antes de programar\n- Serve para **qualquer** linguagem depois\n\n> **Dica:** pseudocódigo não tem regra fixa. O importante é ficar **claro** para um humano ler.\n\n## Resumo\n\nPseudocódigo = rascunho da solução em linguagem quase humana.',
          exercises: [],
        },
        {
          slug: 'decomposicao-de-problemas',
          title: 'Decomposição de problemas',
          summary: 'A habilidade mais valiosa: quebrar um problema grande em partes pequenas.',
          duration: 420,
          objectives: ['Quebrar um problema grande em partes menores'],
          body: '> **Não tente comer o bolo inteiro de uma vez.** Todo problema grande vira fácil quando dividido em pedaços.\n\n## Do gigante ao pequeno\n\nNão comece com *"como faço uma plataforma inteira?"*. Divida:\n\n```\n   PLATAFORMA DE CURSOS\n   ├── Cadastro\n   ├── Login\n   ├── Cursos\n   ├── Módulos\n   ├── Aulas\n   ├── Progresso\n   └── Perfil\n```\n\nE divida de novo cada parte:\n\n```\n   Cadastro\n   ├── nome\n   ├── email\n   └── senha\n```\n\n> **Curiosidade:** foi exatamente assim que **esta plataforma** foi construída — parte por parte.\n\n## Pratique\n\nQuebre o problema **"criar uma lista de tarefas"** em partes menores.\n\n> Possíveis partes: adicionar tarefa, listar tarefas, concluir tarefa, excluir tarefa.\n\n## Resumo\n\nDecompor = transformar 1 problema difícil em vários problemas fáceis.',
          exercises: [],
        },
        {
          slug: 'debugging',
          title: 'Debugging',
          summary: 'Erro faz parte. Debugging é o processo calmo de investigar e corrigir.',
          duration: 360,
          objectives: ['Entender erro como parte normal e o processo de debugging'],
          body: '> **Erro não é fracasso — é informação.** Todo programador convive com erros o dia inteiro.\n\n## Dois nomes importantes\n\n- **Bug** 🐛 → um comportamento errado ou inesperado do programa\n- **Debugging** 🔍 → o processo de investigar e corrigir o bug\n\n## O processo (como um detetive)\n\n```\n   ERRO\n    ▼\n   Observar  ─►  Reproduzir  ─►  Investigar\n    ▼\n   Criar hipótese  ─►  Testar  ─►  Corrigir  ─►  Testar de novo\n```\n\n## Pratique\n\nEste algoritmo tem um bug. Consegue encontrar?\n\n```\n   1. Abrir a porta\n   2. Entrar no carro\n   3. Colocar o cinto\n   4. Ligar o carro\n   5. Colocar a chave na ignição\n```\n\n> **Dica:** leia como se fosse um robô seguindo ao pé da letra. Onde ele trava?\n\n## Resumo\n\nDebugging é investigar com calma — não é sinal de que você é ruim, é parte do trabalho.',
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
                  text: 'Não há problema nenhum',
                  correct: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'desafio-final-logica',
          title: 'Desafio final: sistema de acesso',
          summary: 'Junte tudo: crie o algoritmo, o fluxograma e o pseudocódigo de um login.',
          duration: 600,
          objectives: ['Aplicar sequência, condição e resultado em um problema real'],
          body: '> **Chegou a hora de juntar tudo** o que você aprendeu neste módulo. Sem código ainda — só raciocínio.\n\n## O desafio\n\nCrie a solução para: **verificar se uma pessoa pode entrar em um sistema.**\n\n## Os dados de entrada\n\n```\n   email\n   senha\n```\n\n## As regras\n\n```\n   SE o email estiver correto E a senha estiver correta\n       permitir o acesso\n   SENÃO\n       mostrar uma mensagem de erro\n```\n\n## O que você deve entregar\n\n1. **Algoritmo** escrito em passos\n2. **Fluxograma** com a decisão\n3. **Pseudocódigo** da solução\n\n> **Como você será avaliado (não é sobre "ficar bonito"):** sequência, clareza, a condição certa, o resultado e — o mais importante — a sua **capacidade de explicar** a solução.\n\n## Resumo\n\nSe você consegue resolver isto em algoritmo + fluxograma + pseudocódigo, **você está pronto para escrever código de verdade** no próximo módulo.',
          exercises: [],
        },
      ],
      checkpoint: {
        title: 'Checkpoint — Lógica de Programação',
        description: 'Responda para fixar o que você aprendeu neste módulo.',
        questions: [
          {
            prompt: 'A condição "10 é maior que 5" é...',
            explanation: 'Verdadeira.',
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
          {
            prompt: 'O que uma repetição (loop) faz?',
            explanation: 'Executa o mesmo bloco várias vezes.',
            options: [
              {
                text: 'Executa o mesmo bloco várias vezes',
                correct: true,
              },
              {
                text: 'Toma uma decisão',
                correct: false,
              },
              {
                text: 'Guarda um valor',
                correct: false,
              },
            ],
          },
          {
            prompt: 'Decompor um problema é...',
            explanation: 'Quebrar um problema grande em partes menores.',
            options: [
              {
                text: 'Quebrar um problema grande em partes menores',
                correct: true,
              },
              {
                text: 'Escrever o código final',
                correct: false,
              },
              {
                text: 'Apagar o problema',
                correct: false,
              },
            ],
          },
        ],
      },
    },
    {
      title: 'Primeiro Código',
      description:
        'Escrever seus primeiros programas em JavaScript, preparar o ambiente e entender que erros fazem parte.',
      lessons: [
        {
          slug: 'o-que-e-javascript',
          title: 'O que é JavaScript?',
          summary: 'A linguagem que vamos usar — roda no navegador e dá vida às páginas.',
          duration: 300,
          objectives: ['Saber o que é JavaScript e por que vamos usá-lo'],
          body: '> **Chegou a hora de escrever [código](libras:codigo) de verdade.** A partir daqui, você programa em **JavaScript** — e vê o resultado na hora.\n\n## Por que JavaScript?\n\n| Vantagem | O que significa pra você |\n| --- | --- |\n| Roda no navegador | Não precisa instalar nada para começar |\n| Vira algo visual rápido | Da lógica ao primeiro projeto em pouco tempo |\n| Conversa com HTML e CSS | A base para criar sites (Módulos 9 e 10) |\n\n## Onde ela vive\n\n```\n   Você escreve JavaScript\n          ▼\n   O navegador executa\n          ▼\n   A página ganha vida (botões, listas, cálculos)\n```\n\n> **Dica:** aqui na plataforma você já pode rodar JavaScript no editor da própria aula. Sem configurar nada.\n\n## Resumo\n\nJavaScript é a linguagem que dá comportamento às páginas — e é onde a sua [programação](libras:programacao) começa a virar produto.',
          exercises: [],
        },
        {
          slug: 'preparando-o-ambiente',
          title: 'Preparando seu ambiente',
          summary: 'Onde e como escrever código — o essencial para começar sozinho.',
          duration: 360,
          objectives: ['Saber o mínimo necessário para programar no seu computador'],
          body: '> **Objetivo:** sair desta aula sabendo exatamente onde escrever código quando quiser sair da plataforma.\n\n## O kit mínimo\n\n```\n   📝 Editor de código   ->  VS Code (grátis)\n   🧭 Navegador          ->  você já tem\n   🟢 Node.js (opcional) ->  para rodar JS fora do navegador\n```\n\n## Dois caminhos\n\n- **Agora, aprendendo:** use o **editor embutido** de cada aula — zero instalação.\n- **Depois, nos seus projetos:** instale o VS Code (próxima aula) para trabalhar nos seus próprios arquivos.\n\n> **Sem pressa com instalação.** O importante é conseguir chegar sozinho a `console.log("Olá, mundo!")`. O resto vem no seu ritmo.\n\n## Resumo\n\nEditor + navegador já bastam para começar. Node.js entra quando você quiser rodar código fora do navegador.',
          exercises: [],
        },
        {
          slug: 'conhecendo-o-vs-code',
          title: 'Conhecendo o VS Code',
          summary: 'Uma visita guiada ao editor de código mais usado do mundo.',
          duration: 300,
          objectives: ['Reconhecer as áreas principais do VS Code'],
          body: '> O **VS Code** é gratuito e é onde a maior parte dos programadores escreve código. Vamos conhecer o essencial.\n\n## O mapa da tela\n\n```\n   ┌───────────┬───────────────────────────┐\n   │ Explorador│  Editor (você escreve aqui)│\n   │ de        │                            │\n   │ arquivos  ├───────────────────────────┤\n   │           │  Terminal (comandos)       │\n   └───────────┴───────────────────────────┘\n```\n\n- **Explorador**: os arquivos do seu projeto (à esquerda)\n- **Editor**: onde você digita o código (centro)\n- **Terminal**: onde você dá comandos (embaixo)\n\n> **Dica:** comece simples. Extensões ajudam, mas o editor puro já basta para as primeiras semanas.\n\n## Resumo\n\nVS Code é o seu espaço de trabalho: arquivos à esquerda, código no centro, terminal embaixo.',
          exercises: [],
        },
        {
          slug: 'conhecendo-o-terminal',
          title: 'Conhecendo o terminal',
          summary: 'A janela de comandos — sem medo, você vai usar poucos no começo.',
          duration: 360,
          objectives: ['Entender o que é o terminal e alguns comandos básicos'],
          body: '> **Calma com o terminal.** Parece assustador, mas no começo você usa pouquíssimos comandos.\n\n## O que é\n\nO **terminal** é uma janela onde você conversa com o computador por texto, digitando comandos.\n\n## Comandos que você verá\n\n```bash\nnode --version   # mostra a versão do Node\nls               # lista os arquivos da pasta (dir no Windows)\ncd minha-pasta   # entra em uma pasta\n```\n\n> **No começo**, quase tudo dá para fazer pelo VS Code e pelo navegador. O terminal entra aos poucos, quando você usar o Git (Módulo 12).\n\n## Resumo\n\nTerminal = dar comandos por texto. Poucos comandos já resolvem muita coisa.',
          exercises: [],
        },
        {
          slug: 'primeiro-programa',
          title: 'Seu primeiro programa',
          summary: 'O clássico "Olá, mundo!" — sua primeira linha de código de verdade.',
          duration: 360,
          objectives: ['Escrever e executar sua primeira linha de código'],
          body: '> **Momento histórico.** Quase todo programador do mundo começou escrevendo *"Olá, mundo!"*. Agora é a sua vez.\n\n## O comando estrela\n\n```javascript\nconsole.log("Olá, mundo!");\n```\n\n`console.log(...)` **mostra** algo na saída. É como o programa "fala" com você — vamos usar isso o tempo todo.\n\n## Anatomia da linha\n\n```\n   console.log(  "Olá, mundo!"  );\n   └── comando ─┘ └── texto ──┘ └ fim da instrução (;)\n```\n\n## Pratique agora\n\n```challenge\n{"id": "m3-ola", "instructions": "Faça o programa mostrar exatamente: Olá, mundo!", "starter": "console.log(\\"escreva aqui\\");", "tests": [{"description": "O código executa sem erro", "assert": "true"}]}\n```\n\n> **Experimente:** troque o texto por uma mensagem sua e rode de novo. Ver o resultado mudar é o começo de tudo.\n\n## Resumo\n\n`console.log` é a ferramenta que mais vamos usar para ver o que o código está fazendo.',
          exercises: [],
        },
        {
          slug: 'comentarios',
          title: 'Comentários',
          summary: 'Anotações no código que o computador ignora — feitas para humanos.',
          duration: 300,
          objectives: ['Escrever comentários de uma e de várias linhas'],
          body: '> Um **comentário** é um bilhete para humanos lerem. O computador **pula** essas linhas.\n\n## Como comentar\n\n```javascript\n// comentário de uma linha\nconsole.log("Oi"); // também pode vir depois do código\n\n/*\n  comentário\n  de várias linhas\n*/\n```\n\n> **Boa prática:** comente o **porquê**, não o óbvio. `// soma 1 para incluir o último item` ajuda; `// soma 1` não.\n\n## Resumo\n\n`//` comenta uma linha; `/* ... */` comenta um bloco. Comentários explicam intenção.',
          exercises: [],
        },
        {
          slug: 'erros-fazem-parte',
          title: 'Erros fazem parte',
          summary: 'Encontrar erros é normal e é parte de aprender a programar.',
          duration: 300,
          objectives: ['Encarar erros com naturalidade'],
          body: '> **Erro não é fracasso — é informação.** O computador está te dizendo onde olhar. Todo programador convive com erros o dia inteiro.\n\n## Dois tipos comuns\n\n```\n   ⚠️ Erro de sintaxe   ->  escrita errada (faltou ) ou })\n                            o programa nem roda\n\n   🐞 Erro de lógica    ->  roda, mas o resultado sai errado\n```\n\n## A mentalidade certa\n\n```\n   Deu erro  ->  respira  ->  lê a mensagem  ->  investiga  ->  corrige\n```\n\n> **Curiosidade:** quanto mais você programa, mais rápido você lê e resolve erros. É treino, não talento.\n\n## Resumo\n\nErrar faz parte. O que muda com a prática é a velocidade de encontrar e corrigir.',
          exercises: [],
        },
        {
          slug: 'como-ler-um-erro',
          title: 'Como ler uma mensagem de erro',
          summary: 'A mensagem de erro é uma pista — aprenda a lê-la sem medo.',
          duration: 360,
          objectives: ['Interpretar uma mensagem de erro simples e corrigir'],
          body: '> **A mensagem de erro é sua amiga.** Ela costuma dizer *o que* deu errado e *onde*.\n\n## Decifrando\n\n```text\nUncaught SyntaxError: Unexpected token \'}\'\n└───────┘ └────────┘  └──────────────────┘\n contexto   tipo do     o motivo (uma chave } sobrando\n            erro         ou fora do lugar)\n```\n\n- **SyntaxError** → erro de escrita (sintaxe)\n- **Unexpected token \'}\'** → tem um `}` a mais ou no lugar errado\n\n## Estratégia\n\n```\n   Leia o tipo  ->  leia o motivo  ->  vá até a linha indicada\n```\n\n## Pratique: leia o erro e conserte\n\n```challenge\n{"id": "m3-erro", "instructions": "O código tem um erro. Rode, leia a mensagem, conserte e faça aparecer 5.", "starter": "console.log(2 + 3)}", "tests": [{"description": "Mostra o resultado sem erro de sintaxe", "assert": "true"}]}\n```\n\n## Resumo\n\nLeia a mensagem com calma: tipo do erro, motivo e local. Ela quase sempre aponta o caminho.',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'O que significa um "SyntaxError"?',
              explanation:
                'SyntaxError é um erro de escrita do código — algo fora das regras da linguagem.',
              options: [
                {
                  text: 'Um erro na forma de escrever o código',
                  correct: true,
                },
                {
                  text: 'Que o computador quebrou',
                  correct: false,
                },
                {
                  text: 'Que a internet caiu',
                  correct: false,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Variáveis e Dados',
      description: 'Guardar informações em variáveis e conhecer os tipos básicos de dados.',
      lessons: [
        {
          slug: 'o-que-e-variavel',
          title: 'O que é uma variável?',
          summary: 'Uma caixa com nome que guarda um valor para você usar depois.',
          duration: 300,
          objectives: [
            'Entender o conceito de variável',
            'Reconhecer nome e valor de uma variável',
          ],
          body: '> **Variável é o coração da programação.** Uma [variável](libras:variavel) é uma **caixa com nome** onde você guarda um valor para usar depois.\n\n## A ideia visual\n\n```\n   nome  ┌──────────────┐\n   ───▶  │   "Maria"     │  ◀── valor guardado\n         └──────────────┘\n```\n\nVocê dá um **nome** à caixa e coloca um **valor** dentro. Depois, é só chamar pelo nome.\n\n## No código\n\n```javascript\nlet nome = "Maria";\nconsole.log(nome); // Maria\n```\n\n## Anatomia da linha\n\n```\n   let    nome    =    "Maria"\n   └─┬─┘  └─┬──┘  ┬    └──┬───┘\n    cria   nome  recebe  valor\n```\n\n> **Por que isso importa?** Sem variáveis o programa não teria memória. São elas que guardam o nome do usuário, a pontuação do jogo, o total da compra.\n\n## Resumo\n\nVariável = nome + valor. Você guarda um dado e o usa pelo nome quando quiser.',
          exercises: [],
        },
        {
          slug: 'let',
          title: 'A palavra let',
          summary: 'Criar variáveis cujo valor pode mudar ao longo do programa.',
          duration: 300,
          objectives: ['Declarar variáveis com let', 'Alterar o valor de uma variável'],
          body: '> Use **let** quando o valor pode **mudar** durante o programa.\n\n## Exemplo\n\n```javascript\nlet pontos = 0;\npontos = 10;   // mudou!\npontos = 25;   // mudou de novo\nconsole.log(pontos); // 25\n```\n\n## O valor ao longo do tempo\n\n| Momento | Valor de `pontos` |\n| --- | --- |\n| Ao criar | 0 |\n| Depois do 1º gol | 10 |\n| Depois do 2º gol | 25 |\n\n> **Dica:** pense no `let` como um quadro branco — você apaga e escreve outro valor quando quiser.\n\n## Pratique\n\n```challenge\n{"id": "m4-let", "instructions": "Crie uma variável chamada idade com o valor 20.", "starter": "// crie a variável aqui\\n", "tests": [{"description": "idade existe e vale 20", "assert": "typeof idade !== \'undefined\' && idade === 20"}]}\n```\n\n## Resumo\n\n`let` cria uma variável que pode ser alterada depois.',
          exercises: [],
        },
        {
          slug: 'const',
          title: 'A palavra const',
          summary: 'Criar valores fixos que não devem mudar — a escolha padrão.',
          duration: 300,
          objectives: ['Declarar constantes com const', 'Escolher entre let e const'],
          body: '> Use **const** quando o valor **não** deve mudar. É a escolha padrão.\n\n## Exemplo\n\n```javascript\nconst pi = 3.14;\nconst nomeDoApp = "SignCode";\n// pi = 4; // ❌ isto daria erro\n```\n\n## let ou const?\n\n```\n        O valor vai mudar?\n              │\n       ┌──────┴──────┐\n      sim            não\n       │              │\n      let           const   ◀── comece sempre por aqui\n```\n\n> **Boa prática:** prefira `const`. Só troque para `let` quando perceber que realmente precisa mudar o valor.\n\n## Resumo\n\n`const` = valor fixo. É a escolha segura por padrão.',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'Quando usar const?',
              explanation: 'const é para valores que não vão mudar durante o programa.',
              options: [
                {
                  text: 'Quando o valor não vai mudar',
                  correct: true,
                },
                {
                  text: 'Quando o valor vai mudar toda hora',
                  correct: false,
                },
                {
                  text: 'Só para números',
                  correct: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'strings',
          title: 'Strings (texto)',
          summary: 'Trabalhar com texto: juntar, medir e transformar.',
          duration: 330,
          objectives: ['Usar valores de texto (strings)', 'Juntar textos com +'],
          body: '> **String** é texto. Vai sempre entre aspas: `"assim"` ou `\'assim\'`.\n\n## Juntando textos\n\n```javascript\nconst saudacao = "Olá";\nconsole.log(saudacao + ", mundo!"); // Olá, mundo!\n```\n\nO `+` **concatena** (junta) textos.\n\n## Coisas úteis com string\n\n| Você quer | Como fazer | Resultado |\n| --- | --- | --- |\n| Tamanho | `"casa".length` | `4` |\n| Maiúsculas | `"oi".toUpperCase()` | `"OI"` |\n| Juntar | `"a" + "b"` | `"ab"` |\n\n## Pratique\n\n```challenge\n{"id": "m4-string", "instructions": "Guarde \\"Ana\\" em nome e \\"Silva\\" em sobrenome. Junte os dois, com um espaço no meio, em nomeCompleto.", "starter": "const nome = \\"\\";\\nconst sobrenome = \\"\\";\\nconst nomeCompleto = \\"\\";\\n", "tests": [{"description": "nomeCompleto = nome + espaço + sobrenome", "assert": "typeof nomeCompleto === \'string\' && nome.trim().length > 0 && sobrenome.trim().length > 0 && nomeCompleto === nome + \' \' + sobrenome"}]}\n```\n\n## Resumo\n\nString = texto entre aspas; `+` junta textos; `.length` diz o tamanho.',
          exercises: [],
        },
        {
          slug: 'numbers',
          title: 'Numbers (números)',
          summary: 'Números para contas — sem aspas.',
          duration: 300,
          objectives: ['Usar valores numéricos', 'Fazer contas com operadores'],
          body: '> **Number** é número — **sem aspas**. Serve para contas.\n\n## As operações\n\n```javascript\nconst preco = 10;\nconst desconto = 3;\nconsole.log(preco - desconto); // 7\nconsole.log(preco * 2);        // 20\n```\n\n| Operação | Símbolo | Exemplo | Resultado |\n| --- | --- | --- | --- |\n| Somar | `+` | `10 + 3` | `13` |\n| Subtrair | `-` | `10 - 3` | `7` |\n| Multiplicar | `*` | `10 * 3` | `30` |\n| Dividir | `/` | `10 / 2` | `5` |\n\n> **Cuidado:** número vai **sem aspas**. `"10"` (com aspas) é texto, não número — e isso muda tudo (veja a aula de conversão de tipos).\n\n## Resumo\n\nNumber = número sem aspas. Dá para somar, subtrair, multiplicar e dividir.',
          exercises: [],
        },
        {
          slug: 'boolean',
          title: 'Boolean (verdadeiro/falso)',
          summary: 'O tipo com só dois valores: true e false — a base das decisões.',
          duration: 300,
          objectives: ['Usar valores booleanos', 'Ligar booleanos a comparações'],
          body: '> **Boolean** só tem **dois** valores: `true` (verdadeiro) e `false` (falso). É a base das decisões.\n\n## Exemplo\n\n```javascript\nconst maiorDeIdade = true;\nconst chovendo = false;\n```\n\n## De onde vêm os booleanos\n\nComparações produzem booleanos — lembra do Módulo 2?\n\n```javascript\nconsole.log(10 > 5);   // true\nconsole.log(3 === 4);  // false\n```\n\n```\n   "10 é maior que 5?"  ▶  true\n   "3 é igual a 4?"     ▶  false\n```\n\n> **Conexão:** no próximo módulo, o `if` vai usar booleanos para decidir o que o programa faz.\n\n## Resumo\n\nBoolean = `true` ou `false`. Comparações geram booleanos e alimentam as decisões.',
          exercises: [],
        },
        {
          slug: 'null-e-undefined',
          title: 'null e undefined',
          summary: 'Quando um valor está vazio ou ainda não existe.',
          duration: 300,
          objectives: ['Diferenciar null e undefined'],
          body: '> Dois tipos de "vazio", com sentidos diferentes.\n\n## A diferença\n\n| Valor | Quando aparece | Ideia |\n| --- | --- | --- |\n| `undefined` | você ainda não deu um valor | "esqueci de preencher" |\n| `null` | você colocou vazio de propósito | "aqui é vazio mesmo" |\n\n## Exemplo\n\n```javascript\nlet x;          // undefined (nasce sem valor)\nlet y = null;   // null (vazio intencional)\n```\n\n```\n   let x;         ▶  undefined   (aconteceu sozinho)\n   let y = null;  ▶  null        (você decidiu)\n```\n\n> **Dica:** ver `undefined` sem querer costuma ser sinal de esquecimento — variável não preenchida ou nome digitado errado.\n\n## Resumo\n\n`undefined` acontece sozinho; `null` você coloca de propósito.',
          exercises: [],
        },
        {
          slug: 'template-strings',
          title: 'Template strings',
          summary: 'Um jeito mais limpo de montar textos com variáveis.',
          duration: 330,
          objectives: ['Montar textos com template strings'],
          body: '> Com **crase** (`` ` ``) e `${}` você monta textos com variáveis sem ficar juntando com `+`.\n\n## Antes e depois\n\n```javascript\nconst nome = "Ana";\n\n// com +  (mais trabalhoso)\nconsole.log("Olá, " + nome + "!");\n\n// com template string  (mais limpo)\nconsole.log(`Olá, ${nome}!`); // Olá, Ana!\n```\n\n## A regra\n\n```\n   `texto ${variavel} texto`\n          ▲\n      o valor entra aqui\n```\n\n> **Dica:** dentro da crase, tudo que estiver em `${...}` é calculado. Dá até para fazer conta: `Total: ${preco * 2}`.\n\n## Pratique\n\n```challenge\n{"id": "m4-template", "instructions": "Guarde seu nome em nome e monte a frase: Oi, SEU_NOME! usando template string. Guarde em frase.", "starter": "const nome = \\"\\";\\nconst frase = ``;\\n", "tests": [{"description": "frase começa com \'Oi,\' e contém o nome", "assert": "typeof frase === \'string\' && frase.startsWith(\'Oi,\') && frase.includes(nome) && nome.length > 0"}]}\n```\n\n## Resumo\n\nTemplate string usa crase e `${variavel}` — mais limpo que juntar com `+`.',
          exercises: [],
        },
        {
          slug: 'conversao-de-tipos',
          title: 'Conversão de tipos',
          summary: 'Transformar texto em número e número em texto.',
          duration: 330,
          objectives: ['Converter entre número e texto', 'Evitar o erro de somar texto'],
          body: '> Às vezes um número chega como **texto** (ex.: digitado num formulário). Dá para converter.\n\n## O problema clássico\n\n```javascript\nconsole.log("10" + 5);         // "105"  ❌ juntou texto\nconsole.log(Number("10") + 5); // 15     ✅ somou de verdade\n```\n\n## As conversões\n\n| Vira | Função | Exemplo |\n| --- | --- | --- |\n| Número | `Number(x)` | `Number("10")` → `10` |\n| Texto | `String(x)` | `String(10)` → `"10"` |\n\n```\n   "10"  ──Number()──▶   10   (agora dá para somar)\n    10   ──String()──▶  "10"  (agora dá para juntar com texto)\n```\n\n> **Cuidado:** o `+` com texto **junta**; com números, **soma**. Converta antes de fazer contas com dados que vieram como texto.\n\n## Resumo\n\n`Number(x)` vira número; `String(x)` vira texto. Converta antes de calcular.',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'Quanto dá "10" + 5 em JavaScript?',
              explanation:
                'Com texto, o + junta: "10" + 5 vira "105". Para somar, converta com Number().',
              options: [
                {
                  text: '"105"',
                  correct: true,
                },
                {
                  text: '15',
                  correct: false,
                },
                {
                  text: 'Erro',
                  correct: false,
                },
              ],
            },
          ],
        },
      ],
      miniProject: {
        title: 'Mini projeto: Perfil de usuário',
        brief:
          'Crie um pequeno programa que guarda os dados de um perfil (nome, idade, se é estudante) em variáveis e mostra um resumo no console.',
        requirements: [
          'Usar let e const',
          'Usar string, number e boolean',
          'Montar a mensagem com template string',
        ],
      },
    },
    {
      title: 'Operadores e Decisões',
      description: 'Fazer contas, comparar valores e tomar decisões no código com if/else.',
      lessons: [
        {
          slug: 'operadores-matematicos',
          title: 'Operadores matemáticos',
          summary: 'Somar, subtrair, multiplicar, dividir e o resto (%).',
          duration: 330,
          objectives: ['Usar operadores matemáticos', 'Entender o resto da divisão (%)'],
          body: '> O computador é uma **calculadora** poderosa. No seu [código](libras:codigo), você usa: `+` `-` `*` `/` e `%` (resto).\n\n## Os operadores\n\n| Operador | Faz | Exemplo | Resultado |\n| --- | --- | --- | --- |\n| `+` | soma | `10 + 3` | `13` |\n| `-` | subtrai | `10 - 3` | `7` |\n| `*` | multiplica | `10 * 3` | `30` |\n| `/` | divide | `10 / 2` | `5` |\n| `%` | resto da divisão | `10 % 3` | `1` |\n\n## O resto (%) na prática\n\n```\n   10 ÷ 3  =  3  e sobra  1\n                          ▲\n                     isso é 10 % 3\n```\n\n```javascript\nconsole.log(10 % 2); // 0  → par\nconsole.log(7 % 2);  // 1  → ímpar\n```\n\n> **Dica:** `n % 2 === 0` é o jeito clássico de perguntar "esse número é par?".\n\n## Resumo\n\n`+ - * /` fazem as contas; `%` dá o resto — ótimo para saber se um número é par.',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'Quanto dá 7 % 2?',
              explanation: '% é o resto da divisão: 7 dividido por 2 dá 3 e sobra 1.',
              options: [
                {
                  text: '1',
                  correct: true,
                },
                {
                  text: '3',
                  correct: false,
                },
                {
                  text: '3.5',
                  correct: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'comparacoes',
          title: 'Comparações',
          summary: 'Perguntar se valores são iguais, maiores ou menores.',
          duration: 330,
          objectives: ['Comparar valores', 'Diferenciar = de ==='],
          body: '> Uma comparação faz uma **pergunta** e devolve um booleano: `true` ou `false`.\n\n## Os comparadores\n\n| Pergunta | Operador | Exemplo | Resultado |\n| --- | --- | --- | --- |\n| maior? | `>` | `10 > 5` | `true` |\n| menor? | `<` | `10 < 5` | `false` |\n| maior ou igual? | `>=` | `10 >= 10` | `true` |\n| igual? | `===` | `10 === 10` | `true` |\n| diferente? | `!==` | `10 !== 5` | `true` |\n\n## Cuidado com o =\n\n```\n   =    guarda um valor   (atribuição)  ▶  let x = 5\n   ===  compara valores   (pergunta)    ▶  x === 5\n```\n\n> **Dica:** use sempre `===` e `!==`, com **três** sinais. Eles comparam com segurança.\n\n## Resumo\n\nComparações devolvem `true`/`false`. `=` guarda, `===` compara.',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'Qual operador verifica se dois valores são iguais em JavaScript?',
              explanation: 'Use === (três sinais) para comparar igualdade com segurança.',
              options: [
                {
                  text: '===',
                  correct: true,
                },
                {
                  text: '=',
                  correct: false,
                },
                {
                  text: '==>',
                  correct: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'operadores-logicos',
          title: 'Operadores lógicos',
          summary: 'Combinar condições com E (&&), OU (||) e NÃO (!).',
          duration: 330,
          objectives: ['Combinar condições com && || !'],
          body: '> Para **juntar** perguntas numa decisão: `&&` (E), `||` (OU), `!` (NÃO).\n\n## O que cada um faz\n\n- `&&` (**E**) → verdadeiro só se **os dois** lados forem verdadeiros\n- `||` (**OU**) → verdadeiro se **pelo menos um** lado for verdadeiro\n- `!` (**NÃO**) → inverte (vira o contrário)\n\n## Exemplo\n\n```javascript\nconst idade = 20;\nconst temIngresso = true;\nconsole.log(idade >= 18 && temIngresso); // true\n```\n\n## Tabela-verdade rápida\n\n```\n   true  && true   ▶ true\n   true  && false  ▶ false\n   true  || false  ▶ true\n   !true           ▶ false\n```\n\n> **Dica:** `&&` é exigente (quer tudo verdadeiro); `||` é tranquilo (um já basta).\n\n## Resumo\n\n`&&` = E, `||` = OU, `!` = NÃO — combinam perguntas em uma decisão só.',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'Quando a && b é verdadeiro?',
              explanation: '&& (E) só é verdadeiro quando os dois lados são verdadeiros.',
              options: [
                {
                  text: 'Quando os dois são verdadeiros',
                  correct: true,
                },
                {
                  text: 'Quando pelo menos um é verdadeiro',
                  correct: false,
                },
                {
                  text: 'Sempre',
                  correct: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'if',
          title: 'A decisão if',
          summary: 'Executar um código só quando uma condição é verdadeira.',
          duration: 330,
          objectives: ['Escrever um if', 'Entender como a condição é avaliada'],
          body: '> **if** = "se". O bloco entre `{ }` só roda quando a condição é **verdadeira**.\n\n## A estrutura\n\n```\n   if ( condição ) {\n       // roda só se a condição for true\n   }\n```\n\n## Exemplo\n\n```javascript\nconst idade = 20;\nif (idade >= 18) {\n  console.log("Maior de idade");\n}\n```\n\n## Como o computador lê\n\n```\n   idade >= 18 ?\n        │\n    ┌───┴───┐\n   true    false\n    │        │\n  roda     pula\n  o bloco  o bloco\n```\n\n> **Dica:** a condição sempre vira um booleano. `true` entra no bloco; `false` pula.\n\n## Pratique\n\n```challenge\n{"id": "m5-if", "instructions": "A temperatura já vale 35. Se temperatura > 30, guarde true em estaQuente.", "starter": "const temperatura = 35;\\nlet estaQuente = false;\\n// escreva o if\\n", "tests": [{"description": "estaQuente vira true quando está acima de 30", "assert": "estaQuente === true"}]}\n```\n\n## Resumo\n\n`if (condição) { ... }` roda o bloco só quando a condição é verdadeira.',
          exercises: [],
        },
        {
          slug: 'else',
          title: 'O else',
          summary: 'O outro caminho, quando a condição do if é falsa.',
          duration: 330,
          objectives: ['Usar if/else'],
          body: '> **else** = "senão". É o **outro caminho**, executado quando o `if` é falso.\n\n## A estrutura\n\n```\n   if ( condição ) {\n       // caminho A (condição verdadeira)\n   } else {\n       // caminho B (condição falsa)\n   }\n```\n\n## Exemplo\n\n```javascript\nconst idade = 15;\nif (idade >= 18) {\n  console.log("Maior");\n} else {\n  console.log("Menor");\n}\n```\n\n## Sempre um dos dois\n\n```\n   condição ?\n       │\n   ┌───┴────┐\n  true     false\n   │         │\n   if       else\n```\n\nUm dos dois blocos **sempre** roda — nunca os dois, nunca nenhum.\n\n## Pratique\n\n```challenge\n{"id": "m5-else", "instructions": "A nota já vale 7. Guarde em resultado o texto \\"Aprovado\\" se nota >= 6, senão \\"Reprovado\\".", "starter": "const nota = 7;\\nlet resultado = \\"\\";\\n// escreva o if/else\\n", "tests": [{"description": "resultado corresponde à nota", "assert": "typeof resultado === \'string\' && resultado === (nota >= 6 ? \'Aprovado\' : \'Reprovado\')"}]}\n```\n\n## Resumo\n\n`else` cobre o caso em que o `if` é falso. Sempre cai em um dos dois caminhos.',
          exercises: [],
        },
        {
          slug: 'else-if',
          title: 'O else if',
          summary: 'Testar vários casos em sequência.',
          duration: 360,
          objectives: ['Encadear condições com else if', 'Entender que a ordem importa'],
          body: '> **else if** testa um **novo caso** quando o anterior foi falso. Serve para vários caminhos.\n\n## Exemplo\n\n```javascript\nconst nota = 8;\nif (nota >= 9) {\n  console.log("Excelente");\n} else if (nota >= 6) {\n  console.log("Aprovado");\n} else {\n  console.log("Reprovado");\n}\n```\n\n## A ordem importa\n\n```\n   nota >= 9 ?  ──sim──▶ "Excelente"\n        │ não\n   nota >= 6 ?  ──sim──▶ "Aprovado"\n        │ não\n                 ──────▶ "Reprovado"\n```\n\nO computador testa **de cima para baixo** e para no primeiro que der `true`.\n\n> **Cuidado:** coloque as condições mais específicas primeiro. Se `nota >= 6` viesse antes de `nota >= 9`, o "Excelente" nunca apareceria.\n\n## Pratique\n\n```challenge\n{"id": "m5-elseif", "instructions": "A hora já vale 14. Guarde em periodo: \\"manha\\" se hora < 12, \\"tarde\\" se hora < 18, senão \\"noite\\".", "starter": "const hora = 14;\\nlet periodo = \\"\\";\\n// escreva o if / else if / else\\n", "tests": [{"description": "periodo corresponde à hora", "assert": "periodo === (hora < 12 ? \'manha\' : hora < 18 ? \'tarde\' : \'noite\')"}]}\n```\n\n## Resumo\n\n`if` → `else if` → `else`: testa os casos em ordem e para no primeiro verdadeiro.',
          exercises: [],
        },
        {
          slug: 'condicoes-compostas',
          title: 'Condições compostas',
          summary: 'Juntar várias perguntas numa decisão só.',
          duration: 330,
          objectives: ['Escrever condições compostas com && e ||'],
          body: '> Junte comparações com `&&` e `||` **dentro** do `if` para decisões mais precisas.\n\n## Exemplo\n\n```javascript\nconst idade = 20;\nconst temCarteira = true;\nif (idade >= 18 && temCarteira) {\n  console.log("Pode dirigir");\n}\n```\n\n## Como escolher\n\n- Precisa que **tudo** seja verdade? Use `&&` (E).\n  Ex.: `idade >= 18 && temCarteira`\n- Basta que **um** seja verdade? Use `||` (OU).\n  Ex.: `feriado || fimDeSemana`\n\n> **Dica:** leia em voz alta. `idade >= 18 && temCarteira` = "maior de 18 **E** tem carteira".\n\n## Resumo\n\nCondições compostas (`&&`, `||`) deixam o `if` mais preciso — exija tudo ou aceite qualquer um.',
          exercises: [],
        },
        {
          slug: 'operador-ternario',
          title: 'Operador ternário',
          summary: 'Um if/else curtinho, em uma linha, que devolve um valor.',
          duration: 330,
          objectives: ['Usar o operador ternário', 'Saber quando preferir if/else'],
          body: '> O **ternário** é um `if/else` curtinho, em uma linha, que **devolve um valor**.\n\n## A forma\n\n```\n   condição ? valorSeVerdadeiro : valorSeFalso\n```\n\n## if/else vs ternário\n\n```javascript\n// if/else\nlet status;\nif (idade >= 18) {\n  status = "Maior";\n} else {\n  status = "Menor";\n}\n\n// ternário (mesma ideia, mais curto)\nconst status = idade >= 18 ? "Maior" : "Menor";\n```\n\n> **Dica:** use o ternário para **escolher um valor**. Para rodar vários comandos, prefira o `if/else` normal — fica mais legível.\n\n## Pratique\n\n```challenge\n{"id": "m5-ternario", "instructions": "A idade já vale 20. Usando o operador ternário, guarde em status \\"Maior\\" se idade >= 18, senão \\"Menor\\".", "starter": "const idade = 20;\\n// use o ternário: idade >= 18 ? ... : ...\\nconst status = idade >= 18 ? \\"?\\" : \\"?\\";\\n", "tests": [{"description": "status corresponde à idade", "assert": "status === (idade >= 18 ? \'Maior\' : \'Menor\')"}]}\n```\n\n## Resumo\n\nTernário: `condição ? a : b`. Ótimo para escolher **um valor** com base numa condição.',
          exercises: [],
        },
      ],
      miniProject: {
        title: 'Mini projeto: Classificador de idade',
        brief:
          'A partir de uma idade, mostre se a pessoa é criança, adolescente ou adulta usando condições.',
        requirements: [
          'Usar comparações',
          'Usar if/else if/else',
          'Mostrar o resultado no console',
        ],
      },
    },
    {
      title: 'Repetições',
      description: 'Fazer o computador repetir tarefas com for e while, sem reescrever tudo.',
      lessons: [
        {
          slug: 'por-que-repetir',
          title: 'Por que repetir?',
          summary: 'Deixe o computador fazer o trabalho repetitivo por você.',
          duration: 240,
          objectives: ['Entender o valor da repetição'],
          body: '> **Preguiça inteligente:** se algo se repete, não copie e cole 100 vezes — peça ao computador para repetir.\n\n## Resumo\n\nRepetição (loop) executa o mesmo bloco várias vezes.',
          exercises: [],
        },
        {
          slug: 'for',
          title: 'O laço for',
          summary: 'Repetir um número conhecido de vezes.',
          duration: 360,
          objectives: ['Escrever um laço for'],
          body: '> O **for** é ideal quando você sabe **quantas vezes** quer repetir.\n\n## Exemplo\n\n```javascript\nfor (let i = 1; i <= 5; i++) {\n  console.log(i);\n}\n// mostra 1, 2, 3, 4, 5\n```\n\n- `let i = 1` → começa\n- `i <= 5` → condição para continuar\n- `i++` → soma 1 a cada volta\n\n## Pratique\n\n```challenge\n{"id": "m6-for", "instructions": "Use um for para mostrar os números de 1 até 10 com console.log.", "starter": "for () {\\n  \\n}\\n", "tests": [{"description": "O código executa sem erro", "assert": "true"}]}\n```\n\n## Resumo\n\n`for (início; condição; passo) { ... }` repete de forma controlada.',
          exercises: [],
        },
        {
          slug: 'while',
          title: 'O laço while',
          summary: 'Repetir enquanto uma condição for verdadeira.',
          duration: 300,
          objectives: ['Escrever um laço while'],
          body: '> O **while** repete **enquanto** a condição for verdadeira.\n\n## Exemplo\n\n```javascript\nlet contador = 1;\nwhile (contador <= 3) {\n  console.log(contador);\n  contador++;\n}\n```\n\n> **Cuidado:** se você esquecer o `contador++`, o loop nunca acaba (loop infinito)!\n\n## Resumo\n\n`while (condição) { ... }` repete até a condição virar falsa.',
          exercises: [],
        },
        {
          slug: 'contadores-js',
          title: 'Contadores',
          summary: 'Contar acontecimentos dentro de um loop.',
          duration: 240,
          objectives: ['Usar contadores em loops'],
          body: '> Um **contador** guarda quantas vezes algo aconteceu.\n\n## Exemplo\n\n```javascript\nlet pares = 0;\nfor (let i = 1; i <= 10; i++) {\n  if (i % 2 === 0) pares++;\n}\nconsole.log(pares); // 5\n```\n\n## Resumo\n\nContador começa em 0 e sobe dentro do loop.',
          exercises: [],
        },
        {
          slug: 'acumuladores',
          title: 'Acumuladores',
          summary: 'Somar valores ao longo de um loop.',
          duration: 300,
          objectives: ['Usar acumuladores'],
          body: '> Um **acumulador** vai somando valores a cada volta.\n\n## Exemplo\n\n```javascript\nlet soma = 0;\nfor (let i = 1; i <= 5; i++) {\n  soma = soma + i;\n}\nconsole.log(soma); // 15\n```\n\n## Resumo\n\nAcumulador guarda um total que cresce dentro do loop.',
          exercises: [],
        },
        {
          slug: 'interrompendo-um-loop',
          title: 'Interrompendo um loop',
          summary: 'Parar mais cedo com break.',
          duration: 240,
          objectives: ['Usar break para interromper'],
          body: '> **break** para o loop imediatamente.\n\n## Exemplo\n\n```javascript\nfor (let i = 1; i <= 10; i++) {\n  if (i === 4) break;\n  console.log(i); // 1, 2, 3\n}\n```\n\n## Resumo\n\n`break` sai do loop antes da hora quando algo é encontrado.',
          exercises: [],
        },
        {
          slug: 'evitando-loops-infinitos',
          title: 'Evitando loops infinitos',
          summary: 'Todo loop precisa de um jeito de terminar.',
          duration: 240,
          objectives: ['Reconhecer e evitar loops infinitos'],
          body: '> **Loop infinito** trava o programa. Todo loop precisa **chegar ao fim**.\n\n## O erro clássico\n\n```javascript\nlet i = 0;\nwhile (i < 5) {\n  console.log(i);\n  // esqueceu o i++  ->  nunca termina!\n}\n```\n\n> **Dica:** nosso executor tem um limite de tempo e avisa "Tempo excedido" se isso acontecer.\n\n## Resumo\n\nGaranta que a condição do loop um dia vire falsa.',
          exercises: [],
        },
      ],
      miniProject: {
        title: 'Mini projeto: Tabuada',
        brief: 'Mostre a tabuada de um número (de 1 a 10) usando um loop.',
        requirements: ['Usar um laço for', 'Usar um número base', 'Mostrar 10 linhas de resultado'],
      },
    },
    {
      title: 'Funções',
      description: 'Empacotar código em funções reutilizáveis com parâmetros e retorno.',
      lessons: [
        {
          slug: 'o-problema-do-codigo-repetido',
          title: 'O problema do código repetido',
          summary: 'Quando você copia o mesmo código, é hora de criar uma função.',
          duration: 240,
          objectives: ['Reconhecer a necessidade de funções'],
          body: '> Copiar e colar o mesmo código em vários lugares é sinal de que falta uma **função**.\n\n## Resumo\n\nFunção = um bloco de código com nome, que você reutiliza quantas vezes quiser.',
          exercises: [],
        },
        {
          slug: 'criando-uma-funcao',
          title: 'Criando uma função',
          summary: 'Dando um nome a um bloco de código.',
          duration: 300,
          objectives: ['Criar e chamar uma função'],
          body: '> Uma **função** guarda instruções sob um nome. Você a "chama" quando precisa.\n\n## Exemplo\n\n```javascript\nfunction saudacao() {\n  console.log("Olá!");\n}\nsaudacao(); // Olá!\nsaudacao(); // Olá!\n```\n\n## Resumo\n\n`function nome() { ... }` cria; `nome()` executa.',
          exercises: [],
        },
        {
          slug: 'parametros',
          title: 'Parâmetros',
          summary: 'Passar informações para a função trabalhar.',
          duration: 300,
          objectives: ['Usar parâmetros'],
          body: '> **Parâmetros** são valores que você entrega para a função usar.\n\n## Exemplo\n\n```javascript\nfunction saudacao(nome) {\n  console.log(`Olá, ${nome}!`);\n}\nsaudacao("Ana"); // Olá, Ana!\n```\n\n## Resumo\n\nParâmetros deixam a mesma função servir para vários casos.',
          exercises: [],
        },
        {
          slug: 'retorno',
          title: 'Retorno',
          summary: 'Fazer a função devolver um resultado.',
          duration: 360,
          objectives: ['Usar return'],
          body: '> **return** faz a função **devolver** um valor para quem a chamou.\n\n## Exemplo\n\n```javascript\nfunction soma(a, b) {\n  return a + b;\n}\nconst total = soma(2, 3);\nconsole.log(total); // 5\n```\n\n## Pratique\n\n```challenge\n{"id": "m7-retorno", "instructions": "Crie a função dobro(n) que retorna o número multiplicado por 2.", "starter": "function dobro(n) {\\n  // escreva sua solução aqui\\n}\\n", "tests": [{"description": "dobro é uma função", "assert": "typeof dobro === \'function\'"}, {"description": "dobro(5) retorna 10", "assert": "dobro(5) === 10"}, {"description": "dobro(0) retorna 0", "assert": "dobro(0) === 0"}]}\n```\n\n## Resumo\n\n`return` entrega o resultado; sem ele, a função devolve `undefined`.',
          exercises: [],
        },
        {
          slug: 'funcoes-e-responsabilidades',
          title: 'Funções e responsabilidades',
          summary: 'Cada função deve fazer bem uma coisa só.',
          duration: 240,
          objectives: ['Entender responsabilidade única'],
          body: '> **Uma função, uma tarefa.** Funções pequenas e com nome claro são mais fáceis de entender e testar.\n\n## Resumo\n\nSe o nome da função tem "e" (ex.: salvarEenviar), talvez sejam duas funções.',
          exercises: [],
        },
        {
          slug: 'arrow-functions',
          title: 'Arrow functions',
          summary: 'Uma forma mais curta de escrever funções.',
          duration: 300,
          objectives: ['Ler e escrever arrow functions'],
          body: '> **Arrow function** é uma forma curta de escrever funções, muito comum em JavaScript.\n\n## Exemplo\n\n```javascript\nconst soma = (a, b) => a + b;\nconsole.log(soma(2, 3)); // 5\n```\n\n## Resumo\n\n`(params) => resultado` é equivalente a uma função normal, mais enxuta.',
          exercises: [],
        },
        {
          slug: 'boas-praticas-funcoes',
          title: 'Boas práticas',
          summary: 'Nomes claros e funções curtas.',
          duration: 240,
          objectives: ['Aplicar boas práticas em funções'],
          body: '> Bons hábitos: **nomes que dizem o que a função faz** e funções **curtas**.\n\n## Exemplos de nomes\n\n- `calcularTotal` ✔\n- `fazerCoisa` ✘\n\n## Resumo\n\nCódigo é lido muito mais do que escrito — nomes claros ajudam todo mundo (inclusive você no futuro).',
          exercises: [],
        },
      ],
      miniProject: {
        title: 'Mini projeto: Calculadora',
        brief: 'Crie funções para somar, subtrair, multiplicar e dividir, e teste cada uma.',
        requirements: ['Criar 4 funções com parâmetros', 'Usar return', 'Testar com console.log'],
      },
    },
    {
      title: 'Arrays e Objetos',
      description: 'Guardar listas e informações estruturadas com arrays e objetos.',
      lessons: [
        {
          slug: 'o-que-e-colecao',
          title: 'O que é uma coleção?',
          summary: 'Quando você precisa guardar vários valores juntos.',
          duration: 240,
          objectives: ['Entender a ideia de coleção'],
          body: '> Até agora cada variável guardava **um** valor. E se precisarmos de uma **lista**? Para isso existem arrays e objetos.\n\n## Resumo\n\nColeção = vários valores organizados juntos.',
          exercises: [],
        },
        {
          slug: 'arrays',
          title: 'Arrays (listas)',
          summary: 'Uma lista ordenada de valores.',
          duration: 300,
          objectives: ['Criar e ler arrays'],
          body: '> **Array** é uma lista, entre colchetes `[ ]`.\n\n## Exemplo\n\n```javascript\nconst frutas = ["maçã", "banana", "laranja"];\nconsole.log(frutas.length); // 3\n```\n\n## Resumo\n\nArray guarda vários valores em ordem; `.length` diz quantos são.',
          exercises: [],
        },
        {
          slug: 'indices',
          title: 'Índices',
          summary: 'Acessar um item pela sua posição.',
          duration: 300,
          objectives: ['Acessar itens por índice'],
          body: '> Cada item tem uma **posição (índice)** — e ela começa no **0**.\n\n## Exemplo\n\n```javascript\nconst frutas = ["maçã", "banana", "laranja"];\nconsole.log(frutas[0]); // maçã\nconsole.log(frutas[1]); // banana\n```\n\n## Resumo\n\nO primeiro item é o índice `0`, não `1`.',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'Qual índice acessa o PRIMEIRO item de um array?',
              explanation: 'Arrays começam no índice 0 — o primeiro item é lista[0].',
              options: [
                {
                  text: '0',
                  correct: true,
                },
                {
                  text: '1',
                  correct: false,
                },
                {
                  text: '-1',
                  correct: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'adicionando-removendo',
          title: 'Adicionando e removendo',
          summary: 'Colocar e tirar itens da lista.',
          duration: 300,
          objectives: ['Adicionar e remover itens'],
          body: '> `push` adiciona no fim; `pop` remove do fim.\n\n## Exemplo\n\n```javascript\nconst lista = ["a", "b"];\nlista.push("c"); // ["a","b","c"]\nlista.pop();     // ["a","b"]\n```\n\n## Resumo\n\n`push` (adiciona) e `pop` (remove) mexem no fim da lista.',
          exercises: [],
        },
        {
          slug: 'percorrendo-arrays',
          title: 'Percorrendo arrays',
          summary: 'Passar por todos os itens de uma lista.',
          duration: 360,
          objectives: ['Percorrer arrays com loop'],
          body: '> Para visitar cada item, use um loop (ou `for...of`).\n\n## Exemplo\n\n```javascript\nconst nomes = ["Ana", "Bia", "Caio"];\nfor (const nome of nomes) {\n  console.log(nome);\n}\n```\n\n## Pratique\n\n```challenge\n{"id": "m8-soma", "instructions": "Crie a função somaTudo(numeros) que recebe um array e retorna a soma de todos.", "starter": "function somaTudo(numeros) {\\n  // dica: use um acumulador e um for...of\\n}\\n", "tests": [{"description": "somaTudo é uma função", "assert": "typeof somaTudo === \'function\'"}, {"description": "somaTudo([1,2,3]) retorna 6", "assert": "somaTudo([1,2,3]) === 6"}, {"description": "somaTudo([]) retorna 0", "assert": "somaTudo([]) === 0"}]}\n```\n\n## Resumo\n\n`for...of` visita cada item do array, um por um.',
          exercises: [],
        },
        {
          slug: 'objetos',
          title: 'Objetos',
          summary: 'Guardar informações com nome (chave e valor).',
          duration: 300,
          objectives: ['Criar e ler objetos'],
          body: '> **Objeto** guarda pares **chave: valor**, entre chaves `{ }`.\n\n## Exemplo\n\n```javascript\nconst pessoa = { nome: "Maria", idade: 24 };\nconsole.log(pessoa.nome);  // Maria\nconsole.log(pessoa.idade); // 24\n```\n\n## Resumo\n\nObjeto = informação com nome; acesse com `objeto.chave`.',
          exercises: [],
        },
        {
          slug: 'array-de-objetos',
          title: 'Array de objetos',
          summary: 'Uma lista de itens estruturados.',
          duration: 300,
          objectives: ['Combinar arrays e objetos'],
          body: '> Muito comum: uma **lista de objetos** (ex.: lista de alunos).\n\n## Exemplo\n\n```javascript\nconst alunos = [\n  { nome: "Ana", nota: 8 },\n  { nome: "Bia", nota: 6 }\n];\nconsole.log(alunos[0].nome); // Ana\n```\n\n## Resumo\n\nArray de objetos é como uma tabela: cada objeto é uma linha.',
          exercises: [],
        },
        {
          slug: 'manipulacao-de-dados',
          title: 'Manipulação de dados',
          summary: 'Filtrar e transformar listas (introdução).',
          duration: 300,
          objectives: ['Ter um primeiro contato com filter/map'],
          body: '> Dá para **filtrar** e **transformar** listas com poucas linhas.\n\n## Exemplo\n\n```javascript\nconst numeros = [1, 2, 3, 4];\nconst pares = numeros.filter(n => n % 2 === 0);\nconsole.log(pares); // [2, 4]\n```\n\n> Isto é um aperitivo — vamos aprofundar em cursos futuros.\n\n## Resumo\n\n`filter` seleciona itens; `map` transforma itens (você verá mais adiante).',
          exercises: [],
        },
      ],
      miniProject: {
        title: 'Mini projeto: Lista de alunos',
        brief: 'Guarde uma lista de alunos (nome, idade, curso) e mostre todos, um por linha.',
        requirements: [
          'Usar um array de objetos',
          'Percorrer com for...of',
          'Mostrar cada aluno formatado',
        ],
      },
    },
    {
      title: 'HTML + CSS',
      description: 'Ver o código virar página: estrutura com HTML e visual com CSS.',
      lessons: [
        {
          slug: 'o-que-e-html',
          title: 'O que é HTML?',
          summary: 'A linguagem que dá estrutura às páginas web.',
          duration: 300,
          objectives: ['Entender o papel do HTML'],
          body: '> **HTML** é o esqueleto da página: títulos, parágrafos, imagens, links. Ele estrutura o conteúdo.\n\n## Exemplo\n\n```html\n<h1>Meu site</h1>\n<p>Olá, esta é minha primeira página.</p>\n```\n\n## Resumo\n\nHTML define **o que** aparece na página (a estrutura).',
          exercises: [],
        },
        {
          slug: 'estrutura-de-uma-pagina',
          title: 'Estrutura de uma página',
          summary: 'O esqueleto básico de um documento HTML.',
          duration: 300,
          objectives: ['Conhecer a estrutura base do HTML'],
          body: '> Toda página tem um esqueleto padrão.\n\n## Exemplo\n\n```html\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>Meu site</title>\n  </head>\n  <body>\n    <h1>Olá!</h1>\n  </body>\n</html>\n```\n\n- `head` → informações da página\n- `body` → o que aparece na tela\n\n## Resumo\n\n`head` (bastidores) e `body` (conteúdo visível) formam a base.',
          exercises: [],
        },
        {
          slug: 'tags-titulos-paragrafos',
          title: 'Tags, títulos e parágrafos',
          summary: 'Os blocos de texto mais comuns.',
          duration: 300,
          objectives: ['Usar tags de texto'],
          body: '> **Tag** é um comando entre `< >`. A maioria abre e fecha: `<p>texto</p>`.\n\n## Exemplo\n\n```html\n<h1>Título principal</h1>\n<h2>Subtítulo</h2>\n<p>Um parágrafo de texto.</p>\n```\n\n## Resumo\n\n`h1`..`h6` são títulos; `p` é parágrafo.',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'Qual tag cria um parágrafo em HTML?',
              explanation: 'A tag <p> cria um parágrafo.',
              options: [
                {
                  text: '<p>',
                  correct: true,
                },
                {
                  text: '<par>',
                  correct: false,
                },
                {
                  text: '<text>',
                  correct: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'links-e-imagens',
          title: 'Links e imagens',
          summary: 'Conectar páginas e mostrar imagens.',
          duration: 300,
          objectives: ['Inserir links e imagens'],
          body: '> Links levam a outras páginas; imagens aparecem na tela.\n\n## Exemplo\n\n```html\n<a href="https://exemplo.com">Visite o site</a>\n<img src="foto.jpg" alt="Descrição da foto" />\n```\n\n> **Acessibilidade:** o `alt` da imagem descreve o conteúdo — importante para leitores de tela.\n\n## Resumo\n\n`<a>` cria link; `<img>` mostra imagem (sempre com `alt`).',
          exercises: [],
        },
        {
          slug: 'listas',
          title: 'Listas',
          summary: 'Organizar itens em listas.',
          duration: 240,
          objectives: ['Criar listas em HTML'],
          body: '> Listas organizam itens.\n\n## Exemplo\n\n```html\n<ul>\n  <li>Maçã</li>\n  <li>Banana</li>\n</ul>\n```\n\n`ul` = lista sem ordem; `ol` = lista numerada.\n\n## Resumo\n\n`ul`/`ol` agrupam itens `li`.',
          exercises: [],
        },
        {
          slug: 'formularios',
          title: 'Formulários',
          summary: 'Campos para o usuário digitar informações.',
          duration: 300,
          objectives: ['Criar formulários básicos'],
          body: '> **Formulários** coletam dados do usuário (nome, email, senha...).\n\n## Exemplo\n\n```html\n<form>\n  <label>Nome: <input type="text" /></label>\n  <button>Enviar</button>\n</form>\n```\n\n## Resumo\n\n`form`, `label`, `input` e `button` formam a base de qualquer formulário.',
          exercises: [],
        },
        {
          slug: 'semantica',
          title: 'Semântica',
          summary: 'Usar tags que dão significado ao conteúdo.',
          duration: 240,
          objectives: ['Entender HTML semântico'],
          body: '> **HTML semântico** usa tags com significado (`header`, `main`, `footer`) em vez de só `div`. Isso ajuda muito a **acessibilidade**.\n\n## Exemplo\n\n```html\n<header>Topo</header>\n<main>Conteúdo principal</main>\n<footer>Rodapé</footer>\n```\n\n## Resumo\n\nTags semânticas ajudam leitores de tela e a organização do código.',
          exercises: [],
        },
        {
          slug: 'o-que-e-css',
          title: 'O que é CSS?',
          summary: 'A linguagem que dá estilo e visual às páginas.',
          duration: 300,
          objectives: ['Entender o papel do CSS'],
          body: '> Se o HTML é o esqueleto, o **CSS** é a roupa: cores, tamanhos, espaçamentos, layout.\n\n## Exemplo\n\n```css\nh1 {\n  color: teal;\n  font-size: 32px;\n}\n```\n\n## Resumo\n\nCSS define **como** a página aparece (o visual).',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'Para que serve o CSS?',
              explanation: 'O CSS cuida do visual: cores, tamanhos, espaçamento e layout.',
              options: [
                {
                  text: 'Estilizar o visual da página',
                  correct: true,
                },
                {
                  text: 'Guardar dados',
                  correct: false,
                },
                {
                  text: 'Criar a lógica do programa',
                  correct: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'seletores-e-cores',
          title: 'Seletores e cores',
          summary: 'Escolher elementos e pintar a página.',
          duration: 300,
          objectives: ['Usar seletores e cores'],
          body: '> **Seletor** diz *qual* elemento estilizar; a **propriedade** diz *o que* mudar.\n\n## Exemplo\n\n```css\np { color: #333; }\n.destaque { background: yellow; }\n```\n\n- `p` → todos os parágrafos\n- `.destaque` → elementos com `class="destaque"`\n\n## Resumo\n\nSeletores miram elementos; propriedades definem o estilo.',
          exercises: [],
        },
        {
          slug: 'box-model',
          title: 'Box model',
          summary: 'Todo elemento é uma caixa com margem, borda e espaçamento.',
          duration: 300,
          objectives: ['Entender o box model'],
          body: '> No CSS, **todo elemento é uma caixa**: conteúdo, `padding` (espaço interno), `border` e `margin` (espaço externo).\n\n## Visual\n\n```\n   margin\n   ┌───────────────┐\n   │   border      │\n   │  ┌─────────┐  │\n   │  │ padding │  │\n   │  │ [texto] │  │\n   │  └─────────┘  │\n   └───────────────┘\n```\n\n## Resumo\n\n`padding` = dentro; `margin` = fora; `border` = a linha entre eles.',
          exercises: [],
        },
        {
          slug: 'flexbox-e-layout',
          title: 'Flexbox e layout',
          summary: 'Alinhar elementos na tela com facilidade.',
          duration: 360,
          objectives: ['Ter um primeiro contato com Flexbox'],
          body: '> **Flexbox** alinha e distribui elementos em linha ou coluna — a base de layouts modernos.\n\n## Exemplo\n\n```css\n.container {\n  display: flex;\n  gap: 16px;\n  justify-content: center;\n}\n```\n\n## Resumo\n\n`display: flex` organiza os filhos; `gap` dá espaço entre eles.',
          exercises: [],
        },
        {
          slug: 'responsividade-e-acessibilidade-visual',
          title: 'Responsividade e acessibilidade visual',
          summary: 'A página funciona bem em qualquer tela e para todos.',
          duration: 300,
          objectives: ['Entender responsividade e contraste'],
          body: '> **Responsivo** = se adapta ao tamanho da tela (celular, tablet, computador). E o visual deve ter **bom contraste** para todos lerem.\n\n## Exemplo\n\n```css\n@media (max-width: 600px) {\n  .menu { flex-direction: column; }\n}\n```\n\n## Resumo\n\nPense em telas pequenas e em contraste desde o início — acessibilidade é visual também.',
          exercises: [],
        },
      ],
      miniProject: {
        title: 'Mini projeto: Página pessoal',
        brief:
          'Monte uma página de apresentação com nome, sobre, tecnologias e contato, estilizada com CSS.',
        requirements: [
          'HTML semântico (header/main/footer)',
          'Estilo com CSS',
          'Funcionar bem no celular',
        ],
      },
    },
    {
      title: 'JavaScript no Navegador',
      description:
        'Fazer a página reagir: selecionar elementos, ouvir eventos e mudar o conteúdo (DOM).',
      lessons: [
        {
          slug: 'dom',
          title: 'O que é o DOM?',
          summary: 'A ponte entre o JavaScript e a página HTML.',
          duration: 300,
          objectives: ['Entender o que é o DOM'],
          body: '> O **DOM** é a representação da página que o JavaScript consegue ler e modificar. É a ponte entre o código e o que aparece na tela.\n\n## Resumo\n\nCom o DOM, o JavaScript pode **mudar a página** enquanto ela está aberta.',
          exercises: [],
        },
        {
          slug: 'selecionando-elementos',
          title: 'Selecionando elementos',
          summary: 'Encontrar um elemento da página pelo código.',
          duration: 300,
          objectives: ['Selecionar elementos do DOM'],
          body: '> Para mexer num elemento, primeiro você o **seleciona**.\n\n## Exemplo\n\n```javascript\nconst titulo = document.querySelector("h1");\nconsole.log(titulo.textContent);\n```\n\n## Resumo\n\n`document.querySelector("seletor")` encontra um elemento pela regra do CSS.',
          exercises: [],
        },
        {
          slug: 'eventos',
          title: 'Eventos',
          summary: 'Reagir a ações do usuário, como um clique.',
          duration: 360,
          objectives: ['Entender eventos'],
          body: '> **Evento** é algo que acontece na página (um clique, uma tecla). O JavaScript pode **reagir** a ele.\n\n## Exemplo\n\n```javascript\nconst botao = document.querySelector("button");\nbotao.addEventListener("click", () => {\n  console.log("Clicou!");\n});\n```\n\n## Resumo\n\n`addEventListener("click", função)` executa a função quando o evento ocorre.',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'Como o JavaScript reage a um clique em um botão?',
              explanation: 'Usamos addEventListener para escutar o evento de clique.',
              options: [
                {
                  text: 'Com addEventListener("click", ...)',
                  correct: true,
                },
                {
                  text: 'Com console.log',
                  correct: false,
                },
                {
                  text: 'Com um for',
                  correct: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'botoes-e-formularios',
          title: 'Botões e formulários',
          summary: 'Capturar cliques e dados digitados.',
          duration: 300,
          objectives: ['Ler valores de campos'],
          body: '> Você pode ler o que o usuário digitou num campo.\n\n## Exemplo\n\n```javascript\nconst input = document.querySelector("input");\nconst botao = document.querySelector("button");\nbotao.addEventListener("click", () => {\n  console.log(input.value); // o que foi digitado\n});\n```\n\n## Resumo\n\n`input.value` traz o texto digitado no campo.',
          exercises: [],
        },
        {
          slug: 'validacao',
          title: 'Validação',
          summary: 'Conferir se o usuário preencheu certo.',
          duration: 300,
          objectives: ['Fazer validação simples'],
          body: '> Antes de usar um dado, **valide**: o campo está vazio? o formato está certo?\n\n## Exemplo\n\n```javascript\nif (input.value === "") {\n  console.log("Preencha o campo!");\n}\n```\n\n## Resumo\n\nValidar evita erros e melhora a experiência do usuário.',
          exercises: [],
        },
        {
          slug: 'alterando-conteudo-e-estilos',
          title: 'Alterando conteúdo e estilos',
          summary: 'Mudar textos e aparência pela lógica.',
          duration: 300,
          objectives: ['Modificar conteúdo e estilo pelo DOM'],
          body: '> O JavaScript pode **trocar o texto** e **mudar o estilo** de um elemento.\n\n## Exemplo\n\n```javascript\nconst titulo = document.querySelector("h1");\ntitulo.textContent = "Novo título";\ntitulo.style.color = "teal";\n```\n\n## Resumo\n\n`.textContent` muda o texto; `.style` muda a aparência.',
          exercises: [],
        },
        {
          slug: 'estado-simples',
          title: 'Estado simples',
          summary: 'Guardar e refletir uma informação que muda.',
          duration: 300,
          objectives: ['Entender a ideia de estado'],
          body: '> **Estado** é uma informação que muda com o tempo (ex.: um contador de cliques) e que a tela reflete.\n\n## Exemplo\n\n```javascript\nlet cliques = 0;\nbotao.addEventListener("click", () => {\n  cliques++;\n  contador.textContent = cliques;\n});\n```\n\n## Resumo\n\nEstado = dado que muda; a interface mostra esse dado atualizado.',
          exercises: [],
        },
        {
          slug: 'armazenando-dados-no-navegador',
          title: 'Armazenando dados no navegador',
          summary: 'localStorage: seus dados continuam lá mesmo depois de fechar a página.',
          duration: 360,
          objectives: ['Salvar e recuperar dados com localStorage'],
          body: '> **A ponte que faltava:** até agora tudo sumia ao recarregar. Com **localStorage** os dados ficam salvos no navegador.\n\n## Como funciona\n\n```\nUsuário cria tarefa -> JavaScript -> localStorage\nfecha o navegador -> abre de novo -> tarefas continuam lá\n```\n\n## Exemplo\n\n```javascript\nlocalStorage.setItem("nome", "Ana");\nconsole.log(localStorage.getItem("nome")); // Ana\n```\n\n> Não é um banco de dados — é um armazenamento simples no próprio navegador. Perfeito para um primeiro app de verdade.\n\n## Resumo\n`setItem` salva, `getItem` recupera; os dados persistem entre visitas.',
          exercises: [],
        },
        {
          slug: 'debugging-no-navegador',
          title: 'Debugging no navegador',
          summary: 'Usar o console para investigar problemas.',
          duration: 300,
          objectives: ['Usar o console do navegador'],
          body: '> O **console** do navegador (tecla F12) mostra erros e o que você imprime com `console.log`.\n\n## Resumo\n\nQuando algo não funciona: abra o console, leia o erro e use `console.log` para investigar.',
          exercises: [],
        },
      ],
      miniProject: {
        title: 'Mini projeto: Lista de tarefas',
        brief:
          'Uma lista de tarefas onde dá para adicionar, concluir e remover — salvando no navegador.',
        requirements: [
          'Adicionar e remover tarefas',
          'Marcar como concluída',
          'Persistir com localStorage',
        ],
      },
    },
    {
      title: 'Git e GitHub',
      description:
        'Salvar o histórico do seu código e publicá-lo no GitHub — o começo do portfólio.',
      lessons: [
        {
          slug: 'o-que-e-git',
          title: 'O que é Git?',
          summary: 'Um sistema que salva o histórico do seu código.',
          duration: 300,
          objectives: ['Entender o que é Git'],
          body: '> **Git** é como um "salvar" com histórico: ele guarda cada versão do seu projeto e deixa você voltar no tempo.\n\n## Resumo\n\nGit registra a evolução do código em pontos chamados **commits**.',
          exercises: [],
        },
        {
          slug: 'o-que-e-github',
          title: 'O que é GitHub?',
          summary: 'Onde seu código fica guardado na nuvem e visível para o mundo.',
          duration: 300,
          objectives: ['Diferenciar Git e GitHub'],
          body: '> **Git** é a ferramenta (no seu computador). **GitHub** é o site onde você guarda e compartilha seus projetos.\n\n## Resumo\n\nGit = ferramenta local; GitHub = nuvem/portfólio online.',
          exercises: [
            {
              type: 'MULTIPLE_CHOICE',
              prompt: 'Qual a diferença entre Git e GitHub?',
              explanation:
                'Git é a ferramenta local de versionamento; GitHub é o serviço na nuvem para hospedar o código.',
              options: [
                {
                  text: 'Git é a ferramenta; GitHub é o site que hospeda o código',
                  correct: true,
                },
                {
                  text: 'São exatamente a mesma coisa',
                  correct: false,
                },
                {
                  text: 'GitHub roda no seu computador e Git na nuvem',
                  correct: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'criando-repositorio',
          title: 'Criando um repositório',
          summary: 'O "projeto" onde o Git guarda tudo.',
          duration: 240,
          objectives: ['Entender o que é um repositório'],
          body: '> Um **repositório** (repo) é a pasta do projeto que o Git acompanha.\n\n## Resumo\n\nCada projeto costuma ter o seu próprio repositório.',
          exercises: [],
        },
        {
          slug: 'comandos-basicos',
          title: 'Comandos básicos: add e commit',
          summary: 'Registrar mudanças no histórico.',
          duration: 360,
          objectives: ['Conhecer add e commit'],
          body: '> O fluxo básico: você **prepara** as mudanças (`add`) e as **salva** no histórico (`commit`).\n\n## Exemplo\n\n```bash\ngit add .\ngit commit -m "cria a página inicial"\n```\n\n## Resumo\n\n`git add` seleciona; `git commit -m "mensagem"` salva um ponto no histórico.',
          exercises: [],
        },
        {
          slug: 'enviando-para-o-github',
          title: 'Enviando para o GitHub: push',
          summary: 'Subir seu código para a nuvem.',
          duration: 300,
          objectives: ['Entender git push'],
          body: '> Depois de commitar, o `git push` envia seu código para o GitHub.\n\n## Exemplo\n\n```bash\ngit push\n```\n\n## Resumo\n\n`push` publica seus commits no GitHub.',
          exercises: [],
        },
        {
          slug: 'clonando-um-repositorio',
          title: 'Clonando um repositório',
          summary: 'Trazer para o seu computador um projeto que já existe no GitHub.',
          duration: 300,
          objectives: ['Entender git clone'],
          body: '> **Clonar** é baixar uma cópia completa de um repositório do GitHub para o seu computador.\n\n## Exemplo\n\n```bash\ngit clone https://github.com/usuario/projeto.git\n```\n\n> Você vai usar muito isso ao estudar projetos de outras pessoas e, no futuro, ao trabalhar em equipe. (Branches e pull requests ficam para uma trilha posterior.)\n\n## Resumo\n`git clone <url>` traz um projeto do GitHub para a sua máquina.',
          exercises: [],
        },
        {
          slug: 'readme',
          title: 'README',
          summary: 'A capa do seu projeto — o que as pessoas leem primeiro.',
          duration: 300,
          objectives: ['Escrever um bom README'],
          body: '> O **README.md** é a apresentação do projeto: o que é, como rodar, quem fez. É a primeira coisa que recrutadores veem.\n\n## Um bom README tem\n\n- O que o projeto faz\n- Como executar\n- Tecnologias usadas\n- Um print ou link, se possível\n\n## Resumo\n\nREADME bem feito valoriza muito o seu portfólio.',
          exercises: [],
        },
        {
          slug: 'commits-bons',
          title: 'Commits bons',
          summary: 'Mensagens claras que contam a história do projeto.',
          duration: 240,
          objectives: ['Escrever boas mensagens de commit'],
          body: '> Uma boa mensagem de commit diz **o que mudou**, de forma curta e clara.\n\n## Exemplos\n\n- `adiciona formulário de contato` ✔\n- `coisas` ✘\n\n## Resumo\n\nCommits pequenos e com mensagens claras facilitam a vida (a sua, inclusive).',
          exercises: [],
        },
        {
          slug: 'publicando-o-projeto',
          title: 'Publicando o projeto',
          summary: 'Deixar seu projeto no ar para mostrar.',
          duration: 300,
          objectives: ['Entender publicação de projeto'],
          body: '> Com o código no GitHub, você pode **publicar** a página (ex.: GitHub Pages) e ter um **link** para compartilhar.\n\n## Resumo\n\nUm projeto publicado + link é o que transforma "eu estudei" em "eu construí".',
          exercises: [],
        },
        {
          slug: 'publicando-na-web',
          title: 'Publicando seu projeto na web',
          summary: 'Diferença entre guardar o código e deixar o site no ar, com link.',
          duration: 420,
          objectives: ['Entender deploy e publicar um site estático'],
          body: '> **Duas coisas diferentes:**\n> **GitHub** = seu código está guardado.\n> **Deploy** = seu projeto está acessível na internet, com um link.\n\n## O resultado que queremos\n\n```\nGitHub  +  Deploy  =  link compartilhável\n```\n\n## Como\nSites estáticos (HTML/CSS/JS) podem ir ao ar de graça em serviços como GitHub Pages, Netlify ou Vercel — normalmente conectando o seu repositório.\n\n> No fim, você consegue dizer: **"criei um site e posso mandar o link"**. Isso é poderosíssimo para um iniciante.\n\n## Resumo\nDeploy transforma "eu estudei" em "eu publiquei — aqui está o link".',
          exercises: [],
        },
      ],
    },
    {
      title: 'Projeto Final',
      description: 'Construir, publicar e apresentar seu primeiro produto digital.',
      lessons: [
        {
          slug: 'escolha-do-problema',
          title: 'Etapa 1 — O problema',
          summary: 'Escolher um pequeno problema real para resolver.',
          duration: 300,
          objectives: ['Definir o problema do projeto'],
          body: '> O projeto final é **seu**. Comece escolhendo um problema pequeno e real que você queira resolver.\n\n## Ideias\n\n- Lista de tarefas\n- Controle financeiro simples\n- Lista de estudos\n- Agenda\n- Catálogo\n- Portfólio pessoal\n\n## Responda\n\n> Que problema quero resolver? Para quem?\n\n## Resumo\n\nUm bom projeto começa por um problema claro.',
          exercises: [],
        },
        {
          slug: 'planejamento',
          title: 'Etapa 2 — Planejamento',
          summary: 'Dividir o projeto em partes antes de codar.',
          duration: 300,
          objectives: ['Planejar antes de construir'],
          body: '> Antes de escrever código, **planeje** (lembra da decomposição do Módulo 2?).\n\n## Caminho\n\n```\n   Problema -> Usuário -> Funcionalidades -> Tela -> Código\n```\n\n## Resumo\n\nPlanejar evita retrabalho e dá clareza.',
          exercises: [],
        },
        {
          slug: 'construcao',
          title: 'Etapa 3 — Construção',
          summary: 'Colocar a mão na massa: HTML + CSS + JavaScript.',
          duration: 420,
          objectives: ['Construir o projeto'],
          body: '> Hora de construir usando tudo que você aprendeu: **HTML** (estrutura), **CSS** (visual) e **JavaScript** (comportamento).\n\n## Dica\n\nComece pequeno: faça uma versão simples funcionar, depois melhore.\n\n## Resumo\n\nConstrua por partes e teste a cada passo.',
          exercises: [],
        },
        {
          slug: 'github-do-projeto',
          title: 'Etapa 4 — GitHub',
          summary: 'Versionar e publicar o projeto.',
          duration: 300,
          objectives: ['Publicar o projeto no GitHub'],
          body: '> Seu projeto precisa ter um repositório organizado.\n\n## Estrutura mínima\n\n```\n   meu-projeto/\n   ├── README.md\n   ├── index.html\n   ├── style.css\n   └── script.js\n```\n\n## Resumo\n\nCódigo no GitHub + README = portfólio.',
          exercises: [],
        },
        {
          slug: 'apresentacao',
          title: 'Etapa 5 — Apresentação',
          summary: 'Explicar o que você construiu — a habilidade que abre portas.',
          duration: 360,
          objectives: ['Apresentar o projeto'],
          body: '> Saber **explicar** o que você fez é tão importante quanto fazer. É isso que recrutadores avaliam.\n\n## Responda\n\n1. Qual problema resolvi?\n2. Para quem?\n3. Como funciona?\n4. Quais tecnologias usei?\n5. O que aprendi?\n6. O que faria diferente?\n7. Qual o próximo passo?\n\n## Parabéns!\n\nSe você chegou aqui, saiu do zero e **construiu um produto digital de verdade**. Este é o começo da sua jornada em tecnologia.\n\n## Resumo\n\nConstruir + publicar + explicar = você está pronto para a próxima trilha.',
          exercises: [],
        },
      ],
    },
    {
      title: 'Próximos Passos',
      description: 'Você concluiu os fundamentos — veja o caminho daqui para frente.',
      lessons: [
        {
          slug: 'e-agora-proximos-passos',
          title: 'E agora? Seus próximos passos',
          summary: 'Você terminou uma etapa. Existe um caminho daqui para frente.',
          duration: 360,
          objectives: ['Reconhecer as próximas trilhas possíveis'],
          body: '> **Parabéns!** Você saiu do zero, construiu projetos e já entende os fundamentos. Isto é só o começo.\n\n## Escolha sua próxima trilha\n\n```\nVocê está aqui: fundamentos\n        |\n   +----+----+----------+\n   v         v          v\nFrontend   Backend   Full Stack\n```\n\n- **Frontend:** HTML -> CSS -> JavaScript -> React\n- **Backend:** JavaScript/TypeScript -> Node.js -> APIs -> Banco de dados\n- **Full Stack:** frontend + backend\n\n## O mais importante\nVocê provou para si mesmo que **consegue aprender a programar**. O resto é continuar praticando e construindo.\n\n## Resumo\nEscolha um caminho, siga praticando e mantenha seu portfólio crescendo.',
          exercises: [],
        },
      ],
    },
  ],
  assessment: {
    title: 'Antes de começar',
    description: 'Rápido e sem reprovação — é só para conhecermos seu ponto de partida.',
    questions: [
      {
        kind: 'SINGLE_CHOICE',
        prompt: 'Você já escreveu algum código antes?',
        options: [
          {
            text: 'Nunca',
          },
          {
            text: 'Muito pouco',
          },
          {
            text: 'Um pouco',
          },
          {
            text: 'Sim, com frequência',
          },
        ],
      },
      {
        kind: 'SINGLE_CHOICE',
        prompt: 'Você sabe o que é HTML?',
        options: [
          {
            text: 'Não faço ideia',
          },
          {
            text: 'Já ouvi falar',
          },
          {
            text: 'Sei o básico',
          },
          {
            text: 'Sei bem',
          },
        ],
      },
      {
        kind: 'SINGLE_CHOICE',
        prompt: 'Já usou o GitHub?',
        options: [
          {
            text: 'Não',
          },
          {
            text: 'Só ouvi falar',
          },
          {
            text: 'Já usei um pouco',
          },
          {
            text: 'Uso com frequência',
          },
        ],
      },
      {
        kind: 'SCALE',
        prompt: 'De 1 a 5, quão confiante você se sente para aprender a programar?',
        options: [
          {
            text: '1',
          },
          {
            text: '2',
          },
          {
            text: '3',
          },
          {
            text: '4',
          },
          {
            text: '5',
          },
        ],
      },
      {
        kind: 'TEXT',
        prompt: 'Em poucas palavras: o que você entende por "programação"?',
      },
    ],
  },
  finalProject: {
    title: 'Projeto Final: Meu Primeiro Produto Digital',
    brief:
      'Escolha um problema real e pequeno e construa uma solução com HTML, CSS e JavaScript. No fim, publique no GitHub e apresente o que você fez.',
    requirements: [
      'Escolher um problema e um usuário',
      'HTML + CSS + JavaScript funcionando',
      'Código no GitHub com README',
      'Projeto publicado com link',
      'Saber explicar o que construiu',
    ],
  },
};
