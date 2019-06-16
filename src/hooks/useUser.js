// import { useEffect, useState } from "react";

// export default function useUser(auth) {
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [user, setUser] = useState({});
//   useEffect(() => {
//     setUserLoaded(false);
//     // const userId = "google-oauth2|103091392578361804114";
//     const userId = auth.userProfile.sub;

//     const abortController = new AbortController();
//     const signal = abortController.signal;

//     fetch(`/user/${userId}`, { signal: signal })
//       .then(response => {
//         if (response.ok) return response.json();
//         throw new Error("Network respones was not ok.");
//       })
//       .then(user => {
//         setUser(user);
//         setUserLoaded(true);
//       })
//       .catch(error => {});

//     return () => {
//       abortController.abort();
//     };
//   }, []);
//   return { userLoaded, user };
// }
