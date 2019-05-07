import React, { useContext } from "react";
import Page from "./components/Page/Page";
import "./main.css";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";
import Callback from "./components/Auth/Callback";

function App(props) {
  const { history } = props;
  console.log(history);
  const auth = new Auth(history);
  return (
    <>
      <Route
        path="/"
        exact
        render={props => <Page auth={auth} {...props} content={"home"} />}
      />
      <Route
        path="/callback"
        render={props => <Callback auth={auth} {...props} />}
      />
      <Route
        path="/profile"
        render={props =>
          auth.isAuthenticated() ? (
            <Page auth={auth} {...props} content={"profile"} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    </>
  );
}

export default App;
