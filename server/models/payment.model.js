const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
   {
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
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
  },
  {
    timestamps: true,
  }
);


const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;