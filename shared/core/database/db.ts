import mongoose from "mongoose";
import { config } from "../../config/config.ts";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.DB_URI as string);
    console.log(
      `🎃 Database Connected Successfully: ${conn?.connection?.host}`,
    );
    console.log(
      `🎃 Database connected to: ${conn?.connection?.db?.databaseName}`,
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error({
        name: error?.name,
        message: error?.message,
      });
    }
    process.exit(0);
  }
};
