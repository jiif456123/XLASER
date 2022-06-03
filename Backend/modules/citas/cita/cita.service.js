const citasModel = require('../../../models/citas.model')
const modelCita = citasModel.modelCita;

let crear = (cita) => {
    let nuevaCita = new modelCita({
        paciente: cita.nIdPaciente,
        motivo: cita.nIdMotivo,
        fechaHora: cita.fechaHora,
        doctor: cita.doctor,
        especialidad: cita.especialidad,
        estado: 1,
        salaNumero: cita.salaNumero //Nuevo
    })
    return new Promise((resolve, reject) => {
        nuevaCita.save(nuevaCita, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

let listar = () => {
    return new Promise((resolve, reject) => {
        modelCita.find({}).populate('paciente motivo')
            .exec((err, data) => {
                if (err) reject(err);
                resolve(data);
            })
    })
}

let actualizar = (idCita, cita) => {
    let id = idCita
    let citaAct = {
        doctor: cita.doctor,
        fechaHora: cita.fechaHora,
        estado: cita.estado
    }

    return new Promise((resolve, reject) => {
        modelCita.findByIdAndUpdate(id, citaAct)
            .exec((err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data)
            })
    })
}


let drop = () => {
    return new Promise((resolve, reject) => {
        modelCita.deleteMany({})
            .exec((err, data) => {
                if (err) reject(err);
                resolve(data);
            })
    })
}

let getCitaByDoctor = async(req, res) => {
    /* if ({ nombre: req.params.nombre } == null) {
         const gestionarCategoria = await gestionarOrdenCompraModel.find();
         res.send(gestionarCategoria);
     } else {*/
    const ordenCompra = await modelCita.find({ doctor: { $regex: req.params.doctor } });

    res.json(ordenCompra);
    /*  }*/


};

module.exports = {
    crear: crear,
    listar: listar,
    actualizar: actualizar,
    drop: drop,
    getCitaByDoctor: getCitaByDoctor
}


//module.exports = cita;