import mongoose from "mongoose";
import { config } from "../../config/config.ts";

export class Database {
  private conString() {
    const string = config.DB_URI as string;
    return string;
  }
  static async connect() {
    try {
      const connect = new Database();
      const conn = await mongoose.connect(connect.conString());
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
  }
}
