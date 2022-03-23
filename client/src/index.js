import React from "react";
import ReactDOM, { hydrate, render } from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { createGlobalStyle } from "styled-components";
import Context from "./contexts";

const GlobalStyle = createGlobalStyle`

position: relative;
 

* {
  font-family: "Pretendard";

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
// ReactGA.initialize("UA-12341234-1");

const rootElement = document.getElementById("urlseries");

const Dom = () => {
  return (
    <Provider store={store}>
      <Context>
        <GlobalStyle />
        <App />
      </Context>
    </Provider>
  );
};

if (rootElement.hasChildNodes()) {
  hydrate(<Dom />, rootElement);
} else {
  render(<Dom />, rootElement);
}

// ReactDOM.render(
//   <Provider store={store}>
//     <Context>
//       <GlobalStyle />
//       <App />
//     </Context>
//   </Provider>,
//   document.getElementById("urlseries")
// );
