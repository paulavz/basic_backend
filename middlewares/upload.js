const multer = require('multer');
const util = require('util');
const path = require('path');
//10 MB como maximo para general use
const maxSize = 1024 * 1024 * 10;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.path.includes("/pfp")) cb(null, './public/pfp');
    else if (req.path.includes("/cover")) cb(null, './public/cover');
    else cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, "" + Date.now() + path.extname(file.originalname));
  }
});

// Create the multer instance
const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    checkFileType(req, file, cb)
  }
}).single("file");


function checkFileType (req, file, cb) {
  //regexp vacia
  let filetypes = / /;
  if ((!req.path.includes("/pfp")) && (!req.path.includes("/cover"))) {
    //si es una subida normal, se permiten estos archivos
    filetypes = /txt|doc|docx|ppt|pptx|pdf/;
  }
  //de otra manera solo imagenes
  else filetypes = /jpeg|jpg|png|gif/;
  //revisa que las extensiones coincidan
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  //en caso de que pase las dos pruebas sube el archivo
  if(mimetype && extname) return cb(null, true);
  //de lo contrario cancela la operacion
  else return cb(null, false);
}

const uploadFile = util.promisify(upload);
module.exports = uploadFile;