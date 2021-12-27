import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import { createPromise } from "redux-promise-middleware";
import { createLogger } from "redux-logger";

const logger = createLogger();
const pm = createPromise({
  promiseTypeSuffixes: ["PENDING", "SUCCESS", "FAILURE"],
  typeDelimiter: "/",
});

const store2 = createStore(rootReducer, applyMiddleware(logger, pm));
export default store2;
