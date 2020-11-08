const multer = require("multer");
var upload = multer({ dest: __dirname + './public/uploads/' });
const type = upload.single('image');
module.exports ={
    type
}


