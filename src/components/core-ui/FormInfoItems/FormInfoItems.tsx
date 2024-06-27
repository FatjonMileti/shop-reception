import { Box } from '@mui/material'
import React from 'react'
import s from './FormInfoItems.modules.scss'

interface FormItem {
  label: string
  name: string
  labelStyle?: any
  valueStyle?: any
  render?: (item: FormItem) => React.JSX.Element
}

interface FormInfoItemsProps {
  items: FormItem[]
  style?: React.CSSProperties
}

const FormInfoItems: React.FC<FormInfoItemsProps> = props => {
  const { items, style } = props

  return (
    <Box className={s.list} style={style}>
      {items.map((item: FormItem) => (
        <Box key={item.name} className={s.item}>
          <Box className={s.label} style={item.labelStyle || {}}>
            {item.label}
          </Box>
          <Box className={s.value} title={item.name} style={item.valueStyle || {}}>
            {item?.render ? item.render(item) : item.name}
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default FormInfoItems
