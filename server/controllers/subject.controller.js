const Subject = require("../models/subject.model");


module.exports.findAllSubject = async (req, res) => {
    try {
      const allSubject = await Subject.find({ isDeleted: false }).sort({ name: 1 });
      res.json(allSubject);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  
  
  module.exports.findDetailsSingleSession = async (req, res) => {
    const sessionId = req.params.id;
  
    try {
      const oneDetailsSession = await Session.findOne({ _id: sessionId, isDeleted: false })
        .populate({
          path: "field",
          match: { isDeleted: false },
        })
        .populate({
          path: "students",
          match: { isDeleted: false },
          sort: { name: 1 },
          populate: [
            { path: "session", match: { isDeleted: false } },
            { path: "field", match: { isDeleted: false } },
            { path: "AudLogCertif", match: { isDeleted: false } },
            { path: "paymentIds", match: { isDeleted: false } },
          ],
        });
  
      res.json(oneDetailsSession);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  
  
  module.exports.createNewSession = async (req, res) => {
    try {
      const newlyCreatedSession = await Session.create(req.body);
      res.json(newlyCreatedSession);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  