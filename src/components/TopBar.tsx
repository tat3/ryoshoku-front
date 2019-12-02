import React from 'react'
import { Link } from 'react-router-dom'
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
import clsx from 'clsx'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PlaceIcon from '@material-ui/icons/Place'

import theme from '../theme'

const drawerWidth = 240

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  hide: {
    display: 'none',
  },
})

class TopBar extends React.Component<WithStyles<typeof styles>> {
  state = {
    open: false
  }

  setOpen = (open: boolean) => {
    this.setState({open})
  }

  handleDrawerOpen = () => {
    this.setOpen(true)
  }

  handleDrawerClose = () => {
    this.setOpen(false)
  }

  drawer = (classes: Record<any, string>, theme: Theme) => (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={this.state.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={this.handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <Link to='/dormitory'>
          <ListItem button key={0} onClick={this.handleDrawerClose}>
            <ListItemIcon><PlaceIcon /></ListItemIcon>
            <ListItemText primary='寮の設定' />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  )

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Ryoshoku
            </Typography>
          </Toolbar>
        </AppBar>
        { this.drawer(classes, theme) }
      </div>
    )
  }
}

export default withStyles(styles)(TopBar)