'use strict';

import multer from 'multer';
import fs from 'fs';
import path from 'path';

if (!fs.existsSync('../uploads')) {
  fs.mkdirSync('../uploads');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads');
  },
  filename: (req, file, cb) => {
    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, newFilename);
  }
});
const upload = multer({ storage });

export default upload;
