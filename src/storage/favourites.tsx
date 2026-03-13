const KEY = "favorites";

export const getFavorites = (): string[] => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveFavorites = (favorites: string[]) => {
  localStorage.setItem(KEY, JSON.stringify(favorites));
};