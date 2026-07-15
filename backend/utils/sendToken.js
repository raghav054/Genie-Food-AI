const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  console.log("NODE_ENV in sendToken:", process.env.NODE_ENV);
  console.log("Cookie Options:", cookieOptions);

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    data: { user },
  });
};

module.exports = sendToken;