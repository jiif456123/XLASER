const citasModel = require('../../../models/citas.model')
const detalleRecetaMedica = citasModel.modelDetalleRecetaMedica;

let crear = (detallereceta) => {
    let nuevaDetalleReceta = new detalleRecetaMedica({
        recetaMedica: detallereceta.paciente,
        forma: detallereceta.especialidad,
        duracion: detallereceta.duracion,
        cantidad: detallereceta.cantidad,
        dosis: detallereceta.dosis,
        indicacion: detallereceta.indicacion,
    })
    return new Promise((resolve, reject) => {
        nuevaDetalleReceta.save(nuevaDetalleReceta, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

let listar = (id) => {
    return new Promise((resolve, reject) => {
        detalleRecetaMedica.find({}).exec((err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

module.exports = {
    crear: crear,
    listar: listar
}