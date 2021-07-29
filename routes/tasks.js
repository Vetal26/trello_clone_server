const router = require('express').Router();
const models = require('../models');
const { Task } = models;
const authMiddleware = require('../middleware/auth');


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

module.exports = router;