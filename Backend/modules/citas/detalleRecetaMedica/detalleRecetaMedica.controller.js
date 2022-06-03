const detalleRecetaService = require('./detalleRecetaMedica.service');
const router = require('express').Router()
const { err } = require('../../../utils/http');
const http = require('../../../utils/http');
const code = require('../../../utils/status');

router.post('/', (req, res) => {
    let detalleReceta = req.body;
    detalleRecetaService.crear(detalleReceta).then(
            (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})

router.get('/:id', (req, res) => {
    let idReceta = req.params.id
    detalleRecetaService.listar(idReceta).then(
            (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})

module.exports = router