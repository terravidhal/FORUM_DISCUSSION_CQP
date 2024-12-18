const CommentSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, "Error: title is required"],
      },
      content: {
        type: String,
        required: [true, "Error: content is required"],
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
       // required: [true, "Error: author is required"],
      },
      subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject", 
       // required: [true, "Error: subjectId is required"],
      },
      ratings: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true,
          },
          value: {
            type: Number,
            required: true,
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating cannot exceed 5"],
          },
        },
      ],
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("Comment", CommentSchema);
  