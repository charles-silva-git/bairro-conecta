# BairroConecta

Aplicativo mobile desenvolvido com React Native e Expo para cadastro e consulta de pequenos empreendedores e prestadores de servico do bairro.

O projeto foi criado com foco em impacto social, ajudando moradores a encontrar servicos proximos com mais facilidade e ampliando a visibilidade de trabalhadores locais como eletricistas, encanadores, diaristas, manicures, pedreiros e outros profissionais autonomos.

## Objetivo do projeto

O BairroConecta foi desenvolvido para a disciplina de Programacao para Dispositivos Moveis em Android.

O objetivo principal do app e conectar comunidade e economia local por meio de uma experiencia simples, intuitiva e acessivel para:

- cadastrar profissionais do bairro
- consultar profissionais disponiveis
- editar informacoes cadastradas
- remover cadastros quando necessario
- buscar profissionais por profissao

## Impacto social

Este projeto possui impacto social porque:

- fortalece a economia local
- amplia a divulgacao de trabalhadores autonomos
- facilita o acesso da comunidade a servicos de proximidade
- incentiva o uso da tecnologia para resolver demandas reais do bairro

## Tecnologias utilizadas

- React Native
- Expo
- JavaScript
- React Navigation
- Firebase Firestore
- React Hooks
- Componentizacao

## Funcionalidades implementadas

- Tela inicial com apresentacao do aplicativo
- Listagem de profissionais cadastrados
- Cadastro de novo profissional
- Edicao de profissional existente
- Exclusao de profissional
- Busca por profissao
- Persistencia de dados com Firebase Firestore
- Validacao de formulario
- Interface responsiva e organizada

## Estrutura do projeto

```text
bairro-conecta/
├── App.js
├── app.json
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── package.json
└── src/
    ├── components/
    │   ├── AppInput.js
    │   ├── EmptyState.js
    │   ├── PrimaryButton.js
    │   ├── ProfessionalCard.js
    │   └── ScreenContainer.js
    ├── constants/
    │   └── firestore.js
    ├── firebase/
    │   ├── app.js
    │   └── config.js
    ├── hooks/
    │   └── useProfessionals.js
    ├── routes/
    │   ├── AppRoutes.js
    │   └── index.js
    ├── screens/
    │   ├── HomeScreen.js
    │   ├── ProfessionalFormScreen.js
    │   └── ProfessionalsListScreen.js
    ├── services/
    │   └── professionalsService.js
    ├── styles/
    │   └── theme.js
    └── utils/
        ├── firestoreErrorMessages.js
        └── professionalModel.js
```

## Arquitetura adotada

O projeto segue uma estrutura simples e escalavel, adequada para ambiente academico e ao mesmo tempo organizada como um projeto profissional.

- `screens/`: telas da aplicacao
- `components/`: componentes reutilizaveis de interface
- `routes/`: configuracao da navegacao
- `hooks/`: gerenciamento de estado e regras de fluxo do CRUD
- `services/`: comunicacao com o Firestore
- `firebase/`: configuracao e inicializacao do Firebase
- `utils/`: validacoes, normalizacao de dados e tratamento de mensagens
- `constants/`: constantes compartilhadas da aplicacao

## Modelo de dados

Cada profissional cadastrado possui a seguinte estrutura:

```js
{
  id: 'id-do-documento',
  name: 'Nome do profissional',
  profession: 'Profissao',
  phone: '(81) 99999-9999',
  description: 'Descricao dos servicos oferecidos',
  neighborhood: 'Nome do bairro'
}
```

No Firestore, os documentos tambem recebem:

```js
{
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## Requisitos para executar

Antes de iniciar, tenha instalado:

- Node.js
- npm
- Expo CLI via `npx`
- Android Studio com emulador ou aplicativo Expo Go
- Conta no Firebase

## Como executar o projeto

1. Clone o repositorio:

```bash
git clone https://github.com/charles-silva-git/bairro-conecta.git
```

2. Entre na pasta do projeto:

```bash
cd bairro-conecta
```

3. Instale as dependencias:

```bash
npm install
```

4. Inicie o projeto:

```bash
npm start
```

5. Para abrir diretamente no Android:

```bash
npm run android
```

## Configuracao do Firebase

O projeto utiliza Firebase Firestore como banco de dados.

Caso voce esteja configurando o projeto em outro ambiente, revise o arquivo:

```text
src/firebase/config.js
```

Esse arquivo e publicado com placeholders para evitar expor um Firebase real no repositório. Para executar o app com persistencia, preencha `src/firebase/config.js` com as credenciais do seu projeto Firebase Web.

Como referencia, o projeto tambem possui:

```text
src/firebase/config.example.js
```

## Como configurar o Firestore

1. Crie um projeto no Firebase Console.
2. Ative o Firestore Database.
3. Adicione um aplicativo Web ao projeto.
4. Copie a configuracao do Firebase para `src/firebase/config.js`.
5. Publique as regras do Firestore.

Se estiver usando Firebase CLI, execute:

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

## Regras de seguranca

O projeto possui regras de validacao no arquivo:

```text
firestore.rules
```

Essas regras validam:

- campos permitidos no documento
- tamanho maximo dos textos
- formato do telefone
- preservacao de `createdAt`
- atualizacao segura de `updatedAt`

Observacao importante:

Atualmente o projeto ainda nao possui autenticacao com Firebase Auth. Por isso, embora as regras validem a estrutura dos dados, operacoes publicas continuam limitadas em seguranca real. Uma proxima evolucao recomendada e adicionar autenticacao para proteger melhor escrita, edicao e exclusao.

## Fluxo principal do aplicativo

1. O usuario acessa a tela inicial.
2. Navega para a lista de profissionais.
3. Pode buscar profissionais por profissao.
4. Pode cadastrar um novo profissional.
5. Pode editar ou excluir um cadastro existente.
6. Todas as alteracoes sao persistidas no Firestore.

## Boas praticas aplicadas

- componentizacao
- separacao de responsabilidades
- uso de hooks
- validacao de dados
- organizacao profissional de pastas
- tratamento de estados de carregamento e erro
- centralizacao de constantes e regras de negocio

## Possiveis melhorias futuras

- autenticacao com Firebase Auth
- filtro por bairro
- filtro combinado por profissao e bairro
- mascara de telefone mais robusta
- feedback visual com toast
- testes automatizados
- tela de detalhes do profissional

## Documentacao complementar

- `docs/apresentacao-final.md`: roteiro para slides e defesa oral
- `docs/roteiro-video.md`: roteiro para gravacao do video
- `docs/checklist-apresentacao.md`: checklist para demonstracao
- `docs/publicacao-github.md`: guia de organizacao da entrega e publicacao no GitHub

## Autor

Projeto academico desenvolvido para fins educacionais na disciplina de Programacao para Dispositivos Moveis em Android.
