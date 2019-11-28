import React from 'react'
import axios from 'axios'
import { Theme, withStyles, WithStyles, Typography } from '@material-ui/core'
import moment from 'moment'

import { MonthlySchedule } from '../types'
import DailyMenu from './DailyMenu'
import { isTodayOrFuture } from '../util'
import { SPACE } from '../defaultStyles'

const styles = (theme: Theme) => ({
  list: {
    padding: 0,
    margin: 0,
  },
  listItem: {
    listStyleType: 'none',
    marginTop: theme.spacing(SPACE)
  },
  limit: {
  },
  limitText: {
    // borderTop: 'solid 1px',
    margin: `${theme.spacing(SPACE)}px 0 0`,
    // paddingTop: theme.spacing(SPACE),
    fontSize: 10,
    color: '#FF0000'
  }
})

class Schedule extends React.Component<WithStyles<typeof styles>> {

  state = {
    schedule: [] as MonthlySchedule,
    indexOfCancelableBar: -1,
    now: moment() as moment.Moment
  }

  async componentDidMount() {
    const now = moment()
    this.setState({now})

    const scheduleAll: MonthlySchedule = (await axios.get('/menu.json')).data
    const schedule = scheduleAll.filter(s => isTodayOrFuture(moment(s.date), now))
    this.setState({schedule})

    this.updateCancelables()
    setInterval(() => this.updateCancelables(), 1000)
  }

  updateCancelables() {
    let count = 0
    let index = 0
    const now = this.state.now
    if (now.isBefore(now.clone().hour(9).minute(30))){
      count++
    }
    this.state.schedule.forEach(daily => {
      if (count === 3) {
        return
      }
      if (daily.breakfast.exists && daily.dinner.exists) {
        count++
      }
      index++
      return
    })
    this.setState({indexOfCancelableBar: index})
  }

  render () {
    const { classes } = this.props
    return (
      <ul className={classes.list}>
        { this.state.schedule.slice(0, 7).map((s, i) => (
            <li key={i} className={classes.listItem}>
              { this.state.indexOfCancelableBar <= i && (s.breakfast.exists || s.dinner.exists) ? (
                <Typography className={classes.limitText} align='left'>キャンセル可</Typography>
              ) : ''}
              <DailyMenu menu={s} />
            </li>
          )) }
      </ul>
    )
  }
}

export default withStyles(styles)(Schedule)