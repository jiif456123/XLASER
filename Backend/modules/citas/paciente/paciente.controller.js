const http = require('../../../utils/http');
const code = require('../../../utils/status');
const router = require('express').Router();
const pacienteService = require("./paciente.service");
const { getPacienteById } = require('./paciente.service');
const citasmodel = require("../../../models/citas.model");

const pacientemodel = citasmodel.modelPaciente;


router.post('/', (req, res) => {
    let paciente = req.body;
    pacienteService.crear(paciente).then(
            (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})

router.get('/', (req, res) => {
    pacienteService.listar().then(
            (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})


router.put('/:id', (req, res) => {

    let id = req.params.id;
    let paciente = req.body;

    console.log(id);

    pacienteService.modificarpaciente(id, paciente).then((data) => {
        http.ok(req, res, code.status.Ok.code, data);
    }).catch((error) => {
        http.err(req, res, code.status.Internal_Server_Error.code, error, error)
    });
});


router.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);

    pacienteService.eliminarpaciente(id)
        .then((data) => {
            http.ok(req, res, code.status.Ok.code, data);
        })
        .catch((error) => {
            http.err(req, res, code.status.Internal_Server_Error, err);
        })
});

router.get('/:id', getPacienteById);



module.exports = router;