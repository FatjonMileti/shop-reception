import { Autocomplete, IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { DownloadIcon, ViewActionIcon } from 'icons'
import { URLS } from '../../constants'
import { formatUIDate } from 'utils/helpers'

export const columns = (navigate, downloadFile) => [
  {
    title: 'Cod suport',
    field: 'supportCode',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Nume depozit',
    field: 'depositName',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Bon Livrare',
    field: 'externalTicketId',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Comanda livratà',
    field: 'externalOrderId',
    align: 'left',
    type: 'string',
    disableSorting: true,
    width: '100px'
  },
  {
    title: 'Comandǎ emis(Meti)',
    field: 'originalOrderId',
    align: 'left',
    type: 'string',
    disableSorting: true,
    width: '100px'
  },
  {
    title: 'Destinatie dorită',
    field: 'shopName',
    align: 'left',
    type: 'string',
    disableSorting: true,
    width: '100px'
  },
  {
    title: 'Destinatie reala',
    field: 'destinationShopName',
    align: 'left',
    type: 'string',
    disableSorting: true,
    width: '100px'
  },
  {
    title: 'Operator',
    field: 'lastUpdateBy',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Dată scanare',
    field: 'lastUpdate',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Rezolvat',
    field: 'resolved',
    align: 'left',
    type: 'string',
    render: row =>
      row.resolved ? (
        'Da'
      ) : (
        <span
          onClick={() =>
            navigate(URLS.AUTH_SUPPORT_WRONG_DESTINATION_DETAIL.replace(':id', row.id))
          }
          style={{ cursor: 'pointer' }}
        >
          <ViewActionIcon />
        </span>
      ),
    disableSorting: true,
    width: '100px'
  },
  {
    title: 'Datǎ rezolvare',
    field: 'resolvingDate',
    align: 'left',
    type: 'string',
    disableSorting: true,
    width: '100px'
  },
  {
    title: 'Operator rezolvare',
    field: 'resolvedBy',
    align: 'left',
    type: 'string',
    disableSorting: true,
    width: '100px'
  },
  {
    title: 'Comentariu',
    field: 'resolvingComment',
    align: 'left',
    type: 'string',
    disableSorting: true,
    width: '100px'
  },
  {
    title: 'Descarca',
    field: 'unload',
    align: 'left',
    type: 'string',
    disableSorting: true,
    render: row => {
      return row.hasAttachment ? (
        <span onClick={() => downloadFile(row.id)} style={{ cursor: 'pointer' }}>
          <DownloadIcon />
        </span>
      ) : (
        ''
      )
    },
    width: '100px'
  }
]
export const drawerFilters = (depositOptions, shopOptions) => [
  {
    name: 'depositName',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Depozit"
        disableClearable
        options={depositOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Depozit'
  },

  {
    name: 'shopName',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Destinatie dorita"
        disableClearable
        options={shopOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Destinatie dorita'
  },

  {
    name: 'destinationShopName',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Destinatie reala"
        disableClearable
        options={shopOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Destinatie reala'
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
    name: 'supportCode',
    filter: <Input variant="outlined" label="Cod suport" type="text" />,
    type: 'text',
    label: 'Cod suport'
  },
  {
    name: 'ticketNumber',
    filter: <Input variant="outlined" label="Bon livrare" type="text" />,
    type: 'text',
    label: 'Bon livrare'
  }
]
