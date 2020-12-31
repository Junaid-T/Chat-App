const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res, next) => {
  try {
    // unique email validation done by express - use joi to check password
    const newUser = await User.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: err,
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });
    const validPassword = await bcrypt.compare(
      req.body.password,
      findUser.password
    );
    if (validPassword) {
      const token = jwt.sign({ _id: findUser.id }, process.env.TOKEN);
      res
        .header("token", token)
        .status(200)
        .json({
          status: "success",
          data: {
            data: "LOGGED IN",
          },
        });
    } else {
      res.status(400).json({
        status: "fail",
        data: "Username or password is incorrect",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: err,
    });
  }
};
