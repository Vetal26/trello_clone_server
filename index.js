const express = require("express");
const cors = require('cors');
const passport = require('passport');
const bodyParser = require("body-parser");
const http = require('http');
const Sequelize = require("sequelize");

const models = require('./models');
require('dotenv').config();
const app = express();
const server = http.createServer(app);
require('./models/user');
require('./models/board');
require('./config/passport')(passport);

const { User, Board, Task, User_Board, TaskList } = models;
const port = process.env.PORT;

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(require('./routes'));

app.post('/tasks', async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
  //res.status(500).send({ message: err.message }));
});

app.put('/tasks/:id', async (req, res) => {
  await Task.update( req.body, { where: { id: req.params.id}})
})

app.use(function (req, res) {
  res.status(404).send({ message: 'Opppps.... wrong way!' });
});

app.use((err, req, res) => {
  res.status(500).send({ message: err.message });
});

server.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});
  
module.exports = server;