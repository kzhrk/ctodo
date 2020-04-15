import React from 'react'
import { Container, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, Checkbox } from '@material-ui/core'

export default () => {
  return (
    <Container>
      <AppBar>
        <Toolbar>
          <Typography>CTODO</Typography>
        </Toolbar>
      </AppBar>
      <Container>
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
    </Container>
  );
}
