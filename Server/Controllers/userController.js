const User = require("../db/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res, next) => {
  try {
    const newUser = await User.createUser(
      "name",
      req.body.email,
      req.body.password,
      req.body.confirmPassword
    );
    if (!newUser) {
      res.status(400).json({
        status: "fail",
        data: {
          message: "Validation error",
        },
      });
      return;
    }

    const token = await jwt.sign({ id: newUser._id }, process.env.TOKEN, {
      expiresIn: process.env.TOKEN_EXPIRY,
    });

    res
      .header("token", token)
      .status(200)
      .json({
        status: "success",
        data: {
          message: "User registered",
        },
      });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      data: "Unexpected error, please try again later",
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const findUser = await User.findUser(req.body.email);

    const validPassword = await bcrypt.compare(
      req.body.password,
      findUser.password
    );
    console.log(validPassword);
    // const validPassword = true;
    if (validPassword) {
      const token = await jwt.sign({ id: findUser._id }, process.env.TOKEN, {
        expiresIn: process.env.TOKEN_EXPIRY,
      });
      res
        .header("token", token)
        .status(200)
        .json({
          status: "success",
          data: {
            data: "User logged in",
          },
        });
    } else {
      res.status(401).json({
        status: "fail",
        data: "Email or password is incorrect",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      data: "Unexpected error, please try again later",
    });
  }
};
