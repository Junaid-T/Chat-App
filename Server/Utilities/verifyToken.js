jwt = require("jsonwebtoken");

module.exports = verify = async function (token) {
  try {
    const verified = await jwt.verify(token, process.env.TOKEN);
    return verified.id;
  } catch (err) {
    console.log("Invalid Token");
  }

  next();
};
// module.exports = verify = function (req, res, next) {
//   const token = req.header("token");
//   if (!token) return res.status(401).send("Access denied");

//   try {
//     const verified = await jwt.verify(token, process.env.TOKEN);
//     req.user = verified;
//     req._id = verified._id;
//   } catch (err) {
//     res.status(400).send("Invalid Token");
//   }

//   next();
// };
