namespace TodoStore {
  interface State {
    todoList: Todo[];
  }

  interface Todo {
    id: string;
    checked: boolean;
    done: boolean;
    task: string;
    atStart: number;
    atEnd: number;
    memo: string;
  }

  interface CreateTodoAction extends AnyAction {
    type: typeof import("../../stores/todo").CREATE_TODO;
    todo: Todo;
  }
  interface DeleteTodoAction extends AnyAction {
    type: typeof import("../../stores/todo").DELETE_TODO;
    index: number;
  }
  interface UpdateTodoAction extends AnyAction {
    type: typeof import("../../stores/todo").UPDATE_TODO;
    todo: Todo;
  }

  export type TodoActions =
    | CreateTodoAction
    | DeleteTodoAction
    | UpdateTodoAction;
}
