import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@material-ui/core";
import { connect } from "react-redux";
import { actionCreators } from "../stores/todo";

const { updateTodo } = actionCreators;

type Props = {
  todoList: TodoStore.State["todoList"];
  updateTodo: (todo: TodoStore.Todo) => void;
};

const TodoList: React.FC<Props> = (props) => {
  const handleClickTodo = (todo: TodoStore.Todo) => {
    todo.checked = !todo.checked;
    props.updateTodo({
      ...todo,
    });
  };

  return (
    <List>
      {props.todoList.map((todo: TodoStore.Todo) => {
        return (
          <ListItem
            dense
            button
            key={todo.id}
            onClick={() => handleClickTodo(todo)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={todo.checked}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={`${todo.task}`} />
          </ListItem>
        );
      })}
    </List>
  );
};

const mapStateToProps = (state: State) => {
  return {
    todoList: [...state.todo.todoList],
  };
};

export default connect(mapStateToProps, { updateTodo })(TodoList);
