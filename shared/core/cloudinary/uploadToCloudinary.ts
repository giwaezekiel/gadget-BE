import cloudinary from "./cloudinary";
import streamifier from "streamifier";
// import { rejects } from "node:assert";

export const uploadToCloudinary = (file: Express.Multer.File) => {
  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        upload_preset: "products_preset",
        folder: "product",
      },
      (error, result) => {
        if (error || !result) {
          return reject(error);
        } else resolve(result.secure_url);
      },
    );
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};
