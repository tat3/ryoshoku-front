import React from 'react'
import { withStyles, Theme } from '@material-ui/core/styles';
import { WithStyles } from "@material-ui/core"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { DailySchedule } from '../types'

const styles = (theme: Theme) => ({
  card: {
    minwidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontsize: 14,
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
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            { menu.date }
          </Typography>
          <Typography variant="body2" component="p">
            朝食: { menu.breakfast.exists ? menu.breakfast.content : 'お休み'}
            <br />
            夕食: { menu.dinner.exists ? menu.dinner.content : 'お休み'}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(DailyMenu)