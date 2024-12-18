const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    templateName: {
        type: String,
    },
    previewImage: {
        type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const TemplatesModel = mongoose.model("Templates", templateSchema);

module.exports = TemplatesModel;