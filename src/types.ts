
export type Menu = {
  exists: boolean,
  content: string,
  contents: {
    main: string,
    subs: string[]
  },
  ordered: boolean | null,
}

export type Order = {
  menu: Menu,
  isLoading: boolean,
}

export type DailySchedule = {
  date: string,
  breakfast: Order, 
  dinner: Order,
}

export type DailyScheduleApi = {
  date: string,
  breakfast: Menu,
  dinner: Menu,
}

export type MonthlySchedule = DailySchedule[]

export const BREAKFAST = 'BREAKFAST'
export const DINNER = 'DINNER'