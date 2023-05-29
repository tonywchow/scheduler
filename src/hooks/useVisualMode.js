import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace) {
      return setHistory((prev) => [...prev.slice(0, -1), mode]);
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
