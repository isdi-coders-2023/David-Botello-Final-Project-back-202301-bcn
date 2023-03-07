import "../loadEnviroment.js";

import app from "./index.js";
import createDebug from "debug";
import { type CustomError } from "../CustomError/CustomError.js";

const debug = createDebug("simoworld-api:root");

const startServer = async (port: number) =>
  new Promise((resolve, rejects) => {
    const server = app.listen(port, () => {
      resolve(server);
    });
    server.on("error", (error: CustomError) => {
      const errorMessage = "Error on starting the server";

      if (error.code === "EADDRINUSE") {
        debug(
          errorMessage,
          `Error on starting the server. The port ${port} is already in use`
        );
      }

      rejects(new Error(error.message));
    });
  });

export default startServer;
