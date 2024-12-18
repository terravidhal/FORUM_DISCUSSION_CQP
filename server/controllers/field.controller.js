const Field = require("../models/field.model");



module.exports.findAllFieldsByNodeleted = async (req, res) => {
  try {
    const allFields = await Field.find({ isDeleted: false })
      .sort({ name: 1 })
      .populate({
        path: "sessions",
        match: { isDeleted: false },
        sort: { name: 1 },
      })
      .populate({
        path: "students",
        match: { isDeleted: false },
        sort: { name: 1 },
      });

    res.json(allFields);
  } catch (err) {
    res.status(400).json(err);
  }
};







/*module.exports.findAllFieldsByNodeleted2 = (req, res) => {
  Field.find({ isDeleted: false })
    .sort({ name: 1 })
    .populate({
      path: "sessions",
      match: { isDeleted: false },
      sort: { name: 1 },
    })
    .populate({
      path: "students",
      match: { isDeleted: false },
      sort: { name: 1 },
    })
    .then((allFields) => {
      res.json(allFields);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};*/



module.exports.findDetailsSingleField = async (req, res) => {
  const fieldId = req.params.id;

  try {
    const oneDetailsField = await Field.findOne({ _id: fieldId, isDeleted: false })
      .populate({
        path: "sessions",
        match: { isDeleted: false },
        populate: {
          path: "students",
          match: { isDeleted: false },
        },
      })
      .populate({
        path: "students",
        match: { isDeleted: false },
      });

    res.json(oneDetailsField);
  } catch (err) {
    res.status(400).json(err);
  }
};

/*
module.exports.findDetailsSingleField2 = (req, res) => {
  const fieldId = req.params.id;

  Field.findOne({ _id: fieldId, isDeleted: false })
    .populate({
      path: "sessions",
      match: { isDeleted: false },
      populate: {
        path: "students",
        match: { isDeleted: false },
      },
    })
    .populate({
      path: "students",
      match: { isDeleted: false },
    })
    .then((oneDetailsField) => {
      res.json(oneDetailsField);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};*/

module.exports.createNewField = async (req, res) => {
  try {
    const newlyCreatedField = await Field.create(req.body);
    res.json(newlyCreatedField);
  } catch (err) {
    res.status(400).json(err);
  }
};

/*
module.exports.createNewField2 = (req, res) => {
  Field.create(req.body)
    .then((newlyCreatedField) => {
      res.json(newlyCreatedField);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};*/


module.exports.updateExistingField = async (req, res) => {
  try {
    const updatedField = await Field.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(updatedField);
  } catch (err) {
    res.status(400).json(err);
  }
};

/*
module.exports.updateExistingField2 = (req, res) => {
  Field.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedField) => {
      res.json(updatedField);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};*/

module.exports.deleteAnExistingFieldIsDeleted = async (req, res) => {
  try {
    const result = await Field.findOneAndUpdate(
      { _id: req.params.id },
      { isDeleted: true },
      { new: true, runValidators: true }
    );
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};


/*
module.exports.deleteAnExistingFieldNew2 = (req, res) => {
  Field.findOneAndUpdate(
    { _id: req.params.id },
    { isDeleted: true },
    { new: true, runValidators: true }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};*/


module.exports.deleteAnExistingField = async (req, res) => {
  try {
    const result = await Field.deleteOne({ _id: req.params.id });
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

/*

module.exports.deleteAnExistingField2 = (req, res) => {
  Field.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
*/