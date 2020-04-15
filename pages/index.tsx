import React, { FormEvent } from 'react'
import { Container, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, Checkbox, TextField } from '@material-ui/core'

export default () => {
  const handleSbumit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography>CTODO</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <form noValidate autoComplete="off" onSubmit={handleSbumit}>
          <TextField id="command" label="Command" fullWidth={true} margin="normal" placeholder="Type command" />
        </form>
        <List>
          {[0,1,2,3].map(value => {
            return (
              <ListItem dense button>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={true}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={`todo ${value}`} />
              </ListItem>
            )
          })}
        </List>
      </Container>
    </div>
  );
}
