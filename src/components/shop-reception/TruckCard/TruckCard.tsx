import { Paper } from '@mui/material'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import React from 'react'

interface TruckCardProp {
  truck: Truck
  onClick: () => void
}

const TruckCard: React.FC<TruckCardProp> = (props) => {
  return (
    <Paper elevation={3} style={{ margin: '10px', padding: '20px' }} onClick={props.onClick}>
      <Typography variant='medium' component='h5'>{props.truck.name}</Typography>
      <Typography variant='medium' component='p'>{props.truck.description}</Typography>
    </Paper>
  )
}
export default TruckCard