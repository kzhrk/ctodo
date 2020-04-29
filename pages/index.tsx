import React from "react";
import store from "../stores/todo";
import { Provider } from "react-redux";
import TodoList from "../components/TodoList";
import CommandPalette from "../components/CommandPalette";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography>CTODO</Typography>
        </Toolbar>
      </AppBar>
      <CommandPalette />
      <TodoList />
    </Provider>
  );
};

export default App;
