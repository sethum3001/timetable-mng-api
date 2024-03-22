const ROLES = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

module.exports = {
  // Middleware function to authorize access for admins
  authorizeAdmin: (req, res, next) => {
    // Check if the user is an admin
    if (req.payload.role !== ROLES.ADMIN) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  },

  // Middleware function to authorize access for faculty
  authorizeFaculty: (req, res, next) => {
    // Check if the user is a faculty member
    if (req.payload.role !== ROLES.FACULTY) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  },

  // Middleware function to authorize access for students
  authorizeStudent: (req, res, next) => {
    // Check if the user is a student
    if (req.payload.role !== ROLES.STUDENT) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  },

  allowRoles : (allowedRoles) => {
    return (req, res, next) => {
      // Check if user's role is included in the allowed roles
      if (req.payload.role && allowedRoles.includes(req.payload.role)) {
        // User's role is allowed, proceed to the next middleware
        next();
      } else {
        // User's role is not allowed, return forbidden error
        res.status(403).json({ message: 'Access denied' });
      }
    };
  }
};
