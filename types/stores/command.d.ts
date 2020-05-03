namespace CommandStore {
  interface State {
    command: Command | null;
  }

  export type Command = "add" | "delete" | "done";

  interface SetCommandAction extends AnyAction {
    type: typeof import("../../stores/command").SET_COMMAND;
    command: Command;
  }
  interface ResetCommandAction extends AnyAction {
    type: typeof import("../../stores/command").RESET_COMMAND;
  }

  export type CommandActions = SetCommandAction | ResetCommandAction;
}
