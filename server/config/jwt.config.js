const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const ActivityModel = require("../models/activity.model");

module.exports = {
  authenticate: async (req, res, next) => {
    try {
      const token = req.cookies.accessToken; 
      if (!token) {
        return res
          .status(401)
          .json({
            message: "Unauthorized access: No token provided.",
          });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findOne({ _id: decodedToken._id });

      if (!user) {
        return res
          .status(401)
          .json({
            message: "Unauthorized access: User not found.",
          });
      }

      console.log("You are authenticated!");
      req.role = user.role;
      req.user = user; // For the 3rd middleware Activity
      next();
    } catch (err) {
      console.error(err);
      res
        .status(401)
        .json({ message: "Unauthorized access." });
    }
  },

  checkPermissions : (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.role)) {
        return res.status(403).json({
          message: "You do not have permission to perform this action.",
        });
      }
      next();
    };
  },

 
  logActivityMiddleware: async (req, res, next) => {
    try {
      if (req.user) {
        // if the user is authenticated
        await ActivityModel.create({ userId: req.user._id });
      }
      next();
    } catch (error) {
      console.error("Error logging user activity:", error.message);
      next(); // Move to the next middleware even if an error occurs
    }
  },
  
};
