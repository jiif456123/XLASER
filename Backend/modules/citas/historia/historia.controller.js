const http = require('../../../utils/http');
const code = require('../../../utils/status');
const { getHistoriaByPacienteID } = require('./historia.service');
const router = require('express').Router();
const historiaService = require("./historia.service");

router.post('/', (req, res) => {
    let historia = req.body;
    historiaService.crear(historia).then(
            (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})

router.get('/', (req, res) => {
    historiaService.listar().then(
            (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})


router.put('/:id', (req, res) => {

    let id = req.params.id;
    let historia = req.body;

    console.log(id);

    historiaService.modificarhistoria(id, historia).then((data) => {
        http.ok(req, res, code.status.Ok.code, data);
    }).catch((error) => {
        http.err(req, res, code.status.Internal_Server_Error.code, error, error)
    });
});


router.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);

    historiaService.eliminarhistoria(id)
        .then((data) => {
            http.ok(req, res, code.status.Ok.code, data);
        })
        .catch((error) => {
            http.err(req, res, code.status.Internal_Server_Error, err);
        })
});

router.get('/getHistoriaByPaciente/:paciente', getHistoriaByPacienteID);


module.exports = router;