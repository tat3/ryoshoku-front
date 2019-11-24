import React from 'react'
import { withStyles, Theme } from '@material-ui/core/styles';
import { WithStyles, CardActionArea } from "@material-ui/core"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
import classNames from 'classnames'

import { DailySchedule, Menu, BREAKFAST, DINNER } from '../types'
import { SPACE } from '../defaultStyles'
import { jaWeekday } from '../util'

const styles = (theme: Theme) => ({
  menuContainer: {
    display: 'flex'
  },
  cardContainer: {
    width: '50%',
    minHeight: '100%'
  },
  card: {
    minHeight: '100%'
  },
  typeName: {
  },
  day: {
    fontsize: 14,
  },
  sunday: {
    color: 'rgba(255,0,0,0.6)',
  },
  saturday: {
    color: 'rgba(0,0,255,0.6)',
  },
  weekday: {
    color: 'rgba(0,0,0,0.6)',
  },
  menu: {
    marginTop: 2,
  },
  right: {
    marginLeft: theme.spacing(SPACE)
  }
})

interface Props extends WithStyles<typeof styles>{
  menu: DailySchedule,
}

class DailyMenu extends React.Component<Props> {
  card = (classes: Record<any, string>, menu: Menu, type: string) => (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography component='h3' variant='subtitle2' className={classes.typeName} style={{fontWeight: 'bold'}}>
            { type === BREAKFAST ? '朝食' : '夕食' }
          </Typography>
          <Typography component="p" variant="subtitle1" className={classes.menu}>
            { menu.exists ? menu.content : 'お休み'}
          </Typography>
          { menu.exists ? menu.contents.subs.map(sub => (
            <Typography component="p" variant="body2" color="textSecondary" className={classes.menu}>
              { sub }
            </Typography>
          )) : ''}
        </CardContent>
      </CardActionArea>
    </Card>
  )

  breakfast = (classes: Record<any, string>, daily: DailySchedule) => this.card(classes, daily.breakfast, BREAKFAST)
  dinner = (classes: Record<any, string>, daily: DailySchedule) => this.card(classes, daily.dinner, DINNER)

  render () {
    const classes = this.props.classes
    const menu = this.props.menu
    const date = moment(menu.date)
    const day = date.day()
    const dayColor = day === 0 ? classes.sunday :
                     day === 6 ? classes.saturday : classes.weekday

    return (
      <div>
        <Typography className={classNames(dayColor, day)}
         gutterBottom component='h2'>
          { date.format('MM/DD') }({ jaWeekday(date.day()) })
        </Typography>
        <div className={classes.menuContainer}>
          <div className={classes.cardContainer}>
            { this.breakfast(classes, menu) }
          </div>
          <div className={classNames(classes.cardContainer, classes.right)}>
            { this.dinner(classes, menu) }
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(DailyMenu)