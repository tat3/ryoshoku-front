import React from 'react';
import { Theme, withStyles, WithStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import { SPACE } from '../defaultStyles'
import Schedule from '../components/Schedule'
import MdLink from '../components/MdLink';
import TopBar from '../components/TopBar'
import { DormitoryRepositoryWithLocalStorage } from '../services/DormitoryRepository'

const styles = (theme: Theme) => ({
  container: {
    padding: `0 ${theme.spacing(SPACE)}px ${theme.spacing(SPACE)}px`
  }
})

class Home extends React.Component<WithStyles<typeof styles>> {
  render () {
    const { classes } = this.props
    return (
      <div>
        <TopBar />
        <Container maxWidth="sm" className={classes.container}>
          <Schedule />
          <MdLink dormitoryRepository={ new DormitoryRepositoryWithLocalStorage() }/>
        </Container>
      </div>
    )
  }
}

export default withStyles(styles)(Home)