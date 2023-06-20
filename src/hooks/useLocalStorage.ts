import { useState, useEffect } from "react";

const useLocalStorage = (key: string, defaultValue: string): [string, (value: string) => void] => {
  const [value, setValue] = useState(() => {
    let currentValue: string;

    try {
      currentValue = JSON.parse(localStorage.getItem(key) || String(defaultValue));
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
