const http = require('../../../utils/http');
const code = require('../../../utils/status');
const router = require('express').Router();
const usuarioService = require("../usuario/usuario.service");
const xlasermodel = require("../../../models/citas.model");

const usuariomodel = xlasermodel.modelUsuario;


router.post('/', (req, res) => {
    let usuario = req.body;
    usuarioService.crear(usuario).then(
            (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})

router.get('/', (req, res) => {
    usuarioService.listar().then(
            (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})


router.put('/:id', (req, res) => {

    let id = req.params.id;
    let usuario = req.body;

    console.log(id);

    usuarioService.modificar(id, usuario).then((data) => {
        http.ok(req, res, code.status.Ok.code, data);
    }).catch((error) => {
        http.err(req, res, code.status.Internal_Server_Error.code, error, error)
    });
});


router.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);

    usuarioService.eliminar(id)
        .then((data) => {
            http.ok(req, res, code.status.Ok.code, data);
        })
        .catch((error) => {
            http.err(req, res, code.status.Internal_Server_Error, err);
        })
});

router.get('/:id', (req, res) => {
    //por Id
    let id = req.params.id;

    usuarioService.listarId(id).then((data) => {
        http.ok(req, res, code.status.Ok.code, data);
    }).catch((error) => {
        http.err(req, res, code.status.Internal_Server_Error, error, error)
    });
});

module.exports = router;