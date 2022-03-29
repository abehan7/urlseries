import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { createGlobalStyle } from "styled-components";
import Context from "./contexts";
import ReactGA from "react-ga";

const GlobalStyle = createGlobalStyle`

position: relative;
 

* {
  font-family: "Pretendard";
  -webkit-tap-highlight-color : transparent !important;
  font-weight: bold;
}
a {
  text-decoration-line: none;
}
h2 {
  font-size: 30px;
  /* font-size: 20px; */
  font-weight: bold;
}
`;

ReactGA.initialize("UA-12341234-1");

ReactDOM.render(
  <Provider store={store}>
    <Context>
      <GlobalStyle />
      <App />
    </Context>
  </Provider>,
  document.getElementById("urlseries")
);
