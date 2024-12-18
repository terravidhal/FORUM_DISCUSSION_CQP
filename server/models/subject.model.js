const SubjectSchema = new mongoose.Schema(
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
      Comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment", 
        },
      ],
      tags: {
        type: [String], // Array of strings
        enum: ["science", "informatics", "history", "electronics"], // Allowed tags
        validate: {
          validator: function (tags) {
            return tags.every((tag) =>
              ["science", "informatics", "history", "electronics"].includes(tag)
            );
          },
          message: "Error: Tags must be one or more of the predefined values",
        },
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
  
  module.exports = mongoose.model("Subject", SubjectSchema);
  