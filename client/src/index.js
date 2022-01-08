import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store2 from "./store/store2";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: "GowunDodum-Regular";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunDodum-Regular.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

* {
  font-family: "GowunDodum-Regular";
  font-weight: bold;
  
}

  h2{
    font-size: 30px;
    /* font-size: 20px; */
    font-weight: bold;
  }
`;

ReactDOM.render(
  <Provider store={store2}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById("ururl")
);
