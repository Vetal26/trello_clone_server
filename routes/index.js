const router = require('express').Router();

router.use(require('./auth'));
router.use(require('./refresh-token'));
router.use(require('./boards'));
router.use(require('./tasks'));
router.use(require('./invite'));

module.exports = router;
