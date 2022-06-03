const citasmodel = require("../../../models/citas.model");
const pacientemodel = citasmodel.modelPaciente;
const usermodel = citasmodel.modelUser
const historiamodel = citasmodel.modelHistoria
const modeloCita = citasmodel.modelCita;
const servicios = citasmodel.modelserviciospo;
//const modelCita = citasModel.modelCita;

const deleteDocService = {};

deleteDocService.dropDocsPaciente = async(req, res) => {

    const gestionarMedicamentoOC = await pacientemodel.deleteMany();

    res.json(gestionarMedicamentoOC);

};

deleteDocService.dropDocsServicios = async(req, res) => {

    const gestionarMedicamentoOC = await servicios.deleteMany();

    res.json(gestionarMedicamentoOC);

};

deleteDocService.dropDocsUser = async(req, res) => {

    const gestionarMedicamentoOC = await usermodel.deleteMany();

    res.json(gestionarMedicamentoOC);

};

deleteDocService.dropDocsHistoria = async(req, res) => {

    const gestionarMedicamentoOC = await historiamodel.deleteMany();

    res.json(gestionarMedicamentoOC);

};

deleteDocService.dropDocsCitas = async(req, res) => {

    const gestionarMedicamentoOC = await modeloCita.deleteMany();

    res.json(gestionarMedicamentoOC);

};
module.exports = deleteDocService;