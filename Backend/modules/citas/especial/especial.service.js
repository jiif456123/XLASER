const citasmodel = require("../../../models/citas.model");
const pruebamodel = citasmodel.modelPrueba;
let crear = (prueba) => {
    let newprueba = new pruebamodel({
        nespecialidad: prueba.nespecialidad,
        ndoctor: prueba.ndoctor,
        descripcion: prueba.descripcion,
    })

    return new Promise((resolve, reject) => {
        newprueba.save(newprueba, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

var listar = () => {
    return new Promise((resolve, reject) => {
        pruebamodel.find({}).exec((err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}
var listarespecialidad = (id) => {

    return new Promise((resolve, reject) => {

        pruebamodel.findById(id)
            .exec((err, newprueba) => {
                if (err) reject(err);

                console.log(newprueba)
                resolve(newprueba);
            })

    });
};
var modificarespecialidad = (id, newprueba) => {

    return new Promise((resolve, reject) => {
        pruebamodel.findByIdAndUpdate(id, newprueba, (err, pruebas) => {

            if (err) {
                console.log
                reject(err);
            }
            resolve(pruebas);
        });
    });
};
var eliminarespecialidad = (id) => {
    return new Promise((resolve, reject) => {
        pruebamodel.remove({ _id: id }, (err, pruebas) => {
            if (err) { reject(err); }
            resolve(pruebas);
        })
    })
}
module.exports = {
    crear: crear,
    listar: listar,
    listarespecialidad: listarespecialidad,
    modificarespecialidad: modificarespecialidad,
    eliminarespecialidad: eliminarespecialidad
}