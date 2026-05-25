import { useState, useEffect } from 'react';

export function useTimer(resetKey) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(0);
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [resetKey]);

  return seconds;
}
