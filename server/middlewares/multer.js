
import multer from 'multer';

const storage = multer.memoryStorage(); // No local storage
const upload = multer({ storage });

export default upload;
