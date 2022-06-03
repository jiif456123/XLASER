const citasModel = require('../../../models/citas.model')
const modelCaja = citasModel.modelCaja;

let crear = () => {
    let nuevaCaja = new modelCaja({
        abierto: 1
    })
    return new Promise((resolve, reject) => {
        nuevaCaja.save(nuevaCaja, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

let listar = () => {
    return new Promise((resolve, reject) => {
        modelCaja.find({}).exec((err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

let actualizar = (idCaja, abierto) => {
    let id = idCaja
    let abiertoCaja = {
        abierto: abierto,
    }
    return new Promise((resolve, reject) => {
        modelCaja.findByIdAndUpdate(id, abiertoCaja)
            .exec((err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data)
            })
    })
}

module.exports = {
    crear: crear,
    listar: listar,
    actualizar: actualizar
}
