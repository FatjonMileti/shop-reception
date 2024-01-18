import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import { ImageCell } from 'components/core-ui/ImageCell'
import { TableItem } from './interfaces'
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { DescriptionText } from 'components/core-ui/DescriptionText'

export const columns = [
  {
    title: 'Produs',
    field: 'productName',
    align: 'left',
    render: (row: TableItem) => (
      <Box>
        <ImageCell value={row.productName} imageUrl={row.imageUrl} />
      </Box>
    ),
    sticky: true,
    width: '200px'
  },
  {
    title: 'Cod METI',
    field: 'metiCode',
    align: 'left',
    width: '100px',
    sticky: true
  },

  {
    title: 'Cod EAN',
    field: 'eanCodes',
    align: 'left'
  },
  {
    title: 'Cod PLU',
    field: 'pluCode',
    align: 'left'
  },
  {
    title: 'Cod APPEL PRIX',
    field: 'appelCodes',
    align: 'left'
  },
  {
    title: 'Raion',
    field: 'familyModuleName',
    align: 'left'
  },
  {
    title: 'Familie',
    field: 'familyName',
    align: 'left'
  },
  {
    title: 'Subfamilie',
    field: 'subfamily',
    align: 'left'
  },
  {
    title: 'UB',
    field: 'unitBusiness',
    align: 'left'
  },
  {
    title: 'Status',
    field: 'status',
    align: 'left'
  },
  {
    title: 'Furnizor',
    field: 'provider',
    align: 'left'
  },
  {
    title: 'Metoda fabricatie',
    field: 'fabricationMethod',
    align: 'left',
    render: row => (
      <Box>
        <DescriptionText value={row.fabricationMethod} />      
      </Box>
    )
  },
  {
    title: 'Cluster',
    field: 'clusterName',
    align: 'left'
  },
  {
    title: 'Obligatoriu',
    align: 'left',
    render: (row: TableItem) => (
      <Box>
        <IconCell value={row.clusterMandatory ? 'active' : 'inactive'} />
      </Box>
    )
  },
  {
    title: 'Produs Cadentier',
    field: 'scheduleProduct',
    align: 'left',
    render: (row: TableItem) => (
      <Box>
        <IconCell value={row.scheduleProduct ? 'activ' : 'inactiv'} />
      </Box>
    )
  },
  {
    title: 'Stoc minim prezentare',
    field: 'minStock',
    align: 'left'
  },
  {
    title: 'Produs nou',
    field: 'newProduct',
    align: 'left',
    render: (row: TableItem) => (
      <Box>
        <IconCell value={row.newProduct ? 'activ' : 'inactiv'} />
      </Box>
    )
  }
]

export const drawerFilters = (familiesQuery, subfamiliesQuery) => [
  {
    name: 'family',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Familie"
        options={familiesQuery.data || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Familie',
    clearFiltersOnChange: ['subfamily']
  },
  {
    name: 'subfamily',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Subfamilie"
        options={subfamiliesQuery.data || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Subfamilie'
  },
  {
    name: 'scheduleProduct',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Produs cadentier"
        options={[
          { value: 'true', label: 'Da' },
          { value: 'false', label: 'Nu' }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Produs cadentier'
  },
]