const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    activity: { 
        type: Date, 
        default: Date.now 
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ActivityModel = mongoose.model("Activity", activitySchema);

module.exports = ActivityModel;