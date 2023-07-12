const bcryptjs = require("bcryptjs");
const User = require("../models/users");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  const comparePassword = bcryptjs.hashSync(password, salt);
  const userInfo = await User.findOne({ email });

  bcryptjs.compare(password, userInfo.password, function (err, resp) {
    if (err) {
      res.json({ error: err });
    }
    if (resp) {
      userInfo.password = undefined;
      res.json({
        userInfo,
      });
    }
  });
};

module.exports = { login };
