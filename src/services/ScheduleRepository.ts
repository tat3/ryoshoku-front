import axios from 'axios'
import moment from 'moment'

import { MonthlySchedule, DailyScheduleApi, Menu, Order } from '../types'
import { isTodayOrFuture } from '../util'
import { Dormitory } from '../types/dormitory'
import { IUser } from '../types/user'

export interface IScheduleRepository {
  getStaticSchedule(isLoading: boolean): Promise<MonthlySchedule>,
  getUsersSchedule(user: IUser, dormitory: Dormitory): Promise<MonthlySchedule>,
  syncUsersSchedule(user: IUser, dormitory: Dormitory, schedule: MonthlySchedule): void,
  orderIsChanged(newSchedule: MonthlySchedule): boolean,
}

const clone = <T>(original: T) => JSON.parse(JSON.stringify(original)) as T

export class ScheduleRepository implements IScheduleRepository {
  private originalSchedule: MonthlySchedule | null

  constructor() {
    this.originalSchedule = null
  }

  private orderFromMenu = (menu: Menu, loading: boolean): Order => ({ menu, isLoading: loading })

  private orderWithUnloading = (menu: Menu) => {
    return {
      menu,
      isLoading: false,
    }
  }

  getStaticSchedule = async (loading: boolean): Promise<MonthlySchedule> => {
    const now = moment()
    const scheduleAll: DailyScheduleApi[] = (await axios.get('/menu.json')).data
    return scheduleAll.filter(s => isTodayOrFuture(moment(s.date), now))
      .map(s => ({
        date: s.date,
        breakfast: this.orderFromMenu(s.breakfast, loading),
        dinner: this.orderFromMenu(s.dinner, loading),
      }))
  }

  getUsersSchedule = async (user: IUser, dormitory: Dormitory): Promise<MonthlySchedule> => {
    if (user.isAnonymous()) {
      throw Error('user is anonymous.')
    }
    const now = moment()
    const url = process.env.REACT_APP_API_URL + '/orders'
    const scheduleAll: DailyScheduleApi[] = (await axios.post(url, {
      username: user.usernameToken,
      password: user.passwordToken,
      dormitory: dormitory.key,
    })).data.schedule

    const schedule = scheduleAll.filter(s => isTodayOrFuture(moment(s.date), now))
      .map(s => ({
        date: s.date,
        breakfast: this.orderWithUnloading(s.breakfast),
        dinner: this.orderWithUnloading(s.dinner)
      }))
    
    this.originalSchedule = clone(schedule)
    return schedule
  }

  syncUsersSchedule = async (user: IUser, dormitory: Dormitory, schedule: MonthlySchedule) => {
    if (user.isAnonymous()) {
      throw Error('user is anonymous.')
    }

    const url = process.env.REACT_APP_API_URL + '/order'
    await axios.post(url, {
      username: user.usernameToken,
      password: user.passwordToken,
      dormitory: dormitory.key,
      schedule: schedule.map(daily => ({
        date: daily.date,
        breakfast: daily.breakfast.menu.ordered,
        dinner: daily.dinner.menu.ordered,
      }))
    })
    this.originalSchedule = clone(schedule)
  }

  orderIsChanged(newSchedule: MonthlySchedule) {
    if (this.originalSchedule === null) {
      return false
    }
    if (this.originalSchedule.length !== newSchedule.length) {
      return false
    }
    const res = this.originalSchedule.filter((daily, i) => {
      if (daily.breakfast.menu.ordered !== newSchedule[i].breakfast.menu.ordered) {
        return true
      }
      if (daily.dinner.menu.ordered !== newSchedule[i].dinner.menu.ordered) {
        return true
      }
      return false
    })
    return res.length > 0
  }
}
