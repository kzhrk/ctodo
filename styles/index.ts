import { makeStyles } from "@material-ui/core";

export const ListItemStyles = makeStyles({
  current: {
    backgroundColor: "#eee",
  },
});

export const ListWrapStyles = makeStyles({
  default: {
    position: "relative",
  },
});

export const ListStyles = makeStyles({
  default: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
    width: "100%",
    backgroundColor: "#fff",
    border: "1px solid #cccccc",
    borderTop: "none",
  },
});
