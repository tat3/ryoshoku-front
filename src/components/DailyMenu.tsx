import React from 'react'
import { withStyles, Theme } from '@material-ui/core/styles';
import { WithStyles, Button } from "@material-ui/core"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
import classNames from 'classnames'

import { DailySchedule, Menu, BREAKFAST, DINNER } from '../types'
import { SPACE } from '../defaultStyles'
import { jaWeekday } from '../util'
import { CSSProperties } from '@material-ui/core/styles/withStyles';

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
  menuMain: {
    marginTop: 2,
    lineHeight: '1.2em'
  },
  menuSub: {
    marginTop: 8,
    lineHeight: '1.2em'
  },
  right: {
    marginLeft: theme.spacing(SPACE)
  },
  orderButton: {
    padding: 0,
    position: 'relative',
    bottom: 40,
    left: 12,
  } as CSSProperties,
})

interface Props extends WithStyles<typeof styles>{
  menu: DailySchedule,
}

class DailyMenu extends React.Component<Props> {
  card = (classes: Record<any, string>, menu: Menu, type: string) => (
    <Card className={classes.card}>
      <CardContent>
        <Typography component='h3' variant='subtitle2' className={classes.typeName} style={{fontWeight: 'bold'}}>
          { type === BREAKFAST ? '朝食' : '夕食' }
        </Typography>
        <Typography component="p" variant="subtitle1" className={classes.menuMain}>
          { menu.exists ? menu.content : 'お休み'}
        </Typography>
        { menu.exists ? menu.contents.subs.filter(s => !['ご飯', 'ご飯orパン', '野菜サラダ', '味噌汁'].includes(s)).map((sub, i) => (
          <Typography component="p" variant="body2" color="textSecondary" className={classes.menuSub} key={i}>
            { sub }
          </Typography>
        )) : ''}
      </CardContent>
    </Card>
  )

  breakfast = (classes: Record<any, string>, daily: DailySchedule) => this.card(classes, daily.breakfast.menu, BREAKFAST)
  dinner = (classes: Record<any, string>, daily: DailySchedule) => this.card(classes, daily.dinner.menu, DINNER)
  orderStatus = (classes: Record<any, string>, menu: Menu) => {
    return menu.ordered === null ?
      <Button className={classes.orderButton}> </Button> :
      <Button className={classes.orderButton} variant='outlined' color='primary'>
        { menu.ordered ? '喫食' : '欠食' }
      </Button>
    }


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
            { this.orderStatus(classes, menu.breakfast.menu) }
          </div>
          <div className={classNames(classes.cardContainer, classes.right)}>
            { this.dinner(classes, menu) }
            { this.orderStatus(classes, menu.dinner.menu) }
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(DailyMenu)