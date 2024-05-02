import { Box, Grid } from '@mui/material'
import s from './InfoItems.modules.scss'
import { useMemo } from 'react'

interface Item {
  label: string
  name: string
  render?: (item: Item) => React.JSX.Element
}

interface InfoItemsProps {
  items: Item[]
  itemsPerRow?: number
}

const InfoItems: React.FC<InfoItemsProps> = props => {
  const { items, itemsPerRow } = props

  const size = useMemo(() => (itemsPerRow ? 12 / itemsPerRow : 12), [itemsPerRow])

  console.log(items)

  return (
    <Grid container className={s.list} spacing={4}>
      {items.map((item: Item) => (
        <Grid item xs={size} key={item.label}>
          <Grid container>
            <Grid className={s.label} xs={6} item>
              {item.label}
            </Grid>
            <Grid className={s.value} xs={6} item title={item.name}>
              {item?.render ? item.render(item) : item.name}
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default InfoItems
