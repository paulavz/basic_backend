const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const commentSchema = {
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, "El usuario es obligatorio"],
  },
  documentId: {
    type: mongoose.Types.ObjectId,
    required: [true, "El documento id es obligatorio"],
  },
  punctuation: {
    type: Number,
    required: [true, "La puntuacion es obligatorio"],
  },
  comment: {
    type: String,
    required: [true, "El comentario es obligatorio"],
  },
  updateAt: { type: Date, default: Date.now },
  createAt: { type: Date, default: Date.now },
};

module.exports = model("Comment", commentSchema); //Debe ir en singular
