const role = (requiredRole) => {
  return (req, res, next) => {
    if (requiredRole !== req.body.role) {
      return res.status(403).json({ error: "Access denied." });
    }
    next();
  };
};
module.exports = role;
