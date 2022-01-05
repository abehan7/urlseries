import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Glogin, Join } from "./components/Join/Join";
import Login from "./components/Login/login";
import MainPage from "./routers/MainPage";
import SharePage from "./routers/SharePage";
import { useState } from "react";

function App() {
  const [user, setLoginUser] = useState({});
  useEffect(() => {
    console.log("😒😒😒");
    console.log(user);
    console.log(Object.keys(user).length !== 0);
  }, [user]);
  console.log(user);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {Object.keys(user).length !== 0 && user.user_id ? (
              <MainPage />
            ) : (
              <Login setLoginUser={setLoginUser} />
            )}
          </Route>
          <Route path="/signup">
            <Join />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

// const App = () => {
//   return (
//     // 이름 ururl유알유알엘
//     <Router>
//       <Switch>
//         <Route path="/login">
//           <Login />
//         </Route>
//         <Route path="/signup">
//           <Join />
//         </Route>
//         <Route path="/">
//           <MainPage />
//         </Route>
//       </Switch>
//     </Router>
//   );
// };

export default App;
