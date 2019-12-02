import React from 'react';
import Container from '@material-ui/core/Container';
import { BrowserRouter, Route } from 'react-router-dom'
import TopBar from './components/TopBar'
import { Theme, withStyles, WithStyles } from '@material-ui/core';
import { SPACE } from './defaultStyles'
import Home from './pages/Home'
import ChooseDormitory from './pages/ChooseDormitory'
import { DormitoryRepositoryWithLocalStorage } from './services/DormitoryRepository'

const styles = (theme: Theme) => ({
  root: {
    minHeight: '100vh'
  },
  container: {
    padding: `0 ${theme.spacing(SPACE)}px ${theme.spacing(SPACE)}px`
  }
})

class App extends React.Component<WithStyles<typeof styles>> {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <TopBar />
        <BrowserRouter>
          <Container maxWidth="sm" className={classes.container}>
            <Route exact path='/' component={Home} />
            <Route exact path='/dormitory'>
              <ChooseDormitory dormitoryRepository={new DormitoryRepositoryWithLocalStorage()}/>
            </Route>
          </Container>
        </BrowserRouter>
      </div>
    )
  }
}

export default withStyles(styles)(App)