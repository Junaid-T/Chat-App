jwt = require("jsonwebtoken");

module.exports = verify = async function (token) {
  try {
    const verified = await jwt.verify(token, process.env.TOKEN);
    return verified.id;
  } catch (err) {
    throw new Error("Invalid Token");
  }
};
