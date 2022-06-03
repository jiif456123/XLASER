const signInService = require('../signIn/signIn.service');

const router = require('express').Router();

router.get('/:id', signInService.getUserById);


router.post('/', signInService.getSignIn);

//router.put('/:id', gestionarOrdenCompraService.editOdenCompra);



module.exports = router;