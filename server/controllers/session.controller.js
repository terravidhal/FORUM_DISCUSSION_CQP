const Session = require("../models/session.model");




module.exports.findAllSessions = async (req, res) => {
  try {
    const allSessions = await Session.find({ isDeleted: false }).sort({ name: 1 });
    res.json(allSessions);
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


module.exports.updateExistingSession = async (req, res) => {
  try {
    const updatedSession = await Session.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(updatedSession);
  } catch (err) {
    res.status(400).json(err);
  }
};



module.exports.deleteAnExistingSessionIsDeleted = async (req, res) => {
  try {
    const result = await Session.findOneAndUpdate(
      { _id: req.params.id },
      { isDeleted: true },
      { new: true, runValidators: true }
    );
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};




module.exports.deleteAnExistingSession = async (req, res) => {
  try {
    const result = await Session.deleteOne({ _id: req.params.id });
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};
