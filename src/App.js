import React, { useContext } from "react";
import Page from "./components/Page/Page";
import "./main.css";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";
import Callback from "./components/Auth/Callback";
import pageNames from "./pageNames";
import useVideos from "./hooks/useVideos";

function App(props) {
  const { history } = props;
  const auth = new Auth(history);

  const { HOME, MOVIES, TV_SHOWS, PROFILE, FAVOURITES } = pageNames;
  const { contentLoaded, videosByGenre } = useVideos();

  return (
    <>
      <Route
        path="/"
        exact
        render={props => (
          <Page
            auth={auth}
            {...props}
            content={HOME}
            contentLoaded={contentLoaded}
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
            contentLoaded={contentLoaded}
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
            contentLoaded={contentLoaded}
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
              contentLoaded={contentLoaded}
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
              contentLoaded={contentLoaded}
              videosByGenre={videosByGenre}
            />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    </>
  );
}

export default App;
