const { Schema, model } = require("mongoose");

const librarySchema = {
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, "El usuario es obligatorio"],
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
      type: mongoose.Types.ObjectId,
    },
  ],
  public: {
    type: Boolean,
    required: [true, "Public es obligatorio"],
  },
};

module.exports = model("Library", librarySchema); //Debe ir en singular
