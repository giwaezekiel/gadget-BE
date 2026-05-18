import multer from "multer";
import path from "node:path";

const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter(_req, file, cb) {
    const allowedMimeTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExt = [".png", ".jpeg", ".jpg", ".webp"];
    const extOk = allowedExt.includes(ext);
    if (!extOk) {
      return cb(new Error("Invalid file extention"));
    }

    if (!allowedMimeTypes.includes(file.mimetype)) {
      cb(new Error("Invalid file type"));
    }
    cb(null, true);
  },
});
