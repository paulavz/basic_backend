const bcryptjs = require("bcryptjs");
const { response } = require("express");
const User = require("../models/users");
const Library = require("../models/libraries");
const mongoose = require("mongoose");

const getUsers = async (req, res = response) => {
  const limit = req.query.limit;
  console.log("limit", limit);
  const users = await User.find({}).sort({ _id: -1 }).limit(limit);
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
  console.log(req.body);

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

const getDocumentByUserId = async (req, res = response) => {
  const id = req.params.id;

  const document = await User.findById(id)
    .populate({
      path: "libraries",
      populate: {
        path: "documents",
      },
    })
    .populate({
      path: "followLibraries",
      populate: {
        path: "documents",
      },
    })
    .exec();

  res.json(document);
};

const putUsers = (req, res = response) => {
  const id = req.params.id;
  User.findOneAndUpdate(
    { _id: id },
    { $set: req.body },
    { new: true },
    (err, doc) => {
      if (err) {
        res.json({ error: err });
      }
      res.json(doc);
    }
  );
};

const deleteUsers = (req, res = response) => {
  res.json({
    msg: "delete API- controlador",
  });
};

const followLibrary = async (req, res = response) => {
  const id = req.params.id;
  console.log(id);
  const { libraryId } = req.body;
  const library = await Library.findById(libraryId).exec();
  const usersInfo = await User.findById(id).exec();
  console.log(library, usersInfo);
  if (library) {
    if (!usersInfo?.followLibraries?.includes(libraryId)) {
      const formatLibraries = usersInfo?.followLibraries?.map(
        (el) => new mongoose.mongo.ObjectId(el)
      );
      const idL = new mongoose.mongo.ObjectId(libraryId);
      const newLib = [idL].concat(formatLibraries);

      User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            followLibraries: newLib,
          },
        },
        { new: true },
        (err, doc) => {
          if (err) {
            res.json({ error: err });
          }

          res.json(doc);
        }
      );
    } else {
      res.json({
        msg: "No puedes añadir documentos repetidos",
      });
    }
  }
};

const unFollowLibrary = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const { libraryId } = req.body;
  const usersInfo = await User.findById(id).exec();
  if (usersInfo) {
    User.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          followLibraries: libraryId,
        },
      },
      { new: true },
      (err, doc) => {
        if (err) {
          res.json({ error: err });
        }

        res.json(doc);
      }
    );
  }
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  getDocumentByUserId,
  followLibrary,
  unFollowLibrary,
};
