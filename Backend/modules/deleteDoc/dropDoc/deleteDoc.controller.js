const deleteDocService = require('./deleteDoc.service');
const router = require('express').Router();


router.delete('/dropUsers/', deleteDocService.dropDocsUser);
router.delete('/dropHistorias/', deleteDocService.dropDocsHistoria);
router.delete('/dropPacientes/', deleteDocService.dropDocsPaciente);
router.delete('/dropCitas/', deleteDocService.dropDocsCitas);
router.delete('/dropServicios/', deleteDocService.dropDocsServicios);





module.exports = router;