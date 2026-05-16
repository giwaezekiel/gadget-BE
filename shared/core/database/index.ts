import { Database } from "./db";
import { registerEvent } from "./event";

export const initDB = async () => {
  await Database.connect();
  registerEvent();
};
