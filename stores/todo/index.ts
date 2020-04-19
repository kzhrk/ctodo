import { createStore, Reducer } from "redux";

const initialTodoState: TodoStore.State = {
  todoList: [],
};

export const CREATE_TODO = "CREATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";

export const reducer: Reducer<TodoStore.State, TodoStore.TodoActions> = (
  state = initialTodoState,
  action
) => {
  switch (action.type) {
    case CREATE_TODO: {
      const todoList = state.todoList;
      todoList.push(action.todo);
      return {
        ...state,
        todoList,
      };
    }
    case DELETE_TODO: {
      const todoList = state.todoList;
      todoList.slice(action.index, 1);
      return {
        ...state,
        todoList,
      };
    }
    case UPDATE_TODO: {
      const todoList = state.todoList;
      const index = todoList.indexOf(action.todo);
      todoList[index] = action.todo;

      return {
        ...state,
        todoList,
      };
    }
    default: {
      return state;
    }
  }
};

export const actionCreators = {
  createTodo(todo: TodoStore.Todo): TodoStore.CreateTodoAction {
    return {
      type: CREATE_TODO,
      todo,
    };
  },
  updateTodo(todo: TodoStore.Todo): TodoStore.UpdateTodoAction {
    return {
      type: UPDATE_TODO,
      todo,
    };
  },
  deleteTodo(index: number): TodoStore.DeleteTodoAction {
    return {
      type: DELETE_TODO,
      index,
    };
  },
};

export default createStore(reducer, initialTodoState);
