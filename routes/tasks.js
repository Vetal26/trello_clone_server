const router = require('express').Router();
const models = require('../models');
const { Task, User, User_Task } = models;
const authMiddleware = require('../middleware/auth');

router.get('/tasks/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id, {
            include: [
                { 
                  model: User,
                  attributes: ['id','email']
                },
              ]  
        });
        res.json(task);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

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
        await Task.update( req.body, { where: { id: req.params.id}});
        res.status(200);
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
        console.log(req.body)
        const task = await Task.findByPk(taskId);
        console.log(taskId)

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

module.exports = router;