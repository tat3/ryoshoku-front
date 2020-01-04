import React from 'react'
import { Theme, WithStyles, withStyles, Typography, Button, Box, Container, TextField } from '@material-ui/core'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import TopBar from '../components/TopBar'
import { SPACE } from '../defaultStyles'
import MenuDrawer from '../components/MenuDrawer'

import { UserFactory } from '../services/UserFactory'

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
  inputform: {
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
}

class Signin extends React.Component<Props & RouteComponentProps> {
  state = {
    drawerIsOpen: false,
    username: '',
    password: '',
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

  handleInputUsername = (event: any) => {
    this.setState({username: event.target.value})
  }

  handleInputPassword = (event: any) => {
    this.setState({password: event.target.value})
  }

  handleSubmit = async (event: any) => {
    event.preventDefault()
    const { username, password } = this.state
    if (!(username && password)) {
      console.log('username and password is required')
      return
    }

    const user = new UserFactory().create(username, password)
    try {
      await user.authenticate()
    } catch (e) {
      alert('username or password is wrong')
      return
    }

    user.save()
    // this.props.history.push('/')
    console.log('successfully saved')
  }

  render () {
    const { classes } = this.props
    return (
      <div>
        <TopBar open={this.state.drawerIsOpen} handleMenuClicked={this.handleMenuClicked}/>
        <MenuDrawer open={this.state.drawerIsOpen} handleMenuDrawerClosed={this.handleDrawerClosed}/>
        <Container maxWidth="sm" className={classes.container}>
        <Typography className={classes.text}>
          アカウント情報を入力してください
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <div className={classes.inputform}>
            <TextField id="username" label="ログインID" variant="outlined" fullWidth onChange={this.handleInputUsername} />
          </div>
          <div className={classes.inputform}>
            <TextField id="password" label="パスワード" variant="outlined" type="password" fullWidth onChange={this.handleInputPassword} />
          </div>
          <Box display='flex' flexDirection='row' className={classes.buttons}>
            <div className={classes.saveButton}>
              <Button type='submit' variant='contained' color='primary' fullWidth className={classes.button}>
                Save
              </Button>
            </div>
            <div className={classes.cancelButton}>
              <Button variant='contained' color='default' fullWidth className={classes.button} onClick={this.handleCancelButton}>
                Cancel
              </Button>
            </div>
          </Box>
        </form>

        </Container>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Signin))