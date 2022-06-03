const citasmodel = require("../../../models/citas.model");
const historiamodel = citasmodel.modelHistoria

let crear = (historia) => {
    let fecha = new Date(historia.fecha)
    let newhistoria = new historiamodel({
        medico: historia.medico,
        especialidad: historia.especialidad,
        fecha: fecha,
        peso: historia.peso,
        altura: historia.altura,
        tension: historia.tension,
        alergias: historia.alergias,
        antecedentes: historia.antecedentes,
        historia: historia.historia,
        diagnostico: historia.diagnostico,
        paciente: historia.paciente,
    })

    console.log(newhistoria);

    return new Promise((resolve, reject) => {
        newhistoria.save(newhistoria, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

var listar = () => {
    return new Promise((resolve, reject) => {
        historiamodel.find({}).exec((err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}
var listarhistoria = (id) => {

    return new Promise((resolve, reject) => {

        historiamodel.findById(id)
            .exec((err, newhistoria) => {
                if (err) reject(err);

                console.log(newhistoria)
                resolve(newhistoria);
            })

    });
};
var modificarhistoria = (id, newhistoria) => {

    if (newhistoria.fecha) {
        newhistoria.fecha = new Date(newhistoria.fecha);
    }

    return new Promise((resolve, reject) => {
        historiamodel.findByIdAndUpdate(id, newhistoria, (err, historias) => {

            if (err) {
                console.log
                reject(err);
            }
            resolve(historias);
        });
    });
};
var eliminarhistoria = (id) => {
    return new Promise((resolve, reject) => {
        historiamodel.remove({ _id: id }, (err, historias) => {
            if (err) { reject(err); }
            resolve(historias);
        })
    })
}



var getHistoriaByPacienteID = async(req, res) => {

    const ordenCompra = await historiamodel.find({ paciente: req.params.paciente });

    res.json(ordenCompra);



};


module.exports = {
    crear: crear,
    listar: listar,
    listarhistoria: listarhistoria,
    modificarhistoria: modificarhistoria,
    eliminarhistoria: eliminarhistoria,
    getHistoriaByPacienteID: getHistoriaByPacienteID

}