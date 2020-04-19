import React, { FormEvent, useState } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  TextField,
  Box,
} from "@material-ui/core";
import { Provider } from "react-redux";
import store from "../stores/todo";

const App: React.FC = () => {
  const [isShowCommand, setIsShowCommand] = useState(false);

  const commandList = [
    {
      label: "Add Todo",
      command: "addTodo",
    },
    {
      label: "Delete Todo",
      command: "deleteTodo",
    },
    {
      label: "Done Todo",
      command: "doneTodo",
    },
  ];

  const handleSbumit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const handleInput = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault();

    if ((e.target as HTMLInputElement)!.value !== "") {
      setIsShowCommand(true);
    } else {
      setIsShowCommand(false);
    }
  };

  return (
    <Provider store={store}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography>CTODO</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <form noValidate autoComplete="off" onSubmit={handleSbumit}>
          <TextField
            id="command"
            label="Command"
            fullWidth={true}
            margin="normal"
            placeholder="Type command"
            onInput={handleInput}
          />
          {isShowCommand && (
            <Box>
              <List>
                {commandList.map((command) => {
                  return (
                    <ListItem dense button key={command.command}>
                      <ListItemText primary={command.label} />
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          )}
        </form>
        <List>
          {store.getState().todoList.map((todo) => {
            return (
              <ListItem dense button key={todo.id}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={true}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={`${todo.task}`} />
              </ListItem>
            );
          })}
        </List>
      </Container>
    </Provider>
  );
};

export default App;
