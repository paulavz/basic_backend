const uploadFile = require('../middlewares/upload')
const FileSystem = require('fs');

const baseUrl = "http://localhost:4000/files/";

const upload = async (req, res) => {
    //Añadir file como key
    try {
        await uploadFile (req,res);

        if (req.file == undefined) {
            return res.status(400).send({ message: "Sube un archivo pls" });
        }

        res.status(200).send ({
            message: "Archivo subido correctamente: " + req.file.originalname,
        });
    }
    catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "Peso Limite: 10 MB"
            });
        }
        //console.log(err);
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

const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = "public/uploads";

    res.download (directoryPath + fileName, fileName, (err) => {
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