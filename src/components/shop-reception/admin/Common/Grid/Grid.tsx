import React, { useMemo, ComponentType } from 'react'
import { Grid as GeneralGrid, Box, Paper } from '@mui/material'
import { GridProps } from './GridDefinitions'
import s from './Grid.modules.scss'

const Grid: React.FC<GridProps> = (props: GridProps) => {
  const { items, itemsPerRow, hasPaper, style, gridContainerStyle, ...rest } = props
  const gridSize = useMemo(() => (itemsPerRow ? 12 / itemsPerRow : 6), [itemsPerRow])
  const WrapperComponent: ComponentType<any> = hasPaper ? Paper : Box

  return (
    <WrapperComponent className={hasPaper ? s.paperContainer : s.gridContainer} style={gridContainerStyle}>
      <GeneralGrid {...rest} container spacing={4} style={style}>
        {items.map(item => (
          <GeneralGrid item xs={12} md={gridSize} key={item.id}>
            {item}
          </GeneralGrid>
        ))}
      </GeneralGrid>
    </WrapperComponent>
  )
}

export default Grid
