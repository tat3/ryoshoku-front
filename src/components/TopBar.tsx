import React from 'react'
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import clsx from 'clsx'
import MenuIcon from '@material-ui/icons/Menu'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { useScrollTrigger, Slide } from '@material-ui/core'

const drawerWidth = 240

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
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
  open: boolean,
  handleMenuClicked(): void,
}

function HideOnScroll(props: any) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

class TopBar extends React.Component<Props> {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <HideOnScroll { ...this.props }>
        <AppBar>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={this.props.handleMenuClicked}
              edge='start'
              className={clsx(classes.menuButton, this.props.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Ryoshoku
            </Typography>
          </Toolbar>
        </AppBar>
        </HideOnScroll>
      </div>
    )
  }
}

export default withStyles(styles)(TopBar)