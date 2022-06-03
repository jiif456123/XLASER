const mongoose = require('mongoose');

conectarDB = (uris, options) => {

    return new Promise(function(resolve, reject) {

        mongoose.connect(uris, options, function(err) {

            if (err) {
                return reject(err);
            }

            resolve('Conexion a la base de dato, con éxito')
        });
    });
};

module.exports = conectarDB;