var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*
    Paciente Model
*/
var paciente = new Schema({

    nombre: { type: String },
    apellidoPaterno: { type: String },
    apellidoMaterno: { type: String },
    dni: { type: String },
    celular: { type: String },
    email: { type: String },
    fechaNaciemineto: { type: Date },
    direccion: { type: String },
    estado: { type: Number },
    nombreFamiliar: { type: String },
    dniFamiliar: { type: String },
    parentesco: { type: String },
    celularFamiliar: { type: String },
}, {
    versionKey: false
});

var modelPaciente = mongoose.model('Paciente', paciente);

/*
    Espcialidad Model
   
*/
var especial = new Schema({
    descripcion: { type: String },
    doctor: { type: String },
    estado: { type: String },
    fechaHora: { type: Date },
    fechaFin: { type: Date },
}, {
    versionKey: false
});
var modelEspecialidad = mongoose.model('Especial', especial);


/*
    Motivo Model
*/
var motivo = new Schema({
    descripcion: { type: String },
}, {
    versionKey: false
});

var modelMotivo = mongoose.model('Motivo', motivo);

/*
    Caja Model
*/
var caja = new Schema({
    abierto: { type: Number } //1 abierto 0 cerrado
}, {
    versionKey: false
});

var modelCaja = mongoose.model('Caja', caja);

/*
    Movimiento Model
*/
var movimientoCaja = new Schema({
    paciente: { type: Schema.Types.ObjectId, ref: 'Paciente' },
    motivo: { type: Schema.Types.ObjectId, ref: 'Motivo' },
    precio: { type: Number },
    montoRecibido: { type: Number },
    fechaHora: { type: Date },
}, {
    versionKey: false
});
var modelMovimiento = mongoose.model('MovimientoCaja', movimientoCaja);
/*
    Historia Clinica
*/
var historia = new Schema({

    medico: { type: String },
    paciente: { type: Schema.Types.ObjectId, ref: 'Paciente' },
    especialidad: { type: String },
    fecha: { type: Date },
    peso: { type: Number },
    altura: { type: Number },
    tension: { type: Number },
    alergias: { type: String },
    antecedentes: { type: String },
    historia: { type: String },
    diagnostico: { type: String },
}, {
    versionKey: false
});

var modelHistoria = mongoose.model('Historia', historia);

/*
    Cita Model
*/
var cita = new Schema({
    paciente: { type: Schema.Types.ObjectId, ref: 'Paciente' },
    motivo: { type: Schema.Types.ObjectId, ref: 'Motivo' },
    doctor: { type: String },
    especialidad: { type: String },
    fechaHora: { type: Date },
    estado: { type: Number },
    salaNumero: { type: String }
}, {
    versionKey: false
});
var modelCita = mongoose.model('Cita', cita);
//User

var user = new Schema({

    nombre: { type: String },
    rol: { type: String },
    fechaActual: { type: Date },
    apellidoPaterno: { type: String },
    apellidoMaterno: { type: String },
    dni: { type: String },
    celular: { type: Number },
    email: { type: String },
    fechaNacimiento: { type: Date },
    direccion: { type: String },
    especialidad: { type: String },
    password: { type: String },
    user: { type: String }
}, {
    versionKey: false
});

var modelUser = mongoose.model('User', user);

var recetaMedica = new Schema({
    paciente: { type: Schema.Types.ObjectId, ref: 'Paciente' },
    indicacion: { type: String },
    medicina: [{
        nombre: { type: String },
        forma: { type: String },
        duracion: { type: String },
        cantidad: { type: Number },
        dosis: { type: String },
        indicacion: { type: String },
    }],
    fecha: { type: Date },
}, {
    versionKey: false
});
var modelRecetaMedica = mongoose.model('RecetaMedica', recetaMedica);

var detalleRecetaMedica = new Schema({
    recetaMedica: { type: Schema.Types.ObjectId, ref: 'RecetaMedica' },
    forma: { type: String },
    duracion: { type: String },
    cantidad: { type: Number },
    dosis: { type: String },
    indicacion: { type: String },
}, {
    versionKey: false
});
var modelDetalleRecetaMedica = mongoose.model('DetalleRecetaMedica', detalleRecetaMedica);

var consultarhorario = new Schema({
    especialidad: { type: String },
    fecha: { type: Date },
    horario: { type: String },
    doctor: { type: String },
}, {
    versionKey: false
});

var modelconsultarhorario = mongoose.model('consultarhorario', consultarhorario);


var serviciospo = new Schema({
    nombre: { type: String },
    descripcion: { type: String },
    medico: { type: String },
    precio: { type: Number },
    fecha: { type: Date },
    fotoUrl: { type: String }
}, {
    versionKey: false
});

var modelserviciospo = mongoose.model('serviciospo', serviciospo);

var prueba = new Schema({

    nespecialidad: { type: String },
    ndoctor: { type: String },
    descripcion: { type: String },
}, {
    versionKey: false
});

var modelPrueba = mongoose.model('Prueba', prueba);

/*
    Usuario Model X-laser.
*/
var usuario = new Schema({

    username: { type: String },
    password: { type: String },
    nombre: { type: String },
    apellido: { type: String },
    dni: { type: Number },
    telefono: { type: Number },
    correo: { type: String },
    direccion: { type: String },
    rol: { type: String },
}, {
    versionKey: false
});
var modelUsuario = mongoose.model('Usuario', usuario);
/* Reporte Tecnico */
var reporteT = new Schema({

    motivo: { type: String },
    codigomaquina: { type: String },
    descripcion: { type: String },
    estadomaquina: { type: String },
    nombretecnico: { type: String },
    fecha: { type: Date },
}, {
    versionKey: false
});

var modelReporteT = mongoose.model('ReporteT', reporteT);

module.exports = {
    modelPaciente: modelPaciente,
    modelEspecialidad: modelEspecialidad,
    modelMotivo: modelMotivo,
    modelCaja: modelCaja,
    modelMovimiento: modelMovimiento,
    modelHistoria: modelHistoria,
    modelCita: modelCita,
    modelUser: modelUser,
    modelRecetaMedica: modelRecetaMedica,
    modelDetalleRecetaMedica: modelDetalleRecetaMedica,
    modelconsultarhorario: modelconsultarhorario,
    modelserviciospo: modelserviciospo,
    modelPrueba: modelPrueba,
    modelUsuario: modelUsuario,
    modelReporteT: modelReporteT,
}