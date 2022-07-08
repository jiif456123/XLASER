const citasmodel = require("../../../models/citas.model");
const cantidadreporte = citasmodel.modelCantidad

let crear = (cantidad) => {
    let newcantidad = new cantidadreporte({
        cantidad: cantidad.cantidad,
    })

    return new Promise((resolve, reject) => {
        newcantidad.save(newcantidad, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

var listar = () => {
    return new Promise((resolve, reject) => {
        cantidadreporte.find({}).exec((err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}
var listarId = (id) => {

    return new Promise((resolve, reject) => {

        cantidadreporte.findById(id)
            .exec((err, newcantidad) => {
                if (err) reject(err);

                console.log(newcantidad)
                resolve(newcantidad);
            })

    });
};
var modificar = (id, newcantidad) => {

    return new Promise((resolve, reject) => {
        cantidadreporte.findByIdAndUpdate(id, newcantidad, (err, cantidades) => {

            if (err) {
                console.log
                reject(err);
            }
            resolve(cantidades);
        });
    });
};
var eliminar = (id) => {
    return new Promise((resolve, reject) => {
        cantidadreporte.remove({ _id: id }, (err, cantidades) => {
            if (err) { reject(err); }
            resolve(cantidades);
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