const mongoose = require("mongoose");
const BaseLog = require("../models/baseLog.model");

const logPaymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
    },
    paymentName: {
      type: String,
    },
    paymentDate: {
      type: String,
      required: [true, "Error: payment date is required"],
    },
    amount: {
      type: Number,
      required: [true, "Error: amount is required"],
    },
  },
  { timestamps: true }
);

// Extend schema
logPaymentSchema.add(BaseLog.schema);

const LogPaymentModel = mongoose.model("LogPayment", logPaymentSchema);

module.exports = LogPaymentModel;
