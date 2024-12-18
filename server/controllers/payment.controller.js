const Payment = require("../models/payment.model");
const Student = require("../models/student.model");
const LogPayment = require("../models/logPayment.model");
const fs = require('fs');
const path = require('path');
const {sendDirectorEmail} = require("../config/notif.config");






module.exports.findAllPayments = async (req, res) => {
  try {
    const allPayments = await Payment.find({ isDeleted: false });
    res.json(allPayments);
  } catch (err) {
    res.status(400).json(err);
  }
};


module.exports.createNewPayment = async (req, res) => {
  const { filename } = req.file; // "file" object here pass to the query by multer
  const { studentId, paymentDate, amount } =  req.body;
  const paymentName = filename;

  try {
    const payment = new Payment({
      student: studentId,
      paymentDate,
      amount,
      paymentName,
    });

    await payment.save();

    // update remaining amount and field "paymentIds"
    const student = await Student.findById(studentId);
    const newRemainingAmount = student.remainingAmount - payment.amount;

    await Student.findOneAndUpdate(
      { _id: studentId },
      {
        $set: { remainingAmount: newRemainingAmount },
        $push: { paymentIds: payment._id }
      },
      { new: true } // Return folder update
    );
    

    res.json(payment);
  } catch (error) {
    res.status(400).json(error);
  }
};




module.exports.deletePaymentIsDeleted = async (req, res) => {
  const paymentId = req.params.paymentId;
  const studentId = req.params.studentId;

  try {
    // Update remaining amount
    const student = await Student.findById(studentId);
    const payment = await Payment.findById(paymentId);

    if (!student || !payment) {
      return res.status(404).json({ error: "Student or Payment not found" });
    }

    const newRemainingAmount = student.remainingAmount + payment.amount;
    await Student.findOneAndUpdate(
      { _id: studentId },
      { remainingAmount: newRemainingAmount }
    );

    // Create log 
    const action = 'DELETE'; 
    const logData = {
      paymentDate : payment.paymentDate,
      amount : payment.amount,
      paymentName : payment.paymentName,
      paymentId,
      studentId,
      action,
    }
     await LogPayment.create(logData);

     // Remove paymentId from student's paymentIds
     await Student.findOneAndUpdate(
      { _id: studentId },
      { $pull: { paymentIds: paymentId } }, // Remove paymentId from list
      { new: true }
     );
    
    // send email to Director
    sendDirectorEmail(logData);


    // Delete payment
    const result = await Payment.findOneAndUpdate(
      { _id: paymentId },
      { isDeleted: true },
      { new: true, runValidators: true }
    );

    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};


module.exports.deletePayment = async (req, res) => {
  const paymentId = req.params.paymentId;
  const studentId = req.params.studentId;

  try {
    // Update remaining amount
    const student = await Student.findById(studentId);
    const payment = await Payment.findById(paymentId);

    if (!student || !payment) {
      return res.status(404).json({ error: "Student or Payment not found" });
    }

    const newRemainingAmount = student.remainingAmount + payment.amount;
    await Student.findOneAndUpdate(
      { _id: studentId },
      { remainingAmount: newRemainingAmount }
    );

    // Create log 
    const action = 'DELETE'; 
    const logData = {
      paymentDate : payment.paymentDate,
      amount : payment.amount,
      paymentName : payment.paymentName,
      paymentId,
      studentId,
      action,
    }
     await LogPayment.create(logData);

     // Remove paymentId from student's paymentIds
     await Student.findOneAndUpdate(
      { _id: studentId },
      { $pull: { paymentIds: paymentId } }, // Remove paymentId from list
      { new: true }
     );
    
    // send email to Director
    sendDirectorEmail(logData);


    // delete image
    const imagePath = path.join(__dirname, '../upload/images', payment.paymentName);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("delete image error :", err);
      }
    });

    // Delete payment
    const result = await Payment.deleteOne({ _id: paymentId });

    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

