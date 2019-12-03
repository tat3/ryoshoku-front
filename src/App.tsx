import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { Theme, withStyles, WithStyles } from '@material-ui/core';
import Home from './pages/Home'
import ChooseDormitory from './pages/ChooseDormitory'
import { DormitoryRepositoryWithLocalStorage } from './services/DormitoryRepository'

const styles = (theme: Theme) => ({
  root: {
    minHeight: '100vh'
  },
})

class App extends React.Component<WithStyles<typeof styles>> {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <BrowserRouter>
          <Route exact path='/' component={Home} />
          <Route exact path='/dormitory'>
            <ChooseDormitory dormitoryRepository={new DormitoryRepositoryWithLocalStorage()}/>
          </Route>
        </BrowserRouter>
      </div>
    )
  }
}

export default withStyles(styles)(App)