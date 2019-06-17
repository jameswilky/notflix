import React, { useEffect } from "react";
import Page from "./components/Page/Page";
import "./main.css";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";
import Callback from "./components/Callback/Callback";
import pageNames from "./pageNames";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";

function App(props) {
  const { history } = props;

  const auth = new Auth(history);

  const { HOME, MOVIES, TV_SHOWS, PROFILE, FAVORITES, SEARCH } = pageNames;

  return (
    <AuthProvider auth={auth}>
      <UserProvider auth={auth} authVerfied={false}>
        <Route
          path="/"
          exact
          render={props => <Page {...props} content={HOME} />}
        />
        <Route
          path="/tvshows"
          render={props => <Page auth={auth} {...props} content={TV_SHOWS} />}
        />
        <Route
          path="/movies"
          render={props => <Page auth={auth} {...props} content={MOVIES} />}
        />
        <Route path="/callback" render={props => <Callback {...props} />} />
        <Route
          path="/profile"
          render={() =>
            auth.isAuthenticated() ? (
              <Page content={PROFILE} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/favorites"
          render={props =>
            auth.isAuthenticated() ? (
              <Page {...props} content={FAVORITES} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path={`/search`}
          render={props => <Page auth={auth} {...props} content={SEARCH} />}
        />
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
