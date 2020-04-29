import React, { FormEvent, useState, useEffect, MouseEvent } from "react";
import { List, ListItem, ListItemText, TextField } from "@material-ui/core";
import { actionCreators } from "../stores/todo";
import { connect } from "react-redux";

const { createTodo } = actionCreators;

type Props = {
  createTodo: (todo: TodoStore.Todo) => void;
};

const CommandPalette: React.FC<Props> = (props) => {
  const defaultCommandList = [
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
  const [isShowCommand, setIsShowCommand] = useState(true);
  const [typedCommand, setTypedCommand] = useState("");
  const [commandList, setCommandList] = useState(defaultCommandList);
  useEffect(() => {
    setIsShowCommand(typedCommand !== "");

    setCommandList(
      defaultCommandList.filter((command) => {
        return command.command.indexOf(typedCommand) !== -1;
      })
    );
  }, [typedCommand]);

  const handleSbumit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const handleInput = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setTypedCommand((e.target as HTMLInputElement).value);
  };

  const handleClickCommand = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    props.createTodo({
      id: "" + Date.now(),
      checked: false,
      done: false,
      task: "タスク",
      atStart: 0,
      atEnd: 0,
      memo: "",
    });
  };

  return (
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
        <List>
          {commandList.map((command) => {
            return (
              <ListItem dense button key={command.command}>
                <ListItemText
                  primary={command.label}
                  onClick={handleClickCommand}
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </form>
  );
};

export default connect(null, { createTodo })(CommandPalette);
