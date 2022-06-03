const citasModel = require('../../../models/citas.model');
const modelEspecialidad = citasModel.modelEspecialidad;

var listarEspecialidad = () => {

    let query = {
        estado: { $ne: 3 }
    };
    return new Promise((resolve, reject) => {
        modelEspecialidad.find(query).exec((err, listarEspecialidad) => {
            if (err) reject(err);
            resolve(listarEspecialidad);
        });
    });
};

var listarEspecialidadId = (id) => {

    return new Promise((resolve, reject) => {

        modelEspecialidad.findById(id)
            .exec((err, especial) => {
                if (err) reject(err);

                console.log(especial)
                resolve(especial);
            })

    });
};

var registarEspecialidad = (especial) => {

    let objEspecialidad = new modelEspecialidad({
        descripcion: especial.descripcion,
        doctor: especial.doctor,
        estado: especial.estado,
        fechaHora: especial.fechaHora,
        fechaFin: especial.fechaFin
    });

    return new Promise((resolve, reject) => {
        objEspecialidad.save(objEspecialidad, (err, especial) => {
            if (err) reject(err);
            resolve(especial);
        });
    });
};

var modificarEspecialidad = (id, especial) => {

    console.log(especial, ' [especial]');

    return new Promise((resolve, reject) => {
        modelEspecialidad.findByIdAndUpdate(id, especial, (err, especialidades) => {

            if (err) {
                reject(err);
            }
            resolve(especialidades);
        });
    });
};

var eliminarEspecialidad = (id) => {
    return new Promise((resolve, reject) => {
        modelEspecialidad.remove({ _id: id }, (err, especialidades) => {
            if (err) { reject(err); }
            resolve(especialidades);
        })
    })
}

module.exports = {
    listar: listarEspecialidad,
    registrar: registarEspecialidad,
    listarID: listarEspecialidadId,
    modificar: modificarEspecialidad,
    eliminar: eliminarEspecialidad,
};