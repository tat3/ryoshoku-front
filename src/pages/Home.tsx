import React from 'react';
import { Theme, withStyles, WithStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import { SPACE } from '../defaultStyles'
import Schedule from '../components/Schedule'
import MdLink from '../components/MdLink';
import TopBar from '../components/TopBar'
import { DormitoryRepositoryWithLocalStorage } from '../services/DormitoryRepository'
import MenuDrawer from '../components/MenuDrawer';
import { UserRepositoryWithLocalStorage } from '../services/UserRepository';
import { ScheduleRepository } from '../services/ScheduleRepository';

const styles = (theme: Theme) => ({
  container: {
    padding: `0 ${theme.spacing(SPACE)}px ${theme.spacing(SPACE)}px`,
    overscrollBehavior: 'contain'
  },
  loading: {
    width: 50,
    height: 'auto',
  }
})

class Home extends React.Component<WithStyles<typeof styles>> {
  state = {
    loadingScheduleComponent: true,
    drawerIsOpen: false,
  }

  completeLoadingSchedule = (isLoaded: boolean) => {
    this.setState({
      loadingScheduleComponent: !isLoaded
    })
  }

  handleMenuClicked = () => {
    this.setState({drawerIsOpen: true})
  }

  handleDrawerClosed = () => {
    this.setState({drawerIsOpen: false})
  }

  render () {
    const { classes } = this.props
    return (
      <div>
        <TopBar open={this.state.drawerIsOpen} handleMenuClicked={this.handleMenuClicked}/>
        <MenuDrawer open={this.state.drawerIsOpen} handleMenuDrawerClosed={this.handleDrawerClosed}/>
        <Container maxWidth="sm" className={classes.container}>
          <Schedule
            completeLoading={this.completeLoadingSchedule}
            dormitoryRepository={ new DormitoryRepositoryWithLocalStorage() }
            userRepository={ new UserRepositoryWithLocalStorage() }
            scheduleRepository={ new ScheduleRepository() }
          />
          { this.state.loadingScheduleComponent ? '' : <MdLink dormitoryRepository={ new DormitoryRepositoryWithLocalStorage() }/>}
        </Container>
      </div>
    )
  }
}

export default withStyles(styles)(Home)