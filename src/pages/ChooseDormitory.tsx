import React from 'react';
import { Theme, WithStyles, withStyles, Typography, Card, CardActionArea, CardContent } from '@material-ui/core';

import { Dormitory, Wakabishi1, Wakabishi2, RiverHills } from '../types/dormitory'

const styles = (theme: Theme) => ({
  card: {},
  typeName: {}
})

class ChooseDormitory extends React.Component<WithStyles<typeof styles>> {
  card = (classes: Record<any, string>, dormitory: Dormitory) => (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography component='h3' variant='subtitle2' className={classes.typeName}>
            { dormitory.name }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
  render () {
    const { classes } = this.props
    return (
      <div>
        <Typography>
          現在の設定
        </Typography>
        { this.card(classes, Wakabishi1) }
        <Typography>
          寮を変更する場合は以下から選択してください
        </Typography>
        { this.card(classes, Wakabishi2) }
        { this.card(classes, RiverHills) }
      </div>
    )
  }
}

export default withStyles(styles)(ChooseDormitory)