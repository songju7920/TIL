const router = require('express')();

const user = require('../controller/user');

router.post('/signUp', user.createUser);
router.delete('/withdrawal', user.deleteUser);

module.exports = router;