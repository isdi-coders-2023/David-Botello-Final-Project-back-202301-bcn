import "./loadEnviroment.js";
import startServer from "./server/startServer.js";
import createDebug from "debug";
import connectDatabase from "./database/connectDatabase.js";

export const debug = createDebug("simoworld-api:*");

const port = process.env.PORT ?? 4000;
const mongoUrl = process.env.MONGODB_URL;

try {
  await connectDatabase(mongoUrl!);
  debug("Connected to database");

  await startServer(+port);
  debug(`Start with server 'http://localhost:${port}'`);
} catch (error) {
  debug(error.message);
}
