const bcryptjs = require('bcryptjs');
const { response } = require('express'); 
const User = require('../models/users');

const getUsers = (req, res = response) => {
    res.json({
        msg:'get API- controlador'
    });
}

const postUsers = async (req, res = response) => {
    const { name, email, password, role} = req.body;
    const usuario = new User({name, email, password, role});

    //Verificar si el correo existe
    const isEmail = await User.findOne({email});
    if(isEmail){
        return res.status(400).json({
            msg:"El correo ya está registrado"
        })
    }

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    //Guardar en BD
    await usuario.save();
 
    res.json({
        msg:'post API- controlador',
        usuario
    });
}

const putUsers = (req, res = response) => {
    res.json({
        msg:'put API- controlador'
    });
}

const patchUsers = (req, res = response) => {
    res.json({
        msg:'patch  API- controlador'
    });
}

const deleteUsers = (req, res = response) => {
    res.json({
        msg:'delete API- controlador'
    });
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}