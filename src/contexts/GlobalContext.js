// import React from "react";
// import { AuthProvider } from "./contexts/AuthContext";
// import { UserProvider } from "./contexts/UserContext";
// import { HistoryProvider } from "./contexts/HistoryContext";

// const GlobalContext = new React.createContext(); // takes in an object and a function
// const GlobalProvider = props => {
//   const { auth, firstLoad, history } = props;
//   return (
//     <AuthProvider auth={auth}>
//       <UserProvider auth={auth}>
//         <HistoryProvider firstLoad={firstLoad} history={history}>
//           {props.children}
//         </HistoryProvider>
//       </UserProvider>
//     </AuthProvider>
//   );
// };
// export { GlobalContext, GlobalProvider };
