const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/user.model");
const Activity = require("../models/activity.model");

// token 20min, refresh token 2heures

module.exports = {
  CreateAdmins: async (req, res) => {
    try {
      const newUser = await UserModel.create(req.body);

      res.json(newUser);
    } catch (err) {
      res.json(err);
    }
  },


login: async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if (!correctPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    
    const userInfo = { _id: user._id };

    // Generate the access token and refreshToken
    const accessToken = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '30m' }); // "10s"
    const refreshToken = jwt.sign(userInfo, process.env.JWT_REFRESH_SECRET, { expiresIn: "2h" }); // "7d"

    // Cookie options
    const cookieOptions = {
      httpOnly: true,
    };

    // create lastActivity
    await Activity.create({ userId: user._id });

    // Store the refreshToken in the database
    await UserModel.findOneAndUpdate(
      { _id: user._id },
      { refreshToken: refreshToken }
    );

    res
      .cookie("accessToken", accessToken, { ...cookieOptions,  expires: new Date(Date.now() + 30 * 60 * 1000)} ) // 10 seconds to milliseconds(10 * 1000), 
      .cookie("refreshToken", refreshToken, { ...cookieOptions, expires: new Date(Date.now() + 2 * 60 * 60 * 1000) } ) // 7 jrs(7 * 24 * 60 * 60 * 1000), 
      .json({ message: "Login successful", user: { email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Something went wrong" });
  }
},


refreshToken: async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    // Check the refreshToken
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await UserModel.findById(decoded._id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // invalidate the refresToken for inactivity
    const lastActivity = await Activity.findOne({ userId: user._id,  isDeleted: false }).sort({ activity: -1 });
    const now = new Date();

  
    if (lastActivity && (now - lastActivity.activity) > ( 60 * 60 * 1000) ) { // the user has been inactive for 1 hour
      return res.status(401).json({ message: "Refresh token expired due to inactivity" });
    }

    // create lastActivity
    await Activity.create({ userId: user._id });


    // Generate a new accessToken
    const newAccessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });

    // Reply with the new token
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 60 * 1000), // 30m
    })
    .json({ message: "Access token refreshed" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
},



 
  logout: (req, res) => {
    try {
      res.clearCookie("accessToken");
      res.status(200).json({
        message: "You have successfully logged out of our system",
      });
      
    } catch (error) {
      res.status(400)
      .json(err);
    }
  },



  findAllAdminsByNodeleted: async (req, res) => {
    try {
      const allAdmin = await UserModel.find({ role: "Admin", isDeleted: false })
        .sort({ name: 1 });
      res.json(allAdmin);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  


  deleteAnExistingUserNew: async (req, res) => {
    try {
      const result = await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        { isDeleted: true },
        { new: true, runValidators: true }
      );
      res.json(result);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  



};
