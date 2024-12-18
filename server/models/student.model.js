const mongoose = require("mongoose");
const SessionModel = require("../models/session.model");
const FieldModel = require("../models/field.model");

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Error: name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Error: email is required"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    levelStudent: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 1,
    },
    typeOfCertif: {
      type: String,
      enum: ["Seven_Academy", "Seven_Kids_Code"],
      default: "Seven_Academy",
    },
    totalAmount: {
      type: Number,
      required: [true, "Error: total amount is required"],
    },
    remainingAmount: {
      type: Number,
      default: function() {
        return this.totalAmount; // Initialement, le reste est égal au montant total
      },
    },
    field: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Field",
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
    },
    AudLogCertif: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LogCertif",
      },
    ],
    paymentIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

StudentSchema.pre("save", async function (next) {
  if (this.isModified("session")) {
    const sessionDocu = await SessionModel.findById(this.session);
    if (sessionDocu) {
      sessionDocu.students.push(this._id);
      await sessionDocu.save();
    }
  }
  next();
});

StudentSchema.pre("save", async function (next) {
  if (this.isModified("field")) {
    const fieldDocu = await FieldModel.findById(this.field);
    if (fieldDocu) {
      fieldDocu.students.push(this._id);
      await fieldDocu.save();
    }
  }
  next();
});

const StudentModel = mongoose.model("Student", StudentSchema);

module.exports = StudentModel;
