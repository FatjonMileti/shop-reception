import { useSelector } from 'react-redux'
import { RootState } from 'configureStore'
import { Paper, Box } from '@mui/material'
import { Accordion, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { KeyValuePairs } from 'components/core-ui/KeyValuePairs'
import { toProductStockKeyValuePairs } from 'utils/serializers'
import s from './ProductNearbyStockInfo.modules.scss'

const ProductNearbyStockInfo = props => {
  const { title, infoItems } = props

  const product = useSelector((state: RootState) => state.product)

  return product.title ? (
    <Box className={s.productTab}>
      <Box className={s.title}>{title}</Box>
      {/* <Paper className={s.productTab}>
        <Box className={s.neighboursBox}> */}
      <Box className={s.neighboursBox}>
        {product.neighboursStock.map(stock => (
          <Accordion
            key={stock.name}
            summary={
              <Typography variant="medium">
                <span>{stock.name}</span>
              </Typography>
            }
            details={
              <Box className={s.infoItems}>
                <KeyValuePairs
                  pairs={toProductStockKeyValuePairs(infoItems, stock)}
                  columns={2}
                  className={s.stockInfo}
                />
              </Box>
            }
            // disableGutters
            defaultExpanded
            id={stock.name}
            onChange={function noRefCheck() {}}
          />
        ))}
      </Box>
      {/* </Box>
      </Paper> */}
    </Box>
  ) : null
}

export default ProductNearbyStockInfo
