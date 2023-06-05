const router = require('express')();

const user = require('./user');

router.use('/user', user);

module.exports = router;