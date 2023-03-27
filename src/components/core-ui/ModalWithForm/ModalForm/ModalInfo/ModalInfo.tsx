import * as React from 'react'
import { Box } from '@mui/material'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { FormInfoItems, FormEditItem } from './ModalInfoDefinitions'
import { get } from 'lodash'
import s from './ModalInfo.modules.scss'

const ModalInfo = ({
  formInfoItems,
  editItem
}: {
  formInfoItems: FormInfoItems[]
  editItem: FormEditItem[]
}) => {
  return (
    <Box className={s.list}>
      {formInfoItems.map(item => (
        <Box key={item.name} className={s.item}>
          <div className={s.label}>{item.label}:</div>
          <Typography component="div" variant="medium">{get(editItem, item.name)}</Typography>
        </Box>
      ))}
    </Box>
  )
}

export default ModalInfo
