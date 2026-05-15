import { connectDB } from "./db";
import { registerEvent } from "./event";

export const initDB = async () => {
  await connectDB();
  registerEvent();
};
