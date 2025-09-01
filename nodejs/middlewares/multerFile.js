const multer = require("multer");

// Setup multer storage (same as before)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload/")  // ensure folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    },
});
const uploadStorage = multer({ storage: storage });


// In your router:
// routers.post(
//    '/create-account',
//    uploadStorage.single("file"), // multer middleware ONLY for this route
//    createUser
// );


module.exports = uploadStorage