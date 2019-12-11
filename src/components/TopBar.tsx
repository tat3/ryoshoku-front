import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
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
import HomeIcon from '@material-ui/icons/Home'

import theme from '../theme'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { useScrollTrigger, Slide } from '@material-ui/core'

const drawerWidth = 240

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    position: "sticky",
    height: 64,
  } as CSSProperties,
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
}

function HideOnScroll(props: any) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

class TopBar extends React.Component<Props & RouteComponentProps> {
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

  render () {
    const { classes, location } = this.props
    return (
      <div className={classes.root}>
        <HideOnScroll { ...this.props }>
        <AppBar>
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
        </HideOnScroll>
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
            { [
                {text: 'ホーム', link: '/', icon: <HomeIcon />},
                {text: '寮の設定', link: '/dormitory', icon: <PlaceIcon />},
              ].filter(item => item.link !== location.pathname)
                .map(({text, link, icon}, i) => (
                <Link to={link} className={classes.link} onClick={this.handleDrawerClose} key={i}>
                  <ListItem button>
                    <ListItemIcon>{ icon }</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              )) }
          </List>
        </Drawer>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(TopBar))