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

  const authenticateUser = async (req, res, next) => {
    // Get token from headers
    const token = req.header('Authorization');
  
    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
    try {
      // Verify token
      const decoded = jwt.verify(token, config.jwtSecret);
  
      // Check if decoded user exists
      const user = await User.findById(decoded.user.id);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      // Attach user object to request
      req.user = user;
  
      next(); // Call next middleware
    } catch (error) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
  

module.exports = { checkRole , authenticateUser}