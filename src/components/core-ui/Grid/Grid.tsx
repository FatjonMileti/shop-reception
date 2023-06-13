import { useMemo } from 'react'
import { Grid as GeneralGrid, Box } from '@mui/material'
import { renderComponent } from 'utils/dynamicRenderingService'
import { GridProps } from './GridDefinitions'
import s from './Grid.modules.scss'

const Grid = (props: GridProps) => {
  const { items, itemsPerRow, ...rest } = props

  const gridSize = useMemo(() => (itemsPerRow ? 12 / itemsPerRow : 6), [itemsPerRow])

  return (
    <Box className={s.gridContainer}>
      <GeneralGrid {...rest} container spacing={4}>
        {items.map(item => (
          <GeneralGrid item xs={12} md={gridSize} key={item.id}>
            {renderComponent(item)}
          </GeneralGrid>
        ))}
      </GeneralGrid>
    </Box>
  )
}

export default Grid
