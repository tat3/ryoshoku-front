import React from 'react'
import { Theme, withStyles, WithStyles } from '@material-ui/core'
import { Button } from '@material-ui/core';

import { SPACE } from '../defaultStyles'

const styles = (theme: Theme) => ({
  button: {
    marginTop: theme.spacing(SPACE),
    width: '100%',
    height: 50
  }
})

class MdLink extends React.Component<WithStyles<typeof styles>> {
  render () {
    const { classes } = this.props
    const url ='https://www.m-dmeal.com/S-itami008-JYBFE_jpahbXmFsh4m396APWmYEFDN-E/login.aspx?p=mdmealITM008'
    return (
      <Button variant='contained' href={url} rel='noreferrer' target='_blank'
       className={classes.button} color='primary'>
        Go to MDLife
      </Button>
    )
  }
}

export default withStyles(styles)(MdLink)