import { Box, Typography } from '@mui/material'
import { Table, Accordion } from '@fullscreendigital/carrefour-dex-fe'
import s from './ProductNearbyStockInfo.modules.scss'
import { NeighboursStock } from '../interfaces'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ProductNearbyStockInfoProps {
  neighboursStock: NeighboursStock[]
}

const ProductNearbyStockInfo: React.FC<ProductNearbyStockInfoProps> = props => {
  const { neighboursStock } = props

  return (
    <Box className={s.productTab} style={{marginLeft:0, marginRight:0, borderRadius:'8px'}}>
      <Box className={s.neighboursBox}>
        <Accordion
          summary={
            <Typography variant="medium">
              <span>Stoc in magazine invecinate</span>
            </Typography>
          }
          details={
            <Box className={s.infoItems}>
              <Table
                columns={[
                  { title: 'Magazin', field: 'name', align: 'left', disableSorting: true },
                  { title: 'Stoc', field: 'available', align: 'left', disableSorting: true }
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
