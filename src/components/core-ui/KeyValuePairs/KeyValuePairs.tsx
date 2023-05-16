import * as React from 'react'
import { Grid } from '@mui/material'
import s from './KeyValuePairs.modules.scss'

const KeyValuePairs = ({ pairs, columns, className }) => {
  return (
    <Grid container rowSpacing={1} columnSpacing={4} className={className}>
      {pairs.map(({ key, value }) => (
        <Grid item xs={12} md={12 / columns} key={key}>
          <div className={s.item}>
            <span>{key}</span>
            <span>
              <strong>{value}</strong>
            </span>
          </div>
        </Grid>
      ))}
    </Grid>
  )
}

export default KeyValuePairs
