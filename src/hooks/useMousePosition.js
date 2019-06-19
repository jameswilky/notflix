import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export default function useMousePosition() {
  const [target, setTarget] = useState();
  useEffect(() => {
    const getTarget = e => {
      setTarget(React.useRef());
    };
    window.addEventListener("mouseover", e => getTarget(e));
    return window.removeEventListener("mouseover", e => getTarget(e));
  });

  const state = { target };
  return state;
}
