import { useState } from 'react';

function useStorage(key: string, initialValue: any) {
  const storedValue = localStorage.getItem(key);
  const initial: string = storedValue || initialValue;

  const [value, setValue] = useState<string>(initial);

  const updateValue = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  const removeValue = () => {
    setValue(initialValue);
    localStorage.removeItem(key);
  };

  return [value, updateValue, removeValue] as const;
}

export default useStorage;
