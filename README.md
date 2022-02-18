# Store API
API RESTful feita para o cadastro de usuários, clientes, produtos e vendas de um comércio.

## Tecnologias
- Node.JS
- MySQL
- Sequelize
- Express
- JWT

## Requisitos
- Node.JS em LTS;
- MySQL

## Instalação
1. Instale o projeto pelo `git clone`; 
2. Configure as informações da Database e do JWT no arquivo .env.example;
3. Renomeie o arquivo .env.example para `.env`;
4. Rode o comando  `npm i` e aguarde todas as dependencias serem baixadas;

Para rodar a aplicação, utilize `npm start`.

## Endpoints
##### GET
`/clientes`  
`/clientes/:id`

`/produtos`   
`/produtos/:id` 
##### POST
`/signup`  
`/login`  
`/clientes`   
`/produtos`  
`/vendas`     
##### PUT
`/clientes/:id`  
`/produtos/:id`

##### DELETE
`/clientes/:id`  
`/produtos/:id`
