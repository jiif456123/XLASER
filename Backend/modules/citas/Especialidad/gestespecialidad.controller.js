const http = require('../../../utils/http');
const code = require('../../../utils/status');
const router = require('express').Router();
const e = require('express');
const especialidadService = require('../../citas/Especialidad/gestespecialidads.service');


router.get('/', (req, res) => {

    //Get 
    especialidadService.listar()
        .then(
            (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));

});

router.post('/', (req, res) => {
    //Post
    let registrarEspecialidad = req.body;

    especialidadService.registrar(registrarEspecialidad)
        .then(
            (data) => http.ok(req, res, code.status.Ok.code, data)
        )
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
});

router.get('/:id', (req, res) => {
    //por Id
    let id = req.params.id;

    especialidadService.listarID(id).then((data) => {
        http.ok(req, res, code.status.Ok.code, data);
    }).catch((error) => {
        http.err(req, res, code.status.Internal_Server_Error, error, error)
    });
});

router.put('/:id', (req, res) => {

    let id = req.params.id;
    let registrarEspecialidad = req.body;

    console.log(id);
    especialidadService.modificar(id, registrarEspecialidad).then((data) => {
        http.ok(req, res, code.status.Ok.code, data);
    }).catch((err) => {
        http.err(req, res, code.status.Internal_Server_Error, error, error)
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);

    especialidadService.eliminar(id)
        .then((data) => {
            http.ok(req, res, code.status.Ok.code, data);
        })
        .catch((error) => {
            http.err(req, res, code.status.Internal_Server_Error, err);
        })
});

module.exports = router;