const allowRoles = (allowedRoles) => {
  return (req, res, next) => {
    // Check if user's role is included in the allowed roles
    if (req.payload.role && allowedRoles.includes(req.payload.role)) {
      // User's role is allowed, proceed to the next middleware
      next();
    } else {
      // User's role is not allowed, return forbidden error
      res.status(403).json({ message: "Access denied" });
    }
  };
};

module.exports = { allowRoles };
