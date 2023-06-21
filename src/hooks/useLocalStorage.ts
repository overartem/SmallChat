import { useState, useEffect } from "react";

interface ILocalStorage {
  valueStorage: string;
  setStorageValue: (value: string) => void;
}

const useLocalStorage = (key: string, defaultValue: string):ILocalStorage => {
  const [valueStorage, setStorageValue] = useState(() => {
    let currentValue: string;

    try {
      currentValue = JSON.parse(localStorage.getItem(key) || String(defaultValue));
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(valueStorage));
  }, [valueStorage, key]);

  return { valueStorage, setStorageValue };
};

export default useLocalStorage;
