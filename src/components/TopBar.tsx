import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
  },
  title: {
    flexGrow: 1,
  },
}))

export default function ButtonAppBar() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <RestaurantMenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Ryoshoku
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}