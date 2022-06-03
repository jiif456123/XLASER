const citasmodel = require("../../../models/citas.model");
const usermodel = citasmodel.modelUser
const gestionarMedicamentoOCService = {};

let crear = (user) => {
    let fechaNacimiento = new Date(user.fechaNacimiento)
    let newuser = new usermodel({
        nombre: user.nombre,
        rol: user.rol,
        apellidoPaterno: user.apellidoPaterno,
        apellidoMaterno: user.apellidoMaterno,
        dni: user.dni,
        celular: user.celular,
        email: user.email,
        fechaNacimiento: fechaNacimiento,
        direccion: user.direccion,
        especialidad: user.especialidad,
        password: user.password,
        fechaActual: new Date(),
        user: user.user
    })

    console.log(newuser);

    return new Promise((resolve, reject) => {
        newuser.save(newuser, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

var listar = () => {
    return new Promise((resolve, reject) => {
        usermodel.find({}).exec((err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}
var listarhistoria = (id) => {

    return new Promise((resolve, reject) => {

        usermodel.findById(id)
            .exec((err, newuser) => {
                if (err) reject(err);

                console.log(newuser)
                resolve(newuser);
            })

    });
};
var modificarhistoria = (id, newuser) => {

    if (newuser.fecha) {
        newuser.fecha = new Date(newuser.fecha);
    }
    newuser.fechaActual = new Date();
    return new Promise((resolve, reject) => {
        usermodel.findByIdAndUpdate(id, newuser, (err, users) => {

            if (err) {
                console.log
                reject(err);
            }
            resolve(users);
        });
    });
};
var eliminarhistoria = (id) => {
    return new Promise((resolve, reject) => {
        usermodel.remove({ _id: id }, (err, users) => {
            if (err) { reject(err); }
            resolve(users);
        })
    })
}


gestionarMedicamentoOCService.dropDocuments = async(req, res) => {

    const gestionarMedicamentoOC = await usermodel.deleteMany();

    res.json(gestionarMedicamentoOC);

};

module.exports = {
    crear: crear,
    listar: listar,
    listarhistoria: listarhistoria,
    modificarhistoria: modificarhistoria,
    eliminarhistoria: eliminarhistoria
}