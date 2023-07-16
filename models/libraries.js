const { Schema, model, Types } = require("mongoose");

const librarySchema = {
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "El userId es obligatorio"],
    ref: "User"
  },
  img: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  subject: {
    type: String,
  },
  permission: [
    {
      type: Types.ObjectId,
    },
  ],
  public: {
    type: Boolean,
    required: [true, "Public es obligatorio"],
    default: true,
  },
  documents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Document",
    },
  ],
};

module.exports = model("Library", librarySchema); //Debe ir en singular
