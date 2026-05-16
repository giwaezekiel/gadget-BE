import { createClient } from "redis";
import { config } from "../../config/config";

export let redis: ReturnType<typeof createClient>;
export class Redis {
  private conString() {
    const string = config.REDIS_URI as string;
    return string;
  }

  static async connect() {
    const conn = new Redis();

    redis = createClient({ url: conn.conString() });

    try {
      redis.on("connect", () => {
        console.log("==================================");
        console.log("Redis connected");
        console.log("==================================");
      });
      await redis.connect();
      return redis;
    } catch (error) {
      if (error instanceof Error) {
        console.error({
          name: error?.name,
          message: error?.message,
        });
      }
      process.exit(1);
    }
  }
}
