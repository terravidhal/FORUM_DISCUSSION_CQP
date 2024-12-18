const mongoose = require("mongoose");
const BaseLog = require("../models/baseLog.model");

const logCertifSchema = new mongoose.Schema(
  {
    nameOfCertif: {
      type: String,
    },
    linkVerif: {
      type: String,
    },
    nameStudent: {
      type: String,
    },
    nameOfCourse: {
      type: String,
    },
    nameOfSession: {
      type: String,
    },
  /*  dateOfCertif: {
      type: String,
    },*/
   /* action: {
      type: String,
      enum: ["CREATE", "SEND_EMAIL"],
    },*/
   /* studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    fielsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Field",
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
    }, */
   /* isDeleted: {
      type: Boolean,
      default: false,
    }, */
  },
  { timestamps: true }
);

// Extend schema
logCertifSchema.add(BaseLog.schema);

const LogCertifModel = mongoose.model("LogCertif", logCertifSchema);

module.exports = LogCertifModel;
