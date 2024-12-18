const mongoose = require("mongoose");

const FieldShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A field name is required"],
      minlength: [3, "A field name must be atleast three characters long"],
    },
    description: {
      type: String,
    },
    sessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session",
      },
    ],
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

const Field = mongoose.model("Field", FieldShema);

module.exports = Field;
