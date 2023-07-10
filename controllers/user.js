const bcryptjs = require("bcryptjs");
const { response } = require("express");
const User = require("../models/users");

const getUsers = async (req, res = response) => {
  const users = await User.find({});
  res.json(users);
};

const postUsers = async (req, res = response) => {
  const {
    name,
    lastName,
    email,
    phone,
    password,
    img,
    libraries,
    type,
    subject,
    role,
    state,
  } = req.body;

  const usuario = new User({
    name,
    lastName,
    email,
    phone,
    password,
    img,
    libraries,
    type,
    subject,
    role,
    state,
  });

  //Verificar si el correo existe
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return res.status(400).json({
      msg: "El correo ya está registrado",
    });
  }

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en BD
  await usuario.save();

  res.json({
    msg: "post API- controlador",
    usuario,
  });
};

const getUserById = async (req, res = response) => {
  const id = req.params.id;

  const document = await User.findById(id)
    .populate({
      path: "libraries",
      populate: {
        path: "documents",
      },
    })
    .exec();

  res.json(document);
};

const putUsers = (req, res = response) => {
  res.json({
    msg: "put API- controlador",
  });
};

const deleteUsers = (req, res = response) => {
  res.json({
    msg: "delete API- controlador",
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  getUserById,
};
