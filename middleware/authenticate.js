// middleware/authenticate.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto123");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Token inválido" });
  }
};
