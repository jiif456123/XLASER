var Categoria = require('../model/categoria.model');


var listarCategorias = () => {

    let query = {
        estado: { $ne: 3 }
    };

    return new Promise((resolve, reject) => {
        Categoria.find(query).exec((err, listaCategorias) => {
            if (err) reject(err);
            resolve(listaCategorias);
        });
    });
};

var registrarCategorias = (categoria) => {

    let objCategoria = new Categoria({
        nombre: categoria.nombre,
        especialidad: categoria.especialidad,
    });

    return new Promise((resolve, reject) => {
        objCategoria.save((err, categorias) => {
            if (err) reject(err);
            resolve(categorias);
        });
    });
};


var modificarCategorias = (id, categoria) => {

    console.log(categoria, ' [categoria]');

    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(id, categoria, (err, categorias) => {

            if (err) {
                reject(err);
            }
            resolve(categorias);
        });
    });
};

module.exports = {
    listar: listarCategorias,
    registrar: registrarCategorias,
    modificar: modificarCategorias
};