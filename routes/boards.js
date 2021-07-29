const router = require('express').Router();
const passport = require('passport');
const models = require('../models');
const { Board, Task, TaskList, User_Board, User } = models;
const authMiddleware = require('../middleware/auth');

const lists = ['To Do', 'In Process', 'Coded', 'Testing', 'Done'];

router.get('/boards', authMiddleware, async (req, res) => {
    const boards = await Board.findAll({
      include: {
        model: User_Board,
        where: {
          userId: +req.query.userId
        }
      }
    });
    res.json(boards);
  });
  
  router.get('/boards/:id', authMiddleware, async (req, res) => {
    const { id } = req.params
    const board = await Board.findByPk( id, {
      include: {
        model: TaskList,
        include: {
          model: Task
        }
      }
    });
    res.json(board);
  });
  
  router.post('/boards', authMiddleware, async (req, res) => {
    const taskLists = []
    for(nameList of lists) {
      const taskList = await TaskList.create({ name: nameList })
      taskLists.push(taskList);
    }

  
    const board = await Board.create({ name: req.body.name });
    const user = await User.findByPk(req.body.userId)
    const userBoard = await User_Board.create({ owner: true})
    await userBoard.setBoard(board);
    await userBoard.setUser(user);
    await board.addTaskList(taskLists);
    await board.addUser_Board(userBoard);
    res.json(board);

    //res.status(500).send({ message: err.message }));
  });
  
  router.delete('/boards/:id', authMiddleware, async (req, res) => {
    await Board.destroy({where: { id: req.params.id }});
    res.status(204).send();
  });
  
  router.patch('/boards/:id', authMiddleware, async (req, res) => {
    const board = await Board.update({ name: req.body.name }, { where: { id: req.params.id } });
    console.log(board)
  });

  module.exports = router;