const { Router } = require("express");

const {
    upload,
    getListFiles,
    download,
} = require ("../controllers/files");

const router = Router();

router.post("/upload", upload);
router.post("/upload/pfp", upload);
router.post("/upload/cover", upload);
router.get("/", getListFiles);
router.get("/:name", download);
router.get("/pfp/:name", download);

module.exports = router;