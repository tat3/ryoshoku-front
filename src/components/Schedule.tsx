import React from 'react'
import axios from 'axios'

import { MonthlySchedule } from '../types'
import DailyMenu from './DailyMenu'
import { Theme, withStyles, WithStyles } from '@material-ui/core'

const styles = (theme: Theme) => ({
  listItem: {
    listStyleType: 'none'
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
      <ul>
        { this.state.schedule.slice(0, 3).map((s, i) => (
            <li key={i} className={classes.listItem}><DailyMenu menu={s} /></li>
          )) }
      </ul>
    )
  }
}

export default withStyles(styles)(Schedule)