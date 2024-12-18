const mongoose = require("mongoose");

const baseLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: ["CREATE", "UPDATE", "DELETE", "SEND_EMAIL"],
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const BaseLogModel = mongoose.model("BaseLog", baseLogSchema);

module.exports = BaseLogModel;