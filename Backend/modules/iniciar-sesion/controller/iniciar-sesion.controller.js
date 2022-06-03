const router = require('express').Router();
const signInControler = require('../signIn/signIn.controller')

router.use('/signIn', signInControler);


module.exports = router;