import { Autocomplete, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import dayjs from 'dayjs'
import { formatUIDate } from 'utils/helpers'

export const columns = markAsResolved => [
  {
    title: 'Depozit',
    field: 'depositName',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Magazin',
    field: 'shopName',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Cod produs',
    field: 'productCode',
    align: 'left',
    type: 'string',
    disableSorting: true,
    width: '100px'
  },
  {
    title: 'Denumire produs',
    field: 'productName',
    align: 'left',
    type: 'string',
    width: '100px'
  },

  {
    title: 'EAN produs',
    field: 'productEan',
    align: 'left',
    type: 'string',
    disableSorting: true,
    width: '100px'
  },
  {
    title: 'Cantitate calitativă',
    field: 'validatedQuantity',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Cantitate defectǎ',
    field: 'brokenQuantity',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Motiv defectiune',
    field: 'defectReason',
    align: 'left',
    type: 'string',
    disableSorting: true,
    width: '100px'
  },
  {
    title: 'Cod support',
    field: 'externalSupportCode',
    align: 'left',
    type: 'string',
    disableSorting: true,
    width: '100px'
  },
  {
    title: 'Bon livrare',
    field: 'deliveryTicketExternalId',
    align: 'left',
    type: 'string',
    disableSorting: true,
    width: '100px'
  },
  {
    title: 'Datǎ recepție',
    field: 'created',
    align: 'left',
    type: 'string',
    width: '100px',
    render: row => formatUIDate(row.created)
  },
  {
    title: 'Operator recepție',
    field: 'createdBy',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Rezolvat',
    field: 'resolved',
    align: 'left',
    type: 'string',
    render: row => (
      <Box
        onClick={row.resolved ? () => {} : () => markAsResolved(row)}
        style={{ cursor: !row.resolved && 'pointer' }}
      >
        <IconCell value={row.resolved ? 'activ' : 'inactive'} />
      </Box>
    ),
    minWidth: '200px'
  },
  {
    title: 'Data rezolvare',
    field: 'updated',
    align: 'left',
    type: 'string',
    width: '100px',
    render: row => formatUIDate(row.updated)
  },
  {
    title: 'Operator rezolvare',
    field: 'lastUpdateBy',
    align: 'left',
    type: 'string',
    width: '100px'
  }
]

export const drawerFilters = (shopOptions, depositOptions) => [
  {
    name: 'depositName',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează depozit"
        disableClearable
        options={depositOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Selectează depozit'
  },
  {
    name: 'shopCode',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează magazin"
        disableClearable
        options={shopOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Selectează magazin'
  },
  {
    name: 'productCode',
    filter: <Input variant="outlined" label="Cod produs" type="text" />,
    type: 'text',
    label: 'Cod produs'
  },
  {
    name: 'externalSupportCode',
    value: '',
    filter: <Input variant="outlined" label="Cod suport" type="text" />,
    type: 'text',
    label: 'Cod suport'
  },
  {
    name: 'resolved',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Rezolvat"
        disableClearable
        options={[
          {
            value: 'true',
            label: 'Da'
          },

          {
            value: 'false',
            label: 'Nu'
          }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Rezolvat'
  },
  {
    name: 'deliveryTicketExternalId',
    value: '',
    filter: <Input variant="outlined" label="Bon livrare" type="text" />,
    type: 'text',
    label: 'Bon livrare'
  },
  {
    name: 'created',
    value: '',
    filter: (
      <DatePicker
        label="Selecteaza dată recepție"
        variant="outlined"
        value={dayjs()}
        onChange={() => {}}
        adapterLocale="ro"
        modalLabel="Selecteaza data"
        closeButtonLabel="Anuleaza"
        confirmButtonLabel="Confirma"
      />
    ),
    type: 'date',
    label: 'Selecteaza dată recepție'
  }
]
