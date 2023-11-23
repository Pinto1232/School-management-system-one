const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Define storage configuration for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '..', 'uploads');
        try {
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true }); // Ensure the directory is created
            }
            cb(null, uploadDir);
        } catch (err) {
            cb(err);
        }
    },
    
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});


// Define file filter to accept only image files
const fileFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// Initialize Multer with the defined storage and file filter
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;