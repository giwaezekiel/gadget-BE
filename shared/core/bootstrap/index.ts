import { initDB } from "../database";

export class bootstrap {
  static async init() {
    await initDB();
  }
}
