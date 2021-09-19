import { connect, ConnectOptions } from "mongoose";
import log from "../logger/index";

const databaseConnection = (url: string) => {
  return connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
    .then(() => {
      log.info("database connected!");
    })
    .catch((err) => {
      log.error("database error : ", err);
      process.exit(1);
    });
};

export default databaseConnection;
