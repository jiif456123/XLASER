const http = require('../../../utils/http');
const code = require('../../../utils/status');
const router = require('express').Router();
const reporteService = require("./reporteT.service");

router.post('/', (req, res) => {
    let reporte = req.body;
    reporteService.crear(reporte).then(
            (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})

router.get('/', (req, res) => {
    reporteService.listar().then(
            (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})

router.get('/:id', (req, res) => {
    let id = req.params.id
    reporteService.listarreportet(id).then(
            (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})

router.put('/:id', (req, res) => {

    let id = req.params.id;
    let reporte = req.body;

    console.log(id);

    reporteService.modificarreportet(id, reporte).then((data) => {
        http.ok(req, res, code.status.Ok.code, data);
    }).catch((error) => {
        http.err(req, res, code.status.Internal_Server_Error.code, error, error)
    });
});


router.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);

    reporteService.eliminarreportet(id)
        .then((data) => {
            http.ok(req, res, code.status.Ok.code, data);
        })
        .catch((error) => {
            http.err(req, res, code.status.Internal_Server_Error, err);
        })
});




module.exports = router;