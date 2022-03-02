import rootReducer from "./reducer";
import { createPromise } from "redux-promise-middleware";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const pm = createPromise({
  promiseTypeSuffixes: ["PENDING", "SUCCESS", "FAILURE"],
  typeDelimiter: "/",
});

const store2 = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), pm],
});
export default store2;

//middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger, pm],
