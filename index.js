const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const http = require('http');
const Sequelize = require("sequelize");

const app = express();
const server = http.createServer(app);
const models = require('./models');

const { User, Board, Task, User_Board, ListTasks } = models;
const port = process.env.PORT;

const lists = ['To Do', 'In Process', 'Coded', 'Testing', 'Done'];

User.belongsToMany(Board, { through: User_Board });
Board.belongsToMany(User, { through: User_Board });
Task.belongsToMany(User, { through: 'User_Task' });
User.belongsToMany(Task, { through: 'User_Task' });

app.use(cors());
app.use(bodyParser.json());

app.get('/boards', async (req, res) => {
  const boards = await Board.findAll();
  res.json(boards);
});

app.post('/boards', async (req, res) => {
  const listTasks = []
  for(nameList of lists) {
    const listTask = await ListTasks.create({ name: nameList })
    listTasks.push(listTask);
  }
  const board = await Board.create({ name: req.body.name });
  await board.addListTask(listTasks);
  res.json(board);
  //res.status(500).send({ message: err.message }));
});

app.delete('/boards/:id', async (req, res) => {
  await Board.destroy({where: { id: req.params.id }});
  res.status(204).send();
});

app.patch('/boards/:id', async (req, res) => {
  await Board.update({ name: req.body.name }, { where: req.params.id });
});

server.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});
  
module.exports = server;