import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import MainPage from "./routers/MainPage";
import SearchPage from "./routers/SearchPage";
import { GlobalStyle } from "./theme/globalStyle";

const App = () => {
  return (
    // 이름 ururl유알유알엘
    <Router>
      <Switch>
        <Route path="/search">
          <SearchPage />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <GlobalStyle />
        <Suspense fallback={<div>...loading</div>}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/sub" component={Sub} />
          </Switch>
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
