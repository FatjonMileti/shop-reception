import { Box } from '@mui/material'
import React from 'react'
import s from './FormInfoItems.modules.scss'

interface FormItem {
  label: string
  name: string
  render?: (item: FormItem) => React.JSX.Element
}

interface FormInfoItemsProps {
  items: FormItem[]
}

const FormInfoItems: React.FC<FormInfoItemsProps> = props => {
  const { items } = props

  return (
    <Box className={s.list}>
      {items.map((item: FormItem) => (
        <Box key={item.name} className={s.item}>
          <Box className={s.label}>{item.label}</Box>
          <Box className={s.value} title={item.name}>
            {item?.render ? item.render(item) : item.name}
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default FormInfoItems
