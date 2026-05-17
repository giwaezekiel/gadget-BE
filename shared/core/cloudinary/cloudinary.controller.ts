import { Request, Response } from "express";
import { uploadToCloudinary } from "./cloudinary.service";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "No file is uploaded",
      });
      return;
    }

    const result = await uploadToCloudinary(req.file);
    console.log(result);

    return res.status(200).json({
      success: true,
      data: {
        imageUrl: result?.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error,
    });
  }
};
