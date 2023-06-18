<h1 align="center"> FoodExplorer - Back-end  </h1>

- [🔧 Deploy](#-deploy)
- [▶️ Instalação e Execução](#%EF%B8%8F-instalação-e-execução)
- [🚀 Tecnologias](#-tecnologias)
- [⚙️ Repositório de código Front-end](##%EF%B8%8F-repositório-de-código-front-end)
- [💻 Projeto](#-projeto)

<br>

## 🔧 Deploy

**Para acessar o deploy e testar todas as funcionalidades, basta clicar no link abaixo:**

- [FoodExplorer - Deploy ](https://foodexplorer-rafaelmarques.netlify.app/)

- Para acessar a conta de administrador, utilize o email: admin@email.com senha: 1234
- Para acessar a conta de usuário, basta clicar em Criar Conta > Preencher as informações > Clicar em cadastrar
- Após realizar os passos acima, utilize da conta cadastrada para entrar como usuário.

## ▶️ Instalação e execução

Instale com npm

```bash
  npm install
```

Em seguida utilize o comando abaixo para gerar as tabelas do banco de dados, caso ainda não existir.

```bash
  npm run migrate
```

E então execute o comando para executar a api em sua maquina local

```bash
  npm run dev
```

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- JavaScript
- NodeJS
- Bcryptjs
- Express
- Express async errors
- Jsonwebtoken
- Knex
- Multer
- Sqlite

## ⚙️ Repositório de código Front-end

**Para acessar o repositório de código back-end, clique no link abaixo.**

- [FoodExplorer - Front-end]()

## 💻 Projeto

O FoodExplorer, é um menu interativo para um restaurante fictício.

Neste projeto temos duas personas: o admin e o usuário;

O admin é a pessoa responsável pelo restaurante, logo, pode criar, visualizar, editar e apagar um prato a qualquer momento. Cada prato contem uma imagem, um nome, uma categoria, uma breve descrição, os ingredientes e o seu preço. Ao clicar em adicionar prato, o admin receberá uma mensagem de sucesso e será redirecionado para a página principal;

O usuário irá visualizar todos os pratos cadastrados e, quando clicar em um prato, será redirecionado para uma nova tela com informações mais detalhadas sobre ele.
