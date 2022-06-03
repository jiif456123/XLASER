const citasController = require('../modules/citas/controller/citas.controller');
const farmaciaController = require('../modules/citas/controller/citas.controller');
const signInController = require('../modules/iniciar-sesion/controller/iniciar-sesion.controller');
const deleteDocsController = require('../modules/deleteDoc/controller/deleteDocMasterController.controller');
const express = require('express');

const rutas = function(app) {
    app.use('/domicilio', citasController)
    app.use('/virtual', farmaciaController)
    app.use('/auth', signInController)
    app.use('/drop', deleteDocsController)
    app.use('/uploads/serviceImg', express.static('uploads/serviceImg'));


}



module.exports = rutas;