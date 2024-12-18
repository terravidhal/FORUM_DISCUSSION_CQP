const mongoose = require("mongoose");
const FieldModel = require("../models/field.model");

const SessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A session name is required"],
      minlength: [3, "A session name must be atleast three characters long"],
    },
    dateOfConductStart: {
      type: String,
      required: [true, "A dateOfConductStart is required"],
    },
    dateOfConductEnd: {
      type: String,
      required: [true, "A dateOfConductStart is required"],
    },
    dateOfCertif: {
      type: String,
    },
    field: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Field",
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

SessionSchema.pre("save", async function (next) {
  if (this.isModified("field")) {
    const fieldDocu = await FieldModel.findById(this.field);
    if (fieldDocu) {
      fieldDocu.sessions.push(this._id);
      await fieldDocu.save();
    }
  }
  next();
});

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session;
