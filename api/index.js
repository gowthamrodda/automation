let router = require('express').Router();

router.use(require('./testbed-api'));
router.use(require('./device-api'));


module.exports = router;