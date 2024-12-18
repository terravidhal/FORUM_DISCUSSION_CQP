const Activity = require("../models/activity.model");


module.exports.createActivity = async (req, res) => {
  const { userId } = req.body;
  try {
    const lastActivity = await Activity.create({
        userId,
    });
    res.json(lastActivity);
  } catch (err) {
    res.status(400).json({ error: "student or audlog not found" });
  }
};