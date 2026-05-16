import { redis } from "./redis";

export const registerEvent = async () => {
  redis.on("error", (err) => {
    console.log("Redis Client Error", err);
  });
  redis.on("ready", () => {
    console.log("Redis is connected and ready to use");
  });
  redis.on("reconnecting", () => {
    console.log("Redis reconnecting...");
  });
};
