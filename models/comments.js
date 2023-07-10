const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "El usuario es obligatorio"],
  },
  documentId: {
    type: Schema.Types.ObjectId,
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
});

module.exports = {
  model: model("Comment", commentSchema),
  CommentSchema: commentSchema,
}; //Debe ir en singular
