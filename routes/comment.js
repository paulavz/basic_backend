const { Router } = require("express");
const { addComment } = require("../controllers/comment");

const router = Router();

router.put("/", addComment);

module.exports = router;
