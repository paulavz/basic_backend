const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/users";
    this.documentPath = "/api/documents";
    this.commentPath = "/api/comment";
    this.libraryPath = "/api/library";
    this.memberPath = "/api/member";
    this.filePath = "/api/files";

    //Conectar a base de datos
    this.connectDB();

    //Middlewares
    this.middrewares();
    //Rutas de mi Aplicación

    //Parseo y lectura del body
    this.app.use(express.json());

    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middrewares() {
    //cors
    this.app.use(cors());
    //Directorio Público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/user"));
    this.app.use(this.documentPath, require("../routes/document"));
    this.app.use(this.commentPath, require("../routes/comment"));
    this.app.use(this.libraryPath, require("../routes/library"));
    this.app.use(this.memberPath, require("../routes/login"));
    this.app.use(this.filePath, require("../routes/file"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
