import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PlaceIcon from '@material-ui/icons/Place'
import HomeIcon from '@material-ui/icons/Home'
import LockIcon from '@material-ui/icons/Lock'

import theme from '../theme'


const drawerWidth = 240

const styles = (theme: Theme) => ({
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
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
})

interface Props extends WithStyles<typeof styles> {
  open: boolean,
  handleMenuDrawerClosed(): void,
}

class MenuDrawer extends React.Component<Props & RouteComponentProps> {
  render () {
    const { classes, location } = this.props
    return (
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={this.props.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.props.handleMenuDrawerClosed}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            { [
                {text: 'ホーム', link: '/', icon: <HomeIcon />},
                {text: '寮の設定', link: '/dormitory', icon: <PlaceIcon />},
                {text: 'ログイン', link: '/signin', icon: <LockIcon />},
              ].filter(item => item.link !== location.pathname)
                .map(({text, link, icon}, i) => (
                <Link to={link} className={classes.link} onClick={this.props.handleMenuDrawerClosed} key={i}>
                  <ListItem button>
                    <ListItemIcon>{ icon }</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              )) }
          </List>
        </Drawer>
    )
  }
}

export default withRouter(withStyles(styles)(MenuDrawer))