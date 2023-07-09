import { useState, useEffect } from "react";

function useLocalStorageState(initialState, key) {
  // retrieving the saved watched even after reload
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  /* Effects */
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setValue];
}

export default useLocalStorageState;
