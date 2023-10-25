import { Box } from '@mui/material'
import React from 'react'
import styles from './FormInfoItems.modules.scss'

interface FormItem {
  label: string
  name: string
}

interface FormInfoItemsProps {
  items: FormItem[]
}

const FormInfoItems: React.FC<FormInfoItemsProps> = props => {
  const { items } = props

  return (
    <Box className={styles.list}>
      {items.map((item: FormItem) => (
        <Box key={item.name} className={styles.item}>
          <Box className={styles.label}>{item.label}</Box>
          <Box className={styles.value} title={item.name}>
            {item.name}
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default FormInfoItems
