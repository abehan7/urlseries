import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import store2 from "./store2";

ReactDOM.render(
  <Provider store={store2}>
    <App />
  </Provider>,
  document.getElementById("ururl")
);
