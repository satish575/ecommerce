const multer = require('multer');
const path=require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'client/public/uploads/'); // Save uploaded files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename file with current timestamp
    }
  });

const upload=multer({storage:storage});

module.exports=upload;