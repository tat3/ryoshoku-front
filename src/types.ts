
export type Menu = {
  exists: boolean,
  content: string
}

export type DailySchedule = {
  date: string,
  breakfast: Menu, 
  dinner: Menu
}

export type MonthlySchedule = DailySchedule[]

