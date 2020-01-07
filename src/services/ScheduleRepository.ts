import axios from 'axios'
import moment from 'moment'

import { MonthlySchedule, DailyScheduleApi, Menu } from '../types'
import { isTodayOrFuture } from '../util'
import { Dormitory } from '../types/dormitory'
import { IUser } from '../types/user'

export class ScheduleRepository {
  private orderWithLoading = (menu: Menu) => {
    return {
      menu,
      isLoading: true,
    }
  }

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
        breakfast: this.orderWithLoading(s.breakfast),
        dinner: this.orderWithLoading(s.dinner)
      }))
  }

  getStaticScheduleWithLoading = async (): Promise<MonthlySchedule> => {
    const now = moment()
    const scheduleAll: DailyScheduleApi[] = (await axios.get('/menu.json')).data
    return scheduleAll.filter(s => isTodayOrFuture(moment(s.date), now))
      .map(s => ({
        date: s.date,
        breakfast: this.orderWithLoading(s.breakfast),
        dinner: this.orderWithLoading(s.dinner)
      }))
  }

  getStaticScheduleWithUnloading = async (): Promise<MonthlySchedule> => {
    const now = moment()
    const scheduleAll: DailyScheduleApi[] = (await axios.get('/menu.json')).data
    return scheduleAll.filter(s => isTodayOrFuture(moment(s.date), now))
      .map(s => ({
        date: s.date,
        breakfast: this.orderWithLoading(s.breakfast),
        dinner: this.orderWithLoading(s.dinner)
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

    return scheduleAll.filter(s => isTodayOrFuture(moment(s.date), now))
      .map(s => ({
        date: s.date,
        breakfast: this.orderWithUnloading(s.breakfast),
        dinner: this.orderWithUnloading(s.dinner)
      }))
  }
}
