import rootReducer from "./reducer";
import { createPromise } from "redux-promise-middleware";
import { createLogger } from "redux-logger";

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const pm = createPromise({
  promiseTypeSuffixes: ["PENDING", "SUCCESS", "FAILURE"],
  typeDelimiter: "/",
});

const logger = createLogger();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), pm],
});
export default store;

//middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger, pm],
