import * as React from 'react'
import { Grid } from '@mui/material'

const KeyValuePairs = ({ pairs, columns }) => {
  return (
    <Grid container spacing={4}>
      {pairs.map(({ key, value }) => (
        <Grid item xs={12} md={columns} key={key}>
          <span>{key}</span>
          <span>
            <strong>{value}</strong>
          </span>
        </Grid>
      ))}
    </Grid>
  )
}

export default KeyValuePairs
