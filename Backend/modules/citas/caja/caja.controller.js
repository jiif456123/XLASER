const cajaService = require('./caja.service');
const router = require('express').Router()
const http = require('../../../utils/http');
const code = require('../../../utils/status');

router.post('/', (req, res) => {
    cajaService.crear().then(
        (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})

router.get('/', (req, res) => {
    cajaService.listar().then(
        (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let abierto = req.body.abierto
    cajaService.actualizar(id, abierto).then(
        (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})


module.exports = router