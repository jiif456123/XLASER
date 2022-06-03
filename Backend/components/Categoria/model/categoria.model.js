var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoria = new Schema({

    nombre: { type: String },
    especialidad: { type: String }
}, {
    versionKey: false
});

var model = mongoose.model('Categoria', categoria);
module.exports = model;