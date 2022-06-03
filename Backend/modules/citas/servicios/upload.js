const controller = require('../servicios/controller/upload')

const http = require('../../../utils/http');
const code = require('../../../utils/status');
const router = require('express').Router();
const userService = require("./servicios.services");
//TODO:ESTO ES MI CONTROLLER
/*
const http = require('../../../utils/http');
const code = require('../../../utils/status');
const router = require('express').Router();
const userService = require("./servicios.services");
*/
/**
 * Ruta: /user GET
 */
router.post(
    `/`,
    controller.upload,
    controller.uploadFile
)


module.exports = router