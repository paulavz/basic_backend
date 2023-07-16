const { response } = require("express");
const mongoose = require("mongoose");
const Library = require("../models/libraries");

const getLibrary = async (req, res = response) => {
  const library = await Library.find({}).populate("documents").sort({_id:-1});
  res.json(library);
};

const createLibrary = async (req, res = response) => {
  const { img, name, subject, permission, public, documents } = req.body;
  const library = new Library({
    img,
    name,
    subject,
    permission,
    public,
    documents,
  });

  //Guardar en BD
  await library.save();

  res.json({
    msg: "post API- controlador",
    library,
  });
};

const addDocumentToLibrary = async (req, res = response) => {
  const libraryId = req.params.id;
  const library = await Library.findById(libraryId).exec();
  const { documents } = req.body;
  const formatDocuments = documents.map(
    (el) => new mongoose.mongo.ObjectId(el)
  );
  const newDocuments = library.documents.concat(formatDocuments);
  Library.findOneAndUpdate(
    { _id: libraryId },
    {
      $set: {
        documents: newDocuments,
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
};

module.exports = {
  getLibrary,
  createLibrary,
  addDocumentToLibrary,
};
