const { check } = require("express-validator");
const { Router } = require("express");
const {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
  getUserById,
  getDocumentByUserId,
  followLibrary,
  unFollowLibrary,
} = require("../controllers/user");
const { validateEntry } = require("../middlewares/validateEntry");
const { isRoleValidator } = require("../helpers/db-validators");

const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña debe tener más de 6 letras").isLength({
      min: 6,
    }),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("email", "El correo no es válido").isEmail(),
    /*check('role','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),*/
    check("role").custom(isRoleValidator),
    validateEntry,
  ],
  postUsers
);

router.put("/", putUsers);

router.delete("/", deleteUsers);

router.get("/:id", getDocumentByUserId);

router.put("/follow/:id", followLibrary);

router.put("/unfollow/:id", unFollowLibrary);

router.put("/:id/edit", putUsers);

module.exports = router;
