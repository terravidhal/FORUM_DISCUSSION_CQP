const multer = require("multer");
const fs = require('fs');
const path = require('path');

// create folder "upload/images" if not exists
const uploadDir = path.join(__dirname, '../upload/images');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Allows the creation of nested folders. ex: upload/images/
}

 // save image
const storage = multer.diskStorage({
  destination: function (req, file, cb) { // cb: function callback, null: no errors are returned
     cb(null, `upload/images/`);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); 
  },
});


 // save template
const storageTemplate = multer.diskStorage({
  destination: function (req, file, cb) { // cb: function callback, null: no errors are returned
     cb(null, `template/`);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); 
  },
});

const upload = multer({ storage: storage });
const uploadTemplates = multer({ storage: storageTemplate });


module.exports = { upload, uploadTemplates };