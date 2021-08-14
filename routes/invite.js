const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const { v1 } = require('uuid');
const models = require('../models');
const { InvitationKey, User, User_Board, Board } = models;


router.get('/invite/:id', authMiddleware, async (req, res) => {
    try {
        const boardId = req.params.id;
        let invitationKey = await InvitationKey.findOne({
            where : { boardId }
        });
        if (!invitationKey) {
            invitationKey = await InvitationKey.create({
                boardId,
                key: v1()
            })
        }
        res.send({key: invitationKey.key})
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

router.get('/invite/key/:key', async (req, res) => {
    try {
        const key = req.params.key;
        const invitationKey = await InvitationKey.findOne({
            where: {
                key: key
            }
        });

        if (!invitationKey) {
            res.status(404).send({ message: 'Key not found' })
        }

        const owner = await User_Board.findOne({ 
            where: { BoardId: invitationKey.boardId, owner: true },
            include: [
                { model: User, attributes: ['email']},
                { model: Board, attributes: ['name']}
            ]});
        if (!owner) res.status(404).send({ message: 'Owner not found' });
        res.send(owner);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

router.post('/invite', async (req, res) => {
    try {
        const { key, userId } = req.body;
        const invitationKey = await InvitationKey.findOne({
            where: {
                key: key
            }
        });

        if (!invitationKey) {
            res.status(404).send({ message: 'Key not found' })
        }
        
        const user = await User.findByPk(userId)

        if (!user) {
            res.status(404).send({ message: 'User not found' })
        }

        const board = await Board.findByPk(invitationKey.boardId);
        if (!board) {
            res.status(404).send({ message: 'Board not found' })
        }

        await user.addBoard(board, { through: { owner: false }})
        res.status(200).send();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;