import React, { FormEvent, useState, useEffect } from "react";
import { List, ListItem, ListItemText, TextField } from "@material-ui/core";
import { actionCreators as commandActionCreators } from "../stores/command";
import { connect } from "react-redux";
import { ListItemStyles, ListWrapStyles, ListStyles } from "../styles";

const { setCommand, resetCommand } = commandActionCreators;

type Props = {
  command: CommandStore.Command | null;
  setCommand: CommandStore.ActionCreators["setCommand"];
  resetCommand: CommandStore.ActionCreators["resetCommand"];
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
  ];

  let inputRef: HTMLInputElement;

  const listItemStyles = ListItemStyles();
  const listWrapStyles = ListWrapStyles();
  const listStyles = ListStyles();

  const [typedCommand, setTypedCommand] = useState("");
  const [commandList, setCommandList] = useState([] as DefaultCommand[]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (inputRef) {
      inputRef.focus();
    }
  });

  useEffect(() => {
    setCommandList(
      defaultCommandList.filter((command) => {
        if (typedCommand === "") return false;
        return command.label.toLowerCase().indexOf(typedCommand) !== -1;
      })
    );

    setCurrentIndex(0);
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
        setCommandList([]);
        props.setCommand(command);
        break;
      }
      case "delete": {
        setCommandList([]);
        props.setCommand(command);
        break;
      }
      default:
        break;
    }
  };

  const handleKeyDownInput = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    const key = e.key.toLowerCase();

    if (commandList.length === 0) return;

    if (key === "enter") {
      const command: CommandStore.Command = commandList[currentIndex].command;

      if (command) {
        setCommandList([]);
        props.setCommand(command);
      }
    } else if (key === "arrowup") {
      currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : setCurrentIndex(0);
    } else if (key === "arrowdown") {
      currentIndex < commandList.length - 1
        ? setCurrentIndex(currentIndex + 1)
        : setCurrentIndex(commandList.length - 1);
    }
  };

  if (props.command) return null;

  return (
    <form noValidate autoComplete="off" onSubmit={handleSbumit}>
      <TextField
        id="command"
        label="Command"
        fullWidth={true}
        margin="none"
        placeholder="Type command"
        onInput={handleInput}
        onKeyDownCapture={handleKeyDownInput}
        inputRef={(node) => {
          inputRef = node;
        }}
      />
      <div className={listWrapStyles.default}>
        <List disablePadding className={listStyles.default}>
          {commandList.map((command, commandIndex) => {
            return (
              <ListItem
                key={command.command}
                className={
                  commandIndex === currentIndex ? listItemStyles.current : ""
                }
              >
                <ListItemText
                  primary={command.label}
                  onClick={() => handleClickCommand(command.command)}
                />
              </ListItem>
            );
          })}
        </List>
      </div>
    </form>
  );
};

const mapStateToProps = (state: State) => {
  return {
    command: state.command.command,
  };
};

export default connect(mapStateToProps, {
  setCommand,
  resetCommand,
})(CommandPalette);
