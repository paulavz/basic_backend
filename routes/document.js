const { Router } = require("express");
const {
  getDocuments,
  postDocument,
  getDocumentById,
  putDocument,
  putComment,
  getSearch,
} = require("../controllers/document");

const router = Router();

router.post("/buscar", getSearch);

router.get("/", getDocuments);

router.get("/:id", getDocumentById);

router.post("/", postDocument);

router.put("/:id", putDocument);

module.exports = router;
