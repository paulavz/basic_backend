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
  limits: { fileSize: maxSize }
}).single("file");


const uploadFile = util.promisify(upload);
module.exports = uploadFile;