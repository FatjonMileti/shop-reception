import { Box } from '@mui/material'
import { ImageCell } from 'components/core-ui/ImageCell'

export const columns = [
  {
    title: 'Produs',
    field: 'productName',
    align: 'left',
    render: (row: any) => (
      <Box>
        <ImageCell value={row.productName} imageUrl={row.imageUrl} />
      </Box>
    ),
    width: '170px',
  },
  {
    title: 'Cod METI',
    field: 'metiCode',
    align: 'left',
    width: '150px',
  },

  {
    title: 'Familie',
    field: 'familyName',
    align: 'left',
    width: '150px'
  },
  {
    title: 'Cod familie',
    field: 'familyCode',
    align: 'left',
    width: '140px'
  },
  {
    title: 'Coeficient general',
    field: 'generalGrowth',
    align: 'left',
    width: '140px'
  },
  {
    title: 'Ultima actualizare',
    field: 'username',
    align: 'left',
    width: '140px'
  },
  {
    title: 'Ultima modificare',
    field: 'lastChange',
    align: 'left',
    width: '140px'
  },
  {
    title: 'Coeficient',
    field: 'growth',
    align: 'left',
    disableSorting: true,
    minWidth: '140px',
    isGroup: true,
  },
]

export const getInitialValues = editItem => ({
  id: editItem?.id ?? '',
  productName: editItem?.productName ?? '',
  imageUrl: editItem?.imageUrl ?? '',
  metiCode: editItem?.metiCode ?? '',
  familyCode: editItem?.familyCode ?? '',
  generalGrowth: editItem?.generalGrowth ?? '',
  username: editItem?.username ?? '',
  lastChange: editItem?.lastChange ?? '',
  map: editItem?.map ?? []
})