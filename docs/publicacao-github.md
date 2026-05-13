# Publicacao Final no GitHub - BairroConecta

## Objetivo

Este guia organiza a entrega final do projeto no GitHub com foco em:

- estrutura profissional do repositorio
- descricao clara do projeto
- historico de commits mais organizado
- checklist final antes da publicacao

## Estrutura final recomendada do repositorio

```text
bairro-conecta/
├── README.md
├── App.js
├── app.json
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── package.json
├── docs/
└── src/
```

## O que deve estar no repositorio

- codigo-fonte completo
- `README.md` atualizado
- regras do Firestore
- arquivos de apresentacao em `docs/`
- estrutura organizada em `src/`
- `.gitignore`

## O que nao deve estar no repositorio

- `node_modules/`
- arquivos temporarios do sistema
- builds locais
- arquivos sensiveis que nao facam parte da entrega

## Observacao importante sobre Firebase

O arquivo `src/firebase/config.js` usa configuracao de um projeto Firebase Web. Tecnicamente esses dados nao funcionam como senha privada, mas publicar um repositorio com regras permissivas de escrita ou exclusao pode gerar uso indevido do banco.

Para entrega academica, existem dois caminhos seguros:

1. manter este projeto Firebase apenas para demonstracao e revisar as regras antes de publicar
2. criar um projeto Firebase separado apenas para apresentacao publica do repositorio

## Descricao sugerida para o repositorio

Texto curto sugerido:

Aplicativo mobile desenvolvido com React Native, Expo e Firebase Firestore para cadastro e consulta de pequenos empreendedores e prestadores de servico do bairro, com foco em impacto social e fortalecimento da economia local.

## Topicos sugeridos para o GitHub

- react-native
- expo
- firebase
- firestore
- mobile-app
- social-impact
- community
- academic-project

## Nome sugerido do repositorio

- `bairro-conecta`

Se quiser um nome mais formal:

- `bairro-conecta-app`

## Ordem recomendada de commits

Se voce quiser organizar melhor o historico antes da entrega, uma sequencia boa e:

1. `chore: initialize Expo project and base structure`
2. `feat: add navigation and initial screens`
3. `feat: implement in-memory professional CRUD`
4. `feat: integrate CRUD with Firebase Firestore`
5. `chore: add Firestore rules and architecture safeguards`
6. `docs: add technical README`
7. `docs: add presentation and delivery materials`

## Commit final sugerido para esta etapa

```bash
git add README.md docs
git commit -m "docs: prepare GitHub publication and delivery guide"
```

## Sequencia recomendada para publicar no GitHub

1. revisar o `README.md`
2. revisar o conteudo da pasta `docs/`
3. conferir se o app esta funcionando
4. conferir se o Firestore esta operacional
5. revisar regras de seguranca
6. adicionar e commitar os arquivos
7. criar o repositorio no GitHub
8. conectar o remoto local
9. enviar a branch principal

## Comandos para publicacao

### Inicializar versionamento local, se necessario

```bash
git init
git branch -M main
```

### Adicionar arquivos

```bash
git add .
```

### Criar commit final

```bash
git commit -m "docs: prepare GitHub publication and delivery guide"
```

### Conectar ao repositorio remoto

```bash
git remote add origin <URL_DO_REPOSITORIO>
```

### Enviar para o GitHub

```bash
git push -u origin main
```

## Checklist final antes do push

- `README.md` revisado
- pasta `docs/` revisada
- nome do repositorio definido
- descricao do repositorio preparada
- projeto iniciando com `npm start`
- Firebase funcionando
- cadastro funcionando
- edicao funcionando
- exclusao funcionando
- busca funcionando
- regras do Firestore revisadas
- nenhum arquivo desnecessario incluido

## Checklist para entrega academica

- link do repositorio no GitHub
- projeto rodando no celular ou emulador
- README profissional
- roteiro de apresentacao pronto
- roteiro de video pronto
- demonstracao do CRUD preparada

## Frase curta para descrever a entrega

O repositorio foi organizado para apresentar um aplicativo mobile completo com React Native, Expo, React Navigation e Firebase Firestore, aplicando CRUD, componentizacao, persistencia em nuvem e foco em impacto social.
