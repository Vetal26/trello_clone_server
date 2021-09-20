const router = require('express').Router();
const { Op } = require('sequelize');
const models = require('../models');
const { Task, User, TaskList, Activity } = models;
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
});

router.get('/tasks/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id, {
            include: [
                { 
                    model: User,
                    attributes: ['id', 'email']
                },
                Activity
            ]
        });
        res.json(task);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

router.post('/tasks', authMiddleware, async (req, res) => {
    try {
        const task = await Task.create(req.body.task);
        await task.createActivity(req.body.activity);
        res.json(task);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

router.put('/tasks/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        await Task.update( req.body.task, { 
            where: { id: id }
        });
        await Activity.create({
            ...req.body.activity,
            TaskId: id
        })
        const task = await Task.findByPk(id, {
            include: [
                Activity,
                User
            ]  
        });
        res.json(task)
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
        console.log(req.body)
        const { userId, taskId, activity } = req.body;
        const task = await Task.findByPk(taskId);
        if (!task) {
            res.status(404).send({ message: 'Task not found' })
        }
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).send({ message: 'User not found' })
        }
        await task.addUser(user);
        const assignUsers = await task.getUsers({attributes: ['id', 'email']});
        const activityTask = await task.createActivity({activity});
        res.json({ assignUsers, activityTask });
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

router.delete('/tasks/assign', authMiddleware, async (req, res) => {
    try {
        const { userId, taskId, activity } = req.query;
        const task = await Task.findByPk(taskId);

        if (!task) {
            res.status(404).send({ message: 'Task not found' })
        }
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).send({ message: 'User not found' })
        }
        await task.removeUser(user);
        const activityTask = await task.createActivity({activity});
        const assignUsers = await task.getUsers();
        res.json({assignUsers, activityTask});
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

router.put('/tasks/restore/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        await Task.update( req.body.task, { 
            where: { id: id }});
        const task = await Task.findByPk(id);
        await task.createActivity(req.body.activity);
        const users = await task.getUsers()
        await task.removeUsers(users)
        res.json(task)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

module.exports = router;