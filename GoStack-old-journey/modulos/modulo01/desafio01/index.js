const express = require('express');
const app = express();
app.use( express.json() ); 

const projects = [];

//Middlewares
app.use(countAplicationRequest);

function countAplicationRequest(req, res, next) {
  console.count('Numero de reqiosoções')
  return next();
}

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400),json({ "error": "Project not found" });
  }
  
  
  return next();
}


// Cadastra um projeto.
app.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: []
  });
  res.json(projects);
});

// Lista os projetos.
app.get('/projects', (req,res) => {
  res.json(projects)
});

// Muda o titulo do projeto pelo id.
app.put('/projects/:id', checkProjectExists, (req,res) => {
  const { id } = req.params;
  const { title } = req.body;
  for (let i =0; i < projects.length; i++) {
    if (projects[i].id === id) {
      projects[i].title = title;
      return res.json(projects);
    }
  }

});

// Deleta um projeto pelo id.
app.delete('/projects/:id', checkProjectExists, (req,res) => {
  const { id } = req.params;
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id === id) {
      projects.splice(i, 1);
      res.json({"success": "Projeto removido com sucesso!"})
    };
  }
});

// Adidciona tarefas dentro do projeto selecionado.
app.post('/projects/:id/tasks', checkProjectExists, (req,res) => {
  const { id } = req.params;
  const { title } = req.body;
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id === id) {
      projects[i].tasks.push(title)
      return res.json(projects)
    }
  }
});

app.listen(3000);