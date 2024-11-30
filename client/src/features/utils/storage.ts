const STORAGE_PREFIX = 'auth_';

export const storage = {
  get: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(`${STORAGE_PREFIX}${key}`);
  },

  set: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, value);
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    Object.keys(localStorage)
      .filter(key => key.startsWith(STORAGE_PREFIX))
      .forEach(key => localStorage.removeItem(key));
  }
};