import s from '../../commonStyles.modules.scss'
import { Grid } from '@mui/material'
import { columns } from './helpers'
import { PrintPreviewTable } from 'components/core-ui/PrintPreviewTable'

const ProductionManagementPrint = () => {
  return (
    <div className={s.mainContainer}>
      <Grid container>
        <PrintPreviewTable
          action={{ url: '/bakery/region/cadentier', type: 'GET' }}
          columns={columns}
          showAbbrev
          hideCheckbox
        />
      </Grid>
    </div>
  )
}

export default ProductionManagementPrint
