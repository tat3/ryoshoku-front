import React from 'react'
import axios from 'axios'
import { Theme, withStyles, WithStyles, Typography } from '@material-ui/core'
import moment from 'moment'

import { MonthlySchedule } from '../types'
import DailyMenu from './DailyMenu'
import { isTodayOrFuture } from '../util'
import { SPACE } from '../defaultStyles'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { UserRepositoryWithLocalStorage } from '../services/UserRepository'
import { DormitoryRepositoryWithLocalStorage } from '../services/DormitoryRepository'

const refreshThreshold = 60

const isPulled = (scroll: number) => -scroll > refreshThreshold

const styles = (theme: Theme) => ({
  list: {
    padding: 0,
    margin: 0,
  },
  listItem: {
    listStyleType: 'none',
    marginTop: theme.spacing(SPACE)
  },
  limitText: {
    margin: `${theme.spacing(SPACE)}px 0 0`,
    fontSize: 10,
    color: '#FF0000'
  },
  pulled: {
    marginTop: -refreshThreshold,
    paddingTop: 20,
    height: refreshThreshold,
    textAlign: 'center'
  } as CSSProperties,
  loading: {
    paddingTop: 20,
    height: refreshThreshold,
    textAlign: 'center'
  } as CSSProperties,
})

interface Props extends WithStyles<typeof styles>{
  completeLoading(isLoaded: boolean): void
}

interface PullToRefreshAreaProps extends WithStyles<typeof styles>{
  message: string
}

class PullToRefreshArea extends React.Component<PullToRefreshAreaProps> {
  render = () => {
    const { message, classes } = this.props
    return (
      <div className={classes.pulled}>
        <Typography color='textSecondary' variant='subtitle2'>{ message }</Typography>
      </div>
    )
  }
}

class LoadingArea extends React.Component<WithStyles<typeof styles>> {
  render = () => {
    const { classes } = this.props
    return (
      <div className={classes.loading}>
        <img src='/image.gif' alt='loading' />
      </div>
    )
  }
}

class Schedule extends React.Component<Props> {

  state = {
    schedule: [] as MonthlySchedule,
    indexOfCancelableBar: 100000,
    cancelableTimer: 0,
    scroll: 0,
    refreshMessage: 'Pull to Refresh',
    isPulled: false,
    isTouched: false,
    isLoading: false,
  }

  async componentDidMount() {
    window.addEventListener('scroll', this.handleScrolled)
    window.addEventListener('touchstart', this.handleTouched)
    window.addEventListener('touchend', this.handleUntouched)

    await this.loadStaticSchedule()
    this.props.completeLoading(true)

    this.updateCancelables()
    const cancelableTimer = window.setInterval(() => this.updateCancelables(), 1000)
    this.setState({cancelableTimer})
    this.loadScheduleWithOrderStatus()
  }

  componentWillUnmount() {
    clearInterval(this.state.cancelableTimer)
    window.removeEventListener('scroll', this.handleScrolled)
    window.removeEventListener('touchstart', this.handleTouched)
    window.removeEventListener('touchend', this.handleUntouched)
  }

  updateCancelables() {
    let count = 0
    let index = 0
    const now = moment()
    if (now.isBefore(now.clone().hour(8).minute(45))){
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

  async loadStaticSchedule() {
    const now = moment()
    const scheduleAll: MonthlySchedule = (await axios.get('/menu.json')).data
    const schedule = scheduleAll.filter(s => isTodayOrFuture(moment(s.date), now))
    this.setState({schedule})
  }

  async loadScheduleWithOrderStatus () {
    const now = moment()

    const userRepository = new UserRepositoryWithLocalStorage()
    const user = userRepository.getStoredUser()
    if (user.isAnonymous()) {
      return
    }
    const dormitory = (new DormitoryRepositoryWithLocalStorage()).getUsersDormitory()
    const url = process.env.REACT_APP_API_URL + '/orders'
    const scheduleAll: MonthlySchedule = (await axios.post(url, {
      username: user.usernameToken,
      password: user.passwordToken,
      dormitory: dormitory.key,
    })).data.schedule

    const schedule = scheduleAll.filter(s => isTodayOrFuture(moment(s.date), now))
    this.setState({schedule})
  }

  async handleRefresh () {
    this.setState({isLoading: true})
    this.props.completeLoading(false)

    await this.loadStaticSchedule()
    this.setState({isLoading: false})
    this.props.completeLoading(true)
    this.loadScheduleWithOrderStatus()
  }

  handleScrolled = () => {
    const scroll = window.pageYOffset
    this.setState({scroll})

    if (isPulled(scroll)) {
      this.setState({
        isPulled: true,
        refreshMessage: 'Now Loading...'
      })
    } else if (this.state.isLoading) {
      this.setState({
        isPulled: false,
        refreshMessage: ''
      })
    } else {
      this.setState({
        isPulled: false,
        refreshMessage: 'Pull to Refresh'
      })
    }
  }

  handleTouched = () => {
    this.setState({isTouched: true})
  }

  handleUntouched = () => {
    this.setState({isTouched: false, refreshMessage: ''})
    if (isPulled(this.state.scroll)) {
      this.handleRefresh()
    }
  }

  render () {
    const { classes } = this.props
    return (
      <div>
      <PullToRefreshArea message={this.state.refreshMessage} classes={classes}/>
      { this.state.isLoading ? <LoadingArea classes={classes} /> : 
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
      }
      </div>
    )
  }
}

export default withStyles(styles)(Schedule)