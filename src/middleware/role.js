const role = (requiredRole) => {
  return (req, res, next) => {
    if (req.body.role.incluswa) {
      return res.status(403).json({ error: "Access denied." });
    }
    next();
  };
};
module.exports = role;
