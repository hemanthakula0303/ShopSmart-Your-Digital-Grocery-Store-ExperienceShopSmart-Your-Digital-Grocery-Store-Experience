const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  try {
    const actualToken = token.replace("Bearer ", "");
    const decoded = jwt.verify(actualToken, "secretkey");

    // ✅ send ONLY user id
    req.user = decoded.id;

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
