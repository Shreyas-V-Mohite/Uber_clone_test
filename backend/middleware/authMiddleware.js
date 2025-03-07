// Authentication & authorization checks
exports.protectRoute = (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    next();
  };
  