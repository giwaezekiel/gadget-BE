import { config } from "./shared/config/config.ts";
import { GracefullyShutDown } from "./shared/core/shutdown.ts";
import { app } from "./app.ts";
import { connectDB } from "./shared/core/database/db.ts";
import { bootstrap } from "./shared/core/bootstrap/index.ts";

const PORT = config.PORT;

const StartServer = async () => {
  // await connectDB();
  await bootstrap.init();

  const server = app.listen(PORT, () => {
    console.log("==================================");
    console.log(`🗿 server started on port ${PORT}`);
    console.log("==================================");
  });

  GracefullyShutDown.init(server);

  server.on("error", (err: Error) => {
    console.log("server error:", err.message);
  });
};

StartServer();
