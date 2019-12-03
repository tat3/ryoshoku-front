import React from 'react'
import { Theme, withStyles, WithStyles } from '@material-ui/core'
import { Button } from '@material-ui/core';

import { SPACE } from '../defaultStyles'
import { IDormitoryRepository } from '../services/DormitoryRepository';

const styles = (theme: Theme) => ({
  button: {
    marginTop: theme.spacing(SPACE),
    width: '100%',
    height: 50
  }
})

interface Props extends WithStyles<typeof styles> {
  dormitoryRepository: IDormitoryRepository
}

class MdLink extends React.Component<Props> {
  render () {
    const { classes } = this.props
    const url = this.props.dormitoryRepository.getUsersDormitory().mdurl
    return (
      <Button variant='contained' href={url} rel='noreferrer' target='_blank'
       className={classes.button} color='primary'>
        Go to MDLife
      </Button>
    )
  }
}

export default withStyles(styles)(MdLink)