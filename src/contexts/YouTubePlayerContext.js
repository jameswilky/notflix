// import React, { useState } from "react";
// const YouTubePlayerContext = new React.createContext(); // takes in an object and a function

// const reducer = (state, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case "ADD_PLAYER": {
//       return { ...state, players: [...state.players, payload] };
//     }
//     default: {
//       return state;
//     }
//   }
// };
// const YouTubePlayerProvider = props => {
//   const [state, setState] = useState({
//     players: [],
//     dispatch: action => {
//       setState(state => reducer(state, action));
//     }
//   });
//   console.log(state);

//   return (
//     <YouTubePlayerContext.Provider value={state}>
//       {props.children}
//     </YouTubePlayerContext.Provider>
//   );
// };
// export { YouTubePlayerContext, YouTubePlayerProvider };
