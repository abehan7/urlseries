import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store2 from "./store/store2";
import { createGlobalStyle } from "styled-components";
import DataProvider from "./redux/StoreT";

const GlobalStyle = createGlobalStyle`

position: relative;
 
@font-face {
  font-family: "Pretendard-Regular";
  src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
    format("woff");
  font-weight: 400;
  font-style: normal;
}

* {
  font-family: "Pretendard-Regular";

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

// ReactDOM.render(
//   <DataProvider>
//     <GlobalStyle />
//     <App />
//   </DataProvider>,
//   document.getElementById("ururl")
// );

// ===수정 전 코드===

ReactDOM.render(
  <Provider store={store2}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById("ururl")
);
