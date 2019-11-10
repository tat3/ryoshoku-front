import React from 'react'
import { withStyles, Theme } from '@material-ui/core/styles';
import { WithStyles, CardActionArea } from "@material-ui/core"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'

import { DailySchedule } from '../types'
import { jaWeekday } from '../util'

const title = {
  fontsize: 14
}

const styles = (theme: Theme) => ({
  card: {
    minwidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  sundayTitle: {
    color: 'rgba(255,0,0,0.6)',
    ...title
  },
  saturdayTitle: {
    color: 'rgba(0,0,255,0.6)',
    ...title
  },
  weekdayTitle: {
    color: 'rgba(0,0,0,0.6)',
    ...title
  },
  pos: {
    marginbottom: 12,
  },
})

interface Props extends WithStyles<typeof styles>{
  menu: DailySchedule,
}

class DailyMenu extends React.Component<Props> {
  render () {
    const classes = this.props.classes
    const menu = this.props.menu
    const date = moment(menu.date)
    const day = date.day()
    console.log(day)
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography className={
              day === 0 ? classes.sundayTitle :
              day === 1 ? classes.saturdayTitle : classes.weekdayTitle
              } gutterBottom>
              { date.format('MM/DD') }({ jaWeekday(date.day()) })
            </Typography>
            <Typography variant="body2" component="p">
              朝食: { menu.breakfast.exists ? menu.breakfast.content : 'お休み'}
              <br />
              夕食: { menu.dinner.exists ? menu.dinner.content : 'お休み'}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
}

export default withStyles(styles)(DailyMenu)