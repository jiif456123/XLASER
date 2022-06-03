const router = require('express').Router()
const { err } = require('../../../utils/http');
const http = require('../../../utils/http');
const code = require('../../../utils/status');
const citaService = require('./cita.service');

router.post('/', (req, res) => {
    let cita = req.body;
    citaService.crear(cita).then(
            (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})

router.get('/' /*, verifyToken*/ , (req, res) => {
    citaService.listar().then(
            (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let citaAct = req.body;
    citaService.actualizar(id, citaAct).then(
            (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})



router.delete('/drop', (req, res) => {
    citaService.drop().then(
            (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})

/*
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unthorize Request')
    }
}*/
module.exports = router