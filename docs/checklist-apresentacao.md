# Checklist de Apresentacao - BairroConecta

## Antes da apresentacao

- conferir se o projeto inicia com `npm start`
- verificar se o Firebase esta funcionando
- abrir o app no emulador ou celular
- deixar pelo menos 2 ou 3 profissionais cadastrados
- testar cadastro, edicao, busca e exclusao
- revisar o README
- revisar o roteiro da apresentacao
- revisar o roteiro do video

## Ordem recomendada da demonstracao

1. tela inicial
2. lista de profissionais
3. busca por profissao
4. cadastro de novo profissional
5. edicao de cadastro
6. exclusao de cadastro

## Pontos que nao podem faltar na fala

- tema do projeto
- problema resolvido
- impacto social
- tecnologias usadas
- CRUD completo
- persistencia com Firestore
- organizacao da arquitetura

## Se o professor perguntar sobre arquitetura

Resposta curta sugerida:

O projeto foi organizado por responsabilidade. As telas ficam em `screens`, os componentes reutilizaveis em `components`, a navegacao em `routes`, o estado e as regras do CRUD em `hooks`, o acesso ao Firestore em `services` e as validacoes e utilitarios em `utils`.

## Se o professor perguntar sobre seguranca

Resposta curta sugerida:

O projeto possui regras do Firestore para validar a estrutura dos documentos e controlar os campos aceitos. Como melhoria futura, o ideal e adicionar autenticacao com Firebase Auth para proteger melhor operacoes de escrita e exclusao.

## Se o professor perguntar sobre impacto social

Resposta curta sugerida:

O aplicativo ajuda pequenos trabalhadores locais a terem mais visibilidade e facilita para os moradores encontrarem servicos proximos, fortalecendo a economia do bairro.
