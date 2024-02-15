import { Autocomplete, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import dayjs from 'dayjs'
import { formatUIDate } from 'utils/helpers'

export const columns = [
  {
    title: 'Magazin',
    field: 'shopCode',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Nume depozit',
    field: 'depositName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Bon Livrare',
    field: 'deliveryType',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Status',
    field: 'status',
    align: 'left',
    type: 'string'
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

export const drawerFilters = [
  {
    name: 'shopCode',
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
    name: 'depositId',
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
    name: 'status',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Status"
        disableClearable
        options={[
          {
            value: 'todo',
            label: 'Todo'
          },

          {
            value: 'done',
            label: 'Done'
          }
        ]}
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
      <DatePicker label="Selecteaza data" variant="outlined" value={dayjs()} onChange={() => {}} />
    ),
    type: 'date',
    label: 'Selecteaza data'
  }
]
