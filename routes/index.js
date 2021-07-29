const router = require('express').Router();

router.use(require('./auth'));
router.use(require('./boards'))

module.exports = router;
