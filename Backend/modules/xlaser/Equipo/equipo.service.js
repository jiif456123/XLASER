const lasermodel = require("../../../models/citas.model");
const equipomodel = lasermodel.modelEquipoR

let crear = (equipo) => {
    let newequipo = new equipomodel({
        codigo: equipo.codigo,
        cliente: equipo.cliente,
        tecnico: equipo.tecnico,
        tipo: equipo.tipo,
        marca: equipo.marca,
        descripcion: equipo.descripcion,
        funcionalidad: equipo.funcionalidad,
        color: equipo.color,
        wifi: equipo.wifi,
        impresion: equipo.impresion,
        fechaI: equipo.fechaI,
        estado: equipo.estado,
    })

    console.log(newequipo);

    return new Promise((resolve, reject) => {
        newequipo.save(newequipo, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

var listar = () => {
    return new Promise((resolve, reject) => {
        equipomodel.find({}).exec((err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}
var listarequipo = (id) => {

    return new Promise((resolve, reject) => {

        equipomodel.findById(id)
            .exec((err, newequipo) => {
                if (err) reject(err);

                console.log(newequipo)
                resolve(newequipo);
            })

    });
};
var modificarequipo = (id, newequipo) => {

    return new Promise((resolve, reject) => {
        equipomodel.findByIdAndUpdate(id, newequipo, (err, equipos) => {

            if (err) {
                console.log
                reject(err);
            }
            resolve(equipos);
        });
    });
};

var eliminarequipo = (id) => {
    return new Promise((resolve, reject) => {
        equipomodel.remove({ _id: id }, (err, equipos) => {
            if (err) { reject(err); }
            resolve(equipos);
        })
    })
}



module.exports = {
    crear: crear,
    listar: listar,
    listarequipo: listarequipo,
    modificarequipo: modificarequipo,
    eliminarequipo: eliminarequipo,

}