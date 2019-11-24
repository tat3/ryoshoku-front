import React from 'react'
import axios from 'axios'
import { Theme, withStyles, WithStyles } from '@material-ui/core'
import moment from 'moment'

import { MonthlySchedule } from '../types'
import DailyMenu from './DailyMenu'
import { isTodayOrFuture } from '../util'
import { SPACE } from '../defaultStyles'

const styles = (theme: Theme) => ({
  list: {
    padding: 0,
    margin: 0,
    marginBottom: theme.spacing(SPACE)
  },
  listItem: {
    listStyleType: 'none',
    marginTop: theme.spacing(SPACE)
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
    const today = moment()
    return (
      <ul className={classes.list}>
        { this.state.schedule.filter(s => isTodayOrFuture(moment(s.date), today)).slice(0, 7).map((s, i) => (
            <li key={i} className={classes.listItem}><DailyMenu menu={s} /></li>
          )) }
      </ul>
    )
  }
}

export default withStyles(styles)(Schedule)