const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // Detect production safely
  const isProduction =
    process.env.NODE_ENV &&
    process.env.NODE_ENV.toUpperCase() === "PRODUCTION";

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_EXPIRES_TIME) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  };

  console.log("NODE_ENV in sendToken:", process.env.NODE_ENV);
  console.log("isProduction:", isProduction);
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