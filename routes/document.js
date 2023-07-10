const { Router } = require("express");
const {
  getDocuments,
  postDocument,
  getDocumentById,
  putDocument,
  putComment,
} = require("../controllers/document");

const router = Router();

router.get("/", getDocuments);

router.get("/:id", getDocumentById);

router.post("/", postDocument);

router.put("/:id", putDocument);

module.exports = router;
