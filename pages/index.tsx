import React from "react";
import store from "../stores";
import { Provider } from "react-redux";
import TodoList from "../components/TodoList";
import CommandPalette from "../components/CommandPalette";
import InputPalette from "../components/InputPalette";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { saveState } from "../utils/localStorage";

store.subscribe(() => {
  saveState(store.getState().todo);
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography>CTODO</Typography>
        </Toolbar>
      </AppBar>
      <CommandPalette />
      <InputPalette />
      <TodoList />
    </Provider>
  );
};

export default App;
