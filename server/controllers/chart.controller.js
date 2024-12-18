const AudLogModel = require("../models/logCertif.model");
const StudentModel = require("../models/student.model");
const FieldModel = require("../models/field.model");
const SessionModel = require("../models/session.model");



module.exports = {
  FindAlllistCollections: async (req, res) => {
    try {
      const [allStudents, allAudLogCertificate, allField, allSession] =
        await Promise.all([
          StudentModel.find({ isDeleted: false }),
          AudLogModel.find({ isDeleted: false }),
          FieldModel.find({ isDeleted: false }),
          SessionModel.find({ isDeleted: false }),
        ]);

      if (!allStudents || !allAudLogCertificate || !allField || !allSession) {
        return res
          .status(400)
          .json({ error: "student or audlog or field or session not found" });
      }

      res.json({
        result: { allField, allSession, allStudents, allAudLogCertificate },
      });
    } catch (err) {
      res
        .status(400)
        .json({ error: "student or audlog or field or session not found" });
    }
  },

  FindAllStudAndCertifCollections: async (req, res) => {
    try {
      const [allStudents, allAudLogCertificate] = await Promise.all([
        StudentModel.find({ isDeleted: false }),
        AudLogModel.find({ isDeleted: false }),
      ]);

      if (!allStudents || !allAudLogCertificate) {
        return res.status(400).json({ error: "student or audlog not found" });
      }

      res.json({ result: { allAudLogCertificate, allStudents } });
    } catch (err) {
      res.status(400).json({ error: "student or audlog not found" });
    }
  },
};
