import React from 'react';
import { Theme, WithStyles, withStyles, Typography, Button, Box, Container } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router-dom'

import TopBar from '../components/TopBar'
import { Dormitory, Dormitories } from '../types/dormitory'
import { SPACE } from '../defaultStyles'
import { IDormitoryRepository } from '../services/DormitoryRepository';
import MenuDrawer from '../components/MenuDrawer';

const HEIGHT = 50

const styles = (theme: Theme) => ({
  container: {
    padding: `0 ${theme.spacing(SPACE)}px ${theme.spacing(SPACE)}px`
  },
  button: {
    height: HEIGHT
  },
  text: {
    marginTop: theme.spacing(SPACE)
  },
  dormitory: {
    marginTop: theme.spacing(SPACE),
  },
  saveButton: {
    width: `calc(50% - ${theme.spacing(SPACE * 0.5)}px)`,
    height: HEIGHT
  },
  cancelButton: {
    marginLeft: theme.spacing(SPACE),
    width: `calc(50% - ${theme.spacing(SPACE * 0.5)}px)`,
    height: HEIGHT
  },
  buttons: {
    marginTop: theme.spacing(SPACE) * 2
  }
})

interface Props extends WithStyles<typeof styles> {
  dormitoryRepository: IDormitoryRepository
}

class ChooseDormitory extends React.Component<Props & RouteComponentProps> {
  state = {
    usersDormitory: this.props.dormitoryRepository.getUsersDormitory(),
    drawerIsOpen: false,
  }

  handleDormitoryButton (dormitory: Dormitory) {
    this.setState({
      usersDormitory: dormitory
    })
  }

  handleSaveButton = () => {
    this.props.dormitoryRepository.saveUsersDormitory(this.state.usersDormitory)
    this.props.history.push('/')
  }

  handleCancelButton = () => {
    this.props.history.push('/')
  }

  handleMenuClicked = () => {
    this.setState({drawerIsOpen: true})
  }

  handleDrawerClosed = () => {
    this.setState({drawerIsOpen: false})
  }

  button = (classes: Record<any, string>, dormitory: Dormitory, isActive: boolean) => (
    <Button className={classes.button} variant={isActive ? 'contained' : 'outlined'} fullWidth onClick={() => this.handleDormitoryButton(dormitory)}>
      { dormitory.name }
    </Button>
  )
  render () {
    const { classes } = this.props
    return (
      <div>
        <TopBar open={this.state.drawerIsOpen} handleMenuClicked={this.handleMenuClicked}/>
        <MenuDrawer open={this.state.drawerIsOpen} handleMenuDrawerClosed={this.handleDrawerClosed}/>
        <Container maxWidth="sm" className={classes.container}>
        <Typography className={classes.text}>
          寮を選択してください
        </Typography>
        { Dormitories.map((dormitory, i) => (
          <div className={classes.dormitory} key={i}>
            { this.button(classes, dormitory, this.props.dormitoryRepository.isSameDormitory(dormitory, this.state.usersDormitory)) }
          </div>
        ))}
        <Box display='flex' flexDirection='row' className={classes.buttons}>
          <div className={classes.saveButton}>
            <Button variant='contained' color='primary' fullWidth className={classes.button} onClick={this.handleSaveButton}>
              Save
            </Button>
          </div>
          <div className={classes.cancelButton}>
            <Button variant='contained' color='default' fullWidth className={classes.button} onClick={this.handleCancelButton}>
              Cancel
            </Button>
          </div>
        </Box>

        </Container>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(ChooseDormitory))