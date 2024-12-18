const AudLog = require("../models/logCertif.model");
const Student = require("../models/student.model");

module.exports.createAudLog = async (req, res) => {
  const {
    nameOfCertif,
    nameStudent,
    linkVerif,
    dateOfCertif,
    nameOfCourse,
    nameOfSession,
    studentId,
    fielsId,
    sessionId,
    action,
  } = req.body;
  try {
    const auditLog = await AudLog.create({
      nameOfCertif,
      nameStudent,
      linkVerif,
      dateOfCertif,
      nameOfCourse,
      nameOfSession,
      studentId,
      fielsId,
      sessionId,
      action,
    });
    await Student.findOneAndUpdate(
      { _id: studentId },
      { $push: { AudLogCertif: auditLog._id } },
      { new: true }
    );
    res.json(auditLog);
  } catch (err) {
    res.status(400).json({ error: "student or audlog not found" });
  }
};

module.exports.getAllAudLogCertificate = async (req, res) => {
  try {
    const audLog = await AudLog.find({ isDeleted: false });
    res.json(audLog);
  } catch (err) {
    res.status(400).json(err);
  }
};
