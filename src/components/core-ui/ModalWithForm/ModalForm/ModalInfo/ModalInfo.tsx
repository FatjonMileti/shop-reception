import * as React from 'react'
import { Box } from '@mui/material'
import { FormInfoItems, FormEditItem } from './ModalInfoDefinitions'
import { get } from 'lodash'
import s from './ModalInfo.modules.scss'
import { renderComponent } from 'utils/dynamicRenderingService'

const ModalInfo = ({
  formInfoItems,
  editItem
}: {
  formInfoItems: FormInfoItems[]
  editItem: FormEditItem
}) => {
  return (
    <Box className={s.list}>
      {formInfoItems.map(item => {
        const itemValue = get(editItem, item.name) || '-'
        return (
          <Box key={item.name} className={s.item}>
            <div className={s.label}>{item.label}:</div>
            {item.render ? (
              <div className={s.value}>{renderComponent({ ...item.render, value: itemValue })}</div>
            ) : (
              <div className={s.value} title={itemValue}>
                {itemValue}
              </div>
            )}
          </Box>
        )
      })}
    </Box>
  )
}

export default ModalInfo
