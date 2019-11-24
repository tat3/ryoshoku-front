
export type Menu = {
  exists: boolean,
  content: string,
  contents: {
    main: string,
    subs: string[]
  }
}

export type DailySchedule = {
  date: string,
  breakfast: Menu, 
  dinner: Menu
}

export type MonthlySchedule = DailySchedule[]

export const BREAKFAST = 'BREAKFAST'
export const DINNER = 'DINNER'