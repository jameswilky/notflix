import React from "react";
import Page from "./components/Page/Page";
import "./main.css";
import { Route } from "react-router-dom";
import Auth from "./Auth";
import Callback from "./components/Auth/Callback";

function App(props) {
  const { history } = props;
  const auth = new Auth(history);
  return (
    <>
      <Route path="/" exact render={props => <Page auth={auth} {...props} />} />
      <Route
        path="/callback"
        render={props => <Callback auth={auth} {...props} />}
      />
    </>
  );
}

export default App;
