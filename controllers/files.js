const uploadFile = require('../middlewares/upload')
const FileSystem = require('fs');
const User = require("../models/users");
const { response } = require("express");
const url = require("url");
const { documentModel: Document } = require("../models/documents");

const baseUrl = "http://localhost:4000/files/";

const upload = async (req, res = response) => {

    try {
        await uploadFile (req,res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "No se subió un archivo o el formato es incorrecto" });
        }
        //Esta parte hace que devuelva el link entero si se le añade esto
        //tipo http://localhost:3000/pfp/nombre.png
        //pero como el host es dinamico se guarda sin eso y se lo añades despues
        /*
        fileurl = url.format({
            protocol: req.protocol,
            host: req.get('host'),
        });
        */

        if (req.path.includes("/pfp")) fileurl = "/pfp/" + req.file.filename;
        else if (req.path.includes("/cover")) fileurl = "/cover/" + req.file.filename;
        else fileurl = "/uploads/" + req.file.filename;

        res.status(200).send ({
            message: "Archivo subido correctamente: " + req.file.originalname,
            path: fileurl
        });
        //aqui entonces buscas como guardar el mensaje path y haces un put en la base de datos
    }
    catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "Peso Limite: 10 MB"
            });
        }
        res.status(500).send ({
            message: `No se logro subir el archivo. ${err}`,
        });

    }
};

const getListFiles = (req, res) => {
    const directoryPath = "public/uploads";
    FileSystem.readdir (directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "No se pudieron leer los archivos",
            });
        }
        else {
            const fileInfos = [];

            files.forEach((file) => {
                fileInfos.push ({
                    name: file,
                    url: baseUrl + file,
                });
            });
            res.status(200).send(fileInfos);
        }
    });

};


//Como las imagenes se guardan en public, no hace falta bajarlas
//sino que se puede acceder directamente a ellas a traves de http://localhost:3000/<path>
//De otro modo, esta función hace que descargues el archivo a juro en vez de mostrarlo

//Pero entonces, en caso de que existan se podrá acceder a los avatares mediante /pfp/<userId>.png
//pero eso es porque yo los voy a guardar asi, me imagino que se podra revisar la db
//y si no hay ningun link a una imagen pone la de fallback

const download = (req, res) => {
    const fileName = req.params.name;
    let directoryPath = "";

    if (req.path.includes("/pfp")) directoryPath = "public/pfp";
    else if (req.path.includes("/cover")) directoryPath = "public/cover";
    else directoryPath = "public/uploads";
    
    res.download (directoryPath + '/' + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send ({
                message: "No se pudo descargar el archivo" + err,
            });
        }
    });
};

module.exports = {
    upload,
    getListFiles,
    download,
  };