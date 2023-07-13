const multer = require('multer');
const util = require('util');
//10 MB como maximo para general use
const maxSize = 1024 * 1024 * 10

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create the multer instance
const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize }
}).single("file");


const uploadFile = util.promisify(upload)
module.exports = uploadFile;