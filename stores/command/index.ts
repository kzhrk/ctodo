import { createStore, Reducer } from "redux";

export const initialCommandState: CommandStore.State = {
  command: null,
};

export const SET_COMMAND = "SET_COMMAND";
export const RESET_COMMAND = "RESET_COMMAND";

export const reducer: Reducer<
  CommandStore.State,
  CommandStore.CommandActions
> = (state = initialCommandState, action) => {
  switch (action.type) {
    case SET_COMMAND: {
      const command = action.command;
      return {
        ...state,
        command,
      };
    }
    case RESET_COMMAND: {
      return {
        ...state,
        command: null,
      };
    }
    default: {
      return state;
    }
  }
};

export const actionCreators = {
  setCommand(command: CommandStore.Command): CommandStore.SetCommandAction {
    return {
      type: SET_COMMAND,
      command,
    };
  },
  resetCommand(): CommandStore.ResetCommandAction {
    return {
      type: RESET_COMMAND,
    };
  },
};

export default createStore(reducer);
