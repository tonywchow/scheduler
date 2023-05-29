import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace) {
      return setHistory((prev) => [...prev.slice(0, -1), mode]); //Prev copies the existing array and .slice creates a new array without the last item. Then sets the mode
    }
    setHistory((prev) => [...prev, mode]);
  }

  function back() {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, -1)]);
    }
  }
  return { mode: history[history.length - 1], transition, back };
}
