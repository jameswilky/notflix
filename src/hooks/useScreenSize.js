import { useEffect, useState, useCallback } from "react";
import Utilities from "../Utilities";

export default function useScreenSize() {
  const { addEvent, removeEvent } = Utilities;
  let breakpoints = { mobile: 478, tablet: 720 };

  const getMedia = () => {
    return window.innerWidth < breakpoints.mobile
      ? "mobile"
      : window.innerWidth > breakpoints.mobile &&
        window.innerWidth < breakpoints.tablet
      ? "tablet"
      : "desktop";
  };

  const [state, setState] = useState({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    media: getMedia()
  });

  const captureWidth = useCallback(() => {
    setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      media: getMedia()
    });
  });

  useEffect(() => {
    addEvent(window, "resize", captureWidth);
    return () => removeEvent(window, "resize", captureWidth);
  }, []);

  return state;
}
