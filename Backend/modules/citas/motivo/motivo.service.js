const citasModel = require('../../../models/citas.model')
const motivoModel = citasModel.modelMotivo;

let crear = (motivo) => {
    let nuevoMotivo = new motivoModel({
        descripcion: motivo.descripcion
    })
    return new Promise((resolve, reject) => {
        nuevoMotivo.save(nuevoMotivo, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

let listar = () => {
    return new Promise((resolve, reject) => {
        motivoModel.find({}).exec((err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

module.exports = {
    crear: crear,
    listar: listar
}
