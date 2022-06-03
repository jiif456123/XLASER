const router = require('express').Router();
const deleteControllerMaster = require('../dropDoc/deleteDoc.controller')

router.use('/drop', deleteControllerMaster);


module.exports = router;