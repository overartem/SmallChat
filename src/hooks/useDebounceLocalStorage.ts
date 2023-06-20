import { useEffect, useState } from "react";

import useLocalStorage from "./useLocalStorage";

type InputChangeHandler = (value: string) => void;
export const useDebounceLocalStorage = (delay: number): [string, InputChangeHandler] => {
  const [value, setValue] = useState<string>("");
  const [storageMessage, setStorageMessage] = useLocalStorage("message", "");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStorageMessage(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  const handleChange = (e: string) => {
    console.log(e)
    setValue(e);
  };

  return [storageMessage, handleChange];
};
