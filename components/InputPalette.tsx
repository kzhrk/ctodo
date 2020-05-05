import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { List, ListItem, ListItemText, TextField } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { actionCreators as commandActionCreators } from "../stores/command";
import { actionCreators as todoActionCreators } from "../stores/todo";
import { ListItemStyles, ListWrapStyles, ListStyles } from "../styles";

const { resetCommand } = commandActionCreators;
const { createTodo, deleteTodo } = todoActionCreators;

type Props = {
  command: CommandStore.State["command"];
  todoList: TodoStore.State["todoList"];
  resetCommand: CommandStore.ActionCreators["resetCommand"];
  createTodo: TodoStore.ActionCreators["createTodo"];
  deleteTodo: TodoStore.ActionCreators["deleteTodo"];
};

const InputPalette: React.FC<Props> = (props) => {
  let inputRef: HTMLInputElement;

  const [listItems, setListItems] = useState([] as TodoStore.State["todoList"]);
  const [typedCommand, setTypedCommand] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const listitemStyles = ListItemStyles();
  const listWrapStyles = ListWrapStyles();
  const listStyles = ListStyles();

  useEffect(() => {
    if (inputRef) {
      inputRef.focus();
    }
  });

  useEffect(() => {
    if (props.command) {
      if (props.command === "add") {
        setListItems([]);
      } else if (props.command === "delete") {
        setListItems(
          props.todoList.filter((todo) => {
            if (typedCommand === "") return false;
            return todo.task.indexOf(typedCommand) !== -1;
          })
        );
      }
    }
  }, [typedCommand]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [listItems]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setTypedCommand((e.target as HTMLInputElement).value);
  };

  const handleKeyDownInput = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    const key = e.key.toLowerCase();

    if (key === "escape") {
      props.resetCommand();
    } else if (
      props.command === "add" &&
      key === "enter" &&
      typedCommand !== ""
    ) {
      props.createTodo({
        id: uuidv4(),
        checked: false,
        done: false,
        task: typedCommand,
        atStart: new Date().getTime(),
        atEnd: new Date().getTime(),
        memo: "",
      });

      inputRef.value = "";
      setTypedCommand("");
    } else if (props.command === "delete" && key === "enter") {
      const target = listItems[currentIndex];

      if (target) {
        props.deleteTodo(props.todoList.indexOf(target));

        setListItems(
          props.todoList.filter((todo) => {
            return todo.task.indexOf(typedCommand) !== -1;
          })
        );
      }
    } else if (props.command === "delete" && key === "arrowup") {
      currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : setCurrentIndex(0);
    } else if (props.command === "delete" && key === "arrowdown") {
      currentIndex < listItems.length - 1
        ? setCurrentIndex(currentIndex + 1)
        : setCurrentIndex(listItems.length - 1);
    }
  };

  const handleClickItem = (todo: TodoStore.Todo): void => {
    if (props.command === "delete") {
      props.deleteTodo(props.todoList.indexOf(todo));

      setListItems(
        props.todoList.filter((todo) => {
          if (typedCommand === "") return false;
          return todo.task.indexOf(typedCommand) !== -1;
        })
      );
    }
  };

  const handleBlur = (): void => {
    inputRef.value = "";
    setTypedCommand("");
    props.resetCommand();
  };

  const getInputLabel = (): string => {
    switch (props.command) {
      case "add":
        return "Add Todo";
      case "delete":
        return "Delete Todo";
      default:
        return "Error (Please press ESC...)";
    }
  };

  const getInputPlaceholder = (): string => {
    switch (props.command) {
      case "add":
        return "Type your task";
      case "delete":
        return "Type your task for pick up";
      default:
        return "Error (Please press ESC...)";
    }
  };

  if (props.command === null) return null;

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        id="input"
        label={getInputLabel()}
        fullWidth={true}
        margin="none"
        placeholder={getInputPlaceholder()}
        inputRef={(node) => {
          inputRef = node;
        }}
        onChange={handleInput}
        onKeyDownCapture={handleKeyDownInput}
        onBlur={handleBlur}
      />
      <div className={listWrapStyles.default}>
        <List disablePadding className={listStyles.default}>
          {listItems.map((todo, todoIndex) => {
            return (
              <ListItem
                dense
                button
                key={todo.id}
                className={
                  todoIndex === currentIndex ? listitemStyles.current : ""
                }
                onClick={() => handleClickItem(todo)}
              >
                <ListItemText primary={todo.task} />
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
    todoList: state.todo.todoList,
  };
};

export default connect(mapStateToProps, {
  resetCommand,
  createTodo,
  deleteTodo,
})(InputPalette);
