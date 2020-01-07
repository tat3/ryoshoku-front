import axios from 'axios'
import moment from 'moment'

import { MonthlySchedule, DailyScheduleApi, Menu, Order } from '../types'
import { isTodayOrFuture } from '../util'
import { Dormitory } from '../types/dormitory'
import { IUser } from '../types/user'

export interface IScheduleRepository {
  getStaticSchedule(isLoading: boolean): Promise<MonthlySchedule>,
  getUsersSchedule(user: IUser, dormitory: Dormitory): Promise<MonthlySchedule>,
}

export class ScheduleRepository implements IScheduleRepository {
  private orderFromMenu = (menu: Menu, loading: boolean): Order => ({ menu, isLoading: loading })

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

    return scheduleAll.filter(s => isTodayOrFuture(moment(s.date), now))
      .map(s => ({
        date: s.date,
        breakfast: this.orderWithUnloading(s.breakfast),
        dinner: this.orderWithUnloading(s.dinner)
      }))
  }
}
