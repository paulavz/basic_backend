const { Router } = require("express");

const {
    upload,
    getListFiles,
    download
} = require ("../controllers/files");

const router = Router();

router.post("/upload", upload);
router.get("/", getListFiles);
router.get("/files/:name", download);

module.exports = router;