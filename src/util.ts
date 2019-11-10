import moment from 'moment'

const jaWeekday = (day: number) => ['日', '月', '火', '水', '木', '金', '土'][day]

const isTodayOrFuture = (date: moment.Moment, today: moment.Moment) => {
  const todayClone = today.clone()
  todayClone
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
  return date.isSameOrAfter(todayClone)
}

export { jaWeekday, isTodayOrFuture }