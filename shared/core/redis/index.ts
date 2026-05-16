import { registerEvent } from "./event";
import { Redis } from "./redis";
export const initRedis = async () => {
  await Redis.connect();
  registerEvent();
};
