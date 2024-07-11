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
      <Typography variant='medium' component='h5'>{props.truck.truckNumber}  {props.truck.transportCode || props.truck.driverName}</Typography>
      <Typography variant='medium' component='p'>{props.truck.shopNamesAndCodes} </Typography>
      <Typography variant='medium' component='p'>{props.truck.depositName}  {props.truck.hubName}</Typography>
      {props.truck.depositOrHubName && <Typography variant="medium" component="p">{props.truck.depositOrHubName}</Typography>}
      {props.truck.seals && <Typography variant='medium' component='p'>Sigiliu (sigilii):  {props.truck.seals}</Typography>}
      {props.truck.ticketNumbers && <Typography variant="medium" component="p">BL: {props.truck.ticketNumbers}</Typography>}
      <Typography variant='medium' component='p'>{props.truck.registeredDate || props.truck.loadingDate || props.truck.created}</Typography>
      {props.truck.supportCounter !== undefined && props.truck.supportCounter !== null && (
        <Typography variant="medium" component="p">Suporți verificați: {props.truck.supportCounter} / {props.truck.totalSupportNumber}</Typography>
      )}
    </Paper>
  )
}
export default TruckCard
