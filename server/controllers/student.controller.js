const sendCertificateNotification = require("../config/notif2.config");
const Student = require("../models/student.model");

const { jsPDF } = require("jspdf");
const path = require("path");



module.exports.findAllStudents = async (req, res) => {
  try {
    const allStudents = await Student.find({ isDeleted: false }).sort({ name: 1 });
    res.json(allStudents);
  } catch (err) {
    res.status(400).json(err);
  }
};

/*
module.exports.findAllStudents2 = (req, res) => {
  Student.find({ isDeleted: false })
    .sort({ name: 1 })
    .then((allStudents) => {
      res.json(allStudents);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
*/

module.exports.findDetailsSingleStudent = async (req, res) => {
  const studentId = req.params.id;

  try {
    const oneDetailsStudent = await Student.findOne({ _id: studentId, isDeleted: false })
      .populate({
        path: "field",
        match: { isDeleted: false },
      })
      .populate({
        path: "session",
        match: { isDeleted: false },
      })
      .populate({
        path: "AudLogCertif",
        match: { isDeleted: false },
      });

    res.json(oneDetailsStudent);
  } catch (err) {
    res.status(400).json(err);
  }
};



/*
module.exports.findDetailsSingleStudent2 = (req, res) => {
  const studentId = req.params.id;

  Student.findOne({ _id: studentId, isDeleted: false })
    .populate({
      path: "field",
      match: { isDeleted: false },
    })
    .populate({
      path: "session",
      match: { isDeleted: false },
    })
    .populate({
      path: "AudLogCertif",
      match: { isDeleted: false },
    })
    .then((oneDetailsStudent) => {
      res.json(oneDetailsStudent);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
},
*/


  module.exports.notifsStudent = (req, res) => {
    const { imgData, filename, studentInfo } = req.body;

    try {
      const dataUrl = imgData;

      const pdf = new jsPDF({ orientation: "landscape", format: [1000, 670] });
      pdf.addImage(dataUrl, "PNG", 0, 0, 1000, 667);

      const filePath = path.join(__dirname, "..", "static", "pdf", filename);
      pdf.save(filePath);

      sendCertificateNotification(studentInfo, filePath);

      res.json("PDF generated successfully!");
    } catch (error) {
      console.error(error);
      res.status(500).json("Error generating PDF");
    }
  };


  module.exports.createNewStudent = async (req, res) => {
    try {
      const newlyCreatedStudent = await Student.create(req.body);
      res.json(newlyCreatedStudent);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  
/*
module.exports.createNewStudent2 = (req, res) => {
  Student.create(req.body)
    .then((newlyCreatedStudent) => {
      res.json(newlyCreatedStudent);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

*/

module.exports.updateExistingStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json(err);
  }
};

/*
module.exports.updateExistingStudent2 = (req, res) => {
  Student.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedStudent) => {
      res.json(updatedStudent);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

*/

module.exports.deleteAnExistingStudentIsDeleted = async (req, res) => {
  try {
    const result = await Student.findOneAndUpdate(
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
module.exports.deleteAnExistingStudentNew2 = (req, res) => {
  Student.findOneAndUpdate(
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
};

*/

module.exports.deleteAnExistingStudent = async (req, res) => {
  try {
    const result = await Student.deleteOne({ _id: req.params.id });
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

/*
module.exports.deleteAnExistingStudent2 = (req, res) => {
  Student.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

*/




