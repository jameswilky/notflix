import React, { useState, useEffect } from "react";
const UserContext = new React.createContext(); // takes in an object and a function

const UserProvider = props => {
  const { auth } = props;
  const [userLoaded, setUserLoaded] = useState(false);
  const [user, setUser] = useState({});

  const updateUser = (action, auth, id) => {
    /* users/update*/
    fetch("users/update", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          id: auth.userProfile.sub
        },
        video: {
          id: id
        },
        /* use parameters instead*/
        action: action
      })
    });
  };
  useEffect(() => {
    setUserLoaded(false);
    console.log("searching user...");
    const userId = "google-oauth2|103091392578361804114";

    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch(`/user/${userId}`, { signal: signal })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network respones was not ok.");
      })
      .then(user => {
        setUser(user);
        setUserLoaded(true);
      })
      .catch(error => {});

    return () => {
      abortController.abort();
    };
  }, []);

  const state = { userLoaded, user, updateUser };

  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};
export { UserContext, UserProvider };
