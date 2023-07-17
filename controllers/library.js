const { response } = require("express");
const mongoose = require("mongoose");
const Library = require("../models/libraries");
const User = require("../models/users");

const getLibrary = async (req, res = response) => {
  //query: library/?limit=NUMERO&page=PAGINA
  //si no hay query, regresa todos los items
  const limit = req.query.limit;
  const page = req.query.page;

  const libraries = await Library.find({})
    .populate("documents")
    .limit(limit)
    .skip((page- 1)* limit)
    .sort({_id:-1});
  
  const count = await Library.countDocuments();

  const totalPages = Math.ceil(count/limit);
  const currentPage = parseInt(page);

  res.json({libraries, totalPages: totalPages, currentPage: currentPage});
};

const createLibrary = async (req, res = response) => {
  const { img, name, subject, permission, public, documents, userId } =
    req.body;
  const library = new Library({
    img,
    name,
    subject,
    permission,
    public,
    documents,
    userId
  });

  //Guardar en BD
  library.save().then((resp) => {
    User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          libraries: resp._id,
        },
      },
      { new: true },
      (err, doc) => {
        if (err) {
          res.json({ error: err });
        }
        res.json({ doc });
      }
    );
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
