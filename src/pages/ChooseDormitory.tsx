import React from 'react';
import { Theme, WithStyles, withStyles, Typography, Button, Box } from '@material-ui/core';

import { Dormitory, Dormitories } from '../types/dormitory'
import { SPACE } from '../defaultStyles'

const HEIGHT = 50

const styles = (theme: Theme) => ({
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

class ChooseDormitory extends React.Component<WithStyles<typeof styles>> {
  button = (classes: Record<any, string>, dormitory: Dormitory, isActive: boolean) => (
    <Button className={classes.button} variant={isActive ? 'contained' : 'outlined'} fullWidth>
      { dormitory.name }
    </Button>
  )
  render () {
    const { classes } = this.props
    return (
      <div>
        <Typography className={classes.text}>
          寮を選択してください
        </Typography>
        { Dormitories.map((dormitory, i) => (
          <div className={classes.dormitory} key={i}>
            { this.button(classes, dormitory, i === 0) }
          </div>
        ))}
        <Box display='flex' flexDirection='row' className={classes.buttons}>
          <div className={classes.saveButton}>
            <Button variant='contained' color='primary' fullWidth className={classes.button}>
              Save
            </Button>
          </div>
          <div className={classes.cancelButton}>
            <Button variant='contained' color='default' fullWidth className={classes.button}>
              Cancel
            </Button>
          </div>
        </Box>
      </div>
    )
  }
}

export default withStyles(styles)(ChooseDormitory)