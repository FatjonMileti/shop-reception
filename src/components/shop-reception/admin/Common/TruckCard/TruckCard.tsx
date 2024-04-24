import { Paper } from '@mui/material'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import React from 'react'

interface TruckCardProp {
  truck: any
  onClick: () => void
}

const TruckCard: React.FC<TruckCardProp> = (props) => {
  return (
    <Paper elevation={3} style={{ margin: '10px', padding: '20px' }} onClick={props.onClick}>
      <Typography variant='medium' component='h5'>{props.truck.truckNumber}  {props.truck.transportCode}</Typography>
      <Typography variant='medium' component='p'>{props.truck.depositName}  {props.truck.hubName}</Typography>
      {props.truck.seals && <Typography variant='medium' component='p'>Sigiliu (sigilii):  {props.truck.seals}</Typography>}
      <Typography variant='medium' component='p'>BL: {props.truck.ticketNumbers}</Typography>
      <Typography variant='medium' component='p'>{props.truck.registeredDate}</Typography>
    </Paper>
  )
}
export default TruckCard
