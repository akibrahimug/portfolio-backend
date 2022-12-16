const { User } = require("../models");
const jwt = require("jsonwebtoken");

const AuthControler = {
  async googleLogin(req, res) {
    if (req.user) {
      const { email } = req.user;
      const user = await User.findOne({ where: { email } });
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.status(200).json({
        message: "Login successful",
        token,
        user,
      });
    } else {
      res.status(401).json({
        message: "Login failed",
      });
    }
  },
};

module.exports = AuthControler;
