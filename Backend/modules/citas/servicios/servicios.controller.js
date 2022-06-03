const http = require('../../../utils/http');
const code = require('../../../utils/status');
const router = require('express').Router();
const userService = require("./servicios.services");
/*
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'upl')
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

exports.upload2 = upload.single('myFile')

exports.uploadFile = (req, res) => {
        res.send({ data: 'Enviar un archivo' })
    }
    

router.post(
        `/imagen`,
        this.uploadFile,
        this.upload2

    )
    */
//método para agregar
router.post('/', (req, res) => {
        let user = req.body;
        userService.crear(user).then(
                (data) => http.ok(req, res, code.status.Ok.code, data))
            .catch(
                (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
    })
    //método para buscar todos los datos
router.get('/', (req, res) => {
        console.log('Buscando datos...')
        userService.listar().then(
                (data) => http.ok(req, res, code.status.Ok.code, data))
            .catch(
                (errorMessage) => http.err(req, res, code.status.Internal_Server_Error.code, errorMessage, errorMessage));
    })
    //método para buscar por id es decir el numero largo que se genera solo
router.get('/:id', (req, res) => {
    console.log('Buscando datos por ID en el POSTMAN...')
    let id = req.params.id;
    console.log(id);

    userService.listarservicio(id)
        .then((data) => {
            http.ok(req, res, code.status.Ok.code, data);
        })
        .catch((error) => {
            http.err(req, res, code.status.Internal_Server_Error, err);
        })
});

//método para actualizar datos
router.put('/:id', (req, res) => {

    let id = req.params.id;
    let user = req.body;

    console.log(id);

    userService.modificarservicio(id, user).then((data) => {
        http.ok(req, res, code.status.Ok.code, data);
    }).catch((error) => {
        http.err(req, res, code.status.Internal_Server_Error.code, error, error)
    });
});

//métodod para elimiar datos
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);

    userService.eliminarservicio(id)
        .then((data) => {
            http.ok(req, res, code.status.Ok.code, data);
        })
        .catch((error) => {
            http.err(req, res, code.status.Internal_Server_Error, err);
        })
});



module.exports = router;