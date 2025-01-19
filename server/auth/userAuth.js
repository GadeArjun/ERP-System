const jwt = require("jsonwebtoken");

exports.userAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log({ token });

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log({ decoded });

    req.user = decoded;

    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};
