import { Autocomplete, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Box } from '@mui/material'
import { IconCell } from 'components/core-ui/IconCell'
import { trimString } from 'components/shop-reception/utils'
import dayjs from 'dayjs'
import { ViewActionIcon } from 'icons'
import { formatUIDate } from 'utils/helpers'

export const statusColorMapping = {
  'Înregistrat': 'orange',
  'În procesare': 'blue',
  'Procesat': 'black',
  'Parțial trimis la meti': 'blue',
  'Trimis la Meti': 'green',
  'Resigilat': 'orange',
  'Expediat din HUB': 'orange',
  'În procesare în HUB': 'blue',
  'Succes': 'green',
  'Lipsește': 'red',
  'În aşteptare': 'black',
}

export const columns = navigate => [
  {
    title: 'Magazin',
    field: 'shopName',
    align: 'left',
    type: 'string',
    width: '180px',
    render: row => trimString(row.shopName, 50),
    disableSorting: true
  },
  {
    title: 'HUB',
    field: 'hubName',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Nume depozit',
    field: 'depositName',
    align: 'left',
    type: 'string',
    width: '100px',
    disableSorting: true
  },
  {
    title: 'Locaţie camion',
    field: 'flowType',
    align: 'left',
    type: 'string',
    width: '100px',
    render: row => row.flowTypeValue
  },
  {
    title: 'Număr înmatriculare',
    field: 'truckNumber',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Cod şofer',
    field: 'driverName',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Cod cursă',
    field: 'transportCode',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Sigilii',
    field: 'seals',
    align: 'left',
    collapsible: true,
    type: 'string',
    width: '100px',
    disableSorting: true
  },
  {
    title: 'Bonuri livrare',
    field: 'ticketCodes',
    align: 'left',
    type: 'string',
    width: '100px',
    disableSorting: true
  },
  {
    title: 'Conformitate documente',
    field: 'documentsConform',
    align: 'left',
    type: 'string',
    width: '100px',
    render: row => (
      <Box>
        <IconCell value={row.documentsConform ? 'activ' : 'inactiv'} />
      </Box>
    )
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
    title: 'Recepţie în interval orar',
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
    title: 'Status',
    field: 'status',
    align: 'left',
    type: 'string',
    width: '100px',
    render: row => (
      <div style={{ color: statusColorMapping[row.statusValue] || 'black' }}>{row.statusValue}</div>
    )
  },
  {
    title: 'Dată înregistrare',
    field: 'created',
    align: 'left',
    type: 'string',
    render: row => formatUIDate(row.created),
    width: '100px'
  },
  {
    title: 'Operator înregistrare',
    field: 'createdBy',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Status E-Transport',
    field: 'etransportStatus',
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
              `/shop-reception/reception/truckList/${row.id}?shopCode=${row.shopName
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
  locationOptions
) => [
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
    label: 'Magazin'
  },
  {
    name: 'hubId',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează HUB"
        disableClearable
        options={hubOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Hub'
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
        label="Selectează status"
        disableClearable
        options={statusOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Status'
  },
  {
    name: 'type',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează locatie camion"
        disableClearable
        options={locationOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Locatie camion'
  },
  {
    name: 'documentsConform',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează documente conforme"
        disableClearable
        options={[
          { label: 'Da', value: 'true' },
          { label: 'Nu', value: 'false' }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Documente conforme'
  },
  {
    name: 'thermodiagramConform',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează conformitate termodiagrama"
        disableClearable
        options={[
          { label: 'Da', value: 'true' },
          { label: 'Nu', value: 'false' }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Conformitate termodiagrama'
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
    name: 'sealConform',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează conformitate sigilii"
        disableClearable
        options={[
          { label: 'Da', value: 'true' },
          { label: 'Nu', value: 'false' }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Conformitate sigilii'
  },
  {
    name: 'transportCode',
    filter: <Input variant="outlined" label="Cod cursa" type="text" />,
    type: 'text',
    label: 'Cod cursa'
  },
  {
    name: 'truckNumber',
    value: '',
    filter: <Input variant="outlined" label="Numar inmatriculare" type="text" />,
    type: 'text',
    label: 'Numar inmatriculare'
  },
  {
    name: 'start',
    value: '',
    filter: (
      <DatePicker
        label="Selecteaza data inceput"
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
    label: 'Data inceput'
  },
  {
    name: 'end',
    value: '',
    filter: (
      <DatePicker
        label="Selecteaza data sfarsit"
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
    label: 'Data sfarsit'
  }
]
