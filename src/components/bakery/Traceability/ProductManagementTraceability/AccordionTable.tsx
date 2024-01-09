import React, { HTMLAttributes } from 'react'
import { Grid, styled } from '@mui/material'

export const AccordionDetailsWrapper = styled('div')({
  padding: '8px',
  borderRadius: '8px',
  marginRight: '16px',
  background: 'rgba(5, 35, 81, 0.06)',
  boxSizing: 'border-box'
})

export const AccordionSummaryWrapper = styled('div')({
  display: 'flex',
  columnGap: '8px',
  alignItems: 'center',
  '.title-and-content-wrapper': {
    display: 'grid',
    rowGap: '8px',
    '.title': {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: '700',
      color: '#052351'
    },
    '.content-wrapper': {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    }
  }
})

export interface Column {
  render?: (data: any) => React.JSX.Element
  field: string
  title?: string
}

interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  value: React.JSX.Element
  name: string
}

export const BodyItem = styled(({ className, name, value }: ItemProps) => {
  return (
    <Grid item xs={12} md={3} lg={3} className={className}>
      <div className="body-item">
        <span className="item-name">{name}</span>
        <span className="item-value">{value}</span>
      </div>
    </Grid>
  )
})({
  '.body-item': {
    background: '#FFF',
    padding: '8px',
    borderRadius: '4px',
    display: 'grid',
    gridTemplateColumns: '152px auto',
    alignItems: 'center',
    columnGap: '8px',
    height: '100%',
    '.item-name': {
      fontFamily: 'Ubuntu',
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: 'normal',
      letterSpacing: '-0.48px'
    },
    '.item-value': {
      display: 'flex',
      color: '#004F9B',
      fontFamily: 'Ubuntu',
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '16px'
    }
  }
})

export const HeaderItem = styled(({ className, name, value }: ItemProps) => {
  return (
    <div className={`${className} header-item`}>
      <span className="item-name">{name}</span>
      <span className="item-value">{value}</span>
    </div>
  )
})({
  '&.header-item': {
    display: 'flex',
    columnGap: '4px',
    borderRadius: '2px',
    background: 'rgba(0, 79, 155, 0.15)',
    alignContent: 'center',
    alignItems: 'center',
    '.item-name': {
      paddingLeft: '4px',
      color: '#052351',
      fontSize: '10px',
      fontWeight: '400'
    },
    '.item-value': {
      background: '#004F9B',
      padding: '0 4px',
      borderRadius: '2px',
      color: '#FFF',
      fontSize: '12px',
      fontWeight: '700',
      lineHeight: '16px'
    }
  }
})
