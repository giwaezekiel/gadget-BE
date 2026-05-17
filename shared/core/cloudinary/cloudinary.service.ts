import { resolve } from "node:dns";
import cloudinary from "./cloudinary";
import streamifier from "streamifier";
// import { rejects } from "node:assert";

export const uploadToCloudinary = (file: Express.Multer.File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
      },
      (error: any, result: any) => {
        if (error) {
          return reject(error);
        }
        resolve(result?.secure_url);
      },
    );
    console.log(cloudinary);
    console.log(cloudinary.uploader);
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};
