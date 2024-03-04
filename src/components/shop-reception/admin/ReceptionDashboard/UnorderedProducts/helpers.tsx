import { Autocomplete, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import dayjs from 'dayjs'

export const columns = markAsResolved => [
  {
    title: 'Depozit',
    field: 'depositName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Magazin',
    field: 'shopName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Cod produs',
    field: 'productCode',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Denumire produs',
    field: 'productName',
    align: 'left',
    type: 'string'
  },

  {
    title: 'EAN produs',
    field: 'productEan',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Cantitate calitativă',
    field: 'validatedQuantity',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Cantitate defectǎ',
    field: 'brokenQuantity',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Motiv defectiune',
    field: 'defectReason',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Cod support',
    field: 'externalSupportCode',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Bon livrare',
    field: 'deliveryTicketExternalId',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Datǎ recepție',
    field: 'created',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Operator recepție',
    field: 'createdBy',
    align: 'left',
    type: 'string'
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
    type: 'string'
  },
  {
    title: 'Operator rezolvare',
    field: 'lastUpdateBy',
    align: 'left',
    type: 'string'
  }
]

export const drawerFilters = [
  {
    name: 'depositName',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează depozit"
        disableClearable
        options={[
          {
            value: '1',
            label: 'Depozit 1'
          },

          {
            value: '2',
            label: 'Depozit 2'
          },
          {
            value: '3',
            label: 'Depozit 3'
          }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Selectează depozit'
  },
  {
    name: 'shopName',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează magazin"
        disableClearable
        options={[
          {
            value: '1',
            label: 'Magazin 1'
          },

          {
            value: '2',
            label: 'Magazin 2'
          },
          {
            value: '3',
            label: 'Magazin 3'
          }
        ]}
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
      />
    ),
    type: 'date',
    label: 'Selecteaza dată recepție'
  }
]
