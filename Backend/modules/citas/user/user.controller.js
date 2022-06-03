const http = require('../../../utils/http');
const code = require('../../../utils/status');

const router = require('express').Router();
const userService = require("./user.service");

const { dropDocuments } = require('./user.service');


router.post('/', (req, res) => {
    let user = req.body;
    userService.crear(user).then(
            (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})

router.get('/', (req, res) => {
    userService.listar().then(
            (data) => http.ok(req, res, code.status.Ok.code, data))
        .catch(
            (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
})


router.put('/:id', (req, res) => {

    let id = req.params.id;
    let user = req.body;

    console.log(id);

    userService.modificarhistoria(id, user).then((data) => {
        http.ok(req, res, code.status.Ok.code, data);
    }).catch((error) => {
        http.err(req, res, code.status.Internal_Server_Error.code, error, error)
    });
});


router.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);

    userService.eliminarhistoria(id)
        .then((data) => {
            http.ok(req, res, code.status.Ok.code, data);
        })
        .catch((error) => {
            http.err(req, res, code.status.Internal_Server_Error, err);
        })
});




module.exports = router;