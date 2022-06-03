//import { jwt } from 'jsonwebtoken'
jwt = require('jsonwebtoken');
const config = require('../../../utils/config');
const citasmodel = require("../../../models/citas.model");
const user = citasmodel.modelUser;


const signInService = {};

signInService.getSignIn = async(req, res) => {

    const userFound = await user.findOne({ user: req.body.user });
    if (!userFound) return res.status(450).json({ message: "Usuario no encontrado" });
    /*
                const matchPassword = await user.findOne({ password: req.body.password })
                if (!matchPassword) return res.status(401).json({ token: null, message: 'Contraseña invalida' })
    
                */
    //console.log(req.body.email);
    console.log(req.body.user);
    if (userFound.password != req.body.password) return res.status(408).json({ token: null, message: 'Contraseña Incorrecta' });


    console.log(userFound);
    /*console.log(userFound);
    res.json({ token: '' })
    res.json("signIn");*/


    const token = jwt.sign({ id: userFound._id }, 'sign-api', {
        expiresIn: 86400
    });

    res.json({ token, id: userFound._id });
};

signInService.getUserById = async(req, res) => {


    const categoria = await user.findById(req.params.id);
    res.send(categoria);

    //TODO: ESTA LINEAAAa
    //res.json("FUNCION GET");

}

module.exports = signInService;