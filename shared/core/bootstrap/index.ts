import { initDB } from "../database";
import { initRedis } from "../redis";

export class bootstrap {
  static async init() {
    await initDB();
    await initRedis();
  }
}
