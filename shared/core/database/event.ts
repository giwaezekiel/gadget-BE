import mongoose from "mongoose";

export const registerEvent = () => {
  //check for error
  mongoose.connection.on("error", (err) => {
    throw new Error(`MongoDb connection error ${err}`);
  });

  //check for disconnection
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDb has been disconnected...");
  });
};
