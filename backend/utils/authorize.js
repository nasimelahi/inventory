// Middleware to check user role
const checkRole = (roles) => {
    return (req, res, next) => {
      // Assume user role is stored in req.user.role
      const userRole = req.user.role;
  
      // Check if the user's role is in the allowed roles
      if (roles.includes(userRole)) {
        next(); // Allow access
      } else {
        res.status(403).json({ message: 'Access denied' }); // Forbidden
      }
    };
  };

module.exports = { checkRole }