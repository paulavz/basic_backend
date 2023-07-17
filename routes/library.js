const { Router } = require("express");
const {
  getLibrary,
  createLibrary,
  addDocumentToLibrary,
} = require("../controllers/library");

const router = Router();

router.get("/:limit", getLibrary);
router.get("/", getLibrary);
router.post("/", createLibrary);

router.put("/:id", addDocumentToLibrary);

module.exports = router;
