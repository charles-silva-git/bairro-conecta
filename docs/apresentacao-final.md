# Apresentacao Final - BairroConecta

## Objetivo da apresentacao

Apresentar de forma clara:

- o problema que o app resolve
- a solucao proposta
- as funcionalidades implementadas
- a arquitetura utilizada
- as decisoes tecnicas mais importantes
- o impacto social do projeto

## Estrutura sugerida dos slides

### Slide 1 - Capa

- Nome do projeto: BairroConecta
- Disciplina: Programacao para Dispositivos Moveis em Android
- Tecnologias: React Native, Expo e Firebase Firestore
- Nome do aluno ou equipe

### Slide 2 - Problema

Texto sugerido:

Muitos moradores do bairro precisam de servicos como eletricista, encanador, diarista ou manicure, mas nem sempre sabem onde encontrar profissionais proximos com facilidade. Ao mesmo tempo, pequenos trabalhadores locais tem pouca visibilidade digital.

### Slide 3 - Solucao proposta

Texto sugerido:

O BairroConecta foi criado para aproximar moradores e profissionais autonomos do bairro, oferecendo um aplicativo simples para cadastro, consulta, busca e gerenciamento de prestadores de servico locais.

### Slide 4 - Funcionalidades

- tela inicial de apresentacao
- listagem de profissionais
- cadastro de profissionais
- edicao de cadastro
- exclusao de cadastro
- busca por profissao
- persistencia com Firebase Firestore

### Slide 5 - Demonstracao do fluxo

Apresente nesta ordem:

1. abrir a tela inicial
2. entrar na lista de profissionais
3. buscar por uma profissao
4. cadastrar um novo profissional
5. editar um cadastro existente
6. excluir um cadastro

### Slide 6 - Arquitetura do projeto

Explique a divisao principal:

- `screens/` para telas
- `components/` para componentes reutilizaveis
- `routes/` para navegacao
- `hooks/` para gerenciamento de estado e fluxo do CRUD
- `services/` para acesso ao Firestore
- `firebase/` para configuracao da conexao
- `utils/` para validacoes e tratamento de dados
- `constants/` para configuracoes compartilhadas

### Slide 7 - Tecnologias escolhidas

- React Native com Expo
- JavaScript
- React Navigation
- Firebase Firestore
- Hooks e componentizacao

## Justificativa tecnica das escolhas

### Expo

Foi escolhido porque simplifica a configuracao inicial, acelera os testes em ambiente academico e reduz problemas de ambiente.

### React Navigation

Foi usado para estruturar a navegacao entre telas de forma padronizada e profissional.

### Firebase Firestore

Foi escolhido porque oferece persistencia em nuvem, integracao simples com React Native e boa produtividade para um projeto de faculdade.

### Hooks e Context

Foram utilizados para compartilhar o estado do CRUD entre as telas de forma organizada, sem complexidade excessiva.

## Principais decisoes tecnicas

### Decisao 1 - Estrutura modular

O projeto foi dividido por responsabilidade para facilitar manutencao e leitura do codigo.

### Decisao 2 - Validacao no formulario

Foi criada validacao de campos para evitar cadastros incompletos ou inconsistentes.

### Decisao 3 - Camada de servicos

O acesso ao Firestore foi isolado em `services/` para evitar mistura entre interface e acesso a dados.

### Decisao 4 - Regras do Firestore

Foram criadas regras para validar formato e estrutura dos documentos enviados ao banco.

## Seguranca e limitacoes atuais

- o Firestore possui validacao estrutural de dados
- os campos aceitos sao controlados por regras
- `createdAt` e `updatedAt` sao protegidos nas regras
- ainda nao existe autenticacao com Firebase Auth

Frase sugerida:

Como o projeto foi desenvolvido para fins academicos, foi priorizada uma base funcional e organizada. Como evolucao futura, a principal melhoria de seguranca seria adicionar autenticacao para proteger melhor escrita, edicao e exclusao.

## Impacto social

### Argumentos principais

- aumenta a visibilidade de profissionais autonomos do bairro
- ajuda moradores a localizar servicos proximos
- incentiva o consumo local
- aproxima tecnologia e realidade comunitaria
- pode ser adaptado para diferentes bairros e comunidades

### Frase curta para defesa

O valor social do BairroConecta esta em usar tecnologia simples para resolver uma necessidade real da comunidade: aproximar demanda e oferta de servicos locais.

## Conclusao

Texto sugerido:

O BairroConecta atende ao objetivo da disciplina ao entregar um aplicativo mobile com React Native, navegacao, CRUD completo, persistencia de dados, organizacao profissional de codigo e foco em impacto social.

## Perguntas que podem aparecer

### Por que usar Firebase?

Porque ele acelera o desenvolvimento, oferece persistencia em nuvem e reduz a complexidade do backend para um projeto academico.

### Por que usar Expo?

Porque o Expo simplifica o ambiente, facilita testes e permite focar mais no desenvolvimento do app.

### O sistema funciona sem internet?

Atualmente nao. Como o banco esta no Firestore, a proposta atual depende de conexao para persistencia completa.

### Qual seria a proxima evolucao do projeto?

Adicionar autenticacao com Firebase Auth, filtro por bairro, tela de detalhes e melhorias na seguranca de escrita e exclusao.
