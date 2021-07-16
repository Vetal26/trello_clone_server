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

app.use(bodyParser.json());

User.belongsToMany(Board, { through: User_Board });
Board.belongsToMany(User, { through: User_Board });
Board.hasMany(ListTasks);
ListTasks.belongsTo(Board);
ListTasks.hasMany(Task);
Task.belongsTo(ListTasks);
Task.belongsToMany(User, { through: 'User_Task' });
User.belongsToMany(Task, { through: 'User_Task' });


server.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});
  
module.exports = server;