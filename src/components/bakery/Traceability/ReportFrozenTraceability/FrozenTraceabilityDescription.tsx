import { Capsule } from 'components/core-ui/Capsule'
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { columns } from './helpers'
import { AccordionDetailsWrapper, BodyItem } from '../ProductManagementTraceability/AccordionTable'
import { formatBakeryPayloadDate } from 'utils/helpers'
import { Fragment } from 'react'
import { mainItemBodyColumns } from './helpers'

const FrozenTraceabilityDescription = ({ item, chargeItem }) => {
  const { traceabilityFrozenList, product } = item

  const bodyItemValue = (batchItem, frozenItem, columnField) => {
    const isBoolean =
      typeof frozenItem[columnField] === 'boolean'
        ? frozenItem[columnField] === true
          ? 'Da'
          : 'Nu'
        : frozenItem[columnField]
    const isDateField = ['entryDate', 'modifiedDate', 'verifiedDate']

    let value = isDateField.includes(columnField)
      ? formatBakeryPayloadDate(batchItem[columnField])
      : batchItem[columnField] || isBoolean
    return value
  }

  return (
    <Grid container flexDirection="column">
      <AccordionDetailsWrapper>
        <Grid container spacing={2} columns={12}>
          {mainItemBodyColumns.map((column, index) => {
            return (
              <Fragment key={index}>
                {column.render ? (
                  column.render(chargeItem)
                ) : (
                  <BodyItem name={column.title} value={chargeItem[column?.field]} />
                )}
              </Fragment>
            )
          })}
        </Grid>
      </AccordionDetailsWrapper>
      <Grid item my={1} mr={1}>
        {traceabilityFrozenList?.map(frozenItem => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              sx={{
                borderRadius: '15px',
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography fontWeight={600} mx={1}>
                  Lot MP / amb.:
                </Typography>

                <Typography fontWeight={600} color={'#004F9B'}>
                  {frozenItem.batch.batchName}
                </Typography>

                <Grid item my={0.5} mx={1}>
                  <Capsule
                    label="Cod METI"
                    value={frozenItem?.batch?.product?.metiCode}
                    valueColor={'#004f9b'}
                  />
                </Grid>

                <Grid item my={0.5} mr={1}>
                  <Capsule
                    label="Furnizor"
                    value={frozenItem.batch.supplier.supplierName}
                    valueColor={'#004f9b'}
                  />
                </Grid>

                <Grid item my={0.5} mr={1}>
                  <Capsule
                    label="Furnizor (Cod Meti)"
                    value={frozenItem?.batch?.supplier?.supplierCode}
                    valueColor={'#004f9b'}
                  />
                </Grid>

                <Grid item my={0.5} mr={1}>
                  <Capsule
                    label="Familie"
                    value={frozenItem?.batch?.product?.familyName}
                    valueColor={'#004f9b'}
                  />
                </Grid>

                <Grid item my={0.5} mr={1}>
                  <Capsule
                    label="Subfamilie"
                    value={frozenItem?.batch?.product?.subfamily}
                    valueColor={'#004f9b'}
                  />
                </Grid>

                {/*<Grid item my={0.5} mx={1}>*/}
                {/*  <Capsule label="Cant. fab." value={frozenItem.quantity} />*/}
                {/*</Grid>*/}
                {/*<Grid item my={0.5} mr={1}>*/}
                {/*  <Capsule label="UM" value={product.metricUnit} />*/}
                {/*</Grid>*/}

                {/*<Grid item my={0.5} mr={1}>*/}
                {/*  <Capsule label="Data intrare MP" value={'-'} />*/}
                {/*</Grid>*/}
                {/*<Grid item my={0.5} mr={1}>*/}
                {/*  <Capsule label="Furnizor MP" value={frozenItem.batch.supplier.supplierName} />*/}
                {/*</Grid>*/}
                {/*<Grid item my={0.5} mr={1}>*/}
                {/*  <Capsule label="Cant. fab./lot" value={frozenItem.batch.batchQuantity} />*/}
                {/*</Grid>*/}
                {/*<Grid item my={0.5} mr={1}>*/}
                {/*  <Capsule label="DLC sec. MP" value={'-'} />*/}
                {/*</Grid>*/}
                {/*<Grid item my={0.5} mr={1}>*/}
                {/*  <Capsule label="DLC MP" value={formatBakeryPayloadDate(frozenItem.dlc)} />*/}
                {/*</Grid>*/}
                {/*<Grid item my={0.5} mr={1}>*/}
                {/*  <Capsule label="Operator trasab." value={'-'} />*/}
                {/*</Grid>*/}
                {/*<Grid item my={0.5} mr={1}>*/}
                {/*  <Capsule*/}
                {/*    label="Data introducere"*/}
                {/*    value={formatBakeryPayloadDate(frozenItem.openingDate)}*/}
                {/*  />*/}
                {/*</Grid>*/}
                {/*<Grid item my={0.5} mr={1}>*/}
                {/*  <Capsule label="Ultima modificare" value={'-'} />*/}
                {/*</Grid>*/}
                {/*<Grid item my={0.5} mr={1}>*/}
                {/*  <Capsule*/}
                {/*    label="Data ultimei modificari"*/}
                {/*    value={formatBakeryPayloadDate(frozenItem.batch.modifiedDate)}*/}
                {/*  />*/}
                {/*</Grid>*/}
              </Grid>
            </AccordionSummary>

            <AccordionDetails>
              <AccordionDetailsWrapper>
                <Grid container spacing={2} columns={12}>
                  {columns.map((column, index) => {
                    return (
                      <Fragment key={index}>
                        {column.render ? (
                          column.render(frozenItem, chargeItem)
                        ) : (
                          <BodyItem name={column.title} value={chargeItem[column?.field]} />
                        )}
                      </Fragment>
                    )
                  })}
                </Grid>
              </AccordionDetailsWrapper>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
    </Grid>
  )
}

export default FrozenTraceabilityDescription
