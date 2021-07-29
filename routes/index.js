const router = require('express').Router();

router.use(require('./auth'));
router.use(require('./boards'));
router.use(require('./tasks'))

module.exports = router;
