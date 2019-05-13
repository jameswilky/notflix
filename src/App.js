import React, { useContext } from "react";
import Page from "./components/Page/Page";
import "./main.css";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";
import Callback from "./components/Auth/Callback";
import pageNames from "./pageNames";
import useVideos from "./hooks/useVideos";
import Utilities from "./Utilities";
import { AuthProvider, AuthContext } from "./AuthContext";

function App(props) {
  const { history } = props;

  const auth = new Auth(history);

  const { HOME, MOVIES, TV_SHOWS, PROFILE, FAVOURITES } = pageNames;
  const { videosLoaded, videosByGenre } = useVideos();

  return (
    <AuthProvider auth={auth}>
      <Route
        path="/"
        exact
        render={props => (
          <Page
            {...props}
            content={HOME}
            videosLoaded={videosLoaded}
            videosByGenre={videosByGenre}
          />
        )}
      />
      <Route
        path="/tvshows"
        render={props => (
          <Page
            auth={auth}
            {...props}
            content={TV_SHOWS}
            videosLoaded={videosLoaded}
            videosByGenre={videosByGenre}
          />
        )}
      />
      <Route
        path="/movies"
        render={props => (
          <Page
            auth={auth}
            {...props}
            content={MOVIES}
            videosLoaded={videosLoaded}
            videosByGenre={videosByGenre}
          />
        )}
      />
      <Route
        path="/callback"
        render={props => <Callback auth={auth} {...props} />}
      />
      <Route
        path="/profile"
        render={props =>
          auth.isAuthenticated() ? (
            <Page
              auth={auth}
              {...props}
              content={PROFILE}
              videosLoaded={videosLoaded}
            />
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route
        path="/favourites"
        render={props =>
          auth.isAuthenticated() ? (
            <Page
              auth={auth}
              {...props}
              content={FAVOURITES}
              videosLoaded={videosLoaded}
              videosByGenre={videosByGenre}
            />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    </AuthProvider>
  );
}

export default App;
