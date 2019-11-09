import React from 'react'
import axios from 'axios'

import { MonthlySchedule } from '../types'
import DailyMenu from './DailyMenu'
import { Theme, withStyles, WithStyles } from '@material-ui/core'

const styles = (theme: Theme) => ({
  list: {
    padding: 0,
    margin: 0,
    marginBottom: theme.spacing(2)
  },
  listItem: {
    listStyleType: 'none',
    marginTop: theme.spacing(2)
  }
})

class Schedule extends React.Component<WithStyles<typeof styles>> {

  state = {
    schedule: [] as MonthlySchedule
  }

  async componentDidMount() {
    const schedule = (await axios.get('/menu.json')).data
    this.setState({schedule})
  }

  render () {
    const { classes } = this.props
    return (
      <ul className={classes.list}>
        { this.state.schedule.slice(0, 7).map((s, i) => (
            <li key={i} className={classes.listItem}><DailyMenu menu={s} /></li>
          )) }
      </ul>
    )
  }
}

export default withStyles(styles)(Schedule)