import { Autocomplete, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { PrintOutlined } from '@mui/icons-material'
import { getCurrentDate } from 'utils/helpers'

export const getColumns = printNotice => [
  {
    title: 'Magazin',
    field: 'shopName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Via HUB',
    field: 'receptionHubName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Depozit/Furnizor',
    field: 'depositName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Societate',
    field: 'parentSociety',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Traseu',
    field: 'truckType',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Numar inmatriculare',
    field: 'truckNumber',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Nume sofer',
    field: 'driverName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Retur ambalaje',
    field: 'globalPackageReturn',
    align: 'left',
    type: 'string',
    render: row => <span>{row.globalPackageReturn ? 'Da' : 'Nu'}</span>
  },
  {
    title: 'Sigilii',
    field: 'sealNumbers',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Avize magazin',
    field: 'noticeNumbers',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Avize hub',
    field: 'hubNoticeNumber',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Data inregistrare',
    field: 'created',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Data expeditie',
    field: 'loadingDone',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Status',
    field: 'truckStatus',
    align: 'left',
    type: 'string'
  },
  {
    title: '',
    field: 'truckTypePrint',
    align: 'right',
    type: 'string',
    width: '30px',
    render: row =>
      row.truckTypeKey !== 'HUB_TO_DEPOSIT' ? (
        <div onClick={() => printNotice(row.id)}>
          <PrintOutlined style={{ width: '18px', color: '#0970E6', cursor: 'pointer' }} />
        </div>
      ) : (
        <div />
      )
  }
]

const packageReturnOptions = [
  { value: 'true', label: 'Da' },
  { value: 'false', label: 'Nu' }
]

const currentDate = getCurrentDate()

export const getFilters = ({
  shopOptions,
  hubOptions,
  despositOptions,
  returnTruckTypesOptions,
  returnTruckStatusOptions,
  parentSocietyOptions
}) => [
  {
    name: 'shopCode',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza magazin"
        options={shopOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza depozit'
  },
  {
    name: 'hubId',
    value: undefined,
    filter: (
      <Autocomplete variant="outlined" label="Selecteaza HUB" options={hubOptions || []} multiple />
    ),
    type: 'autocomplete',
    label: 'Selecteaza HUB'
  },
  {
    name: 'depositId',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza Depozit"
        options={despositOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza Depozit'
  },
  {
    name: 'truckType',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza tip camion"
        options={returnTruckTypesOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza tip camion'
  },
  {
    name: 'truckNumber',
    label: 'Numar inmatriculare',
    type: 'text',
    filter: <Input type="text" name="truckNumber" label="Numar inmatriculare" variant="outlined" />
  },
  {
    name: 'packageReturn',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza retur ambalaje"
        options={packageReturnOptions}
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza retur ambalaje'
  },
  {
    name: 'sealNumber',
    label: 'Sigiliu',
    type: 'text',
    filter: <Input type="text" name="sealNumber" label="Sigiliu" variant="outlined" />
  },
  {
    name: 'noticeNumbers',
    label: 'Aviz magazin/Hub',
    type: 'text',
    filter: <Input type="text" name="noticeNumbers" label="Aviz magazin/Hub" variant="outlined" />
  },
  {
    name: 'status',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza status camion"
        options={returnTruckStatusOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza status camion'
  },
  {
    name: 'parentSociety',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza Societate"
        options={parentSocietyOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza Societate'
  },
  {
    name: 'created',
    value: currentDate,
    filter: (
      <DatePicker
        label="Selecteaza data de la"
        variant="outlined"
        value={currentDate}
        onChange={() => {}}
        required
        adapterLocale="ro"
        modalLabel="Selecteaza data"
        closeButtonLabel="Anuleaza"
        confirmButtonLabel="Confirma"
      />
    ),
    type: 'date',
    label: 'Selecteaza data de la'
  },
  {
    name: 'createdTo',
    value: currentDate,
    filter: (
      <DatePicker
        label="Selecteaza data pana la"
        variant="outlined"
        value={currentDate}
        onChange={() => {}}
        required
        adapterLocale="ro"
        modalLabel="Selecteaza data"
        closeButtonLabel="Anuleaza"
        confirmButtonLabel="Confirma"
      />
    ),
    type: 'date',
    label: 'Selecteaza data pana la'
  }
]
