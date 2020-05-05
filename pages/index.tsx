import React from "react";
import store from "../stores";
import { Provider } from "react-redux";
import TodoList from "../components/TodoList";
import CommandPalette from "../components/CommandPalette";
import InputPalette from "../components/InputPalette";
import { AppBar, Toolbar, Typography, Box, Link } from "@material-ui/core";
import { saveState } from "../utils/localStorage";
import CssBaseline from "@material-ui/core/CssBaseline";

store.subscribe(() => {
  saveState(store.getState().todo);
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography>CTODO</Typography>
        </Toolbar>
      </AppBar>
      <Box p={2}>
        <CommandPalette />
        <InputPalette />
        <TodoList />
      </Box>
      <Box component="footer" borderTop={1} p={2}>
        <Typography align="center" component="footer" variant="caption">
          &copy; 2020{" "}
          <Link href="https://github.com/kzhrk" target="_blank" rel="noopener">
            kzhrk
          </Link>
        </Typography>
      </Box>
    </Provider>
  );
};

export default App;
