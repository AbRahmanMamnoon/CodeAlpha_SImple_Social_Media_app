import multer from 'multer';

/// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

export default upload;
