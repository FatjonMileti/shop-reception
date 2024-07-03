import { Autocomplete, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import { trimString } from 'components/shop-reception/utils'
import dayjs from 'dayjs'
import { ViewActionIcon } from 'icons'
import { formatUIDate } from 'utils/helpers'

export const columns = navigate => [
  {
    title: 'Magazin finale',
    field: 'shopName',
    align: 'left',
    type: 'string',
    width: '180px',
    render: row => trimString(row.shopName, 50),
    disableSorting: true
  },
  {
    title: 'Depozite (Infolog)',
    field: 'depositIds',
    align: 'left',
    type: 'string',
    width: '100px',
    disableSorting: true
  },
  {
    title: 'Categorie marfa',
    field: 'depositType',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Hub plecare',
    field: 'hubSent',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Hub sosire',
    field: 'hubReceived',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Cod cursa',
    field: 'transportCode',
    align: 'left',
    type: 'string',
    width: '100px',
    disableSorting: true
  },
  {
    title: 'Numar camion',
    field: 'truckNumber',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Nume sofer',
    field: 'driverName',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Status livrare',
    field: 'status',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Locatie',
    field: 'flowType',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Data estimare de livrare',
    field: 'expectedDeliveryDate',
    align: 'left',
    type: 'string',
    width: '100px',
    render: row => formatUIDate(row.expectedDeliveryDate)
  },
  {
    title: 'Nume magazin sosire',
    field: 'deliveredShopCodeName',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Cod magazin sosire',
    field: 'deliveredShopCode',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Conformitate termodiagrama',
    field: 'thermodiagramConform',
    align: 'left',
    type: 'string',
    width: '100px',
    render: row => (
      <Box>
        <IconCell value={row.thermodiagramConform ? 'activ' : 'inactiv'} />
      </Box>
    )
  },
  {
    title: 'Conformitate sigilii',
    field: 'sealConform',
    align: 'left',
    type: 'string',
    width: '100px',
    render: row => (
      <Box>
        <IconCell value={row.sealConform ? 'activ' : 'inactiv'} />
      </Box>
    )
  },
  {
    title: 'Conformitate sosire',
    field: 'arrivalConform',
    align: 'left',
    type: 'string',
    width: '100px',
    render: row => (
      <Box>
        <IconCell value={row.arrivalConform ? 'activ' : 'inactiv'} />
      </Box>
    )
  },
  {
    title: 'Dată înregistrare',
    field: 'deliveryTicketCreated',
    align: 'left',
    type: 'string',
    render: row => formatUIDate(row.deliveryTicketCreated),
    width: '100px'
  },
  {
    title: 'Bonuri de livrare',
    field: 'deliveryTickets',
    align: 'left',
    type: 'string',
    width: '100px',
    disableSorting: true
  },

  {
    title: 'Dată sosire',
    field: 'approveDate',
    align: 'left',
    type: 'string',
    width: '100px',
    render: row => formatUIDate(row.approveDate)
  },
  {
    title: 'Numar suporti',
    field: 'supportCount',
    align: 'left',
    type: 'string',
    width: '100px',
    disableSorting: true
  },
  {
    title: 'Detalii',
    field: '',
    align: 'left',
    type: 'string',
    width: '70px',
    disableSorting: true,
    render: row => (
      <Box>
        <div
          onClick={() =>
            navigate(
              `/shop-reception/reception/truckList/${row.truckId}?shopCode=${row.shopName
                .match(/\((\d+)\)/g)
                .map(item => item.replace(/[()]/g, ''))
                .join(';')}`
            )
          }
          style={{ cursor: 'pointer' }}
        >
          <ViewActionIcon />
        </div>
      </Box>
    )
  }
]

export const drawerFilters = (
  shopOptions,
  hubOptions,
  depositOptions,
  statusOptions,
  truckLocationOptions,
  arrivalTypeOptions
) => [
  {
    name: 'deliveredShopCodeName',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Niciun magazin de sosire selectat"
        disableClearable
        options={shopOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Magazin de sosire'
  },
  {
    name: 'hubSent',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Niciun HUB plecare selectat"
        disableClearable
        options={hubOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Hub plecare'
  },
  {
    name: 'hubReceived',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Niciun HUB sosire selectat"
        disableClearable
        options={hubOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Hub sosire'
  },
  {
    name: 'depositId',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Niciun depozit selectat"
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
        label="Selectează status"
        disableClearable
        options={statusOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Status'
  },
  {
    name: 'flowType',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează locatie camion"
        disableClearable
        options={truckLocationOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Locatie camion'
  },
  {
    name: 'arrivalConform',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează receptie in interval orar"
        disableClearable
        options={[
          { label: 'Da', value: 'true' },
          { label: 'Nu', value: 'false' }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Receptie in interval orar'
  },
  {
    name: 'deliveryType',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează tip sosire"
        disableClearable
        options={arrivalTypeOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Tip sosire'
  },
  {
    name: 'truckNumber',
    value: '',
    filter: <Input variant="outlined" label="Numar inmatriculare" type="text" />,
    type: 'text',
    label: 'Numar inmatriculare'
  },
  {
    name: 'ticketId',
    value: '',
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
    name: 'startArrival',
    value: '',
    filter: (
      <DatePicker
        label="Selecteaza inceput interval sosire"
        variant="outlined"
        value={dayjs()}
        onChange={() => {}}
        adapterLocale="ro"
      />
    ),
    type: 'date',
    label: 'Data inceput interval sosire'
  },
  {
    name: 'endArrival',
    value: '',
    filter: (
      <DatePicker
        label="Selecteaza sfarsit interval sosire"
        variant="outlined"
        value={dayjs()}
        onChange={() => {}}
        adapterLocale="ro"
      />
    ),
    type: 'date',
    label: 'Data sfarsit interval sosire'
  },
  {
    name: 'startRegistered',
    value: '',
    filter: (
      <DatePicker
        label="Selecteaza inceput interval inregistrare"
        variant="outlined"
        value={dayjs()}
        onChange={() => {}}
        adapterLocale="ro"
      />
    ),
    type: 'date',
    label: 'Data inceput interval inregistrare'
  },
  {
    name: 'endRegistered',
    value: '',
    filter: (
      <DatePicker
        label="Selecteaza sfarsit interval inregistrare"
        variant="outlined"
        value={dayjs()}
        onChange={() => {}}
        adapterLocale="ro"
      />
    ),
    type: 'date',
    label: 'Data sfarsit interval inregistrare'
  }
]
