const APP_STATE_KEY = 'atlas5d-state';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(APP_STATE_KEY);
    if (serializedState === null)
      return undefined;

    return JSON.parse(serializedState);
  } catch (err) {
    console.log(`Error loading state from local storage: ${err}`);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(APP_STATE_KEY, serializedState);
  } catch (err) {
    console.log(`Error writing state to local storage: ${err}`);
  }
};