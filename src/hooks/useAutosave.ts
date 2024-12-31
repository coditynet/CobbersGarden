"use client";

const AUTOSAVE_KEY_PREFIX = 'autosave_';

export const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(`${AUTOSAVE_KEY_PREFIX}${key}`, JSON.stringify({
      timestamp: new Date().getTime(),
      data
    }));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = (key: string) => {
  try {
    const saved = localStorage.getItem(`${AUTOSAVE_KEY_PREFIX}${key}`);
    if (!saved) return null;

    const { timestamp, data } = JSON.parse(saved);
    const hoursSinceLastSave = (new Date().getTime() - timestamp) / (1000 * 60 * 60);
    
    if (hoursSinceLastSave > 24) {
      localStorage.removeItem(`${AUTOSAVE_KEY_PREFIX}${key}`);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const clearSavedData = (key: string) => {
  try {
    localStorage.removeItem(`${AUTOSAVE_KEY_PREFIX}${key}`);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}; 