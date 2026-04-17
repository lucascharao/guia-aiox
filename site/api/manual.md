# Manual AIOX — Destilação para Consulta

Este é um índice estruturado dos 17 capítulos do Manual AIOX. Contém TL;DRs, objetivos de aprendizado, conceitos-chave, comandos CLI e as seções principais com um resumo de 1-2 linhas cada. Use este conhecimento para responder perguntas com precisão. Quando o usuário pedir profundidade, cite o capítulo e sugira que ele leia o conteúdo completo.

---

## Agentes Oficiais do AIOX (11)

| Agente | Persona | Escopo Principal |
|--------|---------|------------------|
| `@pm` | Morgan | Product Management, épicos, spec pipeline |
| `@po` | Pax | Product Owner, validação de stories (10 pontos) |
| `@sm` | River | Scrum Master, criação de stories |
| `@dev` | Dex | Implementação de código (modos Interactive/YOLO/Pre-Flight) |
| `@qa` | Quinn | QA Gate (7 checks), QA Loop, verdicts PASS/CONCERNS/FAIL/WAIVED |
| `@architect` | Aria | Arquitetura, complexity assessment |
| `@data-engineer` | Dara | Schema, DDL, RLS, migrations |
| `@analyst` | Alex | Pesquisa, brainstorming |
| `@ux-design-expert` | Uma | UX/UI design |
| `@devops` | Gage | CI/CD, git push (EXCLUSIVO), bootstrap, MCP |
| `@aiox-master` | Orion | Governança de framework, meta-operações |

## Os 4 Workflows Primários

1. **Story Development Cycle (SDC)** — Create (@sm) → Validate (@po) → Implement (@dev) → QA Gate (@qa) → Push (@devops)
2. **QA Loop** — Ciclo iterativo @qa ⇄ @dev com máximo de 5 iterações
3. **Spec Pipeline** — 6 fases (Gather/Assess/Research/Write/Critique/Plan) para requisitos com incerteza
4. **Brownfield Discovery** — 10 fases de assessment de projetos legados

## A Constitution (6 Artigos)

- **I — CLI First** (NON-NEGOTIABLE): terminal é a fonte da verdade
- **II — Agent Authority** (NON-NEGOTIABLE): cada agente com autoridade delimitada
- **III — Story-Driven Development** (MUST): todo trabalho começa como story
- **IV — No Invention** (MUST): NUNCA inventar features/comandos — toda afirmação deve rastrear a FR/NFR/CON
- **V — Quality First** (MUST): qualidade não é opcional
- **VI — Absolute Imports** (SHOULD): imports absolutos preferidos

## Os 3 Pilares

- **CLI First** → Observability Second → UI Third
- **Code First** → Python resolve 91,5% das operações determinísticas; IA apenas para julgamento/criatividade
- **Story-Driven** → ciclo de 5 etapas (criar → validar → implementar → revisar → entregar)

---

# Os 17 Capítulos

## Capítulo 01 — O Problema: Por Que IA Sozinha Não Basta

**TL;DR:** A IA como ferramenta é poderosa, mas IA sem orquestração é caótica. O AIOX nasce para resolver o mito do 'prompt mágico' aplicando metodologia de times reais a agentes de IA.

**Dificuldade:** iniciante · **Tempo:** 18 min

**Você vai aprender:**
- Entender por que prompts sozinhos não escalam
- Reconhecer os 4 problemas do dev solo com IA
- Comparar o caos ad-hoc com times estruturados
- Internalizar a promessa AIOX: operador + agentes especializados

**Conceitos-chave:** Prompt mágico (mito), Tokens desperdiçados, Outputs inconsistentes, Reprodutibilidade, Papéis claros, Gates de qualidade

**Seções:**
- **1.1 O Mito do "Prompt Mágico"** — Existe uma fantasia muito sedutora no mundo do desenvolvimento com inteligência artificial. Ela diz o seguinte: *"Se eu encontrar o prompt certo, tudo vai funcionar perfeitamente."* Você já passou por isso. Abriu o ChatGPT, o Claude, ou qualquer outro assisten
- **1.2 O Caos do Desenvolvedor Solo com IA** — Imagine um desenvolvedor — vamos chamá-lo de Marco — que decide usar IA para acelerar seu trabalho. Marco é inteligente, motivado, e leu todos os artigos sobre "como usar ChatGPT para programar melhor". Ele começa empolgado. Segunda-feira: Marco abre uma sessã
- **1.3 O Que Times de Verdade Fazem Diferente** — Agora pense em como uma empresa de software bem-estruturada funciona. Não a startup caótica de duas pessoas, mas uma equipe que entrega software de qualidade de forma consistente. Eles têm **papéis claros**. O Product Manager coleta requisitos e prioriza o bac
- **1.4 A Promessa do AIOX** — O AIOX — AI-Orchestrated eXecution System — nasce desta observação: a IA como ferramenta é poderosa, mas IA sem orquestração é caótica. O que você precisa não é de prompts melhores. Você precisa de um sistema. A promessa central do AIOX tem quatro dimensões: *
- **A Prova Social** — Para quem ainda se pergunta se isso funciona na prática, os números do cohort são concretos: Rodrigo Faerman investiu **1h15min** usando AIOX para fazer uma análise que normalmente custaria **1 mês de consultoria a US$10k**. As conclusões da análise bateram co

---

## Capítulo 02 — Os Três Pilares: CLI First, Code First, Story-Driven

**TL;DR:** CLI é onde a inteligência vive, Python resolve 91,5% do trabalho, e toda operação começa como uma story. Esses três pilares sustentam o AIOX.

**Dificuldade:** iniciante · **Tempo:** 22 min

**Você vai aprender:**
- Dominar a hierarquia CLI → Observability → UI
- Aplicar a regra Code First (Python antes de IA)
- Entender a economia de tokens
- Transformar requisitos vagos em stories estruturadas

**Conceitos-chave:** CLI First, Code First, Story-Driven Development, Regra dos 91,5%, Elefante Rosa, Ciclo de 5 etapas da story

**Comandos CLI mencionados:**
- `aiox doctor`
- `aiox graph --deps`
- `aiox graph --stats`

**Seções:**
- **2.1 CLI First: Onde a Inteligência Vive** — Existe um equívoco comum entre desenvolvedores que estão começando a trabalhar com sistemas de agentes de IA: a suposição de que o lugar mais importante do sistema é a interface gráfica, o painel bonito, o dashboard com gráficos coloridos. Afinal, é lá que as 
- **Quanto Menos UI, Mais Poder a IA Tem** — Pedro Valério resume o CLI First em uma frase que clarifica tudo: **"Quanto menos UI, mais poder a IA tem."** Interfaces gráficas criam camadas de interpretação entre o comando e a execução. Cada botão, cada menu, cada confirmação visual é uma barreira que um 
- **Comandos > Conversa: A Regra de Ouro** — Existe uma regra de ouro no AIOX que precede qualquer outra: **evite escrever para a IA — use comandos**. Quando você conversa livremente com um modelo de linguagem, ele sai do papel estruturado e começa a inventar. Cada palavra adicional que você escreve mult
- **O Terminal Como Centro de Comando** — O terminal tem propriedades únicas que o tornam o ambiente natural para agentes de IA: **Composabilidade.** Comandos podem ser encadeados, combinados, pipelines criados. Um agente pode executar `aiox doctor | grep ERROR` sem nenhuma fricção. A mesma operação e
- **CLI Como Fonte da Verdade** — No AIOX, o CLI não é apenas conveniente — é a **fonte da verdade**. Isso tem implicações concretas: Qualquer estado relevante do sistema pode ser consultado via CLI. `aiox doctor` te diz se o ambiente está saudável. `aiox graph --deps` te mostra a árvore de de
- **Comandos Que Você Vai Usar Todo Dia** — Dois comandos merecem destaque especial porque ilustram perfeitamente a filosofia CLI First: **`aiox doctor`** — O diagnóstico completo do seu ambiente AIOX. Esse comando verifica se todas as dependências estão instaladas, se as configurações estão corretas, s
- **A Hierarquia na Prática** — A hierarquia CLI → Observabilidade → UI não é uma regra estética. É uma regra operacional que define o que é prioridade de construção e de manutenção. Quando você está construindo uma feature, a primeira pergunta é: "Isso tem um comando CLI?" Se não tem, crie 
- **2.2 Code First: Python Antes de IA** — Se o CLI First define *onde* a inteligência do sistema vive, o Code First define *quando* você deve usar IA. E a resposta, que surpreende muita gente, é: muito menos do que você pensa. O princípio Code First tem uma pergunta central, uma pergunta que você deve
- **Por Que Python Antes de IA?** — A razão é simples: **Python é determinístico. IA não é.** Quando você escreve `len(lista)` em Python, você sempre recebe o número correto de elementos. Sempre. Sem variação. Sem custo de token. Em milissegundos. Com 100% de reprodutibilidade. Quando você pede 
- **A Tabela de Decisão** — O AIOX tem uma tabela de decisão clara que você pode aplicar a qualquer sub-operação de qualquer tarefa: | A operação é... | Use | |-----------------------------------|----------|
- **Os Números Reais: 91,5% Determinístico** — Se o princípio Code First ainda parece abstrato, existe um número concreto que o materializa. Pedro Valério compartilhou uma métrica de seus projetos em produção com AIOX: **91,5% das operações são determinísticas (scripts). 6,8% são executadas por modelo de l
- **Determinismo em Camadas: Hooks, Skills e Scripts** — O AIOX oferece diferentes mecanismos para automatizar operações, e cada um tem um grau diferente de determinismo: | Mecanismo | Determinismo | Velocidade | Quando Usar | |-----------|-------------|------------|-------------|
- **Os Anti-Padrões** — Existem operações que você nunca deve delegar à IA no AIOX. Memorize esses anti-padrões: **Nunca use LLM para contar.** Contar linhas de código, contar arquivos em um diretório, contar elementos em uma lista, contar palavras em um documento. Python conta. IA n
- **2.3 A Economia de Tokens** — O princípio Code First não é apenas filosófico. Ele tem um impacto financeiro real e mensurável. Para entender por que, você precisa entender como tokens funcionam economicamente. Cada palavra que você envia para um modelo de linguagem tem um custo. Cada palav
- **O Custo Real de Uma Operação Determinística via IA** — Vamos fazer uma conta simples. Suponha que você precisa validar se 50 arquivos YAML estão no formato correto. **Via Python:** - Tempo de execução: ~200ms para todos os 50 arquivos
- **Os Números do Projeto Típico** — Com a aplicação sistemática do princípio Code First, os números de economia que o AIOX observa em projetos reais são: - **~$45/mês de economia** por desenvolvedor individual - **~$540/ano de economia** por desenvolvedor individual
- **O Valor Real do Claude Max** — Para colocar a economia de tokens em perspectiva prática: uma assinatura do Claude Max a $200/mês equivale a aproximadamente **$2.500 a $3.500 em créditos de API**. Esse é o valor real que você está recebendo. A tentação natural quando se atinge o limite é ati
- **Os Vazamentos Silenciosos de Tokens** — Existem custos de token que muitos operadores não percebem porque não aparecem nas operações explícitas: **Servidores MCP consomem contexto passivamente.** Cada MCP registrado no seu ambiente consome entre 8% e 30% da janela de contexto apenas por estar regist
- **Justificando Cada Token** — O AIOX opera com uma filosofia de justificativa de token: **todo token consumido deve justificar seu custo**. Isso significa que antes de chamar qualquer agente, você deve ser capaz de responder: 1. Essa operação realmente precisa de julgamento semântico? 2. P
- **2.4 Story-Driven Development** — O terceiro pilar do AIOX é o que dá estrutura ao trabalho em si: o Story-Driven Development, ou Desenvolvimento Orientado a Stories. Para entender por que isso importa, considere duas formas de pedir a mesma coisa para um agente de IA: **Forma 1 (sem estrutura
- **A Story Como Unidade Atômica de Trabalho** — No AIOX, a story é a **unidade atômica de trabalho**. Isso significa: - Todo desenvolvimento começa com uma story - Nenhum agente começa a implementar sem uma story validada
- **O Ciclo de 5 Etapas** — O ciclo completo de uma story no AIOX tem cinco etapas: **1. Criar (`@sm` — River)** O Scrum Master cria a story a partir do epic e do PRD. A story nasce com status `Draft` e contém: título, contexto, critérios de aceite, dependências, e tarefas. Nenhuma linha
- **Por Que "Me Faz Um Login" Falha** — Voltando ao exemplo inicial: por que a instrução "me faz um login" falha sistematicamente? Porque ela viola três dos cinco princípios do ciclo: Não há **contexto**. O agente não sabe se é um login web ou mobile, qual é o stack tecnológico, quais são os padrões
- **A Story Como Checkpoint de Contexto** — A story tem uma função operacional que vai além da rastreabilidade: ela serve como **checkpoint de contexto**. Quando a janela de contexto do Claude é compactada ou zerada com `/clear`, o agente perde a memória da sessão. Mas a story permanece — ela é um arqui
- **Traceabilidade Como Superpoder** — Um projeto story-driven tem uma propriedade que projetos ad-hoc nunca têm: **traceabilidade completa**. Você consegue responder: - "Quando foi implementado o sistema de autenticação?" → Story 2.1, commit `abc123`, data X.
- **Exercício do Capítulo 2** — **Objetivo:** Aplicar o princípio Code First decompondo uma tarefa real. **Tarefa de exemplo:** "Processar 100 transcrições de podcast, extrair timestamps, identificar os principais temas de cada episódio, e gerar um índice em YAML." Sua missão é decompor essa

---

## Capítulo 03 — A Constitution: As Leis do Framework

**TL;DR:** A Constitution é o contrato legal que bloqueia automaticamente violações. 6 artigos + gates determinísticos transformam princípios em proteção real.

**Dificuldade:** iniciante · **Tempo:** 20 min

**Você vai aprender:**
- Conhecer os 6 artigos da Constitution
- Entender como gates automáticos funcionam
- Dominar o Artigo IV: No Invention
- Prevenir scope creep com rastreabilidade

**Conceitos-chave:** Constitution, 6 Artigos, Gates automáticos, Severidade (NON-NEGOTIABLE/MUST/SHOULD), No Invention, Rastreabilidade FR/NFR/CON

**Seções:**
- **3.1 Por Que Um Framework Precisa de Leis** — Imagine que você contratou dez desenvolvedores altamente competentes para trabalhar no seu projeto. Cada um é brilhante na sua área, mas nenhum deles tem qualquer restrição sobre o que pode ou não pode fazer. Um deles decide que o banco de dados deveria ser Mo
- **A Constitution Como Contrato** — O que torna uma constitution diferente de uma "lista de boas práticas" ou um "guia de estilo"? A diferença está na executabilidade. Boas práticas são sugestões. Um guia de estilo é uma recomendação. Uma constitution tem **gates automáticos** que bloqueiam viol
- **3.2 Os 6 Artigos** — A Constitution do AIOX tem seis artigos, cada um com um princípio central, uma severidade, e uma razão de existir.
- **Artigo I — CLI First (NON-NEGOTIABLE)** — **Princípio:** Toda operação significativa do sistema deve ter um equivalente CLI. O terminal é a camada primária. Interfaces gráficas são derivadas. **Severidade:** NON-NEGOTIABLE — o gate sempre bloqueia violações. Não há waiver possível. **Por que existe:**
- **Artigo II — Agent Authority (NON-NEGOTIABLE)** — **Princípio:** Cada agente tem autoridade definida e exclusiva sobre certas operações. Nenhum agente pode executar operações fora do seu escopo sem delegação explícita. **Severidade:** NON-NEGOTIABLE — o gate sempre bloqueia violações. **Por que existe:** Sem 
- **Artigo III — Story-Driven Development (MUST)** — **Princípio:** Todo desenvolvimento começa com uma story validada. Nenhuma implementação acontece sem uma story em status `Ready`. **Severidade:** MUST — o gate bloqueia por padrão, mas existe waiver com justificativa documentada. **Por que existe:** Sem uma s
- **Artigo IV — No Invention (MUST)** — **Princípio:** Agentes só podem produzir outputs que rastreiam de volta a requisitos documentados. Nenhuma feature, campo, função, ou decisão arquitetural pode ser "inventada" pelo agente. **Severidade:** MUST — o gate bloqueia por padrão. **Por que existe:** 
- **Artigo V — Quality First (MUST)** — **Princípio:** Nenhum trabalho avança sem passar pelo gate de qualidade correspondente. Qualidade não é negociável por velocidade. **Severidade:** MUST — o gate bloqueia por padrão, com waiver possível documentado. **Por que existe:** A pressão por velocidade 
- **Artigo VI — Absolute Imports (SHOULD)** — **Princípio:** Todos os imports no código devem usar caminhos absolutos, nunca relativos. **Severidade:** SHOULD — gera aviso, não bloqueia. **Por que existe:** Imports relativos criam fragilidade. `import { useStore } from '../../../stores/feature/store'` que
- **3.3 Gates Automáticos** — Gates são mecanismos de verificação que acontecem automaticamente em pontos específicos do ciclo de desenvolvimento. Eles existem para tornar a Constitution executável — não apenas aspiracional.
- **Como Gates Funcionam** — Um gate é simples: em um momento específico do processo, um conjunto de condições é verificado. Se todas as condições passam, o processo continua. Se qualquer condição falha, o gate bloqueia — e o processo não avança até que a condição seja satisfeita (ou que 
- **Níveis de Severidade** — **NON-NEGOTIABLE:** O gate sempre bloqueia. Não há waiver, não há exceção, não há argumento que faça o sistema avançar sem a condição ser satisfeita. Artigos I e II operam nesse nível. A razão é que as violações desses artigos criam danos estruturais que são m
- **Tipos de Gates no AIOX** — **Gate de Criação de Story:** Verifica que a story tem todos os campos obrigatórios, que o epic referenciado existe, que as dependências listadas existem e estão em status adequado, e que o formato do arquivo está correto. Acionado quando `@sm` cria uma nova s
- **3.4 No Invention: O Artigo Mais Importante Para Leigos** — De todos os seis artigos, o Artigo IV — No Invention — é o mais importante para quem está começando a trabalhar com IA em projetos reais. E é também o menos intuitivo. Para entender por que, você precisa entender uma propriedade fundamental dos LLMs: eles fora
- **Por Que LLMs Alucinam Features** — Alucinação não é apenas quando a IA inventa fatos falsos. É também quando a IA inventa *trabalho não pedido* — e entrega com a mesma confiança de trabalho pedido. Considere esse cenário: você tem um PRD que especifica um sistema de login com email e senha. Voc
- **O Princípio do Repertório** — Antes de entrar no mecanismo de rastreabilidade, é importante introduzir um conceito que explica *por que* as restrições do Artigo IV funcionam: o **Princípio do Repertório**. LLMs produzem output baseado em padrões que aprenderam durante o treinamento. Quando
- **O Mecanismo de Rastreabilidade** — Na prática, o Artigo IV funciona assim: qualquer afirmação, decisão, ou implementação produzida por um agente deve ser rastreável a uma referência no PRD ou na story. As referências usam um sistema de IDs prefixados: - **FR-***: Functional Requirement (requisi
- **Violação vs Conformidade: Exemplos Concretos** — **Violação do Artigo IV:** O PRD especifica `FR-EXPORT-001: O usuário pode exportar dados em formato CSV.` O agente implementa exportação para CSV, PDF, Excel, e JSON, com configurações de formatação e email automático dos exportados.
- **Prevenção de Scope Creep** — Um dos benefícios mais práticos do Artigo IV é a prevenção sistemática de scope creep — a expansão gradual e não planejada do escopo do projeto. Scope creep é insidioso porque cada adição individual parece razoável. "Claro que o login deveria ter recuperação d
- **Exercício do Capítulo 3** — **Objetivo:** Desenvolver consciência sobre quais artigos da Constitution você mais naturalmente violaria. **Instrução:** Leia os seis artigos novamente, devagar. Para cada artigo, pense em projetos passados onde você trabalhou — como desenvolvedor, como líder

---

## Capítulo 04 — A Stack de Primitivas: De Comandos a Workflows

**TL;DR:** 5 camadas de abstração que tornam agentes operacionais: Commands, Tasks, Skills, Agents e Workflows. Cada camada encapsula a próxima.

**Dificuldade:** iniciante · **Tempo:** 28 min

**Você vai aprender:**
- Compreender a pirâmide de 5 camadas
- Distinguir Commands, Tasks, Skills, Agents e Workflows
- Mapear problemas à camada certa
- Conhecer os 11 agentes e 4 workflows oficiais

**Conceitos-chave:** Pirâmide de 5 camadas, Commands (*), Tasks, Skills, Agents, Workflows, Task-First Principle

**Comandos CLI mencionados:**
- `*help`
- `*task`
- `*workflow`

**Seções:**
- **4.1 A Pirâmide: Cinco Camadas de Abstração** — Todo sistema de software resolve o problema da complexidade da mesma forma: através de abstração. Você agrupa operações simples em unidades mais complexas, que por sua vez se agrupam em unidades ainda mais complexas, até que operações que seriam impossíveis de
- **4.2 Commands: O Vocabulário Básico** — Commands são o nível mais baixo da hierarquia — mas não subestime sua importância. São eles que tornam o sistema interativo e determinístico na ponta.
- **O Prefixo `*`** — Todos os commands do AIOX usam o prefixo `*`. Esse prefixo não é decorativo: ele é um marcador semântico que diz "isso é um comando executável para o agente ativo, não uma instrução conversacional." A distinção importa. Quando você diz para um agente "me ajuda
- **Commands Fundamentais** — **`*help`** — O primeiro command que qualquer usuário deve conhecer. Exibe a lista completa de commands disponíveis para o agente atualmente ativo, com descrição breve de cada um. Cada agente tem um `*help` diferente, porque cada agente tem commands diferentes
- **O Papel do Front Matter** — Antes de avançar para as camadas superiores, vale entender um conceito que permeia todas elas: o **Front Matter**. Front Matter é um bloco YAML entre `---` no início de um arquivo Markdown. Parece simples, mas é um dos conceitos mais importantes do AIOX — e fr
- **Commands São Determinísticos** — Uma propriedade fundamental dos commands é que eles são determinísticos: o mesmo command, no mesmo estado do sistema, sempre produz o mesmo comportamento. Não há variação, não há interpretação, não há criatividade. Isso é intencional. Commands são a camada ond
- **4.3 Tasks: A Unidade de Trabalho Executável** — Se commands são o vocabulário, tasks são as palavras. Uma task é uma unidade de trabalho completa: ela tem um propósito claro, inputs definidos, outputs esperados, pré-condições verificadas, pós-condições validadas, e modos de execução configuráveis.
- **Anatomia de Uma Task** — Cada task no AIOX é definida em um arquivo Markdown em `.aiox-core/development/tasks/`. Esse arquivo não é apenas documentação — é a especificação executável da task. O formato inclui: **Inputs:** O que a task precisa para começar. Podem ser arquivos específic
- **Os Três Modos de Execução** — Tasks com complexidade significativa suportam três modos de execução: **Modo Interactive:** O agente pausa em pontos de decisão para consultar o usuário. Ideal quando você está aprendendo o sistema, quando o contexto é ambíguo, ou quando as decisões têm impact
- **"Task Validada É Lei"** — Essa frase — "task validada é lei" — é um princípio central do AIOX que vale aprofundar. Quando uma task é definida, validada, e publicada no sistema, ela representa o consenso coletivo sobre a melhor forma de executar aquele tipo de trabalho. Ela incorpora de
- **4.4 Skills: O Agrupamento Contextual** — Skills são o nível onde tasks ganham contexto. Uma skill é um conjunto de tasks relacionadas, com a informação de *quando* usá-las, *como* sequenciá-las, e *por que* elas pertencem juntas. A distinção entre task e skill é sutil mas importante — e frequentement
- **Skills Como Encapsulamento de Expertise** — Uma das propriedades mais poderosas das skills é que elas encapsulam expertise acumulada. Quando um time trabalha junto por meses, eles desenvolvem padrões implícitos: "quando fazemos isso, sempre verificamos aquilo antes". Esses padrões vivem nas skills. Em e
- **4.5 Agents: Persona, Skills, Autoridade, e Memória** — Agentes são onde a magia acontece. Um agente não é apenas um conjunto de skills com um nome diferente. É uma entidade com quatro propriedades que, juntas, criam algo maior do que a soma das partes: **Persona:** A identidade e o estilo de comunicação do agente.
- **Por Que Persona Importa** — A persona é frequentemente subestimada como "apenas estética". Não é. Considere um conflito comum: o `@dev` identificou uma forma mais elegante de implementar algo, mas essa forma diverge levemente dos critérios de aceite da story. Dois agentes com personas di
- **Os 11 Agentes do AIOX** — O sistema opera com 11 agentes especializados, cada um com um domínio claro: | Agente | Persona | Domínio Principal | |--------|---------|-------------------|
- **4.6 Workflows: A Sequência Que Produz Resultado** — Workflows são o topo da pirâmide — onde tasks executadas por agentes em sequência produzem resultados que nenhum agente poderia produzir sozinho.
- **O Princípio Task-First** — Um conceito crucial sobre workflows no AIOX: **workflows são compostos por tasks conectadas, não por agentes conectados**. Isso é o Task-First Principle. A distinção pode parecer sutil, mas tem implicações profundas. Se você pensa em workflows como "agentes em
- **Os 4 Workflows Primários** — **1. Story Development Cycle (SDC) — O Workflow Principal** O ciclo completo de desenvolvimento de uma story, do zero à entrega. Quatro fases: - **Criar** (`@sm`): A story nasce como Draft.
- **Por Que Quatro Workflows?** — Não é por acaso que o AIOX tem exatamente esses quatro workflows. Eles cobrem os quatro cenários fundamentais de qualquer projeto de software: - **Novo trabalho em projeto ativo** → SDC - **Trabalho que não passou na qualidade** → QA Loop
- **Exercício do Capítulo 4** — **Objetivo:** Internalizar a hierarquia de primitivas relacionando-a com situações reais. **Parte 1: Desenhe a pirâmide** Em papel (não no computador — o ato físico de desenhar cria memória diferente), desenhe a pirâmide das cinco camadas. Para cada camada, es

---

## Capítulo 05 — Dados de Primeira Mão: Seu Fosso Competitivo

**TL;DR:** Modelos são commodities — o que você alimenta neles não é. Dados proprietários, processos validados e memória acumulada são seu verdadeiro moat.

**Dificuldade:** intermediario · **Tempo:** 35 min

**Você vai aprender:**
- Entender por que dados > modelo
- Dominar hierarquia de formatos MD/YAML/JSON
- Aplicar o princípio do repertório
- Usar ETL Tier 1/2/3 para economia de tokens

**Conceitos-chave:** Modelo = Commodity, Regra dos 91,5%, Markdown > YAML > JSON, Princípio do Repertório, Entity Lifecycle, ETL Tiers, POPs

**Seções:**
- **5.1 O Modelo E Commodity. O Que Voce Alimenta Nao E.** — Existe uma pergunta que divide os profissionais que trabalham com IA em dois grupos: "qual modelo voce usa?" O primeiro grupo responde com entusiasmo: "GPT-4o", "Claude Sonnet", "Gemini Advanced". O segundo grupo responde com indiferenca: "depende do mes." O s
- **A Regra dos 91.5%** — Existe um numero que circula entre os praticantes mais avancados do AIOX e que resume bem a filosofia deste capitulo: **91.5% dos processos devem ser deterministicos (scripts), apenas 6.8% devem ser executados por modelo**. O que isso significa na pratica? Sig
- **Tecnica E Liquida, Fundamentos Sao Permanentes** — Uma armadilha comum e se apegar a tecnica do momento. RAG (Retrieval Augmented Generation) era o rei ha dois anos — todo mundo vetorizava documentos, criava embeddings, montava pipelines de busca semantica. Hoje, para a maioria dos casos de uso do AIOX, arquiv
- **O Exemplo das 880 Propostas** — Pedro Valerio, um dos pensadores que influenciou a arquitetura do AIOX, tem um exemplo que ilustra esse ponto de forma concreta. Imagine um consultor que, ao longo de anos, escreveu 880 propostas comerciais. Cada proposta tem contexto: o setor do cliente, o pr
- **5.2 Processos Como Ativos** — Se dados de primeira mao sao o seu fosso competitivo de conteudo, processos configurados sao o seu fosso competitivo de metodo. E no AIOX, esses dois fossos se reforcam mutuamente.
- **Workflows Configurados Sao Propriedade Intelectual** — Quando voce configura o AIOX para o seu contexto especifico — definindo os workflows do seu time, os criterios de qualidade da sua empresa, os padroes de codigo do seu projeto, as regras de negocio da sua plataforma — voce esta criando propriedade intelectual.
- **Squads Customizados Sao Conhecimento Embutido** — Quando voce cria um squad customizado para o seu dominio — um agente especializado em regulamentacao financeira, outro em compliance de saude, outro nas convencoes especificas do seu codebase — voce esta embutindo conhecimento especializado no sistema. Um agen
- **Memoria de Agente E Experiencia Acumulada** — Cada interacao com um agente que gera conhecimento relevante pode ser capturada no `MEMORY.md` do agente. Decisoes arquiteturais. Padroes que funcionaram. Anti-padroes identificados. Preferencias do cliente documentadas. Licoes aprendidas. Esse arquivo cresce 
- **5.3 Hierarquia de Formatos: Markdown, YAML, JSON** — Nem todos os formatos de arquivo sao iguais quando o assunto e alimentar sistemas de IA. O AIOX tem uma hierarquia clara: Markdown > YAML > JSON Essa hierarquia nao e arbitraria. Ela reflete tres criterios: custo de token, legibilidade humana, e facilidade de 
- **5.3.1 Comparativo de Custo de Tokens** — Antes de escolher um formato, e fundamental entender o impacto em tokens. Para o mesmo conteudo, os formatos consomem quantidades muito diferentes: | Formato | Tokens (exemplo) | Overhead | |---------|-------------------|----------|
- **5.3.2 Comparativo Detalhado** — | Criterio | JSON | YAML | Markdown | |----------|------|------|----------| | **Tokens** | Mais caro (~30% overhead) | 15-20% menos que JSON | Mais barato |
- **5.3.3 Quando Usar Cada Formato** — A regra de decisao e simples: O dado vai ser consumido por codigo (API, webhook, HTTP request)? ├── SIM → JSON
- **5.3.4 E o TOON?** — Voce pode encontrar referencias ao TOON (Token Oriented Object Notation), um formato criado pelo Duolingo para economizar tokens. O TOON e essencialmente uma "lingua propria" otimizada para comprimir informacao — voce define abreviacoes e convencoes que reduze
- **5.3.5 Markdown: O Formato Primario** — Markdown e o formato preferencial do AIOX para qualquer conteudo com estrutura narrativa: stories, documentacao, personas de agentes, relatorios, memoria de agentes. **Custo de token minimo.** Markdown e texto quase puro, com minima sintaxe. Uma story em Markd
- **5.3.6 YAML: Configuracao e Estrutura** — YAML e o formato secundario, usado para configuracoes, definicoes de agentes, e qualquer dado estruturado que precise de validacao de schema. Comparado a JSON, YAML tem vantagens claras: **Sem chaves e colchetes.** YAML usa indentacao para estrutura, tornando-
- **5.3.7 JSON: Apenas Para APIs** — JSON fica reservado para um caso de uso especifico: interfaces de API, onde o formato e requerido pelo protocolo. Arquivos de configuracao de ferramentas externas que exigem JSON (package.json, tsconfig.json) obviamente usam JSON. Mas qualquer arquivo que voce
- **5.3.8 Frontmatter: A Porta de Entrada do Arquivo** — O padrao Frontmatter — bloco YAML entre `---` no inicio do arquivo Markdown — merece atencao especial porque e um dos padroes mais poderosos do AIOX. **Frontmatter e a primeira coisa que a LLM le.** Quando um agente abre um arquivo `.md` com frontmatter, ele i
- **Instrucoes** — Extraia a transcricao do video fornecido... Nesse exemplo, o frontmatter YAML diz ao sistema: e uma skill, pertence ao agente `@dev`, usa as tools `bash` e `read`, e e acionada pelo comando `/youtube-transcript`. O corpo Markdown contem as instrucoes narrativa
- **5.3.9 Contratos de Validacao YAML** — YAML e fragil — erros de indentacao quebram o arquivo. E a IA tende a inventar variaveis e campos que nao existem. Por isso, validacao automatica e obrigatoria. **1. Pre-commit hook (GitHub)** O DevOps configura via `*setup-github` para validar YAML em cada co
- **5.4 O Principio do Repertorio** — Alan Nicolas, outro pensador que influenciou o AIOX, articula um conceito que explica muito sobre como LLMs falham e como evitar essas falhas: o **Principio do Repertorio**. O principio parte de uma observacao sobre como modelos de linguagem funcionam. LLMs na
- **Vocabulario Preciso Reduz Alucinacao** — Quando voce diz "adicione uma feature de seguranca", o modelo ativa um padrao generico de "feature de seguranca" — e produz o que quer que seja mais comum nesse padrao: autenticacao, talvez, ou validacao de input, ou CORS. Pode ser o que voce quer. Provavelmen
- **Construindo Seu Glossario de Dominio** — O Principio do Repertorio tem uma consequencia pratica: voce deve construir e manter um glossario de termos do seu dominio. Para um projeto de fintech, isso inclui termos como "TED", "PIX", "chargeback", "KYC", "AML", "SPB", "BACEN", cada um com definicao prec
- **O AIOX Como Repertorio Compartilhado** — O proprio AIOX e um exemplo do Principio do Repertorio aplicado ao desenvolvimento de software. Termos como "story", "gate", "epic", "pre-condicao", "modo YOLO", "handoff de agente" — todos tem definicoes precisas e compartilhadas no sistema. Quando voce diz `
- **5.5 Entity Lifecycle Thinking** — Pedro Valerio contribui com outro conceito estruturante para o AIOX: o **Entity Lifecycle Thinking**, ou Pensamento de Ciclo de Vida de Entidades. A ideia central e simples mas poderosa: **tudo nasce e morre com um status**. E quando voce design seus sistemas 
- **O Problema Com Design Centrado em Dados** — A maioria dos desenvolvedores aprende a construir sistemas focando nas estruturas de dados primeiro. "Qual e o schema do banco de dados? Quais sao as tabelas, os campos, as relacoes?" Isso e natural — bancos de dados sao concretos, mensuraveis, faceis de visua
- **Design Centrado em Ciclos de Vida** — Entity Lifecycle Thinking inverte a perspectiva: comece pelas transicoes, nao pelos dados. Para cada entidade central do seu sistema, defina: - **Os estados possiveis:** Quais sao as fases que essa entidade pode estar?
- **O Ciclo de Vida de Uma Story** — No AIOX, a story e o exemplo perfeito de Entity Lifecycle Thinking: Draft → Ready → InProgress → InReview → Done ↑ ↓
- **Cada Transicao Gera Tres Coisas** — Uma das contribuicoes mais praticas de Pedro e a regra de que cada mudanca de status produz automaticamente tres outputs: 1. **Uma data** — timestamp para analytics. Quando a entidade entrou naquele estado? Quanto tempo ficou? Isso e analytics gratuito. 2. **U
- **Implementacao SQL: Status Machine com Timestamps** — O padrao recomendado para implementar status machines em banco de dados e ter um campo de timestamp para cada status. Veja o exemplo de uma entidade `meeting`: CREATE TABLE meetings ( id UUID PRIMARY KEY,
- **Por Que Status Triggers Workflows** — Uma das consequencias mais poderosas do Entity Lifecycle Thinking e que as transicoes de status se tornam os gatilhos naturais para os workflows. Voce nao precisa de um agendador externo que "verifica periodicamente o que precisa ser feito". As proprias entida
- **Design Ao Redor de Ciclos de Vida, Nao de Estruturas de Dados** — A recomendacao pratica do Entity Lifecycle Thinking e: quando voce esta modelando um novo dominio para usar com AIOX, **comece pelos estados e transicoes, nao pelos campos e tabelas**. Pergunte: - O que sao as entidades centrais desse dominio?
- **5.6 Pipeline de ETL — Extrair, Transformar, Carregar** — Seus dados de primeira mao raramente estao prontos para uso. Eles estao em transcricoes brutas, PDFs escaneados, e-books, paginas web, gravacoes de reuniao, planilhas baguncadas. O processo de transforma-los em dados utilizaveis chama-se ETL: Extract (Extrair)
- **A Hierarquia de 3 Tiers** — O AIOX organiza ferramentas de ETL em tres niveis, com uma regra inviolavel: **esgote o Tier 1 antes de ir para o Tier 2, e esgote o Tier 2 antes de ir para o Tier 3**. Use primeiro, sempre. Custo: zero. | Ferramenta | Uso |
- **O Processo Completo** — 1. **Extract** — Use Tier 1 para extrair dados brutos (scripts, scraping, OCR) 2. **Transform** — Use Tier 1-2 para limpar e estruturar (regex, scripts, transcricao) 3. **Load** — Carregue no formato certo (YAML/MD para agentes, JSONB para banco)
- **Parsing: O T de ETL** — Parsing e a operacao de quebrar informacao grande em pedacos menores organizados. E a parte mais importante do Transform. A dificuldade de parsing varia por formato: - **JSON:** Facil — deterministico, bem delimitado
- **5.7 Templates de Dados e Taxonomias** — Existe um anti-padrao devastador no uso de IA para dados: deixar a IA decidir a estrutura. O resultado e previsivel — a IA faz overengineering: cria 20+ tabelas onde 3-4 resolvem, inventa campos que ninguem pediu, e produz schemas que nenhum humano consegue ma
- **Nunca Deixe a IA Criar Tabelas de Banco de Dados** — Essa regra e direta: **cada campo do banco de dados deve ser decidido pelo humano. A IA executa a decisao, nao toma a decisao.** O padrao do que a IA faz quando voce pede "crie um banco de dados para gerenciar conteudo": tabela_livros
- **Templates a Partir dos Melhores Outputs** — A forma correta de criar templates de dados segue um processo de engenharia reversa: **Passo 1: Identifique o melhor output.** Qual e a melhor entrega que sua empresa ja fez? Pegue 10-30 exemplos reais dos melhores outputs. Analise: quais campos existem em TOD
- **Taxonomias Antes de Tudo** — Uma taxonomia e a lista fechada de valores permitidos para cada campo. Defina taxonomias **antes** de criar tabelas, antes de criar templates, antes de automatizar qualquer coisa. Sem taxonomia, a IA vai inventar. Voce pede "categorize este conteudo" e recebe:
- **5.8 POPs — Processos Operacionais Padrao** — POPs (Processos Operacionais Padrao) sao o equivalente corporativo das tasks e workflows do AIOX. E a regra fundamental e: **squads devem nascer de processos humanos validados, nao de imaginacao**.
- **O Fluxo de Criacao de POPs** — Alan Nicolas descreve um ciclo pratico: 1. **Execute o processo manualmente** conversando com a IA. Nao tente automatizar de primeira. Faca na mao, entenda as nuances, descubra as excecoes. 2. **Identifique quando conversa demais** — se voce esta direcionando 
- **Fontes de POPs** — POPs nao vem apenas dos seus processos internos. Existem fontes ricas e subutilizadas: - **Processos internos validados:** A fonte primaria. O que sua empresa ja faz e funciona. - **Podcasts:** Fonte infinita de POPs. Entrevistados frequentemente descrevem seu
- **A Regra de Ouro** — **Nao crie squads aleatorios.** Pegue outputs que sua empresa ja entregou com sucesso, analise o padrao dos melhores, e transforme em template + tasks + workflows. Um squad nascido de um processo validado e 10x mais eficiente que um squad nascido de "eu acho q
- **5.9 Doc Rot — O Inimigo Silencioso** — Doc Rot e a deterioracao silenciosa da documentacao ao longo do tempo. E um dos problemas mais destrutivos em projetos que usam IA — porque a LLM confia na documentacao que voce fornece, mesmo quando ela esta errada.
- **O Caso Real: 40K Tokens Desperdicados** — Em uma mentoria, Pedro encontrou um projeto cujo `CLAUDE.md` mencionava Supabase como banco de dados. O problema: o projeto tinha migrado para PostgreSQL direto meses atras. Ninguem atualizou o CLAUDE.md. O resultado: 1. Claude gastava 40K tokens tentando cone
- **A Solucao: CLAUDE.md Minimo com Ponteiros** — A solucao do AIOX para Doc Rot e radical: **minimo necessario + ponteiros. O codigo e a documentacao.**
- **Stack** — - PostgreSQL (NAO Supabase) - Node.js
- **Estrutura (minimo)** — - /apps → aplicacoes - /infra → infraestrutura e APIs
- **Mais informacoes** — Consulte source-tree via @dev Nao confie em documentacao — leia o codigo fonte Repare o que NAO esta nesse CLAUDE.md: nenhuma descricao de API, nenhum schema de banco, nenhum diagrama de arquitetura, nenhuma lista de endpoints. Tudo isso muda rapido demais par
- **Renderizacao em Tempo Real > Documentacao Estatica** — Pedro propoe uma mudanca de paradigma: em vez de documentar, **renderize**. - Diagrama ER → HTML que le o schema real e renderiza automaticamente - Flowchart de dependencias → HTML que analisa imports e renderiza
- **O Sinal de Alerta** — "Quando voce esta conversando muito com a IA, voce esta precisando de uma Task ou Workflow." Se voce percebe que toda sessao com o agente comeca com 5 minutos de contextualizacao manual — explicando o que mudou, o que nao funciona mais, qual e o estado atual —
- **Exercicio do Capitulo 5** — **Objetivo:** Identificar seus dados de primeira mao, modelar um ciclo de vida, e aplicar os conceitos de ETL, templates, e anti-Doc Rot. **Parte 1: Inventario de Dados de Primeira Mao** Liste 5 processos recorrentes do seu trabalho profissional. Para cada pro

---

## Capítulo 06 — Instalação e Configuração

**TL;DR:** Do zero à URL pública. Pré-requisitos, instalação por projeto, anatomia dos diretórios, modelo L1-L4 e bootstrap completo via @devops.

**Dificuldade:** iniciante · **Tempo:** 40 min

**Você vai aprender:**
- Instalar AIOX com sucesso
- Entender as 4 camadas L1-L4
- Rodar aiox doctor e interpretar resultados
- Completar bootstrap do zero ao deploy

**Conceitos-chave:** npx aiox-core install, core-config.yaml, 4 camadas L1-L4, .claude/, Multi-IDE, @devops *bootstrap

**Comandos CLI mencionados:**
- `npx aiox-core install`
- `npx aiox-core doctor`
- `aiox doctor`
- `aiox doctor --fix`
- `@devops *bootstrap`

**Seções:**
- **6.1 Pré-Requisitos: O Que Você Precisa Antes de Começar** — Antes de instalar o AIOX, você precisa garantir que seu ambiente tem as ferramentas fundamentais. Diferente de alguns frameworks que tentam gerenciar suas próprias dependências, o AIOX assume que você tem um ambiente de desenvolvimento funcional e se integra a
- **Node.js 18+** — O AIOX é construído em Node.js. A versão mínima é 18 porque essa versão introduziu melhorias significativas de performance no runtime, suporte nativo a módulos ES, e APIs de filesystem mais robustas que o framework utiliza. Para verificar sua versão atual: nod
- **npm 9+** — O npm (Node Package Manager) vem instalado com o Node.js, mas pode estar desatualizado em instalações antigas. A versão 9 introduziu melhorias no lockfile e na resolução de pacotes que são importantes para a estabilidade do AIOX. npm --version npm install -g n
- **Git** — Git é obrigatório. O AIOX integra profundamente com Git para controle de versão de stories, branches por feature, e o ciclo de delivery via `@devops`. Sem Git, metade dos workflows do AIOX não funciona. git --version git config --global user.name "Seu Nome"
- **GitHub CLI (gh)** — O GitHub CLI é necessário para as operações que envolvem o repositório remoto: criação de Pull Requests, verificação de status de PRs, e integração com Actions. É de uso exclusivo do `@devops` (Gage), mas precisa estar instalado no ambiente. gh --version gh au
- **Editor com Suporte a Markdown e YAML** — O AIOX é primariamente um sistema de arquivos de texto. Você vai criar, editar, e revisar arquivos Markdown e YAML constantemente. Um editor que renderiza Markdown, valida YAML, e tem bom suporte a arquivos de texto torna o trabalho significativamente mais con
- **Conforto com Terminal** — Este pré-requisito não tem número de versão, mas é o mais importante: você precisa estar confortável usando o terminal. O AIOX é CLI First por princípio. Se você evita o terminal, vai lutar constantemente com o framework em vez de ser amplificado por ele. "Con
- **6.2 Instalação por Projeto: Por Que e Como** — Uma decisão arquitetural fundamental do AIOX é que ele é instalado **por projeto**, não globalmente. Isso é intencional e tem consequências importantes que você precisa entender.
- **Por Que Por Projeto, Não Global?** — **Versionamento por projeto.** Projetos diferentes podem precisar de versões diferentes do AIOX. Um projeto legado pode ter sido iniciado com AIOX 1.x e ainda não migrou. Um projeto novo usa AIOX 2.x com features que quebrariam o projeto legado. Instalação por
- **Comandos de Instalação** — cd meu-projeto npx aiox-core init npx aiox-core install
- **Templates de Projeto** — Durante o `npx aiox-core init`, o sistema solicita que você escolha um template inicial. Três opções disponíveis: **Template `default`** — Para projetos de desenvolvimento de software em geral. Inclui todos os 11 agentes, os 4 workflows primários, tasks de des
- **6.3 Anatomia do Projeto: Entendendo Cada Diretório** — Após o `npx aiox-core init`, a estrutura do seu projeto terá os seguintes diretórios e arquivos: seu-projeto/ ├── .aiox-core/ # Framework core e templates
- **`.aiox-core/` — O Núcleo do Framework** — Este diretório contém o framework em si: as definições de tasks, templates de stories, checklists de qualidade, personas de agentes, e a Constitution. **Você nunca edita esse diretório diretamente** (com poucas exceções documentadas). Subdivisões importantes: 
- **`.claude/` — Configurações do Claude Code** — Este diretório contém regras e configurações específicas para o Claude Code. Ele é lido automaticamente pelo Claude Code ao iniciar uma sessão, carregando as regras do AIOX: - `.claude/settings.json` — Deny rules e allow rules de proteção de camadas - `.claude
- **`docs/stories/` — Onde o Trabalho Vive** — Este é o diretório mais ativo do projeto. Cada story é um arquivo `.story.md` nomeado com o padrão `{epic}.{story}.story.md`. Por exemplo, `2.4.story.md` é a quarta story do segundo epic. As stories são o registro vivo do trabalho: criadas pelo `@sm`, validada
- **`agents/` — Memória dos Agentes** — Cada agente que opera no projeto tem um subdiretório aqui: agents/ ├── dev/
- **`core-config.yaml` — A Configuração Central** — O arquivo mais importante para customização do AIOX é o `core-config.yaml` na raiz do projeto. Ele controla o comportamento global do framework: project: name: "meu-projeto"
- **6.4 O Modelo de 4 Camadas: Entendendo o Que Você Pode e Não Pode Editar** — Uma das decisões mais importantes do AIOX é a separação clara entre o que pertence ao framework e o que pertence ao projeto. Essa separação é chamada de modelo de 4 camadas (L1-L4), e entendê-la evita erros comuns que podem corromper o funcionamento do sistema
- **L1 — Framework Core (NUNCA modifique)** — **Paths:** `.aiox-core/core/`, `.aiox-core/constitution.md`, `bin/aiox.js`, `bin/aiox-init.js` Esta é a camada mais interna do framework: o código que faz o AIOX funcionar, a Constitution que governa o sistema, e os scripts de inicialização. Modificar esses ar
- **L2 — Framework Templates (NUNCA modifique)** — **Paths:** `.aiox-core/development/tasks/`, `.aiox-core/development/templates/`, `.aiox-core/development/checklists/`, `.aiox-core/development/workflows/`, `.aiox-core/infrastructure/` Estes são os templates e definições de tasks que o AIOX usa para operar. Mo
- **L3 — Project Config (Mutável com Exceções)** — **Paths:** `.aiox-core/data/`, `agents/*/MEMORY.md`, `core-config.yaml` Esta é a camada de configuração do projeto. Você pode e deve modificar esses arquivos para customizar o AIOX para seu contexto: - `core-config.yaml` para configurações gerais
- **L4 — Project Runtime (SEMPRE modifique)** — **Paths:** `docs/stories/`, `packages/`, `squads/`, `tests/`, e o código do seu projeto Esta é a camada onde o trabalho acontece. Stories são criadas, modificadas, e completadas aqui. Código é escrito aqui. Testes vivem aqui. Não há restrições de framework — e
- **O Toggle de Proteção** — O `core-config.yaml` tem uma configuração que controla se as deny rules estão ativas: boundary: frameworkProtection: true
- **6.5 Multi-IDE: Usando AIOX com Diferentes Ferramentas** — O AIOX foi projetado com Claude Code como IDE primário, mas o sistema pode ser usado com outras ferramentas de IA. A compatibilidade varia por ferramenta, e cada uma tem considerações específicas.
- **Claude Code (Compatibilidade Total)** — O Claude Code é o ambiente para o qual o AIOX foi otimizado. A integração é completa: - Leitura automática de `.claude/CLAUDE.md` e `.claude/rules/` - Execução de commands via `@agent *command`
- **Gemini CLI (Alta Compatibilidade)** — O Gemini CLI da Google tem boa compatibilidade com o AIOX, com algumas limitações: - Lê arquivos de contexto mas com formato levemente diferente (adaptar `.claude/CLAUDE.md` para `GEMINI.md`) - Suporta a maior parte dos workflows, mas gates automáticos precisa
- **Codex CLI (Compatibilidade Parcial)** — O Codex CLI da OpenAI tem compatibilidade parcial, focada principalmente na execução de código: - Excelente para a fase de implementação de stories - Limitado para orchestração multi-agente
- **Cursor (Compatibilidade Limitada)** — O Cursor é um editor com IA integrada, não um CLI de agentes. Sua compatibilidade com AIOX é limitada a: - Leitura de arquivos de contexto (`.cursorrules`) - Execução de código assistida pela IA
- **Scripts de Sincronização** — Para projetos que usam múltiplos IDEs, o AIOX inclui utilitários de sincronização de contexto. Esses scripts mantêm os arquivos de contexto de cada IDE sincronizados com as configurações master do AIOX: npx aiox-core sync-context --target gemini npx aiox-core 
- **6.6 Diagnóstico: Verificando a Saúde do Sistema** — Após a instalação — e sempre que algo parecer estranho — o primeiro comando a rodar é `aiox doctor`. Ele é o diagnóstico completo do seu ambiente AIOX.
- **O Que `aiox doctor` Verifica** — O comando executa uma série de verificações em cascata: **Dependências do sistema:** - Node.js versão ≥ 18
- **Saída do Comando** — O output do `aiox doctor` usa um formato visual claro: AIOX Doctor — Verificação de Ambiente ══════════════════════════════════════
- **A Flag `--fix`** — Para problemas que o sistema pode corrigir automaticamente, a flag `--fix` tenta a correção: npx aiox-core doctor --fix Problemas que `--fix` consegue corrigir automaticamente:
- **O Comando `aiox info`** — Complementar ao `doctor`, o `aiox info` exibe informações sobre o estado atual do sistema sem fazer verificações de saúde: npx aiox-core info Output típico:
- **6.7 Na Prática: Bootstrap Completo de um Projeto do Zero** — Até aqui você viu cada componente isoladamente: pré-requisitos, instalação, anatomia de diretórios, camadas, editores, diagnóstico. Agora vamos juntar tudo em uma sequência prática — do terminal vazio ao projeto configurado, com GitHub, editor, e agentes pront
- **Passo 1: Criar a Pasta do Projeto** — Sempre comece com uma pasta vazia. Esse detalhe é crítico: se você instalar o AIOX em uma pasta que já contém um projeto, o instalador vai encontrar arquivos existentes (como `.claude/CLAUDE.md`) e apresentar um prompt de merge/overwrite que pode confundir que
- **Passo 2: Instalar o AIOX** — npx aiox-core install O instalador vai apresentar uma série de perguntas. As opções recomendadas para quem está começando: | Pergunta | Opção Recomendada | Observação |
- **Passo 3: Abrir o Claude Code** — Com o AIOX instalado, abra o Claude Code no terminal: claude Este é o ambiente onde os agentes vivem. A partir daqui, você pode ativar qualquer agente com `@` e executar commands com `*`.
- **Passo 4: Abrir o Editor de Código** — Em paralelo ao terminal, abra seu editor preferido na mesma pasta do projeto. Três opções principais: **VS Code** — O editor clássico, com extensões para Markdown e YAML. Sólido e confiável. **Cursor** — Editor com IA integrada, popular entre os desenvolvedore
- **Passo 5: Bootstrap com @devops** — Este é o passo que conecta tudo — GitHub, estrutura de projeto, e ambiente de desenvolvimento: @devops *bootstrap O bootstrap vai fazer uma série de perguntas:
- **Passo 6: Configurar Permissões (Opcional)** — Por padrão, o Claude Code pede confirmação para cada operação que modifica arquivos. Isso é seguro, mas pode se tornar repetitivo quando você já sabe o que está fazendo. Existem duas formas de ajustar: **Método 1: settings.local.json (Recomendado)** Abra o arq
- **Passo 7: Verificar e Praticar** — Neste ponto, você tem: - ✓ Pasta do projeto criada - ✓ AIOX instalado
- **Erros Comuns na Instalação** — **Instalar em pasta com projeto existente:** O instalador encontra arquivos como `.claude/CLAUDE.md` e apresenta prompt de merge/backup/overwrite. Solução: sempre crie uma pasta vazia antes de instalar. **Selecionar Pro em vez de Community:**
- **O Flag `--dangerously-skip-permissions`** — O Claude Code pede confirmação para cada operação de escrita e execução de comando. Isso é seguro, mas lento para desenvolvimento ativo. A recomendação do cohort é clara: use `--dangerously-skip-permissions` combinado com **deny rules** em `.claude/settings.js
- **Hooks para Automação Determinística** — Hooks são comandos shell que executam automaticamente em resposta a eventos no Claude Code. Eles são **100% determinísticos** — diferente de skills (50-80%) ou agentes (variável). Exemplo prático: injetar a data atual no início de cada sessão via hook `Session
- **Exercício do Capítulo 6** — **Objetivo:** Instalar o AIOX, verificar a saúde do ambiente, e explorar a estrutura gerada. **Etapa 1: Instalação** Se você ainda não tem um projeto para instalar o AIOX, crie um diretório de teste:

---

## Capítulo 07 — Conhecendo Seus Agentes

**TL;DR:** Os 11 agentes oficiais do AIOX com persona, skills, autoridade delimitada e memória persistente. Quem chamar e quando.

**Dificuldade:** intermediario · **Tempo:** 45 min

**Você vai aprender:**
- Conhecer os 11 agentes e suas personas
- Dominar a matriz de autoridade
- Usar handoff protocol para economizar contexto
- Escolher o agente certo para cada situação

**Conceitos-chave:** Persona + Skills + Autoridade + Memória, 11 Agentes, Matriz de Autoridade, MEMORY.md, Handoff Protocol, Slash (/) vs Arroba (@)

**Comandos CLI mencionados:**
- `/pm *create-epic`
- `/po *validate-story-draft`
- `/sm *create-story`
- `/dev *task dev-develop-story`
- `/qa *task qa-gate`
- `/devops *push`

**Seções:**
- **7.1 O Que É Um Agente de Verdade** — Existe uma confusão comum quando pessoas começam a trabalhar com sistemas de agentes de IA: a tendência de pensar em agentes como "chatbots com nomes diferentes". O agente de desenvolvimento é como o ChatGPT mas chamado de Dex. O agente de qualidade é como o C
- **Persona: Mais Que Nome e Personalidade** — A persona de um agente é frequentemente reduzida a "a personalidade dele" — Dex é direto, Quinn é rigoroso, Aria é sistêmica. Mas isso é só a superfície. A persona define como o agente **interpreta contexto ambíguo** e **prioriza quando há conflitos**. Conside
- **Skills: O Mapa de Competências** — Skills são o conjunto de capacidades que o agente tem: o que ele sabe fazer, as tasks que pode executar, o conhecimento de domínio que aplica. Um agente sem skills claras é um agente genérico. Um agente com skills bem definidas tem expertise que pode ser confi
- **Autoridade: A Fronteira Que Não Se Cruza** — Autoridade é o conjunto de operações que o agente pode fazer — e as que ele explicitamente não pode. Essa é a dimensão mais mal compreendida e mais importante do sistema de agentes. A autoridade não existe para limitar os agentes por limitação técnica. Existe 
- **Memória: O Acúmulo de Experiência** — A memória de cada agente é armazenada no arquivo `agents/{nome}/MEMORY.md`. Esse arquivo é o único lugar no AIOX que combina as características de L3 (editável) e de ativo de projeto (deve ser versionado). O `MEMORY.md` serve como a mente de longo prazo do age
- **Ativação e Comandos** — Agentes são ativados com o prefixo `@`: @dev @qa
- **Slash (/) vs Arroba (@) — A Diferença Crítica** — Uma das confusões mais comuns do cohort merece um destaque especial. No Claude Code, existe uma diferença fundamental entre `/` e `@`: **`@agente`** apenas carrega o arquivo `.md` do agente. Ele lê o markdown, mas **NÃO executa** os scripts auxiliares (Greetin
- **Escolhendo o Modelo por Agente** — Uma prática avançada que o cohort validou: **usar modelos diferentes para agentes diferentes**, otimizando custo e qualidade. | Agente | Modelo Recomendado | Razão | |--------|-------------------|-------|
- **Agent Teams — Desenvolvimento Paralelo** — Uma feature experimental do Claude Code permite rodar agentes em instâncias verdadeiramente separadas com comunicação real entre elas. Ativada com a variável de ambiente `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`. Na prática, isso habilita o conceito de **Waves** 
- **@pm — Morgan: O Estrategista de Produto** — **Persona:** Morgan opera como um Product Manager experiente que pensa em produto antes de pensar em feature. Estratégico, orientado a outcomes, sempre perguntando "por que isso importa?" antes de "como fazemos isso?". Comunicação direta e estruturada, com pre
- **@po — Pax: O Guardião do Valor** — **Persona:** Pax é o Product Owner — rigoroso, orientado a valor entregue, e incansável na defesa de clareza de critérios. Não aceita ambiguidade, não aprova stories mal especificadas, e constantemente pergunta "isso vai gerar valor para o usuário?". Pax é o a
- **@sm — River: O Facilitador de Processo** — **Persona:** River tem a mentalidade de um Scrum Master experiente: focado em remover bloqueios, garantir que o processo flua, e que o time tem o que precisa para trabalhar. Não tem ego de produto (esse é o Morgan) nem ego técnico (esse é o Dex). O papel do Ri
- **@dev — Dex: O Implementador** — **Persona:** Dex é o desenvolvedor do time. Técnico, focado em qualidade de código, e disciplinado em relação ao escopo. Dex não adiciona features que não foram pedidas, não refatora módulos que não estão no escopo da story, e sempre explica as decisões técnic
- **@qa — Quinn: O Rigoroso** — **Persona:** Quinn é o agente de qualidade — meticuloso, sistemático, e sem condescendência. Quinn não aprova código que não satisfaz os critérios. Quinn não faz exceções por pressão de prazo. Quinn é o último gate antes do código ir para produção, e leva essa
- **@architect — Aria: A Visionária Sistêmica** — **Persona:** Aria pensa em sistemas, não em features. Sua perspectiva é sempre de longo prazo: como essa decisão afeta a manutenibilidade em um ano? Como esse componente vai escalar? Quais trade-offs estamos aceitando e por quê? Aria é a pessoa que faz as perg
- **@data-engineer — Dara: A Especialista em Dados** — **Persona:** Dara combina rigor matemático com pragmatismo de produção. Ela sabe que um schema mal projetado vai custar meses de dívida técnica, e não tem medo de complicar um pouco o design hoje para evitar uma migração dolorosa amanhã. Mas também sabe quando
- **@analyst — Alex: O Investigador** — **Persona:** Alex é movido por curiosidade e rigor. Quando recebe uma questão, ele a decompõe, busca evidências, triangula fontes, e só apresenta conclusões quando tem base suficiente para defendê-las. Alex é o agente mais desconfortável com incerteza — o que 
- **@ux-design-expert — Uma: A Defensora da Experiência** — **Persona:** Uma é empática por definição. Ela não consegue olhar para um fluxo de UX sem se colocar no lugar do usuário. Frequentemente é a voz que diz "tecnicamente funciona, mas o usuário vai se perder aqui" — e frequentemente está certa. **Escopo principal
- **@devops — Gage: O Guardião do Repositório** — **Persona:** Gage é sistemático, cuidadoso, e tem fobia de "funciona na minha máquina". Cada deploy é tratado como um evento de alto risco que exige verificação prévia. Gage não apressa, não pula etapas, e não faz push de código que não passou pelos gates. Gag
- **@aiox-master — O Governador do Framework** — O `@aiox-master` é diferente de todos os outros agentes em um aspecto fundamental: ele não tem um escopo restrito. Ele pode executar qualquer operação, contornar qualquer boundary, e override qualquer gate — quando necessário para a saúde do framework. **Quand
- **7.3 A Matriz de Autoridade** — A matriz de autoridade do AIOX define, para cada operação crítica, qual agente pode executá-la, quais não podem, e quais condições especiais se aplicam.
- **Operações Exclusivas por Agente** — | Operação | Agente Exclusivo | Outros Agentes | |----------|-----------------|----------------| | `git push` | `@devops` (Gage) | BLOQUEADO |
- **Operações Compartilhadas com Restrições** — | Operação | Agentes Permitidos | Restrições | |----------|-------------------|------------| | `git add`, `git commit` | `@dev`, `@aiox-master` | `@qa` não commita código de implementação |
- **Padrões de Delegação** — **Git Push Flow:** Qualquer agente que produziu commits → `@devops *push` @dev faz commits locais ↓
- **7.4 Memória de Agente: O MEMORY.md** — Cada agente tem um arquivo `MEMORY.md` em `agents/{nome}/MEMORY.md`. Esse arquivo é o mecanismo de persistência de contexto entre sessões.
- **O Que Armazenar no MEMORY.md** — **Decisões arquiteturais:** "Em 12/03/2025, decidimos usar UUIDs v4 em vez de auto-increment IDs após análise de Aria. Motivação: facilita sincronização futura entre ambientes e evita enumeração de recursos." **Padrões estabelecidos:** "Todos os endpoints de A
- **O Que NÃO Armazenar no MEMORY.md** — **Informações temporárias:** "Estamos trabalhando na story 3.2 agora" — isso muda constantemente e deve ficar no estado da story, não na memória. **Detalhes de implementação específicos:** O código em si não vai no MEMORY.md. A *decisão* de usar aquela abordag
- **O Ciclo de Vida do MEMORY.md** — O MEMORY.md começa vazio na instalação e cresce gradualmente. Cada agente é responsável por manter o seu próprio. As boas práticas incluem: - Adicionar entradas ao MEMORY.md ao final de cada sessão com decisões relevantes - Revisar o MEMORY.md periodicamente p
- **7.5 O Protocolo de Handoff: Eficiência na Troca de Agentes** — Em sessões longas onde múltiplos agentes são usados em sequência, o contexto acumulado pode se tornar um problema. Cada agente carrega sua persona, suas instruções, seu conjunto de skills — e ao trocar de agente, você potencialmente acumula todo esse contexto.
- **O Artefato de Handoff** — Quando você troca de agente, o agente que está sendo encerrado produz mentalmente um artefato de handoff com aproximadamente 379 tokens (comparado aos 3.000-5.000 tokens do perfil completo): handoff: from_agent: "dev"
- **O Que É Preservado vs. Descartado** — **SEMPRE preservar:** - Story ID e caminho do arquivo - Status atual da story
- **Os Números da Eficiência** — O impacto dessa compactação é mensurável: **Primeira troca (@sm → @dev):** - Perfil do `@sm` descartado: ~3.000 tokens
- **Limite de Artefatos Retidos** — O sistema mantém um máximo de 3 artefatos de handoff simultaneamente. Na quarta troca de agente, o artefato mais antigo é descartado. Esse limite existe porque artefatos de handoffs muito antigos frequentemente se tornam irrelevantes — as decisões descritas ne
- **7.6 Quem Chamar e Quando: O Mapa de Decisão** — A pergunta mais comum dos alunos que chegam ao AIOX pela primeira vez não é "como funciona o Spec Pipeline?" ou "o que é um Handoff Protocol?". É mais simples e mais honesta do que isso: **"Eu sei que os agentes existem, mas não sei por onde começar."** Esse m
- **A Tabela de Decisão** — | Situação | Agente | Por quê | |----------|--------|---------| | Você tem uma ideia vaga, sem clareza sobre mercado ou viabilidade | `@analyst` (Alex) | Alex faz pesquisa de mercado, análise de concorrentes, valida premissas com dados antes de você investir t
- **A Diferença Que Muda Tudo: AIOX Core vs. Squads** — Existe uma distinção fundamental que confunde quem está começando: a diferença entre os **agentes do AIOX Core** e os **Squads**. **AIOX Core** é a sua empresa de software já instalada. Quando você instala o AIOX em um projeto, você já tem os 10 agentes da tab
- **Cenários Práticos: Por Onde Começar** — Algumas situações concretas para calibrar o seu instinto: **"Quero criar uma landing page"** Começa com `@pm` para o PRD (o que a landing page precisa comunicar, qual o objetivo de conversão, quem é o usuário). Depois `@sm` quebra em stories implementáveis. En
- **Exercício do Capítulo 7** — **Objetivo:** Explorar os agentes na prática e desenvolver intuição sobre quando usar cada um. **Parte 1: Explorando o `*help`** Ative cada um dos seguintes agentes e execute `*help`:

---

## Capítulo 08 — Seu Primeiro Ciclo: Story Development Cycle

**TL;DR:** O SDC é o coração do AIOX. 4 fases, 5 agentes, 2 gates de qualidade. Do vazio ao deploy em produção, com rastreabilidade total.

**Dificuldade:** intermediario · **Tempo:** 50 min

**Você vai aprender:**
- Executar um SDC completo
- Entender cada fase e handoff
- Dominar os 3 modos de @dev
- Aplicar os 7 checks do QA Gate

**Conceitos-chave:** Story Development Cycle, 4 fases (Create/Validate/Implement/QA), PO Checklist (10 pontos), QA Gate (7 checks), 3 modos (Interactive/YOLO/Pre-Flight)

**Comandos CLI mencionados:**
- `@sm *create-story`
- `@po *validate-story-draft`
- `@dev *task dev-develop-story`
- `@dev *task dev-develop-story --mode=yolo`
- `@qa *task qa-gate`
- `@devops *push`

**Seções:**
- **8.1 O SDC em Visão Geral** — Todo sistema de desenvolvimento profissional tem um ciclo de vida. No AIOX, esse ciclo se chama **Story Development Cycle**, ou simplesmente SDC. Ele é o coração pulsante do framework — o processo que transforma uma ideia no backlog em código versionado e entr
- **Ativando River** — Para iniciar o SDC, você ativa o Scrum Master: @sm River entra em modo ativo e responde com um resumo do estado atual: epic ativo, stories pendentes, e o que está pronto para a próxima story a ser criada. Se não há epic ativo, River vai pedir que você defina u
- **O Processo create-next-story** — Quando você executa `*create-story`, River vai passar por um processo de elicitação que inclui: **1. Identificar o epic pai.** Toda story pertence a um epic. River verifica qual é o epic ativo e extrai o contexto relevante: objetivos, critérios de sucesso do e
- **O Template de Story** — O output de `*create-story` é um arquivo no formato `docs/stories/{epicNum}.{storyNum}.story.md`. O template padrão tem a seguinte estrutura:
- **Status** — Draft
- **Context** — {Contexto relevante para quem vai implementar}
- **Requirements** — {Lista numerada de requisitos funcionais}
- **Acceptance Criteria** — - [ ] AC-1: {Critério verificável} - [ ] AC-2: {Critério verificável} - [ ] AC-3: {Critério verificável}
- **Technical Notes** — {Notas técnicas, restrições, considerações de arquitetura}
- **Dependencies** — - {Story ou sistema do qual esta story depende}
- **Risk Assessment** — - {Risco identificado e mitigação proposta}
- **Estimation** — {Complexidade estimada}
- **File List** — {Preenchido durante implementação}
- **Dev Notes** — {Preenchido durante implementação} O status `Draft` é o ponto de partida. Uma story em Draft está pronta para ser validada pelo PO, mas não está pronta para implementação. Essa distinção é fundamental.
- **Quando Usar Modo *draft vs *create-story** — `*draft` é uma versão mais rápida do processo — cria o esqueleto da story com menos elicitação, útil quando você tem contexto suficiente e quer iterar rapidamente. `*create-story` é o processo completo com elicitação guiada, recomendado para qualquer story de 
- **O Problema que a Validação Resolve** — Existe um padrão de falha clássico em desenvolvimento: o desenvolvedor começa a implementar uma story, no meio do caminho percebe que os critérios de aceite são ambíguos, toma uma decisão de implementação baseada na sua interpretação, e entrega algo que não co
- **Ativando Pax e Executando a Validação** — @po *validate-story-draft Pax executa a task `validate-next-story.md` e aplica o **checklist de 10 pontos** sobre a story em Draft: **Ponto 1: Critérios de aceite são mensuráveis e verificáveis?**
- **A Decisão GO / NO-GO** — O resultado da validação é um score de 0 a 10: - **Score >= 7 (GO):** A story avança para status `Ready`. Está pronta para implementação. - **Score 5-6 (NO-GO com lista):** A story volta para revisão com a lista específica dos pontos que falharam. River ou o h
- **Ativando Dex** — @dev Dex assume o controle com contexto da story em Ready. O comando central desta fase é: @dev *task dev-develop-story
- **Os 3 Modos de Implementação** — O AIOX oferece três modos de implementação, cada um com trade-offs diferentes entre velocidade, controle humano, e segurança. No modo Interactive, Dex apresenta o plano de implementação antes de cada decisão técnica significativa e pede confirmação antes de av
- **Atualizando Checkboxes e File List** — Um dos padrões mais importantes do AIOX durante a implementação é a atualização contínua da story. Dex não escreve código e depois atualiza a story no final — ele atualiza conforme avança. Cada critério de aceite completado recebe um `[x]`:
- **Acceptance Criteria** — - [x] AC-1: Endpoint POST /api/users retorna HTTP 201 com payload correto - [x] AC-2: Senha é armazenada com bcrypt, mínimo 12 rounds - [ ] AC-3: Email de boas-vindas é enviado via serviço de email
- **File List** — - src/modules/auth/auth.controller.ts (criado) - src/modules/auth/auth.service.ts (criado) - src/modules/auth/auth.module.ts (criado)
- **Git Local: A Regra do @dev** — Dex tem autoridade total sobre operações de git no repositório **local**. Ele pode e deve fazer commits frequentes durante a implementação: git add src/modules/auth/ git commit -m "feat: implement user registration endpoint [Story 1.3]"
- **A Filosofia de Quinn** — Quinn não é um inimigo do progresso. É o guardião da qualidade — e existe uma diferença fundamental entre os dois papéis. Um inimigo do progresso busca encontrar problemas para atrasar entregas. Um guardião da qualidade busca identificar problemas antes que el
- **Os 7 Quality Checks** — @qa *task qa-gate Quinn executa a task `qa-gate.md` e passa a story por **7 verificações de qualidade**: **Check 1: Todos os critérios de aceite foram implementados?**
- **Os 4 Veredictos** — O resultado do QA Gate é um dos quatro veredictos: **PASS:** Todos os checks passaram. A story está pronta para entrega. O status muda para `InReview` e o processo avança para `@devops`. **CONCERNS:** Um ou mais checks identificaram problemas que não são bloqu
- **O Status na Story** — Ao final do QA Gate, o status da story reflete o resultado: - PASS → `InReview` - FAIL → `InProgress` (volta para @dev)
- **A Última Milha** — O código passou por criação, validação, implementação, e QA. Está pronto para ir para o mundo. Essa última milha é propriedade exclusiva de Gage. @devops *push Gage executa uma sequência de operações que garante que a entrega seja feita de forma controlada e r
- **Story** — [Story 1.3](docs/stories/1.3.story.md)
- **Changes** — - Novo módulo auth com controller, service e DTOs - Testes unitários com cobertura de 94% - Documentação de API atualizada
- **QA Gate** — PASS — Todos os 7 checks passaram." **4. Atualização de status.** A story muda de `InReview` para `Done`.
- **Por Que Apenas @devops Pode Fazer Push?** — Esta regra está entre as mais importantes — e mais frequentemente questionadas — do AIOX. A resposta tem três dimensões: **Accountability clara.** Quando você olha o histórico de merges no repositório, sabe exatamente que cada push passou por Gage. Se algo pro
- **8.7 Retrospectiva: O Que Aconteceu** — Ao completar seu primeiro SDC, vale pausar para entender o que acabou de acontecer.
- **O Que Foi Criado** — Uma story que começou como uma ideia no backlog percorreu um caminho estruturado: 1. **Especificação** com critérios verificáveis (River) 2. **Validação** por um guardião de valor (Pax)
- **A Proporção Determinístico vs. IA** — Um dos insights mais valiosos que o SDC revela é a proporção entre o que é determinístico e o que realmente exige inteligência artificial. **Python/determinístico:** - Scaffolding de arquivos e pastas
- **O Papel do Humano no SDC** — Uma pergunta legítima: "Se os agentes fazem tudo isso, qual é o meu papel?" Seu papel é o de **operador consciente**. Você: - Define o epic e as prioridades de negócio
- **Exercício: Execute o SDC Completo** — Este exercício vai guiar você pelo seu primeiro SDC completo. Escolha uma feature simples — criação de um endpoint de health check, por exemplo — e execute as cinco fases. **Pré-requisito:** Um projeto com epic ativo em `docs/` e configuração básica do AIOX. *
- **8.8 Caso Prático: Landing Page do Zero ao Deploy** — Teoria sem prática é arquitetura sem construção. Esta seção documenta um caso real — demonstrado em aula no dia 26 de março de 2026 — onde o SDC foi aplicado do zero para entregar uma landing page completa de assessoria esportiva individual, com captura de lea
- **O Cenário** — Uma landing page de vendas para assessoria esportiva individual. Público-alvo: pessoas que treinam mas se sentem sem suporte e direção. O objetivo da página é converter visitantes em leads — capturando nome e WhatsApp — e armazenar esses dados em banco de dado
- **A Analogia do Restaurante** — Antes de detalhar os passos, vale entender a arquitetura do ponto de vista de um leigo. Pense no sistema como um restaurante: | Componente | Analogia | Tecnologia | |---|---|---|
- **O Passo a Passo** — Antes de chamar o `@dev`, você precisa do conteúdo. Desenvolvedores sem copy constroem páginas com texto placeholder — e placeholder nunca vira copy de conversão. A ordem certa é: copy primeiro, código depois. Para isso, o primeiro passo foi criar um squad esp
- **Erros Comuns Documentados** — Dois problemas se repetiram em diferentes execuções desse fluxo e merecem registro explícito: **Submódulo vazio no GitHub.** Causa: `npx create-next-app` cria um `.git` interno na pasta `landing/`. O repositório pai interpreta isso como submódulo Git, e a past
- **O Que Este Caso Ensina** — Quarenta minutos do zero à URL pública. Isso não é marketing — foi o tempo real em aula. O que torna isso possível não é velocidade imprudente. É a combinação de responsabilidades bem distribuídas: o copywriter fez o copy antes do código existir, o PM formaliz

---

## Capítulo 09 — Qualidade Sem Compromisso: Gates e QA Loop

**TL;DR:** 3 camadas de qualidade + QA Loop iterativo com verdicts automáticos e escalação. Qualidade é investimento, não burocracia.

**Dificuldade:** intermediario · **Tempo:** 35 min

**Você vai aprender:**
- Entender as 3 camadas de qualidade
- Operar o QA Loop iterativo
- Interpretar verdicts PASS/CONCERNS/FAIL/WAIVED
- Saber quando escalar BLOCKED

**Conceitos-chave:** 3 Camadas, QA Loop, Max 5 iterações, Verdicts, CodeRabbit, WAIVED consciente

**Comandos CLI mencionados:**
- `@qa *task qa-gate`
- `@qa *qa-loop {storyId}`
- `@qa *qa-loop-review`
- `@dev *qa-loop-fix`
- `@qa *escalate-qa-loop`

**Seções:**
- **9.1 As 3 Camadas de Qualidade** — Qualidade em desenvolvimento de software não é um evento. É uma propriedade emergente de múltiplas camadas de verificação que se sobrepõem e se complementam. O AIOX incorpora essa visão em sua arquitetura: existem três camadas de qualidade distintas, cada uma 
- **Camada 1: Gates da Constitution** — A primeira camada de qualidade não é executada por um agente — é executada pela própria arquitetura do sistema. A **Constitution** define princípios inegociáveis que bloqueiam automaticamente violações antes que elas aconteçam. Os gates constitucionais mais re
- **Camada 2: O Checklist de 10 Pontos do PO** — A segunda camada acontece antes da implementação. Pax aplica o checklist de 10 pontos sobre a story em Draft para garantir que o que vai ser implementado está suficientemente especificado. Essa camada responde à pergunta: **"Está certo o que pedimos para fazer
- **Camada 3: O QA Gate de 7 Checks** — A terceira camada acontece após a implementação. Quinn aplica 7 verificações sobre o código produzido para garantir que o que foi implementado corresponde ao que foi pedido, e que foi implementado com qualidade adequada. Essa camada responde à pergunta: **"Foi
- **Por Que Três Camadas?** — A resposta intuitiva seria: "uma camada rigorosa basta". Mas considere os tipos de problemas que cada camada captura: - **Constitution gates** capturam violações de processo e autoridade — coisas que nenhuma revisão humana vai consistentemente pegar porque dep
- **9.2 QA Loop: O Ciclo Iterativo de Revisão** — O QA Gate do capítulo anterior representa a revisão inicial após a implementação. Mas o que acontece quando essa revisão retorna FAIL? Ou quando retorna CONCERNS que precisam de iteração? O **QA Loop** é o mecanismo para gerenciar esse processo de forma estrut
- **O Problema que o QA Loop Resolve** — Sem estrutura, o processo de revisão-correção parece assim: Quinn identifica problemas. Dex corrige. Quinn revisa. Dex corrige novamente. E assim por diante, sem estado compartilhado, sem limite de iterações, e sem visibilidade de quantas vezes o ciclo já rodo
- **Como o QA Loop Funciona** — O QA Loop é iniciado com: @qa *qa-loop {storyId} A partir daí, o ciclo funciona assim:
- **Comandos do QA Loop** — O QA Loop tem um conjunto completo de comandos para gerenciar o ciclo: **`*qa-loop {storyId}`** — Inicia um novo loop para a story especificada. Executa o primeiro QA review automaticamente. **`*qa-loop-review`** — Retoma o loop na fase de review. Útil quando 
- **O Estado do Loop e a Memória entre Iterações** — Um aspecto crítico do QA Loop é a memória entre iterações. Quando Quinn faz a segunda revisão, ela sabe o que foi encontrado na primeira, o que foi corrigido, e o que foi explicitamente deixado pendente. Isso evita regressões onde uma correção resolve um probl
- **O Limite de 5 Iterações** — O QA Loop tem um limite configurável de iterações (padrão: 5). Esse limite existe por uma razão importante: se uma story está falhando no QA Gate depois de 5 tentativas de correção, o problema não é de implementação — é de especificação. Uma story que não cons
- **Os 3 Verdicts do QA Loop** — Cada iteração do loop resulta em um de três verdicts: **APPROVE:** A story passou em todos os checks relevantes. Pode ser que alguns issues de iterações anteriores tenham sido dispensados (WAIVED) com justificativa, mas não há blockers pendentes. O loop termin
- **Triggers de Escalação** — Há quatro situações que disparam escalação automática: **`max_iterations_reached`:** O loop atingiu o limite configurado sem aprovação. Escalado para `@aiox-master` com histórico completo de iterações para análise. **`verdict_blocked`:** Quinn retornou BLOCKED
- **O Papel do @aiox-master na Escalação** — Quando o `@aiox-master` recebe uma escalação do QA Loop, ele tem autoridade para: 1. **Mediar o conflito técnico** entre Quinn e Dex, tomando uma decisão baseada no contexto completo do projeto. 2. **Determinar que o problema é de especificação**, retornando a
- **9.4 Integração com CodeRabbit** — O CodeRabbit é uma ferramenta de code review automatizado que pode ser integrada ao fluxo do AIOX para adicionar uma camada adicional de verificação antes do QA Gate.
- **Onde CodeRabbit se Encaixa** — A integração com CodeRabbit acontece durante a Fase 3 (implementação) e antes da Fase 4 (QA Gate). Especificamente, após Dex completar a implementação e antes de executar `@qa *task qa-gate`, você pode rodar CodeRabbit para obter um review automático do diff.
- **Como Usar no Contexto AIOX** — O CodeRabbit no contexto AIOX serve dois propósitos específicos: **Auto-healing de problemas de estilo:** Issues como formatação inconsistente, imports não utilizados, e violações de linting que o CodeRabbit identifica automaticamente. Dex pode aplicar essas c
- **Self-Healing e o Limite de 2 Iterações** — Uma regra importante na integração do CodeRabbit com o AIOX: o self-healing automático tem máximo de 2 iterações. Isso significa que Dex pode aplicar correções sugeridas pelo CodeRabbit automaticamente até duas vezes. Se após duas iterações ainda há issues sig
- **Configuração Básica** — Para usar CodeRabbit no fluxo AIOX, você precisa da ferramenta instalada e acessível. A invocação típica para review pre-commit é: coderabbit --prompt-only -t uncommitted Para review de tudo que divergiu da branch main:
- **CodeRabbit Automático via `*setup-github`** — Quando o `@devops` executa `*setup-github`, o CodeRabbit é configurado automaticamente para rodar em cada Pull Request. Isso significa que após o setup inicial, você não precisa invocar o CodeRabbit manualmente — ele roda como parte do CI/CD no GitHub. A progr
- **9.5 Quando Qualidade Vira Burocracia** — Existe um paradoxo no coração de qualquer sistema de qualidade: o mesmo rigor que previne bugs em produção pode, se mal calibrado, se tornar um impedimento ao progresso. Um sistema de qualidade que paralisa o desenvolvimento não está cumprindo sua função — por
- **O Equilíbrio Correto** — A regra prática: o nível de rigor deve ser proporcional ao risco. Uma mudança de configuração de text no frontend não precisa do mesmo rigor de qualidade que uma mudança no módulo de autenticação. Uma story de correção de typo não precisa do mesmo processo que
- **WAIVED: O Uso Consciente da Dispensa** — O veredicto WAIVED existe para situações legítimas onde um check não se aplica. Alguns exemplos reais: **Cobertura de testes:** O check de cobertura falha porque o código toca um módulo legado que não pode ser testado unitariamente sem mocking extensivo que nã
- **Modo YOLO: Velocidade com Consciência** — Para stories simples, bugs óbvios, ou mudanças de configuração de baixo risco, o modo YOLO existe para remover a fricção do processo sem remover a rastreabilidade. Em YOLO: - Dex implementa sem confirmações intermediárias
- **O Limite Não-Negociável** — Há um conjunto de medidas de qualidade que nunca devem ser waived ou contornadas, independente do tamanho da mudança: 1. **Story deve existir.** Não há push sem story. Nem para bugfix urgente. 2. **@devops é o único que faz push.** Sem exceções.
- **Exercício: Simule uma Iteração de QA Loop** — Este exercício é sobre desenvolver intuição para o processo de revisão iterativa. **Cenário:** Você tem uma story implementada com os seguintes issues: 1. Falta cobertura de testes para o caso de erro HTTP 500

---

## Capítulo 10 — Spec Pipeline e Brownfield: Workflows Avançados

**TL;DR:** SDC não é o único workflow. Spec Pipeline para features com incerteza, Brownfield Discovery para projetos legados. Escolha o certo para cada situação.

**Dificuldade:** avancado · **Tempo:** 40 min

**Você vai aprender:**
- Dominar as 6 fases do Spec Pipeline
- Completar um Brownfield Discovery
- Classificar complexidade (SIMPLE/STANDARD/COMPLEX)
- Compor workflows para cenários reais

**Conceitos-chave:** Spec Pipeline, 6 Fases (Gather/Assess/Research/Write/Critique/Plan), 3 Classes, Brownfield Discovery, 10 Fases de Assessment, Technical Debt

**Comandos CLI mencionados:**
- `@pm *spec-pipeline`
- `@pm *spec-pipeline --class=simple`
- `@architect *assess-complexity`

**Seções:**
- **Introdução: Além do SDC** — O Story Development Cycle é o workflow de referência do AIOX — ele cobre a grande maioria do trabalho de desenvolvimento. Mas existem situações onde o SDC, por si só, não é suficiente. Quando você está diante de uma feature complexa que ainda não tem requisito
- **O Problema que o Spec Pipeline Resolve** — Features complexas têm uma propriedade inconveniente: o custo de descobrir os requisitos errados cresce exponencialmente conforme você avança no desenvolvimento. Um erro de requisito descoberto durante o Spec Pipeline custa uma conversa de 30 minutos. O mesmo 
- **As 6 Fases do Spec Pipeline** — O Spec Pipeline tem 6 fases, mas nem sempre todas são executadas. A complexidade da feature determina quais fases são necessárias. **Fase 1: Gather (@pm)** Morgan inicia o processo coletando os requisitos no formato estruturado. O output é `requirements.json` 
- **As 3 Classes de Complexidade** — A Fase 2 do Spec Pipeline classifica a feature em uma de três classes: **SIMPLE (score <= 8):** Features que afetam poucos arquivos, não têm integrações externas significativas, não precisam de mudanças de infraestrutura, e a equipe tem familiaridade alta com 
- **As 5 Dimensões de Complexidade** — A classificação de complexidade é feita em 5 dimensões, cada uma pontuada de 1 a 5: **Dimensão 1: Scope (Escopo)** Quantos arquivos/módulos serão afetados?
- **Os Verdicts do Critique** — A Fase 5 (Critique) produz um dos três verdicts: **APPROVED (average score >= 4.0):** A spec está bem escrita, com rastreabilidade clara, critérios verificáveis, e sem lacunas significativas. O Spec Pipeline termina aqui (exceto o Plan para COMPLEX). **NEEDS_R
- **O Gate do Artigo IV: Nenhuma Invenção** — O gate mais importante do Spec Pipeline está na Fase 5. Quinn verifica que **cada afirmação na spec.md tem rastreabilidade para um requisito documentado**. Não pode haver features na spec que não foram explicitamente solicitadas. Isso é o Artigo IV da Constitu
- **Iniciando o Spec Pipeline** — @pm *spec-pipeline Morgan vai iniciar o processo de elicitação da Fase 1. Você fornece o contexto inicial — a ideia, o pedido de stakeholder, os objetivos de negócio — e Morgan transforma isso no processo estruturado. ---
- **O Contexto: Entrando num Projeto Existente** — Você foi contratado para modernizar um sistema que existe há 8 anos. Ou você está retomando um projeto que ficou parado por meses. Ou você quer usar o AIOX num projeto que já tem código mas foi desenvolvido sem o framework. Em todos esses casos, o problema é o
- **As 10 Fases do Brownfield Discovery** — **Fase 1: System Architecture Assessment (@architect)** Aria mapeia a arquitetura atual do sistema. O output é `system-architecture.md`, um documento que registra: - Componentes e suas responsabilidades
- **O QA Gate da Fase 7 em Detalhe** — O QA Gate do Brownfield Discovery é diferente do QA Gate do SDC porque o que está sendo avaliado é um documento de análise, não código implementado. Quinn verifica: 1. **Completude:** Todos os componentes do sistema foram analisados? 2. **Validação dos débitos
- **10.3 Escolhendo o Workflow Certo** — Com três workflows disponíveis (SDC, Spec Pipeline, Brownfield Discovery), a pergunta natural é: como sei qual usar? A resposta está num conjunto de perguntas diagnósticas:
- **O Guia de Seleção de Workflow** — | Situação | Workflow | |----------|----------| | Você tem uma story clara com requisitos bem definidos | SDC diretamente |
- **Os Sinais de que Você Escolheu o Workflow Errado** — **Sinal de que deveria ter usado Spec Pipeline:** - Dex está frequentemente bloqueando por falta de clareza nos requisitos - O QA Loop está em 3+ iterações por causa de ambiguidade de critérios
- **Composição de Workflows** — Os workflows são compostos, não exclusivos. O Brownfield Discovery resulta em stories que entram no SDC. O Spec Pipeline produz uma spec que informa as stories do SDC. O SDC inclui QA Loop como mecanismo iterativo. O fluxo de trabalho típico num projeto novo c
- **Exercício: Aplicando o Workflow Correto** — Este exercício desenvolve a habilidade de seleção de workflow. **Cenário 1:** Você precisa adicionar um campo de "bio" ao perfil de usuário. O campo é um textarea com máximo 500 caracteres, exibido na página de perfil público. - Qual workflow você usaria?

---

## Capítulo 11 — O Conceito de Squad

**TL;DR:** Squad é uma Business Unit — equipe especializada de agentes com domínio, dados e memória compartilhada. Muito além de um agente individual.

**Dificuldade:** avancado · **Tempo:** 35 min

**Você vai aprender:**
- Distinguir Squad de Agente individual
- Conhecer anatomia de um squad
- Entender os 4 tiers e 4 níveis de distribuição
- Reconhecer os 5 sinais para criar um squad

**Conceitos-chave:** Business Unit, squad.yaml, Memória Compartilhada, 4 Tiers (0/1/2/3), 4 Níveis de distribuição, book-squad, analytics-squad

**Seções:**
- **11.1 O Que É Um Squad** — Quando a maioria das pessoas pensa em usar IA para trabalhar com um domínio específico de conhecimento — uma área de produto, uma vertical de mercado, um conjunto de práticas — elas pensam em "treinar um modelo" ou "criar um prompt especializado". Ambas as abo
- **11.2 A Anatomia de um Squad** — Todo squad no AIOX tem a mesma estrutura base, independente do domínio. Entender essa estrutura é fundamental para criar squads eficazes.
- **Diretório Base** — squads/ └── {squad-name}/ ├── squad.yaml # Manifesto do squad
- **O squad.yaml: O Manifesto** — O manifesto define o squad como um todo: name: investment-analysis version: 1.0.0
- **Os Agentes do Squad** — Cada agente em um squad tem uma definição que segue o mesmo padrão dos agentes de desenvolvimento do AIOX — persona, skills, autoridade — mas especializada para o domínio do squad. Um agente de squad não tem as mesmas autoridades que um agente de desenvolvimen
- **A Memória do Squad: MEMORY.md** — Cada squad tem um arquivo `MEMORY.md` que funciona como a mente coletiva da equipe. Diferente do MEMORY.md individual de cada agente de desenvolvimento, a memória do squad captura: - Decisões de análise feitas anteriormente sobre entidades do domínio - Padrões
- **11.3 Squad vs. Agente: Quando Cada Um** — A diferença entre usar um agente individual e usar um squad não é apenas de complexidade — é de natureza do problema.
- **Quando Um Agente Individual É Suficiente** — Use um agente individual quando: - O problema tem uma perspectiva dominante (é essencialmente um problema de desenvolvimento, ou essencialmente um problema de qualidade) - A tarefa é bem delimitada e não exige múltiplas especialidades
- **Quando Um Squad É Necessário** — Use um squad quando: - O problema requer múltiplas perspectivas especializadas - A qualidade da análise depende de expertise acumulada no domínio
- **A Hierarquia de Uso** — Em termos de profundidade e especialização: Prompt direto → Agente individual → Squad especializado Cada nível adiciona especialização, consistência, e profundidade — mas também adiciona setup e custo de tokens. Escolha o nível certo para o problema em mãos.
- **11.4 O Sistema de Tiers: Organizando a Complexidade** — Squads não são todos iguais em escopo ou responsabilidade. O AIOX organiza squads em um sistema de tiers que define sua posição na hierarquia operacional:
- **Tier 0 — Fundação** — Squads de infraestrutura que servem como base para todos os outros. São "meta-squads" — squads que gerenciam squads. Exemplo: o Squad Creator, que cria e valida outros squads, opera no Tier 0.
- **Tier 1 — Tático** — Squads que coordenam operações entre múltiplos squads de execução. São os "gerentes" — decidem prioridade, alocam recursos, resolvem conflitos. O gap mais comum em projetos AIOX é a **ausência do tier tático**. Muitos operadores criam squads de execução (Tier 
- **Tier 2 — Operacional** — Squads de execução que produzem outputs concretos de um domínio específico. A maioria dos squads que você vai criar são Tier 2: squads de copy, de análise, de design, de pesquisa.
- **Tier 3 — Experts Cirúrgicos** — Squads ultra-especializados que fazem uma única coisa com profundidade extrema. Um squad que só faz análise de risco de crédito, ou que só escreve cláusulas contratuais de M&A. São chamados "cirúrgicos" porque atuam com precisão máxima em um domínio mínimo.
- **Serviços Compartilhados entre Squads** — Squads não operam em isolamento completo. O AIOX suporta serviços compartilhados que qualquer squad pode consumir: - **Registry:** Catálogo centralizado de todos os squads e seus commands - **Refresh Registry:** `*refresh-registry` atualiza os slash commands d
- **11.5 Quando Criar Um Squad** — A decisão de criar um squad deve ser guiada por critérios claros. Criar um squad desnecessariamente adiciona overhead sem benefício. Não criar um squad quando necessário resulta em análises inconsistentes e superficiais.
- **Os 5 Sinais de Que Você Precisa de Um Squad** — **Sinal 1: Você está explicando o mesmo contexto de domínio repetidamente.** Toda vez que você abre uma sessão, gasta 10-15 minutos re-explicando o contexto do domínio para a IA. Isso é sinal de que esse contexto precisa ser encapsulado num squad com memória p
- **Os Domínios Mais Comuns** — Squads são criados para uma variedade de domínios. Os mais comuns em projetos AIOX: **Squads de Análise de Negócio:** Análise competitiva, análise de mercado, due diligence de empresas, avaliação de oportunidades. **Squads de Conteúdo:** Criação de conteúdo pa
- **11.6 Os Squads Oficiais do AIOX** — O AIOX vem com um conjunto de squads oficiais pré-configurados. Esses squads foram desenhados para os domínios mais comuns e servem como referência de qualidade para squads customizados.
- **Squad: book-squad** — O squad para criação de livros e conteúdo longo de alta qualidade. Composto por: - **Estrategista de conteúdo:** Define estrutura, audiência, e objetivos do livro - **Pesquisador:** Faz research de mercado, benchmarks, e fontes
- **Squad: analytics-squad** — Squad para análise de dados e métricas de negócio: - **Analista de dados:** Interpreta datasets e métricas - **Estatístico:** Valida metodologia e significância
- **Squad: research-squad** — Squad para pesquisa e síntese de informação: - **Pesquisador primário:** Coleta e valida fontes - **Analista de padrões:** Identifica tendências e conexões
- **11.7 Níveis de Distribuição de Squads** — Squads podem operar em diferentes níveis de distribuição — do uso pessoal até squads como serviço para múltiplos usuários.
- **Nível 1: Uso Pessoal** — O squad vive no seu projeto AIOX local. Você é o único operador. O squad acessa seus dados locais, tem memória que só você alimenta, e produz outputs para seu uso pessoal ou profissional. Este é o ponto de entrada. Ideal para squads de análise pessoal, criação
- **Nível 2: Uso em Equipe** — O squad é versionado no repositório do projeto e a equipe inteira tem acesso. A memória é compartilhada (arquivo MEMORY.md no repositório) e os dados de primeiro partido são centralizados. Este nível requer atenção ao controle de acesso: quem pode alimentar da
- **Nível 3: Squad como API** — O squad expõe uma interface de API que outros sistemas podem chamar. Um sistema de CRM pode chamar o squad de análise de clientes. Um pipeline de dados pode chamar o squad de research para enriquecer registros. Esse nível envolve empacotamento do squad como se
- **Nível 4: Squad como Produto** — O squad se torna um produto que usuários externos acessam através de uma interface. Pode ser um CLI, uma interface web, um bot de Slack, ou uma integração com outro sistema. Este é o nível de productização máximo — o squad deixa de ser uma ferramenta interna e
- **Conectando Squads e o Ciclo de Desenvolvimento** — Uma pergunta comum: squads e o SDC são coisas separadas? A resposta é: são complementares e integrados. O SDC governa o desenvolvimento do software que implementa os squads, ou que usa os squads como componente. Se você está construindo um produto onde um squa

---

## Capítulo 12 — Montando Seu Primeiro Squad

**TL;DR:** Guia prático: escolha de domínio, mapeamento de entidades, scaffolding com Python, persona writing em 4 camadas e os 5 estágios de maturidade.

**Dificuldade:** avancado · **Tempo:** 55 min

**Você vai aprender:**
- Montar um squad do zero
- Mapear entidades sem sobreposição
- Escrever personas em 4 camadas
- Alimentar dados de primeiro partido

**Conceitos-chave:** Domain Design, Entity Mapping, Scaffolding Python, 4 Camadas de Persona, Golden Set, 5 Fases de Maturidade, Board of Advisors

**Comandos CLI mencionados:**
- `python scaffold_squad.py {name}`
- `@squad-name *{command}`

**Seções:**
- **Introdução: Da Teoria à Prática** — O capítulo anterior explicou o que é um squad e por que o conceito existe. Este capítulo vai guiar você passo a passo pelo processo de montar um squad funcional, do zero até o primeiro output em produção. Vamos usar um exemplo concreto ao longo de todo o capít
- **12.1 Escolhendo o Domínio: A Decisão Mais Importante** — Antes de criar qualquer arquivo, você precisa de clareza sobre o domínio do squad. Essa é a decisão mais importante do processo — e é onde a maioria dos squads mal projetados nasce.
- **As 4 Perguntas de Definição de Domínio** — **Pergunta 1: Qual é o problema específico que este squad resolve?** Errado: "Análise de empresas" Certo: "Avaliar startups em estágio early-stage (pré-seed a Series A) para decisão de investimento anjo, com foco em mercados de tecnologia B2B no Brasil"
- **O Mapa de Domínio** — Com as quatro perguntas respondidas, você tem o que chamamos de Mapa de Domínio: Domínio: Análise de startups B2B early-stage (Brasil) Perspectivas: mercado, tecnologia, equipe, síntese
- **12.2 Mapeando as Entidades do Squad** — Com o domínio definido, o próximo passo é mapear as entidades — os agentes que vão compor o squad.
- **Princípio de Separação de Concerns** — Cada agente em um squad deve ter uma perspectiva que não se sobrepõe significativamente com os demais. Não crie dois agentes que fazem a mesma coisa de formas ligeiramente diferentes. Crie agentes com perspectivas genuinamente diferentes que se complementam. P
- **12.3 Scaffolding com Python** — O Princípio Code First se aplica diretamente aqui: a criação da estrutura de arquivos do squad é uma operação determinística. Não use IA para criar pastas e arquivos — escreva um script Python.
- **O Script de Scaffolding** — """ scaffold_squad.py — Cria estrutura base de um squad AIOX Uso: python scaffold_squad.py startup-analysis
- **Persona** — {name} é um especialista em {specialty}.
- **Background** — [Descreva o background profissional e experiência do agente]
- **Skills** — - [Skill principal 1] - [Skill principal 2] - [Skill principal 3]
- **Perspectiva** — [Descreva a perspectiva única que este agente traz]
- **O Que Este Agente Analisa** — [Lista de aspectos que este agente avalia]
- **O Que Este Agente NÃO Analisa** — [Lista explícita do que está fora do escopo]
- **Output Esperado** — [Formato e conteúdo do output deste agente] """ for agent in agents:
- **Decisões de Análise** — [Registre aqui análises significativas e suas conclusões]
- **Padrões Identificados** — [Padrões observados ao longo do tempo no domínio]
- **Calibrações** — [Ajustes de critérios e preferências do operador]
- **Contexto Acumulado** — [Contexto relevante que os agentes devem carregar entre sessões] """ with open(base_path / "MEMORY.md", "w") as f:
- **12.4 Configurando os Agentes: A Parte que Exige IA** — Com a estrutura criada, você vai preencher os templates de persona para cada agente. Esta é a parte que genuinamente exige inteligência artificial — criar personas convincentes, com background credível, skills específicas, e perspectiva distinta requer o tipo 
- **Anatomia de uma Persona de Squad** — Uma persona de squad bem escrita tem quatro camadas: **Camada 1: Identidade Profissional** Quem é esta pessoa? Qual é sua trajetória? O que a torna especialista nesse domínio específico? Seja específico — não "30 anos de experiência em finanças" mas "10 anos c
- **Persona** — Marina opera como uma analista de mercado sênior com 12 anos de experiência avaliando oportunidades de mercado para fundos de VC. Ela passou pelos dois lados: analista de mercado num fundo Tier 1 e depois como gerente de produto numa startup
- **Perspectiva Característica** — Marina sempre começa pela pergunta de timing: "Por que agora?" Mercados existem há décadas; o que mudou que torna este produto viável, necessário, e capturável neste momento específico? Ela busca os "unfair advantages estruturais" — mudanças
- **Framework de Análise de Mercado** — Quando Marina avalia uma startup, ela estrutura a análise em quatro blocos: **Bloco 1: Tamanho e Segmentação** - TAM (Total Addressable Market) — top-down e bottom-up
- **O Que Marina NÃO Analisa** — Marina não avalia: - Qualidade técnica do produto ou stack (isso é domínio de Theo) - Background e capacidade dos fundadores (isso é domínio de Sofia)
- **12.5 Alimentando Dados de Primeiro Partido** — Personas bem escritas são o fundamento. Os dados de primeiro partido são o que transforma um squad genérico num squad expert no seu contexto específico.
- **O Que São Dados de Primeiro Partido** — Dados de primeiro partido são informações únicas e proprietárias que você coloca no squad e que não estão disponíveis publicamente. Exemplos: **Para o squad de startups:** - Teses de investimento específicas da sua firma
- **Estrutura dos Dados no Squad** — squads/startup-analysis/data/ ├── knowledge/ │ ├── investment-thesis.md # Tese de investimento da firma
- **Como os Agentes Usam os Dados** — Os dados são referenciados nas personas dos agentes:
- **Contexto de Primeiro Partido** — Marina usa os seguintes dados proprietários ao analisar mercados: - `/data/knowledge/investment-thesis.md` — tese de investimento que deve guiar o foco do mercado
- **12.6 Testando o Squad** — Antes de usar o squad em situações reais, você precisa testá-lo. O teste de um squad tem quatro dimensões.
- **Teste 1: Coerência de Persona** — Cada agente deve responder de forma consistente com sua persona, independente do que você perguntar. Teste simples: faça a mesma pergunta para dois agentes diferentes. As respostas devem ser genuinamente diferentes — perspectivas diferentes, focos diferentes, 
- **Teste 2: Respeito de Limites** — Cada agente deve saber quando está fora de seu domínio e delegar adequadamente. Teste: peça para Marina avaliar o stack técnico de uma startup. A resposta correta é: "Stack técnico está fora do meu domínio de análise. Theo vai avaliar isso. O que posso dizer d
- **Teste 3: Qualidade de Output** — O output de cada agente deve ser utilizável, não apenas correto. Teste: dê um caso real (ou realista) para cada agente e avalie: o output tem a profundidade que você esperaria de um especialista real? Falta alguma dimensão importante? Há afirmações que parecem
- **Teste 4: Colaboração** — Quando o squad opera como equipe (com Victor sintetizando os outputs de Marina, Theo, e Sofia), a síntese deve ser coerente e must refletir os inputs de forma balanceada. Teste: execute uma análise completa, observe como Victor incorpora os inputs dos outros a
- **12.7 Comandos do Squad** — Squads têm comandos, da mesma forma que agentes individuais têm comandos com o prefixo `*`.
- **Definindo Comandos no squad.yaml** — commands: - name: analyze-startup description: "Análise completa de uma startup"
- **Invocando Comandos do Squad** — @startup-analysis *analyze-startup Isso ativa o squad e executa o workflow `analyze-startup`, passando o input pelos agentes na sequência definida. Para um comando mais específico:
- **Workflow Sequential vs. Parallel** — **Sequential:** Os agentes executam em ordem. O output de cada agente é disponível para os agentes subsequentes. Victor recebe os outputs de Marina, Theo, e Sofia antes de sintetizar. Mais lento, mas permite que a síntese seja genuinamente informada pelos inpu
- **12.8 O Caminho Simplificado: 6 Passos para Criar um Squad** — Para quem está começando, existe um caminho simplificado que o Squad Creator automatiza: 1. **Defina em uma frase** o que o squad faz: "Analisa startups para investimento" 2. **Chame o Squad Creator:** `/squad-creator:squad-chief`
- **O Caminho Avançado: Como Alan Faz** — Para squads de alta qualidade, Alan segue um processo mais rigoroso: 1. **Round Table** — Consulta o Board de Advisors (clones de Ray Dalio, Naval Ravikant, Charlie Munger, etc.) sobre a estratégia do squad 2. **Tech Research** — Pesquisa via `@analyst` as mel
- **12.9 Maturidade do Squad: As 5 Fases** — Como Pedro Valério diz: **"O primeiro squad é cocô — é adubo."** E isso é intencional. Squads nascem imperfeitos e amadurecem com uso:
- **Fase 1: Infância (Criação)** — O squad foi criado mas ainda não executou. Agentes têm personas básicas, tasks são genéricas. É um rascunho — destrua e reconstrua sem apego.
- **Fase 2: Adolescência (Validação)** — O squad está sendo testado com dados reais. Você identifica problemas, ajusta personas, refina tasks. Semanas 1-2 de uso ativo.
- **Fase 3: Maturidade (Serviços e Tools)** — O squad produz outputs consistentes. Você adiciona ferramentas (MCPs, Discovery Tools), conecta com outros squads. Semanas 3-4.
- **Fase 4: Adulto (Produtização)** — O squad opera com confiança. Meta: **90%+ de consistência em 20+ execuções**. Pronto para ser empacotado como serviço.
- **Fase 5: Empresa (Escala)** — O squad atende múltiplos clientes/projetos. Tem monitoramento, métricas, e processo de melhoria contínua. ---
- **12.10 Squads Nascem de Processos Validados** — Uma regra da Aula 07 que merece destaque: **squads devem nascer de processos humanos validados**. O fluxo correto: 1. **Execute manualmente** — Faça o processo à mão primeiro
- **Regra do Max 3-4 Agentes** — Talles, do cohort, validou: squads com **máximo 3-4 agentes** são mais eficientes. Squads grandes têm overhead de coordenação que degrada a qualidade. Se precisa de mais, segmente em squads menores e coordene entre eles. ---
- **Exercício: Monte Seu Squad** — Escolha um domínio onde você tem expertise real ou onde você tem necessidade frequente de análise qualificada. Pode ser análise de concorrentes, criação de conteúdo especializado, avaliação de candidatos, pesquisa de produtos. **Passo 1:** Responda as 4 Pergun

---

## Capítulo 13 — Productizando Squads: Do CLI ao Serviço

**TL;DR:** Jornada de 4 fases: solo → equipe → API → produto. Determinize o que é determinístico, faça routing de modelos e venda pelo valor.

**Dificuldade:** avancado · **Tempo:** 50 min

**Você vai aprender:**
- Mapear as 4 fases de productização
- Decidir o que determinizar
- Implementar routing Opus/Sonnet/Haiku
- Empacotar squad como serviço com FastAPI

**Conceitos-chave:** 4 Fases de Productização, Determinização, Hierarquia de Modelos, FastAPI Wrapper, Golden Set, Observabilidade, Serviço Produtizado

**Seções:**
- **A Jornada de Maturidade** — Um squad nasce como uma ferramenta pessoal. Você o usa para analisar startups, gerar conteúdo, ou pesquisar tópicos — e ele funciona bem para você. Mas em algum momento surge uma pergunta: "E se outras pessoas pudessem usar isso?" Essa pergunta marca o início 
- **Fase 1: Squad Local (Solo)** — **O que é:** O squad vive no seu projeto AIOX local. Você é o único usuário. A memória é local, os dados são locais, e você interage via CLI. **Características:** - Setup mínimo — basta criar o squad e começar a usar
- **Fase 2: Squad em Equipe (Repositório Compartilhado)** — **O que é:** O squad é versionado no repositório do projeto. Múltiplos membros da equipe têm acesso. A memória compartilhada fica no arquivo MEMORY.md commitado. **Características:** - Qualquer membro da equipe pode usar o squad
- **Fase 3: Squad como API** — **O que é:** O squad expõe uma interface de API HTTP. Outros sistemas podem chamar o squad programaticamente. Usuários não-técnicos podem acessar via frontend simples ou integração com ferramentas que eles já usam (Slack, Notion, etc.). **Características:** - 
- **Fase 4: Squad como Produto** — **O que é:** O squad tem uma interface de produto própria — uma aplicação web, um bot, ou integração nativa com outra plataforma. Usuários finais interagem sem saber que há um squad AIOX por baixo. **Características:** - UX desenhada especificamente para o dom
- **13.2 O Que Determinizar: A Decisão Mais Importante** — Na jornada de productização, a decisão mais importante não é "qual framework de API usar" ou "como estruturar o banco de dados". É: **o que pode ser determinizado?** Determinizar significa transformar uma operação que usa IA em uma operação que usa código Pyth
- **O Mapa de Determinização para Squads** — **Operações que SEMPRE devem ser determinísticas:** | Operação | Código Python | |----------|---------------|
- **O Anti-Pattern de Productização** — O anti-pattern mais comum é usar IA para operações determinísticas durante a productização porque "é mais fácil". É mais fácil no curto prazo. No longo prazo, você tem: - Custos crescendo proporcionalmente ao uso (quando poderiam ser constantes) - Latência alt
- **13.3 A Hierarquia de Custo de Modelos** — Na Fase 3 e Fase 4, você vai lidar com múltiplos usuários e volume crescente de requests. Nesse contexto, a escolha de modelo para cada operação tem impacto direto no custo operacional.
- **A Hierarquia** — Claude Opus (mais poderoso, mais caro) ↓ Claude Sonnet (balanceado)
- **Matching de Operação com Modelo** — **Opus:** Reserve para operações que exigem o mais alto nível de raciocínio — síntese final de análises de alto valor, casos edge complexos, operações onde a qualidade tem impacto financeiro significativo. **Sonnet:** Use para a maioria das operações cognitiva
- **Estimativa de Custo Real** — Para calibrar a estratégia de modelos, faça a matemática com uso esperado: Se você espera 100 análises completas por mês: - Com tudo em Opus: X tokens × $15/MTok = custo alto
- **O Servidor API Mínimo** — Para a Fase 3, você precisa de um servidor API que exponha os comandos do squad. Um exemplo usando FastAPI: from fastapi import FastAPI, HTTPException, Depends from pydantic import BaseModel
- **O Manifesto de Deployment** — Para deployar o squad como serviço, você precisa de um manifesto que descreva os recursos necessários: service: name: startup-analysis-squad
- **13.5 Operação em Equipe** — Quando o squad atende múltiplos usuários, você precisa de práticas operacionais que vão além do que é necessário para uso solo.
- **Controle de Qualidade em Produção** — Um problema que surge na Fase 3 e 4: como você sabe que o squad continua produzindo outputs de qualidade após mudanças de personas, dados, ou modelos? **Práticas essenciais:** **Golden set de testes:** Crie um conjunto de inputs com outputs esperados (ou outpu
- **Gestão de Custos em Produção** — O custo de um squad em produção tem dois componentes: o custo fixo (infraestrutura, API overhead) e o custo variável (tokens de LLM). O custo variável é o que pode escalar descontroladamente. **Práticas de controle de custo:** class CostGuard:
- **13.6 Monitoramento e Observabilidade** — Um squad em produção precisa de observabilidade. Sem ela, você descobre problemas quando usuários reclamam — não antes.
- **O Que Monitorar** — **Métricas de negócio:** - Volume de análises por período - Taxa de outputs aprovados por usuários (via feedback)
- **Dashboard Mínimo** — Para a Fase 3, um dashboard simples mas funcional cobre as perguntas mais importantes: Análises hoje: 47 (↑ 12% vs ontem) Custo total hoje: $4.23 (budget: $20/dia)
- **A Transição Entre Fases É Reversível** — Uma nota importante antes de encerrar o capítulo: você não está preso numa fase. Squads podem avançar e retroceder. Se você construiu uma Fase 3 e o volume de uso não justifica a infraestrutura, você pode voltar para Fase 2 sem perder nada — o squad continua f
- **A Era do Serviço Produtizado, Não do SaaS** — Alan Nicolas é enfático: **"Estamos na era do serviço produtizado, não do SaaS."** A fricção de multiplataforma mata SaaS. Cada nova ferramenta que o cliente precisa aprender, cada novo login, cada nova interface — é fricção que reduz adoção. Serviço produtiza
- **Nunca Venda o Squad, Venda a Solução** — Regra fundamental de monetização: **não mencione AIOX para o cliente**. O cliente não quer saber que você usa IA, que tem agentes, que tem workflows. O cliente quer o resultado. Venda o resultado. **Nunca comece vendendo.** Gere valor até ouvir "quanto custa?"
- **Precificação Pelo Valor** — **"Não meça pela sua régua."** Se você cobra R$2k porque é o que acharia justo pagar, está subcobrando. Precifique pelo valor que o resultado gera para o cliente, não pelo seu custo de produção. Exemplos reais do mercado: - **Brand Books:** R$10-15k (mentorado
- **Os 3 Caminhos de Negócio** — O cohort identificou 3 modelos viáveis: | Caminho | Descrição | Escala | |---------|-----------|--------|
- **Cada Funcionalidade Vira Endpoint** — Na Aula 07, Pedro introduziu o conceito de **workers compartilhados** — infraestrutura de microserviços que qualquer squad pode consumir: infrastructure/services/ ├── etl-worker/ # Extração e transformação de dados
- **n8n como Gateway** — O n8n é a porta de entrada para quem quer aprender APIs e webhooks. Funciona self-hosted, já tem skill/MCP no GitHub, e permite criar automações visuais que conectam squads a ferramentas externas. Alan usa **ClickUp + 47 automações via webhooks** para orquestr
- **Workflows Pequenos e Modulares** — Regra da Aula 07: **workflows pequenos e modulares > workflow gigante**. Cada mudança de status é um trigger que aciona um workflow específico. Isso permite: - Debug isolado (problema num workflow não afeta outros) - Reutilização (o mesmo workflow serve múltip
- **Exercício: Mapeie a Jornada do Seu Squad** — Pegue o squad que você criou no Capítulo 12 (ou qualquer squad que você planeja criar). **Análise de Fase Atual:** - Em qual fase o squad está hoje?

---

## Capítulo 14 — Orquestrando Épicos

**TL;DR:** Épicos são objetivos multi-story. Morgan orquestra decomposição, dependências, blockers e checkpoints através de EPIC-EXECUTION.yaml.

**Dificuldade:** avancado · **Tempo:** 35 min

**Você vai aprender:**
- Criar e executar um épico completo
- Decompor épicos em stories sequenciadas
- Gerenciar blockers com escalação
- Dividir épicos grandes em múltiplos sprints

**Conceitos-chave:** Épicos vs Stories, EPIC-EXECUTION.yaml, Matriz de Dependências, Blockers, Sprint Checkpoints, Split Epic

**Comandos CLI mencionados:**
- `@pm *create-epic`
- `@pm *execute-epic {id}`
- `@pm *epic-status {id}`
- `@pm *sprint-checkpoint {id}`
- `@pm *split-epic {id}`

**Seções:**
- **14.1 O Que É Um Épico** — No SDC, a unidade de trabalho é a story — um incremento implementável em alguns dias com critérios de aceite claros. Mas projetos reais raramente se reduzem a stories isoladas. Existem objetivos de produto maiores que requerem múltiplas stories, múltiplas sema
- **O Arquivo EPIC-EXECUTION.yaml** — O épico vive num arquivo YAML de execução que Morgan gerencia. Esse arquivo é o "cérebro" do épico — contém tudo que é necessário para entender o estado atual e o que precisa acontecer a seguir. epic: id: "EPIC-3"
- **Por Que um Arquivo YAML e Não uma Story?** — A pergunta é legítima. A resposta está na natureza do que está sendo gerenciado. Uma story descreve um **trabalho a ser feito**. Ela tem critérios de aceite, escopo, e estado fixo. Um épico descreve um **objetivo em andamento**. Ele tem múltiplos estados paral
- **Iniciando com Morgan** — @pm *create-epic Morgan conduz um processo de elicitação que cobre: **1. Definição de objetivo.** Qual é o resultado de negócio que o épico deve produzir? Não "implementar autenticação" mas "usuários podem fazer login de forma segura e conveniente, o que é blo
- **O Princípio de Decomposição** — Decompor um épico em stories exige uma habilidade específica: identificar o menor incremento que entrega valor independente das stories subsequentes. O anti-pattern mais comum: stories que só fazem sentido como uma unidade monolítica. "Implementar autenticação
- **O Ciclo de Execução** — Após criar o épico com `*create-epic`, Morgan gerencia a execução com: @pm *execute-epic EPIC-3 Esse comando inicia o ciclo de execução, que funciona assim:
- **Visibilidade em Tempo Real** — A qualquer momento durante a execução, você pode verificar o estado do épico: @pm *epic-status EPIC-3 Morgan produz um summary como:
- **EPIC-3: Sistema de Autenticação Multi-Tenant** — Status: InProgress (28.5% completo) Progresso: 2/7 stories completas Stories em progresso:
- **14.5 Gerenciando Blockers** — Blockers são eventos que impedem o progresso de uma story ou do épico como um todo. O AIOX tem protocolos específicos para identificação, escalação, e resolução de blockers.
- **Tipos de Blockers** — **Blocker técnico:** A implementação descobriu um problema técnico não antecipado que requer decisão antes de continuar. Exemplo: "O ORM atual não suporta multi-tenancy de forma nativa — precisamos decidir entre trocar o ORM ou implementar isolamento a nível d
- **O Protocolo de Blocker** — Quando Dex encontra um blocker durante a implementação: @dev: "Encontrei um blocker na Story 3.3. O JWT library atual não suporta rotação automática de refresh tokens que é
- **Blockers que Não Se Resolvem** — Ocasionalmente, um blocker revela que uma story precisa ser reescrita, ou que a decomposição original do épico estava errada. Nesses casos, Morgan escala para revisão do planejamento: @pm *revise-epic-scope EPIC-3 Isso inicia um processo de reavaliação do esco
- **14.6 Épicos em Múltiplos Sprints** — Épicos de alta complexidade se estendem por múltiplos sprints. O AIOX gerencia isso através de **sprint checkpoints** — momentos formais de revisão do estado do épico ao final de cada sprint.
- **O Sprint Checkpoint** — @pm *sprint-checkpoint EPIC-3 Morgan executa uma análise formal que inclui: **Progresso:** Quantas stories foram completadas neste sprint? Estava no planejado?
- **Quando Épicos Ficam Grandes Demais** — Um épico que vai além de 4-6 semanas de implementação é frequentemente um sinal de que o escopo está grande demais. Épicos muito grandes têm problemas específicos: - A incerteza acumulada cresce com o tempo — o que foi definido no início pode não fazer mais se
- **Exercício: Crie e Execute Seu Primeiro Épico** — **Passo 1 — Identificar o Objetivo:** Pense num objetivo de produto que requer mais de uma story para ser alcançado. Pode ser uma feature completa, uma área de produto que precisa de refatoração, ou um conjunto de melhorias relacionadas. **Passo 2 — Criar o Ép

---

## Capítulo 15 — Otimização: Tokens, Contexto e Performance

**TL;DR:** 80% dos tokens vêm de 20% das operações. Audit, determinize, gerencie contexto agressivamente e faça routing multi-modelo.

**Dificuldade:** avancado · **Tempo:** 45 min

**Você vai aprender:**
- Dominar a anatomia do custo (input/output/operacional)
- Aplicar Code First avançado
- Gerenciar contexto sem degradação
- Implementar estratégia multi-LLM

**Conceitos-chave:** 80/20 de Custo, Code First Avançado, /clear vs /compact, Code Intelligence, Multi-LLM Routing, Waves, GitHub Worktrees

**Comandos CLI mencionados:**
- `aiox doctor`
- `aiox stats`
- `aiox stats --period=7d`
- `aiox stats --group-by=operation`
- `/clear`

**Seções:**
- **15.1 A Anatomia do Custo** — Usar IA com método significa entender o que custa. Não de forma obsessiva — mas com a mesma consciência que um engenheiro tem sobre a complexidade computacional do código que escreve. O custo de um sistema AIOX tem três componentes:
- **Componente 1: Custo de Input (Tokens Enviados)** — Cada mensagem que você envia para um modelo inclui: o contexto do sistema (personas, regras, memória), o histórico da conversa, e a instrução atual. O total de tokens de input é a soma de todas essas partes. O maior inimigo do custo de input é o **contexto não
- **Componente 2: Custo de Output (Tokens Gerados)** — Tokens de output custam mais que tokens de input (tipicamente 3-5x). Um agente que responde com análises longas e detalhadas quando uma resposta concisa seria suficiente é um agente que custa mais do que precisa. A otimização aqui é de instrução: personas bem 
- **Componente 3: Custo Operacional (Infraestrutura e Tempo)** — Para squads em produção (Fase 3+), há custos de infraestrutura: servidores, banco de dados, Redis para cache. Esses custos são geralmente menores que os custos de tokens de LLM, mas crescem com o uso.
- **A Regra dos 80/20 de Custo** — Em projetos típicos, 80% dos tokens são consumidos por 20% das operações. Identificar e otimizar essas operações de alto custo tem impacto desproporcional no custo total. As operações de alto custo mais comuns: - Análises de código em arquivos grandes (o arqui
- **Os Vazamentos Silenciosos** — Existem custos que a maioria dos operadores não percebe: **Servidores MCP consomem contexto passivamente.** Cada MCP registrado no seu ambiente consome entre **8% e 30%** da janela de contexto apenas por estar registrado — mesmo sem usar nenhuma ferramenta. So
- **15.2 Code First Avançado: Maximizando a Proporção Determinística** — O princípio Code First foi introduzido no início do livro. Na otimização avançada, a pergunta não é "o que Python pode fazer?" — é "o que Python pode fazer que eu ainda estou deixando para a IA?"
- **Audit de Operações** — Faça uma lista de todas as operações que acontecem em um ciclo típico de development no seu projeto. Para cada operação, classifique honestamente: Python ou IA necessária. **Operações que frequentemente acabam com IA quando deveriam ser Python:** **Verificação
- **{epic['epic']['title']}** — Progresso: {len(done)}/{len(stories)} stories ({pct:.1f}%) Em progresso: {len(in_progress)} stories Blockers ativos: {len(blocked)}
- **O Mapa de Economia** — Para cada operação que você migra de IA para Python, estime: - Frequência por semana - Tokens médios por operação
- **15.3 Gerenciamento de Contexto** — O contexto de uma sessão AIOX cresce naturalmente com o uso. Sem gestão, esse crescimento resulta em: - Custos crescentes (mais tokens de input em cada mensagem) - Latência crescente (modelos processam mais devagar com contextos gigantes)
- **`/clear` vs `/compact` — A Escolha Certa** — O cohort convergiu numa recomendação clara: **`/clear` é melhor que `/compact`**. O `/compact` tenta preservar contexto resumindo a conversa. Mas o resumo nem sempre captura o que importa — e o processo de compactação consome ~20.000 tokens por sessão. O `/cle
- **O Protocolo de Compactação de Handoff** — O protocolo de Agent Handoff (definido nas regras do AIOX) é a primeira ferramenta de gestão de contexto. Quando você troca de agente, o contexto do agente anterior é **compactado** num handoff artifact de ~500 tokens em vez de ser carregado integralmente. Sem
- **Gestão Manual de Contexto** — Além do handoff automático, há situações onde você precisa gerenciar contexto manualmente: **Quando iniciar nova sessão:** Para cada nova story, considere iniciar uma sessão nova em vez de continuar a sessão atual. Uma sessão nova começa com contexto limpo — a
- **A Estratégia de Contexto por Camadas** — Camada 1: Context permanente (sempre carregado) - Personas de agentes - Regras fundamentais do projeto
- **15.4 Code Intelligence: Enriquecendo Operações** — O AIOX tem um sistema de **Code Intelligence** que enriquece operações com dados de análise de código — mas apenas quando disponível. É sempre opcional, com graceful degradation quando não configurado.
- **O Que é Code Intelligence** — Code Intelligence é um provider de metadados sobre o código: quais funções existem, quais módulos importam o quê, onde uma função específica é chamada, quais são as dependências de um módulo. Com Code Intelligence disponível, operações de desenvolvimento ganha
- **Configurando Code Intelligence** — O provider de Code Intelligence é configurado em `core-config.yaml`: code_intelligence: provider: "nogic" # ou outro provider configurado
- **Quando Code Intelligence Tem Mais Impacto** — **Análise de impacto:** "Quais módulos serão afetados se eu mudar a interface do módulo X?" Sem Code Intelligence, requer análise manual de dependências. Com Code Intelligence, resposta imediata. **Sugestão de onde implementar:** "Em qual módulo esta função de
- **15.5 Debug e Diagnóstico de Performance** — Quando o AIOX está lento, caro, ou produzindo outputs de qualidade abaixo do esperado, você precisa de ferramentas para diagnosticar.
- **O Dashboard de Diagnóstico** — aiox doctor O comando `aiox doctor` produz um diagnóstico completo do sistema: AIOX Doctor — Diagnóstico do Sistema
- **Identificando Operações de Alto Custo** — Para identificar quais operações estão consumindo mais tokens: aiox stats --period=7d --group-by=operation Output típico:
- **Detectando Degradação de Qualidade** — A degradação de qualidade é mais sutil que problemas de custo — você não recebe um erro, você recebe um output pior. Os sinais a observar: **Aumento na taxa de rejeição do PO:** Se Pax está rejeitando mais stories que antes, ou as stories estão saindo com scor
- **15.6 Estratégia Multi-LLM** — O AIOX não está preso a um único modelo de LLM. Uma estratégia multi-LLM usa o modelo certo para cada tipo de operação.
- **O Princípio de Adequação de Modelo** — Nem toda tarefa cognitiva é igual. A síntese final de um memo de investimento exige capacidades diferentes de uma classificação simples de tipo de bug. Usar o modelo mais poderoso para tudo é desperdício; usar o modelo mais fraco para tudo é degradação de qual
- **Implementando Routing de Modelos** — model_routing: default: "claude-sonnet-4-5" overrides:
- **O Impacto Real no Custo** — Para um projeto com 50 stories por mês, 30% de operações simples (Haiku), 60% de operações padrão (Sonnet), e 10% de operações complexas (Opus): - **Sem routing** (tudo Opus): ~$X/mês - **Com routing**: ~$0.35X/mês (65% de economia)
- **15.7 Waves: Desenvolvimento Paralelo** — O conceito de **Waves** representa uma fronteira na otimização do AIOX: múltiplos agentes trabalhando em tasks independentes simultaneamente, cada um em sua própria instância.
- **Como Funciona** — Em vez de executar stories sequencialmente (Story 1 → Story 2 → Story 3), você identifica stories independentes que podem ser desenvolvidas em paralelo. Cada story roda em sua própria "wave" — uma instância separada do Claude Code com seu próprio contexto.
- **GitHub Worktrees como Base** — Alan Nicolas testou e recomenda **GitHub worktrees** como a infraestrutura para Waves. Um worktree é uma cópia do repositório que compartilha o mesmo `.git` mas tem seu próprio working directory e branch: git worktree add ../wave-1 feat/story-3.1 git worktree 
- **Pré-Requisitos para Waves** — Waves só funcionam quando: - As stories são genuinamente independentes (sem dependências entre si) - O planejamento do épico identificou quais stories podem paralelizar
- **Agent Teams (Experimental)** — A feature `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` do Claude Code vai além de worktrees: permite que agentes em instâncias separadas se comuniquem entre si. Isso é o futuro das Waves — agentes que colaboram em tempo real em tasks paralelas. ---
- **Checklist de Otimização** — Use este checklist mensalmente para garantir que o seu projeto AIOX está operando de forma eficiente: **Custo:** - [ ] Rodou `aiox stats --period=30d` e revisou top operações por custo?

---

## Capítulo 16 — Patterns e Anti-Patterns

**TL;DR:** 10 patterns que funcionam + 19 anti-patterns observados no cohort real. Reconheça os sinais antes de cometer os erros.

**Dificuldade:** avancado · **Tempo:** 50 min

**Você vai aprender:**
- Aplicar os 10 patterns consistentes
- Identificar anti-patterns antes de cometê-los
- Adotar mentalidade de operador consciente
- Aprender com lições reais do cohort

**Conceitos-chave:** 10 Patterns, 19 Anti-Patterns, Mentalidade de Operador, Doc Rot, Modo Epifania, Squad Decorativo, Prompt Monolítico

**Seções:**
- **Introdução: Aprendendo com Quem Errou Primeiro** — Nenhum framework nasce maduro. Os patterns documentados aqui emergiram de uso real — projetos que funcionaram, projetos que falharam, e a análise honesta de por quê cada um foi como foi. Um pattern é uma solução que funcionou em contextos múltiplos e pode ser 
- **Pattern 1: Story Antes de Tudo** — **Descrição:** Todo trabalho começa com uma story. Sem exceção. Bug fix urgente? Story. Refatoração rápida? Story. Hotfix às 23h? Story — mesmo que seja um parágrafo. **Por que funciona:** A story não é burocracia. É o mecanismo que garante que existe um regis
- **Pattern 2: PO Gate Como Investimento** — **Descrição:** Trate o checklist de 10 pontos do Pax como investimento, não como overhead. Cada minuto de validação economiza potencialmente horas de retrabalho. **A matemática:** Uma story mal especificada que passa direto para implementação e descobre um pro
- **Pattern 3: Commits Frequentes e Descritivos** — **Descrição:** Dex (e você) devem fazer commits frequentes durante a implementação, com mensagens que referenciam a story e o AC sendo implementado. **Por que funciona:** Commits granulares têm três benefícios: permitem reverter mudanças específicas sem perder
- **Pattern 4: Memória como Ativo** — **Descrição:** Trate o MEMORY.md de cada agente como um ativo de projeto, não como um arquivo de log. Cuide dele ativamente — adicione decisões importantes, remova contexto obsoleto, organize por relevância. **O sinal de que está funcionando:** No início de um
- **Pattern 5: Fail Fast no QA Loop** — **Descrição:** Quando o QA Loop identifica um problema HIGH severity, não continue com os outros checks. Escalate imediatamente. **Por que funciona:** Um problema HIGH severity em check inicial frequentemente indica problemas fundamentais de implementação que 
- **Pattern 6: Spec Pipeline para Incerteza Alta** — **Descrição:** Sempre que você perceber que está redefinindo os critérios de aceite de uma story várias vezes antes de começar a implementar — pare. Isso é sinal de incerteza alta. Execute o Spec Pipeline antes de criar a story. **O teste de incerteza:** Se vo
- **Pattern 7: Brownfield Antes de Qualquer Coisa em Projetos Legados** — **Descrição:** Ao assumir um projeto existente sem documentação, o primeiro épico é sempre Brownfield Discovery. Não crie stories de feature antes de ter o assessment técnico. **A tentação a resistir:** "Eu sei o suficiente para começar a implementar. O Brownf
- **Pattern 8: Escalação Imediata de BLOCKED** — **Descrição:** Quando qualquer agente retorna BLOCKED, escale para `@aiox-master` imediatamente. Não tente resolver um BLOCKED circulando entre @dev e @qa em loop. **O anti-pattern correspondente:** @dev e @qa entrando em ciclo de "corrige / identifica problem
- **Pattern 9: Dashboard de Custo como Ritual Semanal** — **Descrição:** Reserve 15 minutos semanalmente para revisar o dashboard de custo via `aiox stats`. Identifique anomalias e operações que poderiam ser determinizadas. **O que procurar:** Spikes de custo inexplicados, operações que cresceram desproporcionalmente
- **Pattern 10: Versionamento de Personas** — **Descrição:** Trate as personas dos agentes como código — versione-as, documente as mudanças, e tenha um processo formal para mudanças significativas. **Por que importa:** Uma mudança inadvertida numa persona pode alterar o comportamento do agente de formas s
- **Anti-Pattern 1: O Prompt Monolítico** — **Descrição:** Em vez de usar o sistema de agentes, você escreve um único prompt gigante que tenta fazer tudo de uma vez: "Crie uma story, valide-a, implemente-a, e faça QA em um único response." **Por que falha:** O resultado é superficial em tudo e profundo 
- **Anti-Pattern 2: MEMORY.md Negligenciado** — **Descrição:** O MEMORY.md de cada agente cresce indefinidamente sem curadoria, acumulando contexto desatualizado e conflitante. **Sintomas:** - Agentes produzindo outputs inconsistentes entre sessões
- **Anti-Pattern 3: Skip do PO Gate** — **Descrição:** Pular a validação do Pax para economizar tempo, especialmente em stories "simples". **Por que é um anti-pattern:** Não existe story "simples o suficiente para pular o PO Gate". A complexidade não é o ponto — a clareza de critérios é. Uma story d
- **Anti-Pattern 4: @dev Fazendo Push** — **Descrição:** Dar permissão para @dev fazer `git push` diretamente para o repositório remoto, "porque é mais rápido". **Por que é anti-pattern:** Essa "otimização" remove o gate de QA da entrega. Você vai descobrir isso quando code sem QA causar um problema e
- **Anti-Pattern 5: Épico Sem Critérios de Sucesso** — **Descrição:** Criar um épico com uma lista de stories mas sem critérios de sucesso claros para o épico como um todo. **O problema:** Você pode completar todas as stories do épico e ainda não saber se o épico foi bem-sucedido. Sem critérios de sucesso, o épico
- **Anti-Pattern 6: Squad Para Tudo** — **Descrição:** Criar squads para toda necessidade de análise, mesmo para perguntas pontuais e não-recorrentes. **O custo:** Setup de squad tem overhead. Para uma pergunta que você vai fazer uma vez, um agente individual com contexto ad-hoc é mais eficiente. **
- **Anti-Pattern 7: Spec Paralysis** — **Descrição:** Usar o Spec Pipeline como razão para nunca começar a implementação — "a spec não está perfeita ainda". **Por que é anti-pattern:** Uma spec 80% completa que inicia implementação gera feedback real. Uma spec 100% perfeita que nunca chega à implem
- **Anti-Pattern 8: Personas Genéricas** — **Descrição:** Criar agentes (de squad ou de desenvolvimento) com personas vagas e sem especificidade de domínio. "Marina é uma analista experiente que sabe de finanças." **O resultado:** Análises genéricas que não justificam o overhead de usar um squad em vez
- **Anti-Pattern 9: Ignorar os Sinais de Degradação** — **Descrição:** Não monitorar a qualidade dos outputs ao longo do tempo, ignorando sinais de degradação como aumento de rejeições do PO, mais iterações no QA Loop, ou feedback negativo de usuários. **O problema:** Degradação de qualidade é geralmente gradual — 
- **Anti-Pattern 10: O Operador Ausente** — **Descrição:** Configurar o AIOX e assumir que vai funcionar autonomamente sem supervisão ativa — o operador humano se torna apenas um receptor de outputs. **Por que é anti-pattern:** O AIOX amplifica inteligência humana — não a substitui. O operador precisa e
- **A Mentalidade de Operador** — Os 10 patterns e 10 anti-patterns acima podem ser condensados numa única mentalidade: **o operador do AIOX não é um usuário passivo do sistema — é o responsável pelo output final**. Os agentes executam. Os gates validam. Os workflows estruturam. Mas a inteligê
- **O Checklist do Operador Consciente** — Aplique este checklist ao final de cada semana de uso do AIOX: **Rastreabilidade:** - [ ] Todo código que foi para o repositório tem uma story correspondente?
- **Anti-Pattern 11: Pular o PRD e ir direto para o Dev** — **Descrição:** Muitos estudantes tentam chamar o @dev diretamente com uma descrição vaga do que querem construir — "crie uma tela de login com autenticação social". **Por que falha:** Sem PRD, o Dev inventa features, preenche lacunas com texto placeholder, e t
- **Anti-Pattern 12: Usar IA para tudo sem pensar no processo real** — **Descrição:** Tentar usar IA sem antes pensar em como o processo funcionaria na vida real. "Quero lançar um produto digital" — e imediatamente chamar agentes, sem estruturar o pensamento. **O problema fundamental:** Os agentes do AIOX espelham um time de soft
- **Anti-Pattern 13: MCP do Supabase sem permissões configuradas** — **Descrição:** Conectar o Claude Code ao Supabase via MCP sem configurar restrições de permissão adequadas. **O caso real:** Um estudante da cohort teve o banco de dados Supabase inteiro deletado porque o Claude Code com MCP tinha permissões irrestritas config
- **Anti-Pattern 14: Copy como pensamento posterior** — **Descrição:** Solicitar ao @dev que crie páginas e interfaces sem fornecer o copy (conteúdo textual) antecipadamente. **O resultado previsível:** O agente preenche a página com placeholder text — "Lorem ipsum", "Título aqui", "Descrição do produto", "Clique p
- **Anti-Pattern 15: Squad Decorativo** — **Descrição:** Criar squads que são consultivos — respondem perguntas, geram insights — mas nunca resolvem problemas reais. O squad existe, tem agentes bonitos, mas não produz output acionável. **Sintoma:** Você tem 5 squads criados e nenhum problema concreto 
- **Anti-Pattern 16: Modo Epifania (Criar Sem Resolver)** — **Descrição:** Ficar criando squads, agentes, e workflows infinitamente sem nunca entregar valor real. A criação é viciante — mas criar não é resolver. **O salto necessário:** Do squad decorativo para o squad operacional. Do operacional para o produto. Cada ní
- **Anti-Pattern 17: Deixar a IA Criar Tabelas de Banco de Dados** — **Descrição:** Pedir para um agente "crie o banco de dados para meu sistema" sem definir entidades, status, e relações antes. **O resultado:** Overengineering. A IA cria 20 tabelas quando 5 resolveriam. Cria campos que ninguém pediu. Inventa relações que não e
- **Anti-Pattern 18: Documentação Estática (Doc Rot)** — **Descrição:** Manter documentação extensa que desatualiza rapidamente. CLAUDE.md de 300 linhas que ninguém atualiza. READMEs que descrevem o projeto de 3 meses atrás. **Caso real:** Na mentoria, Alan encontrou um CLAUDE.md errado que causou **40.000 tokens de
- **Anti-Pattern 19: Conversar Demais com a IA** — **Descrição:** Sessões longas de conversa com o agente, explicando, re-explicando, ajustando, pedindo reformulações. **O diagnóstico:** Se você está conversando demais, está faltando uma Task ou um Workflow. A conversa é sinal de que o processo não está formal
- **Lições do Cohort: Insights dos Estudantes** — O conhecimento teórico de patterns e anti-patterns é necessário, mas insuficiente. As lições mais valiosas emergem do uso real — dos erros cometidos, das descobertas inesperadas, e dos momentos de clareza que só acontecem quando você está com as mãos na massa.

---

## Capítulo 17 — Referência Completa

**TL;DR:** Manual de bolso: tabelas de agentes/comandos/workflows, mapa de status, Constitution resumida, glossário e troubleshooting.

**Dificuldade:** iniciante · **Tempo:** 60 min

**Você vai aprender:**
- Acessar referência rápida de todos os agentes
- Encontrar o comando certo em segundos
- Consultar glossário de termos-chave
- Resolver problemas comuns

**Conceitos-chave:** Tabela de Agentes, Tabela de Comandos, Tabela de Workflows, Mapa de Status, Glossário, Troubleshooting, Checklists

**Comandos CLI mencionados:**
- `aiox doctor`
- `aiox stats`
- `aiox graph`

**Seções:**
- **17.1 Tabela de Agentes** — Referência rápida de todos os agentes oficiais do AIOX, suas personas, escopos, e comandos exclusivos. | ID | Persona | Papel | Operações Exclusivas | Operações Bloqueadas | |----|---------|-------|---------------------|----------------------|
- **Notas sobre Autoridade** — **Delegação exclusiva:** Operações listadas como exclusivas de um agente não podem ser realizadas por outros agentes, mesmo que tecnicamente possível. Isso é uma regra de processo, não apenas uma convenção. **Escalação:** Quando qualquer agente não consegue co
- **Comandos de Story Development Cycle** — | Comando | Agente | Descrição | Task Executada | |---------|--------|-----------|----------------| | `*create-story` | @sm | Cria story via elicitação completa | `create-next-story.md` |
- **Comandos de QA Loop** — | Comando | Agente | Descrição | |---------|--------|-----------| | `*qa-loop {storyId}` | @qa | Inicia QA Loop para a story |
- **Comandos de Épico** — | Comando | Agente | Descrição | |---------|--------|-----------| | `*create-epic` | @pm | Cria novo épico com decomposição em stories |
- **Comandos de Spec Pipeline** — | Comando | Agente | Descrição | |---------|--------|-----------| | `*spec-pipeline` | @pm | Inicia Spec Pipeline completo |
- **Comandos de Sistema** — | Comando | Interface | Descrição | |---------|-----------|-----------| | `aiox doctor` | CLI | Diagnóstico completo do sistema |
- **17.3 Tabela de Workflows** — | Workflow | Quando Usar | Agentes Envolvidos | Output Principal | |----------|------------|-------------------|-----------------| | **Story Development Cycle (SDC)** | Todo desenvolvimento de feature | @sm, @po, @dev, @qa, @devops | Code merged + Story Done |
- **Fluxo de Seleção de Workflow** — Projeto novo com código existente? Sim → Brownfield Discovery primeiro Não → continua
- **Status de Stories** — | Status | Descrição | Quem Define | Transição Para | |--------|-----------|-------------|----------------| | **Draft** | Story criada, aguardando validação | @sm | Ready (PO aprovação) |
- **Status de Épicos** — | Status | Descrição | |--------|-----------| | **Planning** | Épico criado, stories sendo decompostas |
- **Verdicts do QA Gate** — | Verdict | Significado | Próximo Passo | |---------|-------------|---------------| | **PASS** | Todos os 7 checks passaram | Story → InReview, avança para @devops |
- **Verdicts do QA Loop** — | Verdict | Significado | Próximo Passo | |---------|-------------|---------------| | **APPROVE** | Story aprovada após todas as correções | Fim do loop, story avança |
- **17.5 Resumo da Constitution** — A Constitution define os princípios inegociáveis do AIOX. Gates automáticos bloqueiam violações. | Artigo | Princípio | Severidade | Significado Prático | |--------|-----------|------------|---------------------|
- **Gates Automáticos** — Os seguintes gates são aplicados automaticamente pelo sistema: - **Push sem @devops:** BLOQUEADO - **Story sem ACs verificáveis:** PO retorna NO-GO
- **17.6 Checklist de Setup** — Use este checklist ao inicializar um novo projeto com AIOX.
- **Pré-requisitos** — - [ ] Node.js 18+ instalado - [ ] Git configurado com nome e email - [ ] GitHub CLI instalado e autenticado (`gh auth status`)
- **Instalação do AIOX** — - [ ] `npx aios-core install` executado no diretório do projeto - [ ] `aiox doctor` executado — sem erros críticos - [ ] `core-config.yaml` revisado e customizado para o projeto
- **Configuração de Agentes** — - [ ] Personas dos agentes revisadas - [ ] MEMORY.md inicial criado para cada agente ativo - [ ] Contexto de projeto adicionado ao MEMORY.md dos agentes principais
- **Estrutura de Documentação** — - [ ] `docs/stories/` criado - [ ] `docs/prd/` criado com PRD inicial do projeto - [ ] Pelo menos um epic criado em `docs/` ou definido no AIOX
- **Primeiro Ciclo** — - [ ] `@sm *create-story` executado para primeira story - [ ] `@po *validate-story-draft` executado — score >= 7 - [ ] `@dev *task dev-develop-story` executado com modo Interactive
- **Code Intelligence (Opcional)** — - [ ] Provider de Code Intelligence configurado em `core-config.yaml` - [ ] `aiox doctor` confirma Code Intelligence operacional - [ ] Cache TTL configurado adequadamente
- **17.7 Glossário** — **AC (Acceptance Criteria):** Critério verificável que define quando um requisito de uma story foi implementado com sucesso. Formato: "Dado X, quando Y, então Z" ou condição booleana clara. **Agent Authority:** O conjunto de operações que um agente pode realiz
- **O Que É o Supabase** — Supabase é um Backend-as-a-Service (BaaS) baseado em PostgreSQL. Fornece banco de dados, autenticação, storage de arquivos, e edge functions. No contexto do AIOX, é usado para armazenamento de dados e backend.
- **Configuração Inicial** — 1. Criar conta em `supabase.com` 2. Criar novo projeto: New Project → preencher nome, senha do banco, região (South America - São Paulo recomendado) 3. Aguardar provisionamento (~2 minutos)
- **Obtendo Credenciais** — Caminho: Project → Settings → API - **Project URL**: `https://xxxxx.supabase.co` — endereço do projeto - **anon public key**: chave pública para uso no frontend (começa com `eyJh...`)
- **Interfaces Importantes** — | Interface | Uso | |---|---| | SQL Editor | Executar comandos SQL diretamente (CREATE TABLE, INSERT, etc.) |
- **Variáveis de Ambiente** — NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... Estas variáveis ficam em `.env.local` (NUNCA comitado no Git).
- **Agente Responsável** — `@data-engineer` (Dara) é o agente delegado para operações de banco: schema design, DDL, RLS policies, migrations, query optimization. Em modo avançado, pode usar MCP do Supabase para operações diretas — mas SOMENTE com permissões bem configuradas.
- **Precauções** — - Aprenda o Supabase manualmente antes de automatizar com MCP - MCP sem permissões restritivas pode executar comandos destrutivos - Sempre tenha backup antes de operações críticas
- **O Que É a Vercel** — Vercel é uma plataforma de deploy para aplicações web modernas. Criadores do Next.js, com suporte nativo e otimizado para o framework. Funciona como um container web que lê código diretamente do GitHub e publica automaticamente.
- **Como Funciona** — 1. Vercel conecta-se ao repositório GitHub 2. A cada `git push`, detecta automaticamente e re-deploya 3. Cada deploy gera uma URL única de preview
- **Deploy Inicial** — 1. Acessar `vercel.com` (login com conta GitHub) 2. Add New → Project → Importar repositório do GitHub 3. **CONFIGURAÇÃO CRÍTICA — Root Directory**: Se o projeto Next.js está numa subpasta (ex: `landing/`), clicar em Edit ao lado de "Root Directory" e digitar 
- **Domínio Personalizado** — Para usar domínio próprio: 1. Comprar domínio (Registro.br, GoDaddy, etc.) 2. No Vercel: Settings → Domains → adicionar domínio
- **Debugging no Vercel** — | Aba | Uso | |---|---| | Deployments | Histórico de deploys com status (Success/Error) |
- **Fluxo de Correção de Erros** — 1. Identificar erro na aba Deployments/Logs 2. Copiar texto do erro (ou tirar print da tela) 3. Colar no Claude Code (Ctrl+V aceita imagens)
- **Agente Responsável** — `@devops` (Gage) gerencia todo o fluxo de deploy. Após cada push na main, o Vercel detecta automaticamente via webhook do GitHub. ---
- **17.10 Troubleshooting Comum** — | Problema | Causa | Solução | |---|---|---| | Pasta `landing/` aparece vazia no GitHub | Dev criou projeto Next.js com `.git` interno — Git pai trata como submódulo | `@devops` remove `.git` interno: `rm -rf landing/.git` antes do push |
- **17.11 Ferramentas e Recursos do Cohort** — | Ferramenta | Uso | Custo | |-----------|-----|-------| | **Scrapling** | Web scraping Python avançado (Pedro recomenda) | Gratuito |
- **Status** — Draft | Ready | InProgress | InReview | Done | Blocked
- **Context** — { Contexto relevante para quem vai implementar esta story. Por que esta story existe? Qual é o problema que resolve?
- **Requirements** — 1. {Requisito funcional FR-N} 2. {Requisito funcional FR-N} 3. {Requisito não-funcional NFR-N quando aplicável}
- **Acceptance Criteria** — - [ ] AC-1: {Condição verificável — Dado X, quando Y, então Z} - [ ] AC-2: {Condição verificável} - [ ] AC-3: {Condição verificável}
- **Out of Scope** — {Lista explícita do que NÃO está no escopo desta story}
- **Technical Notes** — { Notas técnicas relevantes: - Stack e bibliotecas a usar
- **Dependencies** — - {Dependência de story: Story X.Y precisa estar em status Done} - {Dependência externa: API de terceiro, credencial, configuração}
- **Risk Assessment** — | Risco | Probabilidade | Impacto | Mitigação | |-------|---------------|---------|-----------| | {Risco 1} | Alta/Média/Baixa | Alto/Médio/Baixo | {Mitigação} |
- **Estimation** — {Small / Medium / Large / XLarge} {Justificativa da estimativa}
- **File List** — {Preenchido por @dev durante implementação} - {arquivo}: {criado/modificado}
- **Dev Notes** — {Preenchido por @dev durante implementação — decisões técnicas tomadas, problemas encontrados, mudanças de abordagem}
- **QA Notes** — {Preenchido por @qa durante QA Gate — issues identificados, waiver documentados, observações para o desenvolvedor} ---
- **core-config.yaml Completo** — project: name: "nome-do-projeto" version: "1.0.0"
- **Configuração de Squad (squad.yaml Avançado)** — name: nome-do-squad version: 1.0.0 description: "Descrição do squad"
- **CodeRabbit** — O CodeRabbit fornece review automático de código antes do QA Gate. **Instalação:** pip install coderabbit
- **GitHub CLI** — O `gh` CLI é usado exclusivamente por `@devops` para operações de repositório remoto. **Autenticação:** gh auth login
- **Supabase (Database)** — Para projetos com Supabase: supabase init supabase start
- **Problema: Agente não reconhece contexto do projeto** — **Sintomas:** Agente faz perguntas que já foram respondidas em sessões anteriores. **Causa:** MEMORY.md vazio ou desatualizado. **Solução:**
- **Problema: QA Loop não converge** — **Sintomas:** Após 3+ iterações, os mesmos issues continuam aparecendo. **Causa:** Possível ambiguidade nos critérios de aceite ou problema de especificação. **Solução:**
- **Problema: Custo aumentando sem aumento de uso** — **Sintomas:** `aiox stats` mostra crescimento de tokens sem crescimento de atividade. **Causa:** Contexto acumulado — MEMORY.md grande, sessões longas sem compactação. **Solução:**
- **Problema: Story rejeitada repetidamente pelo PO** — **Sintomas:** Pax retorna NO-GO nas mesmas dimensões várias vezes. **Causa:** Requisitos genuinamente ambíguos que precisam ser esclarecidos com stakeholder. **Solução:**
- **Problema: @devops não consegue criar PR** — **Sintomas:** `gh pr create` falha com erro de autenticação. **Causa:** Token do GitHub CLI expirado ou permissões insuficientes. **Solução:**
- **Problema: Code Intelligence indisponível** — **Sintomas:** `aiox doctor` reporta Code Intelligence em fallback. **Causa:** Provider não configurado ou indisponível. **Impacto:** Sistema opera normalmente sem enrichment — degradação graceful.
- **Problema: Squad produzindo outputs inconsistentes** — **Sintomas:** Respostas do squad variam significativamente para inputs similares. **Causa:** Personas não suficientemente específicas, ou MEMORY.md compartilhado com conflitos. **Solução:**

---
