import React from 'react'
import { Theme, withStyles, WithStyles, Typography, Button } from '@material-ui/core'
import moment from 'moment'

import { MonthlySchedule, Order, BREAKFAST, DINNER } from '../types'
import DailyMenu from './DailyMenu'
import { SPACE } from '../defaultStyles'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { IDormitoryRepository } from '../services/DormitoryRepository'
import { IScheduleRepository } from '../services/ScheduleRepository'
import { IUserRepository } from '../types/user'

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
  button: {
    marginTop: theme.spacing(SPACE),
    width: '100%',
    height: 50
  },
})

interface Props extends WithStyles<typeof styles>{
  completeLoading(isLoaded: boolean): void,
  userRepository: IUserRepository,
  scheduleRepository: IScheduleRepository,
  dormitoryRepository: IDormitoryRepository,
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
  userRepository = this.props.userRepository
  dormitoryRepository = this.props.dormitoryRepository
  scheduleRepository = this.props.scheduleRepository

  state = {
    schedule: [] as MonthlySchedule,
    indexOfCancelableBar: 100000,
    cancelableTimer: 0,
    scroll: 0,
    refreshMessage: 'Pull to Refresh',
    isPulled: false,
    isTouched: false,
    isLoading: false,
    orderChanged: false,
    isWaitingSync: false,
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
      if (daily.breakfast.menu.exists && daily.dinner.menu.exists) {
        count++
      }
      index++
      return
    })
    this.setState({indexOfCancelableBar: index})
  }

  async loadStaticSchedule() {
    const user = this.userRepository.getStoredUser()
    
    const willLoading = !user.isAnonymous()
    const schedule = await this.scheduleRepository.getStaticSchedule(willLoading)
    this.setState({schedule})
  }

  async loadScheduleWithOrderStatus () {
    const user = this.userRepository.getStoredUser()
    if (user.isAnonymous()) {
      return
    }
    const dormitory = this.dormitoryRepository.getUsersDormitory()
    const schedule = await this.scheduleRepository.getUsersSchedule(user, dormitory)
    this.setState({schedule})
  }

  async handleRefresh () {
    this.setState({orderChanged: false})
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

  handleOrderChanged = (idx: number) => (name: string, order: Order) => {
    if (![BREAKFAST, DINNER].includes(name)) {
      return
    }

    if (!this.isCancelable(idx)) {
      return
    }

    const newSchedule = this.state.schedule.slice()
    newSchedule[idx] = Object.assign({}, newSchedule[idx])
    if (name === BREAKFAST) {
      newSchedule[idx].breakfast = order
    } else {
      newSchedule[idx].dinner = order
    }

    this.setState({schedule: newSchedule})
    this.setState({orderChanged: true})
  }

  isCancelable = (idx: number) => {
    const daily = this.state.schedule[idx]
    return this.state.indexOfCancelableBar <= idx
      && (daily.breakfast.menu.exists || daily.dinner.menu.exists)
  }

  handleOrderSubmit = async () => {
    const user = this.userRepository.getStoredUser()
    const dormitory = this.dormitoryRepository.getUsersDormitory()
    this.setState({
      isWaitingSync: true,
    })
    await this.scheduleRepository.syncUsersSchedule(user, dormitory, this.state.schedule)
    this.setState({
      isWaitingSync: false,
      orderChanged: false,
    })
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
              { this.isCancelable(i) ? (
                <Typography className={classes.limitText} align='left'>キャンセル可</Typography>
              ) : ''}
              <DailyMenu menu={s} handleOrderChanged={this.handleOrderChanged(i)} cancelable={this.isCancelable(i)}/>
            </li>
          )) }
      </ul>
      }
      { this.state.isWaitingSync ?
        <div className={classes.loading}>
          <img src='/image.gif' alt='loading' />
        </div> : '' }
      { this.state.orderChanged ?
        <Button variant='contained' className={classes.button} color='primary' onClick={this.handleOrderSubmit}>注文</Button> : ''}
      </div>
    )
  }
}

export default withStyles(styles)(Schedule)