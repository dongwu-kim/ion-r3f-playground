export interface Storage {
  theme: 'light' | 'dark';
}

const getItem = <K extends keyof Storage>(key: K) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : undefined;
};

const setItem = <K extends keyof Storage>(key: K, value: Storage[K]) =>
  localStorage.setItem(key, JSON.stringify(value));

const removeItem = <K extends keyof Storage>(key: K) =>
  localStorage.removeItem(key);

export const storage = {
  getItem,
  setItem,
  removeItem,
};
