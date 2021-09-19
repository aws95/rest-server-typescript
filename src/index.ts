import express from "express";
import config from "./config/default";
import databaseConnection from "./db/connect";
import log from "./logger";
import deserializeUser from "./middleware/deserializeUser";
import routes from "./routes";

const main = async () => {
  const app = express();
  app.use(deserializeUser);
  const port = config.PORT as number;
  const mongoUrl = config.MONGO_URL as string;
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.listen(port, () => {
    log.info(`app started on http://localhost:${port}`);
    databaseConnection(mongoUrl);
    routes(app);
  });
};

main().catch((err) => log.error(err));
