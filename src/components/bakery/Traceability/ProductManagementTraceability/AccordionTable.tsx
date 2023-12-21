import { Accordion,  Typography } from '@fullscreendigital/carrefour-dex-fe'
import React, { HTMLAttributes } from 'react'
import { ImageCell } from '../../../core-ui/ImageCell'
import { Grid, styled } from '@mui/material'

export interface AccordionTableProps {
  columns: Column[];
  headerItems: Column[];
  tableItems: any[];
}

interface Column {
  render?: (data: any) => React.JSX.Element
  field: string
  title?: string
}
export const AccordionTable = ({ tableItems, headerItems, columns }: AccordionTableProps) => {
  const [expanded, setExpanded] = React.useState('')

  const handleChange = (key, value) => {
    setExpanded(value ? key : '')
  }

  return (
    <div style={{ display: 'grid', rowGap: '12px'}}>
      {tableItems.map((ti, tiIndex) => {
        return (
          <StyledAccordion
            key={tiIndex}
            expanded={expanded}
            onChange={handleChange}
            summary={
              <div style={{ display: 'flex', columnGap: '8px', alignItems: 'center' }}>
                <ImageCell imageUrl="test" value="" />
                <div style={{ display: 'grid', rowGap: '8px' }}>
                  <Typography
                    variant="medium"
                    style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      fontWeight: '700',
                      color: '#052351'
                    }}
                  >
                    Paine 7 seminte
                  </Typography>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {headerItems.map((hc, cIndex) => {
                      return (
                        <>
                          {hc.render ? hc.render(ti) : <HeaderItem name={hc.title} value={ti[hc.field]} />}
                        </>
                      )
                    })}
                  </div>
                </div>

              </div>
            }
            details={
              <Grid container spacing={2} columns={12}>
                {columns.map((c, cIndex) => {
                  return (
                    <>
                      {c.render ? c.render(ti) : <BodyItem name={c.title} value={ti[c.field]} />}
                    </>
                  )
                })}
              </Grid>
            }
          />
        )
      })}
    </div>
  )
}

const StyledAccordion = props => {
  const id = React.useId()

  return (
    <Accordion
      {...props}
      id={id}
      expanded={props.expanded === id}
      onChange={(e, v) => props.onChange(id, v)}
      style={{
        accordionStyle: {
          borderRadius: '8px',
          borderLeft: '4px solid  #0970E6',
          margin: '0 !important',
          padding: '12px 8px 12px 16px',
          '& .MuiAccordionSummary-root': {
            borderBottom: 'none !important'
          }
        },
        summeryStyle: {
          paddingInline: 0,
          '& .MuiAccordionSummary-content': {
            marginLeft: '0 !important'
          },
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateX(-136px)'
          }
        },
        detailsStyle: {
          padding: "8px",
          borderRadius: "8px",
          background: "rgba(5, 35, 81, 0.06)",
          boxSizing: "border-box"
        }
      }}
    />
  )
}

interface BodyItemProps extends HTMLAttributes<HTMLDivElement> {
  value: React.JSX.Element
  name: string
}

export const BodyItem = styled(({ className, name, value }: BodyItemProps) => {
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

export const HeaderItem = styled(({ className, name, value }: BodyItemProps) => {
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

