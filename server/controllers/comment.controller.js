const Comment = require("../models/comment.model");
const Subject = require("../models/subject.model");
const User = require("../models/user.model");





module.exports.findAllComment = async (req, res) => {
    try {
      const allComment = await Comment.find({ isDeleted: false }).sort({ name: 1 });
      res.json(allComment);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  
  
  module.exports.findDetailsSingleComment = async (req, res) => {
    const commentId = req.params.id;
  
    try {
      const oneDetailsComment = await Comment.findOne({ _id: commentId, isDeleted: false })
        .populate({
          path: "author",
          match: { isDeleted: false },
          sort: { name: 1 },
          populate: [
            { path: "comment", match: { isDeleted: false } },
            { path: "createdComments", match: { isDeleted: false } },
            { path: "commentedComments", match: { isDeleted: false } },
          ],
        })
        .populate({
          path: "subjectId",
          match: { isDeleted: false },
          sort: { name: 1 },
          populate: [
            { path: "author", match: { isDeleted: false } },
            { path: "author", match: { isDeleted: false } },
          ],
        });
  
      res.json(oneDetailsComment);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  
  

module.exports.createNewComment = async (req, res) => {
  try {
    const { subjectId, authorId, title, content } = req.body;

    // Create a new comment
    const newlyCreatedComment = await Comment.create({
      title,
      content,
      author: authorId,  // User ID of the comment creator
      subjectId: subjectId, 
    });

    // 1. Update the Comments field of the Subject model
    const subject = await Subject.findByIdAndUpdate(
      subjectId,
      { $push: { Comments: newlyCreatedComment._id } }, // Add comment ID to Comments array
      { new: true }
    );

    // 2. If the user is the creator of the comment, update their createdComments
    const user = await User.findById(authorId);
    if (user) {
      await User.findByIdAndUpdate(
        authorId,
        { $push: { createdComments: newlyCreatedComment._id } }, 
        { new: true }
      );
    }

    // 3. If the user is not the creator of the comment, update their commentedComments
    if (user && user._id.toString() !== newlyCreatedComment.author.toString()) {
      await User.findByIdAndUpdate(
        authorId,
        { $push: { commentedComments: newlyCreatedComment._id } }, // Add comment ID to commentedComments
        { new: true }
      );
    }

    // Return the newly created comment and updated subject
    res.json({ comment: newlyCreatedComment, subject: subject });

  } catch (err) {
    res.status(400).json(err);
  }
};

  

  module.exports.deleteComment = async (req, res) => {
    const commentId = req.params.commentId;
  
    try {
      // Find the comment by commentId
      const comment = await Comment.findById(commentId);
  
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
  
      const { author, subjectId } = comment;
  
      // 1. Remove the comment ID from the Comments array subject
      const subject = await Subject.findByIdAndUpdate(
        subjectId,
        { $pull: { Comments: commentId } }, // $pull : remove the comment from the Comments array
        { new: true }
      );
  
      // 2. If the user is the creator of the comment, remove the comment ID from their createdComments array
      if (author) {
        await User.findByIdAndUpdate(
          author,
          { $pull: { createdComments: commentId } }, 
          { new: true }
        );
      }
  
      // 3. If the user is not the creator of the comment, remove the comment ID from their commentedComments array
      const usersWhoCommented = await User.find({ commentedComments: commentId });
      usersWhoCommented.forEach(async (user) => {
        await User.findByIdAndUpdate(
          user._id,
          { $pull: { commentedComments: commentId } }, 
          { new: true }
        );
      });
  
      // 4. Delete the comment from the Comment collection
      const result = await Comment.deleteOne({ _id: commentId });
  
      res.json({ message: "Comment deleted successfully", result, subject });
    } catch (err) {
      res.status(400).json(err);
    }
  };
  



module.exports.voteOnComment = async (req, res) => {
  const { commentId, userId, value } = req.body;

  try {
    // Validate the rating value
    if (value < 1 || value > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5." });
    }

    // Find the comment
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    // Check if the user has already voted
    const existingRating = comment.ratings.find(
      (rating) => rating.user.toString() === userId
    );

    if (existingRating) {
      // Update the existing rating
      existingRating.value = value;
    } else {
      // Add a new rating
      comment.ratings.push({ user: userId, value });
    }

    // Save the comment with updated ratings
    await comment.save();

    res.json("Vote submitted successfully.", comment );
  } catch (err) {
    res.status(500).json("An error occurred while voting.", err );
  }
};
