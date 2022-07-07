const http = require('../../../utils/http');
const code = require('../../../utils/status');
const router = require('express').Router();
const equipoSevice = require("./equipo.service");

router.post('/', (req, res) => {
    let equipo = req.body;
    equipoSevice.crear(equipo).then(
            (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})

router.get('/', (req, res) => {
    equipoSevice.listar().then(
            (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})

router.get('/:id', (req, res) => {
    //por Id
    let id = req.params.id;

    equipoSevice.listarequipo(id).then((data) => {
        http.ok(req, res, code.status.Ok.code, data);
    }).catch((error) => {
        http.err(req, res, code.status.Internal_Server_Error, error, error)
    });
});

router.put('/:id', (req, res) => {

    let id = req.params.id;
    let equipo = req.body;

    console.log(id);

    equipoSevice.modificarequipo(id, equipo).then((data) => {
        http.ok(req, res, code.status.Ok.code, data);
    }).catch((error) => {
        http.err(req, res, code.status.Internal_Server_Error.code, error, error)
    });
});


router.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);

    equipoSevice.eliminarequipo(id)
        .then((data) => {
            http.ok(req, res, code.status.Ok.code, data);
        })
        .catch((error) => {
            http.err(req, res, code.status.Internal_Server_Error, err);
        })
});


module.exports = router;