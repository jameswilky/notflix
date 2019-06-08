import { useEffect, useState, useCallback } from "react";
import Utilities from "../Utilities";

export default function useScreenWidth() {
  const { addEvent, removeEvent } = Utilities;
  const [screenWidth, setScreenWidth] = useState(
    window.document.body.clientWidth
  );
  const captureWidth = useCallback(() => {
    setScreenWidth(window.innerWidth);
  });

  // useEffect(() => {
  //   addEvent(window, "resize", captureWidth);
  //   return () => removeEvent(window, "resize", captureWidth);
  // }, []);

  return { screenWidth };
}
