const { Schema, model } = require("mongoose");

const userSchema = {
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  lastName: {
    type: String,
    required: [true, "El apellido es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  img: {
    type: String,
  },
  libraries: {
    type: String,
  },
  type: {
    type: String,
    enum: ["docente", "estudiante", "personal", "invitado"],
  },
  subject: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "TEACHER_ROLE", "COMMON_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
};

module.exports = model("User", userSchema); //Debe ir en singular
