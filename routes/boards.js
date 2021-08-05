const router = require('express').Router();
const models = require('../models');
const { Board, Task, TaskList, User_Board, User } = models;
const authMiddleware = require('../middleware/auth');

const lists = ['To Do', 'In Process', 'Coded', 'Testing', 'Done'];

router.get('/boards', authMiddleware, async (req, res) => {
  try {
    const userId = req.query.userId
    const boards = await Board.findAll({
      include: {
        model: User_Board,
        where: {
          userId: userId
        }
      }
    });
    res.json(boards);
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
});

router.get('/boards/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params
    const board = await Board.findByPk( id, {
      include: [
        { 
          model: User_Board,
          include: {
            model: User,
            attributes: ['email']
          }
        },
        { 
          model: TaskList,
          include: {
            model: Task
          }
        }
      ]
    });
    console.log(board)
    res.json(board);
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
  
});

router.post('/boards', authMiddleware, async (req, res) => {
  try {
    const taskLists = []
    const board = await Board.create({ name: req.body.name });
    const user = await User.findByPk(req.body.userId)
    const userBoard = await User_Board.create({ owner: true})

    for(nameList of lists) {
      const taskList = await TaskList.create({ name: nameList })
      taskLists.push(taskList);
    }

    await userBoard.setBoard(board);
    await userBoard.setUser(user);
    await board.addTaskList(taskLists);

    res.json(board);
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
});

router.delete('/boards/:id', authMiddleware, async (req, res) => {
  try {
    await Board.destroy({ where: { id: req.params.id }});
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
});

router.patch('/boards/:id', authMiddleware, async (req, res) => {
  try {
    await Board.update({ name: req.body.name }, { where: { id: req.params.id } });
    res.status(200).send()
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;