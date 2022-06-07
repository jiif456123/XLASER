const citasmodel = require("../../../models/citas.model");
const reportetmodel = citasmodel.modelReporteT
const gestionarMedicamentoOCService = {};

let crear = (reportet) => {
    let Fecha = new Date(reportet.fecha)
    let newreportet = new reportetmodel({
        motivo: reportet.motivo,
        codigomaquina: reportet.codigomaquina,
        descripcion: reportet.descripcion,
        estadomaquina: reportet.estadomaquina,
        nombretecnico: reportet.nombretecnico,
        fecha: Fecha,
    })

    return new Promise((resolve, reject) => {
        newreportet.save(newreportet, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

var listar = () => {
    return new Promise((resolve, reject) => {
        reportetmodel.find({}).exec((err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}
var listarreportet = (id) => {

    return new Promise((resolve, reject) => {

        reportetmodel.findById(id)
            .exec((err, newreportet) => {
                if (err) reject(err);

                console.log(newreportet)
                resolve(newreportet);
            })

    });
};
var modificarreportet = (id, newreportet) => {

    if (newreportet.fecha) {
        newreportet.fecha = new Date(newreportet.fecha);
    }

    return new Promise((resolve, reject) => {
        reportetmodel.findByIdAndUpdate(id, newreportet, (err, reportets) => {

            if (err) {
                console.log
                reject(err);
            }
            resolve(reportets);
        });
    });
};
var eliminarreportet = (id) => {
    return new Promise((resolve, reject) => {
        reportetmodel.remove({ _id: id }, (err, reportets) => {
            if (err) { reject(err); }
            resolve(reportets);
        })
    })
}



module.exports = {
    crear: crear,
    listar: listar,
    listarreportet: listarreportet,
    modificarreportet: modificarreportet,
    eliminarreportet: eliminarreportet,
}