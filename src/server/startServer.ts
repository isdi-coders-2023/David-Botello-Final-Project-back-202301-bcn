import app from "./index.js";
import { type CustomError } from "../CustomError/CustomError.js";

const startServer = async (port: number) =>
  new Promise((resolve, rejects) => {
    const server = app.listen(port, () => {
      resolve(server);
    });
    server.on("error", (error: CustomError) => {
      if (error.code === "EADDRINUSE") {
        error.message = `Error on starting the server. The port ${port} is already in use`;
      }

      rejects(new Error(error.message));
    });
  });

export default startServer;
