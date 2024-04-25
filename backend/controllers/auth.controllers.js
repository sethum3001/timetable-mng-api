const {
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
} = require("../middleware/jwt_authentications.js");
const createError = require("http-errors");

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const { username, role, userId } = await verifyRefreshToken(
      req,
      refreshToken
    );
    const accessToken = await signAccessToken(userId, role, username);
    const refToken = await signRefreshToken(userId, role, username);
    res.send({ accessToken: accessToken, refreshToken: refToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
