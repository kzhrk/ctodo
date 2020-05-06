namespace CommandStore {
  interface State {
    command: Command | null;
  }

  export type Command = "add" | "delete";

  interface SetCommandAction extends AnyAction {
    type: typeof import("../../stores/command").SET_COMMAND;
    command: Command;
  }
  interface ResetCommandAction extends AnyAction {
    type: typeof import("../../stores/command").RESET_COMMAND;
  }

  interface ActionCreators {
    setCommand: (command: Command) => void;
    resetCommand: () => void;
  }

  export type CommandActions = SetCommandAction | ResetCommandAction;
}
