import { Box } from '@mui/material'
import { Accordion, Typography, Table } from '@fullscreendigital/carrefour-dex-fe'
import s from './ProductNearbyStockInfo.modules.scss'
import { NeighboursStock } from '../interfaces'

interface ProductNearbyStockInfoProps {
  neighboursStock: NeighboursStock[]
}

const ProductNearbyStockInfo: React.FC<ProductNearbyStockInfoProps> = props => {
  const { neighboursStock } = props

  return (
    <Box className={s.productTab}>
      <Box className={s.neighboursBox}>
        <Accordion
          summary={
            <Typography variant="medium">
              <span>Stock in magazine invecinate</span>
            </Typography>
          }
          details={
            <Box className={s.infoItems}>
              <Table
                columns={[
                  { title: 'Magazin', field: 'name', align: 'left' },
                  { title: 'Stoc', field: 'available', align: 'left' }
                ]}
                rows={neighboursStock}
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
  )
}

export default ProductNearbyStockInfo
