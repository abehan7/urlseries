import rootReducer from "./reducer";
import { createPromise } from "redux-promise-middleware";
import { createLogger } from "redux-logger";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const logger = createLogger();
const pm = createPromise({
  promiseTypeSuffixes: ["PENDING", "SUCCESS", "FAILURE"],
  typeDelimiter: "/",
});

// const store2 = createStore(rootReducer, applyMiddleware(logger, pm));
const store2 = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger, pm],
});
export default store2;
