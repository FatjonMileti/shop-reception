import React, { useMemo, ComponentType } from 'react'
import { Grid as GeneralGrid, Container, Paper } from '@mui/material'
import { GridProps } from './GridDefinitions'
import s from './Grid.modules.scss'

const Grid: React.FC<GridProps> = (props: GridProps) => {
  const { items, itemsPerRow, spacing, hasPaper, style, gridContainerStyle, maxWidth, ...rest } = props
  const gridSize = useMemo(() => (itemsPerRow ? 12 / itemsPerRow : 6), [itemsPerRow])
  const WrapperComponent: ComponentType<any> = hasPaper ? Paper : Container

  return (
    <WrapperComponent className={hasPaper ? s.paperContainer : s.gridContainer} style={gridContainerStyle} maxWidth={maxWidth ?? 'xxl'}>
      <GeneralGrid {...rest} container spacing={spacing ?? 4} style={style}>
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
