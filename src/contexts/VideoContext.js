import React from "react";
import useVideos from "../hooks/useVideos";
const VideoContext = new React.createContext(); // takes in an object and a function

const VideoProvider = props => {
  return (
    <VideoContext.Provider value={useVideos}>
      {props.children}
    </VideoContext.Provider>
  );
};
export { VideoContext, VideoProvider };
