const router = require('express').Router();
const { Op } = require('sequelize');
const models = require('../models');
const { Task, User, User_Task, TaskList, Board } = models;
const authMiddleware = require('../middleware/auth');

router.get('/tasks/search', authMiddleware, async (req, res) => {
    try {
        const { boardId, searchText } = req.query
        const searchTasks = await Task.findAll({
            where: {
                title: {[Op.startsWith]: searchText}},
            include: [
                { model: TaskList, where: { BoardId: boardId, name: {[Op.ne]: 'Archive'}}, attributes: []},
                { model: User, attributes: ['id', 'email']}]
        });
        const searchUsers = await Task.findAll({
            include: [
                { 
                    model: User,
                    where: {
                        email: {[Op.startsWith]: searchText}
                    },
                    attributes: ['id', 'email']
                },
                {
                    model: TaskList,
                    where: {name: {[Op.ne]: 'Archive'}}
                }
                ]
        });
        const tasks = { searchUsers, searchTasks}
        res.json(tasks)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// router.get('/tasks/:id', authMiddleware, async (req, res) => {
//     try {
//         const task = await Task.findByPk(req.params.id, {
//             include: [
//                 { 
//                   model: User,
//                   attributes: ['id','email']
//                 },
//               ]  
//         });
//         res.json(task);
//     } catch (error) {
//         res.status(500).send({ message: error.message })
//     }
// });

router.post('/tasks', authMiddleware, async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.json(task);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

router.put('/tasks/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.update( req.body, { 
            where: { id: req.params.id },
            returning: true,
            plain: true
        });
        res.json(task[1])
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

router.delete('/tasks', authMiddleware, async (req, res) => {
    try {
        const ids = req.body;
        const rowsDestroyed = await Task.destroy({ where: { id: ids}});
        if (rowsDestroyed) {
            res.sendStatus(204);
          } else {
            res.sendStatus(404);
          }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

router.patch('/tasks/assign', authMiddleware, async (req, res) => {
    try {
        const { userId, taskId } = req.body;
        const task = await Task.findByPk(taskId);
        if (!task) {
            res.status(404).send({ message: 'Task not found' })
        }
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).send({ message: 'User not found' })
        }
        await task.addUser(user)
        const users = await task.getUsers() 
        res.json(users);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

router.delete('/tasks/assign', authMiddleware, async (req, res) => {
    try {
        const { userId, taskId } = req.query;
        const task = await Task.findByPk(taskId);

        if (!task) {
            res.status(404).send({ message: 'Task not found' })
        }
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).send({ message: 'User not found' })
        }
        await task.removeUser(user)
        const users = await task.getUsers() 
        res.json(users);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

router.put('/tasks/restore/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        await Task.update( req.body, { 
            where: { id: id }});
        const task = await Task.findByPk(id);
        await task.removeUsers()
        res.json(task)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

module.exports = router;