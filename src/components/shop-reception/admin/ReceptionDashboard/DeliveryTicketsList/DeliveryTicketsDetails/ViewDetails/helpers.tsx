import { Autocomplete, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import dayjs from 'dayjs'
import { formatUIDate } from 'utils/helpers'

export const columns = [
  {
    title: 'Numar comanda (INFOLOG)',
    field: 'externalOrderId',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'Numar comanda origine',
    field: 'originalOrderId',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'Cod suport',
    field: 'supportCode',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Eticheta suport',
    field: 'heterogeneousCode',
    align: 'left',
    type: 'string',
    width: '150px',
    disableSorting: true
  },
  {
    title: 'Tip suport asteptat',
    field: 'expectedSupportType',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'Tip ambalaj secundar asteptat',
    field: 'secondarySupportType',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'Status receptie suport',
    field: 'supportStatus',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'Cod EAN',
    field: 'eanCode',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'EAN receptionat',
    field: 'eanReceived',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'Cod produs',
    field: 'productCode',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'Nume produs',
    field: 'productName',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'Prioritar vanzare',
    field: 'priorityForSale',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true,
    render: row => (
      <Box>
        <IconCell value={row.priorityForSale ? 'activ' : 'inactiv'} />
      </Box>
    )
  },
  {
    title: 'Unitate de masura',
    field: 'measureUnit',
    align: 'left',
    type: 'string',
    disableSorting: true,
    width: '120px'
  },
  {
    title: 'Cantitate asteptata pe suport',
    field: 'deliveredQuantity',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'Cantitate asteptata in comanda',
    field: 'totalDeliveredQuantity',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'Cantitate receptionata calitativa',
    field: 'qualitativeQuantity',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'Cantitate receptionata deteriorata',
    field: 'defectQuantity',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'Diferenta',
    field: 'missingQuantity',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'Motiv defectiune',
    field: 'defectReason',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'Tip scanare recomandat',
    field: 'recommendedScanType',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'Tip scanare suport',
    field: 'scanType',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'Numar colete asteptate',
    field: 'secondarySupportNumber',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'Produs cu DLC scurt',
    field: 'shortDlc',
    align: 'left',
    type: 'string',
    width: '120px',
    render: row => (
      <Box>
        <IconCell value={row.shortDlc ? 'activ' : 'inactiv'} />
      </Box>
    ),
    disableSorting: true
  },
  {
    title: 'Data limita de consum asteptata',
    field: 'dlcDate',
    align: 'left',
    type: 'string',
    width: '120px',
    render: row => formatUIDate(row.dlcDate),
    disableSorting: true
  },
  {
    title: 'Data limita de consum receptionata',
    field: 'dlcDateExcel',
    align: 'left',
    type: 'string',
    width: '120px',
    render: row => formatUIDate(row.dlcDateExcel),
    disableSorting: true
  },
  {
    title: 'Lot',
    field: 'batch',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'Produs sensibil',
    field: 'sensitive',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true,
    render: row => (
      <Box>
        <IconCell value={row.sensitive ? 'activ' : 'inactiv'} />
      </Box>
    )
  },
  {
    title: 'Produs verificat',
    field: 'verified',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true,
    render: row => (
      <Box>
        <IconCell value={row.verified ? 'activ' : 'inactiv'} />
      </Box>
    )
  },
  {
    title: 'Produs lipsa',
    field: 'missing',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true,
    render: row => (
      <Box>
        <IconCell value={row.missing ? 'activ' : 'inactiv'} />
      </Box>
    )
  },
  {
    title: 'Magazin',
    field: 'shopName',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'Data receptie',
    field: 'receptionDate',
    align: 'left',
    type: 'string',
    width: '120px',
    render: row => formatUIDate(row.receptionDate),
    disableSorting: true
  },
  {
    title: 'Procent valabilitate',
    field: 'validityPercentage',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true
  },
  {
    title: 'Produs cu SGR',
    field: 'sgr',
    align: 'left',
    type: 'string',
    width: '120px',
    disableSorting: true,
    render: row => (
      <Box>
        <IconCell value={row.sgr ? 'activ' : 'inactiv'} />
      </Box>
    )
  }
]

export const drawerFilters = (shopCodes, filters) => [
  {
    name: 'shopCode',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează magazin"
        disableClearable
        options={shopCodes || []}
      />
    ),
    type: 'autocomplete',
    label: 'Selectează magazin'
  },

  {
    name: 'supportCode',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza cod suport"
        disableClearable
        options={filters.supportCode || []}
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza cod suport'
  },

  {
    name: 'externalOrderId',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza comanda"
        disableClearable
        options={filters.externalOrderId || []}
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza comanda'
  },

  {
    name: 'originalOrderId',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza comanda originala"
        disableClearable
        options={filters.originalOrderId || []}
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza comanda originala'
  },
  {
    name: 'productCode',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza produs"
        disableClearable
        options={filters.productCode || []}
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza produs'
  },
  {
    name: 'sensitive',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza sensibil"
        disableClearable
        options={[
          { value: 'true', label: 'Da' },
          { value: 'false', label: 'Nu' }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza sensibil'
  },
  {
    name: 'missing',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza produs lipsa"
        disableClearable
        options={[
          { value: 'true', label: 'Da' },
          { value: 'false', label: 'Nu' }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza produs lipsa'
  },
  {
    name: 'verified',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza produs verificat"
        disableClearable
        options={[
          { value: 'true', label: 'Da' },
          { value: 'false', label: 'Nu' }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza produs verificat'
  },
  {
    name: 'shortDlc',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza DLC scurt"
        disableClearable
        options={[
          { value: 'true', label: 'Da' },
          { value: 'false', label: 'Nu' }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza DLC scurt'
  },
  {
    name: 'priorityForSale',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza prioritar vanzare"
        disableClearable
        options={[
          { value: 'true', label: 'Da' },
          { value: 'false', label: 'Nu' }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza prioritar vanzare'
  },
  {
    name: 'shortLifetime',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza procentul de valabilitate"
        disableClearable
        options={[
          { value: 'true', label: 'Da' },
          { value: 'false', label: 'Nu' }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza procentul de valabilitate'
  },
  {
    name: 'sgr',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza SGR"
        disableClearable
        options={[
          { value: 'true', label: 'Da' },
          { value: 'false', label: 'Nu' }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza SGR'
  }
]
