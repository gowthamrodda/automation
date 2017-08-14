let router = require('express').Router();

router.use(require('./testbed-api'));
router.use(require('./device-api'));
router.use(require('./config-api'));


module.exports = router;