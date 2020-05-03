import React, { FormEvent, useState, useEffect } from "react";
import { List, ListItem, ListItemText, TextField } from "@material-ui/core";
import { actionCreators as todoActionCreators } from "../stores/todo";
import { actionCreators as commandActionCreators } from "../stores/command";
import { connect } from "react-redux";

const { createTodo, deleteTodo } = todoActionCreators;
const { setCommand, resetCommand } = commandActionCreators;

type Props = {
  command: CommandStore.Command | null;
  createTodo: (todo: TodoStore.Todo) => void;
  deleteTodo: (index: number) => void;
  setCommand: (command: CommandStore.Command) => void;
  resetCommand: () => void;
};

type DefaultCommand = {
  label: string;
  command: CommandStore.Command;
};

const CommandPalette: React.FC<Props> = (props) => {
  const defaultCommandList: DefaultCommand[] = [
    {
      label: "Add Todo",
      command: "add",
    },
    {
      label: "Delete Todo",
      command: "delete",
    },
    {
      label: "Done Todo",
      command: "done",
    },
  ];
  const [typedCommand, setTypedCommand] = useState("");
  const [commandList, setCommandList] = useState([] as any[]);
  useEffect(() => {
    setCommandList(
      defaultCommandList.filter((command) => {
        if (typedCommand === "") return false;
        return command.label.toLowerCase().indexOf(typedCommand) !== -1;
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

  const handleClickCommand = (command: CommandStore.Command): void => {
    switch (command) {
      case "add": {
        props.setCommand(command);
        break;
      }
      case "delete": {
        props.setCommand(command);
        break;
      }
      default:
        break;
    }
  };

  if (props.command) return null;

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
      <List>
        {commandList.map((command) => {
          return (
            <ListItem dense button key={command.command}>
              <ListItemText
                primary={command.label}
                onClick={() => handleClickCommand(command.command)}
              />
            </ListItem>
          );
        })}
      </List>
    </form>
  );
};

const mapStateToProps = (state: State) => {
  return {
    command: state.command.command,
  };
};

export default connect(mapStateToProps, {
  createTodo,
  deleteTodo,
  setCommand,
  resetCommand,
})(CommandPalette);
