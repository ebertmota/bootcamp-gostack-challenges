const express = require('express');

const app = express();
app.use( express.json() );

// Query Params = ?user=1
// Route Params = /users/1
// Request body = { "name": "ebert" }

/*

  // name with request.body
app.get('/:name', (req, res) => {
  res.json({ message: `Hello ${req.params.name}` })
});


  // name with query params
app.get('/query', (req, res) => {
  const name = req.query.name;
  res.json({ message: `Hello ${name}` });
});


  // name with route params
app.get('/route/:id', (req, res) => {
  const { id } = req.params;

  res.json({ message: `Hello ${id}` })
});

*/

const users = ['Ebert', 'Diego', 'Lucas']

//Middlewares

app.use((req, res, next) => {
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url}; `)
  next();
  console.count('Request')
  console.timeEnd('Request');
})

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User not found on request body'});
  };

  return next();
};

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!users[req.params.index]) {
    return res.status(400).json({ error: 'user does not exists' });
  }

  req.user = user;

  return next();
}


//Lista todos  usuarios
app.get('/users', (req,res) => {
  return res.json(users);
});

//Lista apenas um usuario por index no array
app.get('/users/:index', checkUserInArray, (req,res) => {
  res.json(req.user)
});

//Cria usuarios
app.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

//Edita usuarios
app.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
  const { name } = req.body;
  const { index } = req.params;

  users[index] = name;

  return res.json(users);
});


//Deleta usuarios
app.delete('/users/:index', checkUserInArray, (req,res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send()
});

app.listen(3000);