const role = (requiredRole) => {
  return (req, res, next) => {
    if (!req.body.role.includes(requiredRole)) {
      return res.status(403).json({ error: "Access denied." });
    }
    next();
  };
};
module.exports = role;
