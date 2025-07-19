import { useState, useEffect } from 'react';

function useLocalStorage<T>(key : string, initialValue : T): [T, (value: T ) => void]  //generic needs return type for safety, to make sure setter only accepts T
{
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) as T : initialValue;
    } catch (error) {
      console.warn(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage