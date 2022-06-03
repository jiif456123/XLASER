const citasmodel = require("../../../models/citas.model");
const usermodel = citasmodel.modelserviciospo



let crear = (user) => {

    let newuser = new usermodel({

        nombre: user.nombre,
        descripcion: user.descripcion,
        medico: user.medico,
        precio: user.precio,
        fecha: user.fecha,
        fotoUrl: user.fotoUrl
            //imagePath
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
var listarservicio = (id) => {

    return new Promise((resolve, reject) => {

        usermodel.findById(id)
            .exec((err, newuser) => {
                if (err) reject(err);

                console.log(newuser)
                resolve(newuser);
            })

    });
};


var modificarservicio = (id, newuser) => {

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
var eliminarservicio = (id) => {
    return new Promise((resolve, reject) => {
        usermodel.remove({ _id: id }, (err, users) => {
            if (err) { reject(err); }
            resolve(users);
        })
    })
}
module.exports = {
    crear: crear,
    listar: listar,
    listarservicio: listarservicio,
    modificarservicio: modificarservicio,
    eliminarservicio: eliminarservicio
}