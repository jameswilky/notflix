import { useEffect, useState, useCallback } from "react";
import Utilities from "../Utilities";

export default function useScreenSize() {
  const { addEvent, removeEvent } = Utilities;
  const [state, setState] = useState({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight
  });

  const captureWidth = useCallback(() => {
    setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    });
  });

  useEffect(() => {
    addEvent(window, "resize", captureWidth);
    return () => removeEvent(window, "resize", captureWidth);
  }, []);

  return state;
}
