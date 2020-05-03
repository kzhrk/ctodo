import React, { FormEvent, useEffect } from "react";
import { connect } from "react-redux";
import { List, ListItem, ListItemText, TextField } from "@material-ui/core";

type Props = {
  command: CommandStore.State["command"];
};

const InputPalette: React.FC<Props> = (props) => {
  const listItems: any[] = [];
  let inputRef: HTMLInputElement;

  useEffect(() => {
    if (props.command) {
      inputRef.focus();
    }
  });

  const handleSbumit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  if (props.command === null) return null;

  return (
    <form noValidate autoComplete="off" onSubmit={handleSbumit}>
      <TextField
        id="input"
        label="Input Field"
        fullWidth={true}
        margin="normal"
        placeholder=""
        inputRef={(node) => {
          inputRef = node;
        }}
      />
      <List>
        {listItems.map((item, itemIndex) => {
          return (
            <ListItem dense button key={itemIndex}>
              <ListItemText primary={item.label} />
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

export default connect(mapStateToProps, {})(InputPalette);
