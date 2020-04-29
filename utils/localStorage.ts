export const loadState = (): null | TodoStore.State => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch {
    return null;
  }
};

export const saveState = (state: TodoStore.State): void | false => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    return false;
  }
};
