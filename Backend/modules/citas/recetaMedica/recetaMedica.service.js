const citasModel = require('../../../models/citas.model')
const recetaMedica = citasModel.modelRecetaMedica;

let crear = (receta) => {
    let nuevaReceta = new recetaMedica({
        paciente: receta.paciente,
        indicacion: receta.indicacion,
        medicina: receta.medicina,
        fecha: new Date()
    })
    return new Promise((resolve, reject) => {
        nuevaReceta.save(nuevaReceta, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

let listar = () => {
    return new Promise((resolve, reject) => {
        recetaMedica.find({}).populate('paciente').exec((err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

let listarId = (id) => {
    return new Promise((resolve, reject) => {
        recetaMedica.findById(id).populate('paciente').exec((err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

module.exports = {
    crear: crear,
    listar: listar,
    listarId: listarId
}