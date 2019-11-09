import React from 'react';
import Container from '@material-ui/core/Container';
import TopBar from './components/TopBar'
import Schedule from './components/Schedule'
import { Theme, withStyles, WithStyles } from '@material-ui/core';

const styles = (theme: Theme) => ({
  root: {
    minHeight: '100vh'
  }
})

class App extends React.Component<WithStyles<typeof styles>> {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <TopBar />
        <Container maxWidth="sm">
          <Schedule />
        </Container>
      </div>
    )
  }
}

export default withStyles(styles)(App)