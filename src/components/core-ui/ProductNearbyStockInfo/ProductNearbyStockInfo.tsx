import { useSelector } from 'react-redux'
import { RootState } from 'configureStore'
import { Paper, Box } from '@mui/material'
import { Accordion, Typography, Table } from '@fullscreendigital/carrefour-dex-fe'
import { KeyValuePairs } from 'components/core-ui/KeyValuePairs'
import { toProductStockKeyValuePairs } from 'utils/serializers'
import s from './ProductNearbyStockInfo.modules.scss'

const ProductNearbyStockInfo = props => {
  const { title, infoItems } = props

  const product = useSelector((state: RootState) => state.product)

  return product.title ? (
    <Box className={s.productTab}>
      <Box className={s.neighboursBox}>
        <Accordion
          summary={
            <Typography variant="medium">
              <span>{title}</span>
            </Typography>
          }
          details={
            <Box className={s.infoItems}>
              <Table
                columns={[
                  { title: 'Magazin', field: 'name', align: 'left' },
                  { title: 'Stoc', field: 'available', align: 'left' }
                ]}
                rows={product.neighboursStock}
                isLoading={false}
                hideCheckbox
                disablePagination
              />
            </Box>
          }
          defaultExpanded
          onChange={function noRefCheck() {}}
        />
      </Box>
    </Box>
  ) : null
}

export default ProductNearbyStockInfo
