const citasModel = require('../../../models/citas.model')
const movimientoModel = citasModel.modelMovimiento;

let crear = (movimiento) => {
    let nuevoMovimiento = new movimientoModel({
        paciente: movimiento.nIdPaciente,
        motivo: movimiento.nIdMotivo,
        precio: movimiento.precio,
        montoRecibido: movimiento.montoRecibido,
        fechaHora: new Date()
    })
    return new Promise((resolve, reject) => {
        nuevoMovimiento.save(nuevoMovimiento, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

let listar = () => {
    return new Promise((resolve, reject) => {
        movimientoModel.find({}).populate('paciente motivo')
            .exec((err, data) => {
                if (err) reject(err);
                resolve(data);
            })
    })
}

module.exports = {
    crear: crear,
    listar: listar
}