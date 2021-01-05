<p align="center">
  <img alt="GoStack" src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/bootcamp-header.png" width="200px" />
</p>
  
<h2 align="center">
  Desafio 01 - Conceitos de NodeJS
</h2>

 <blockquote>
   Criar uma aplicação para armazenar projetos e tarefas utilizando express.
 </blockquote>

# :pushpin: Sobre o desafio

<p>Seu objetivo é fazer um CRUD, armazenando as informações dos projetos em variaveis locais do javascript, para que o
usuario tenha acesso a tais rotas: </p>

- `GET /projects`: que lista todos os projetos cadastrados.
- `POST /projects`: que recebe o `id` e o `title` através do corpo da requisição, e assim cadastra um projeto.
- `PUT /projects/:id`: altera o titulo de um projeto a partir do `id` presente nos parâmetros na rota.
- `DELETE /projects:id`: deleta um projeto a partir de seu id.
- `POST /projects/:id/tasks`: adiciona uma nova tarefa dentro do array `tasks` no projeto selecionado pelo `id`.

## Middlewares
Nessa aplicação utilizamos dois middlewares, são eles:

- `countAplicationRequest`: globalmente conta o numero de requisições que a app esta fazendo
- `checkProjectExists`: verifica se existe projeto cadastrado com o id, nas rotas que o recebem.