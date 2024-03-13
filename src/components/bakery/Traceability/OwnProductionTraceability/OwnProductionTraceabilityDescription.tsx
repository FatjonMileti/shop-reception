import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { columns, infoColumns, toTableRowItems } from './helpers'
import { AccordionDetailsWrapper, BodyItem } from '../ProductManagementTraceability/AccordionTable'
import { Fragment } from 'react'
import { Table } from '@fullscreendigital/carrefour-dex-fe'

const OwnProductionTraceabilityDescription = ({ item }) => {
  const { traceabilityProductionList } = item

  return (
    <Grid container flexDirection="column">
      <AccordionDetailsWrapper>
        <Grid container spacing={2} columns={12}>
          <Grid item my={1}>
            <Table
              hideCheckbox={true}
              isLoading={false}
              columns={columns}
              rows={toTableRowItems(traceabilityProductionList)}
              disablePagination
            />
            <Grid container spacing={2} columns={12} mt={1}>
              {infoColumns.map((column, index) => {
                return (
                  <Fragment key={index}>
                    {column.render ? (
                      column.render(item)
                    ) : (
                      <BodyItem name={column.title} value={item?.[column.field] || ''} />
                    )}
                  </Fragment>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetailsWrapper>

      <Grid item my={1}>
        {traceabilityProductionList.map((productionItem, pIndex) => (
          <Fragment key={pIndex}>
            {productionItem.childTraceability ? (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="description-content"
                  id="description-header"
                  sx={{
                    borderRadius: '15px',
                    marginTop: '10px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography fontWeight={600} color={'#004F9B'}>
                      {productionItem.componentCode}
                    </Typography>
                    <Typography fontWeight={600} mx={1}>
                      {productionItem.componentName}
                    </Typography>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <OwnProductionTraceabilityDescription item={productionItem.childTraceability} />
                </AccordionDetails>
              </Accordion>
            ) : null}
          </Fragment>
        ))}
      </Grid>
    </Grid>
  )
}

export default OwnProductionTraceabilityDescription
