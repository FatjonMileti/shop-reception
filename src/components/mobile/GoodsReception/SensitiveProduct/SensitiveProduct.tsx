import { Paper } from '@mui/material'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import React from 'react'

const SensitiveProduct = (props: { onClick: () => void, item: SensitiveProduct }) => {
  return <Paper elevation={3} style={{ margin: '10px', padding: '20px' }} onClick={props.onClick}>
    <Typography variant='medium' component='h5'>Etichetă suport: {props.item.UbCode}</Typography>
    <Typography variant='medium' component='h5'>Număr suport: {props.item.productCode}</Typography>
    <Typography variant='medium' component='h5'>BL: {props.item.storeCode}</Typography>
    <Typography variant='medium' component='h5'>15-12-2023 21:48</Typography>
  </Paper>
}

export default SensitiveProduct