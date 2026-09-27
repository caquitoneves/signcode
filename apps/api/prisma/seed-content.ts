// GERADO A PARTIR DO PACOTE PEDAGÓGICO v1 (Módulos 0, 1 e 2).
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
    },
  ],
};
