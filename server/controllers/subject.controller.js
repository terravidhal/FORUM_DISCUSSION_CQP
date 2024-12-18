const Subject = require("../models/subject.model");
const User = require("../models/user.model");


module.exports.findAllSubject = async (req, res) => {
    try {
      const allSubject = await Subject.find({ isDeleted: false }).sort({ name: 1 });
      res.json(allSubject);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  
  
  module.exports.findDetailsSingleSubject = async (req, res) => {
    const subjectId = req.params.id;
  
    try {
      const oneDetailsSubject = await Subject.findOne({ _id: subjectId, isDeleted: false })
        .populate({
          path: "Comments",
          match: { isDeleted: false },
        })
        .populate({
          path: "author",
          match: { isDeleted: false },
          sort: { name: 1 },
          populate: [
            { path: "subject", match: { isDeleted: false } },
            { path: "createdComments", match: { isDeleted: false } },
            { path: "commentedComments", match: { isDeleted: false } },
          ],
        });
  
      res.json(oneDetailsSubject);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  
  
  
module.exports.createNewSubject = async (req, res) => {
  try {
    // Create a new subject
    const newlyCreatedSubject = await Subject.create(req.body);

    const userId = req.body.author
    // Find the user by the author ID 
    if (userId) {
      await User.findByIdAndUpdate(
        userId,
        { $push: { subjects: newlyCreatedSubject._id } },
        { new: true } // Return the updated document
      );
    }

    res.json(newlyCreatedSubject);
  } catch (err) {
    res.status(400).json(err);
  }
};

  

  module.exports.deleteSubject = async (req, res) => {
    const subjectId = req.params.subjectId;
  
    try {
      const subject = await Subject.findById(subjectId);
  
      if (!subject) {
        return res.status(404).json({ error: "Subject not found" });
      }
      // Delete subject
      const result = await Subject.deleteOne({ _id: subjectId });
  
      res.json(result);
    } catch (err) {
      res.status(400).json(err);
    }
  };



module.exports.voteOnSubject = async (req, res) => {
  const { subjectId, userId, value } = req.body;

  try {
    // Validate the rating value
    if (value < 1 || value > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5." });
    }

    // Find the subject
    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({ error: "Subject not found." });
    }

    // Check if the user has already voted
    const existingRating = subject.ratings.find(
      (rating) => rating.user.toString() === userId
    );

    if (existingRating) {
      // Update the existing rating
      existingRating.value = value;
    } else {
      // Add a new rating
      subject.ratings.push({ user: userId, value });
    }

    // Save the subject with updated ratings
    await subject.save();

    res.json("Vote submitted successfully.", subject );
  } catch (err) {
    res.status(500).json("An error occurred while voting.", err );
  }
};
