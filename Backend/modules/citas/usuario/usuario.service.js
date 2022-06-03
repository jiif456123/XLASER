const xlasermodel = require("../../../models/citas.model");
const usuariomodel = xlasermodel.modelUsuario

let crear = (usuario) => {
    let newusuario = new usuariomodel({
        username: usuario.username,
        password: usuario.password,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        dni: usuario.dni,
        telefono: usuario.telefono,
        correo: usuario.correo,
        direccion: usuario.direccion,
        rol: usuario.rol,
    })

    return new Promise((resolve, reject) => {
        newusuario.save(newusuario, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

var listar = () => {
    return new Promise((resolve, reject) => {
        usuariomodel.find({}).exec((err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}
var listarId = (id) => {

    return new Promise((resolve, reject) => {

        usuariomodel.findById(id)
            .exec((err, newusuario) => {
                if (err) reject(err);

                console.log(newusuario)
                resolve(newusuario);
            })

    });
};
var modificar = (id, newusuario) => {

    return new Promise((resolve, reject) => {
        usuariomodel.findByIdAndUpdate(id, newusuario, (err, usuarios) => {

            if (err) {
                console.log
                reject(err);
            }
            resolve(usuarios);
        });
    });
};
var eliminar = (id) => {
    return new Promise((resolve, reject) => {
        usuariomodel.remove({ _id: id }, (err, usuarios) => {
            if (err) { reject(err); }
            resolve(usuarios);
        })
    })
}




module.exports = {
    crear: crear,
    listar: listar,
    listarId: listarId,
    modificar: modificar,
    eliminar: eliminar,

}