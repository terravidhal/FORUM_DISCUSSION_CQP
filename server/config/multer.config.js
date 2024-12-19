const multer = require("multer");
const fs = require('fs');
const path = require('path');

// create folder "upload/subjectImages" if not exists
const uploadDir = path.join(__dirname, '../upload/subjectImages');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Allows the creation of nested folders. ex: upload/subjectImages/
}

 // save image 
const storage = multer.diskStorage({
  destination: function (req, file, cb) { // cb: function callback, null: no errors are returned
     cb(null, `upload/subjectImages/`);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); 
  },
});




const upload = multer({ storage: storage });


module.exports = { upload, };