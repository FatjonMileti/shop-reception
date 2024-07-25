import { Autocomplete, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { trimString } from 'components/shop-reception/utils'
import dayjs from 'dayjs'
import { formatUIDate } from 'utils/helpers'

export const columns = [
  {
    title: 'Magazin',
    field: 'shopCode',
    align: 'left',
    type: 'string',
    width: '200px',
    render: row => trimString(row.shopCodeName, 50)
  },
  {
    title: 'Nume depozit',
    field: 'deposit.name',
    align: 'left',
    type: 'string',
    render: row => row.deposit?.name
  },
  {
    title: 'Bon Livrare',
    field: 'externalTicketId',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Status',
    field: 'status',
    align: 'left',
    type: 'string',
    render: row => row.statusValue
  },
  {
    title: 'Cod cursă',
    field: 'transportCode',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Sigiliu',
    field: 'sealCode',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Număr de înmatriculare',
    field: 'truckNumber',
    align: 'left',
    type: 'string',

    disableSorting: true
  },
  {
    title: 'Numarul de suporti asteptati',
    field: 'numberOfSupports',
    align: 'left',
    type: 'string',

    disableSorting: true
  },
  {
    title: 'Numarul de suporti ajunsi la destinatie',
    field: 'validatedSupports',
    align: 'left',
    type: 'string',

    disableSorting: true
  },
  {
    title: 'Datǎ inregistrare',
    field: 'created',
    align: 'left',
    type: 'string',
    render: row => formatUIDate(row.created)
  }
]

export const drawerFilters = (shopCodes, depositOptions, statusOptions) => [
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
    label: 'Magazin'
  },

  {
    name: 'depositId',
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
    label: 'Depozit'
  },

  {
    name: 'status',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Status"
        disableClearable
        options={statusOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Status'
  },

  {
    name: 'externalTicketId',
    filter: <Input variant="outlined" label="Bon livrare" type="text" />,
    type: 'text',
    label: 'Bon livrare'
  },

  {
    name: 'transportCode',
    value: '',
    filter: <Input variant="outlined" label="Cod cursa" type="text" />,
    type: 'text',
    label: 'Cod cursa'
  },

  {
    name: 'sealCode',
    value: '',
    filter: <Input variant="outlined" label="Sigiliu" type="text" />,
    type: 'text',
    label: 'Sigiliu'
  },

  {
    name: 'created',
    value: '',
    filter: (
      <DatePicker
        label="Selecteaza data"
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
    label: 'Data'
  }
]
