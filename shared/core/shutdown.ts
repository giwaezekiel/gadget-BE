import mongoose from "mongoose";
import type { Server } from "node:http";

export class GracefullyShutDown {
  static async init(server: Server) {
    const shutdown = async () => {
      console.log("\nShutting down all processes");

      server.close(async () => {
        console.log("Server Closed ");
        //close db
        await mongoose.connection.close();
        console.log("Database dicconnected successfully");

        console.log("Successfully Shut down all processes");
        process.exit(0);
      });
    };
    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  }
}
