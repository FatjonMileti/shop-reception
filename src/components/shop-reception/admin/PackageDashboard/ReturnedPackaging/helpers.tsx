import { Autocomplete, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { getCurrentDate } from 'utils/helpers'

export const columns = [
  {
    title: 'Magazin',
    field: 'shopCode',
    align: 'left',
    type: 'string',
    sticky: true
  },
  {
    title: 'Depozit',
    field: 'depositName',
    align: 'left',
    type: 'string',
    sticky: true
  },
  {
    title: 'HUB',
    field: 'hubName',
    align: 'left',
    type: 'string',
    sticky: true
  },
  {
    title: 'Societate',
    field: 'parentSociety',
    align: 'left',
    type: 'string',
    sticky: true
  },
  {
    title: 'Cod ambalaj incarcat',
    field: 'supportTypeCode',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Tip ambalaj incarcat',
    field: 'externalCode',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Cantitate incarcata',
    field: 'supportNumber',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Cantitate descarcata',
    field: 'confirmedSupportNumber',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Numar aviz magazin',
    field: 'noticeCode',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Sigilii',
    field: 'sealNumbers',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Data expeditie magazin',
    field: 'approvedDate',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Aviz hub',
    field: 'hubNoticeNumber',
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
    title: 'Retur ambalaje',
    field: 'packageReturn',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Data verificare',
    field: 'loadingDone',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Operator verificare',
    field: 'loadingOperator',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Status',
    field: 'truckStatus',
    align: 'left',
    type: 'string'
  }
]

const currentDate = getCurrentDate()

export const getFilters = ({
  shopOptions,
  depositOptions,
  hubOptions,
  supportTypeOptions,
  parentSocietyOptions,
  returnTruckTypesOptions,
  returnTruckStatusOptions
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
    name: 'depositId',
    value: undefined,
    filter: (
      <Autocomplete variant="outlined" label="Selecteaza Depozit" options={depositOptions || []} multiple/>
    ),
    type: 'autocomplete',
    label: 'Selecteaza Depozit'
  },
  {
    name: 'hubId',
    value: undefined,
    filter: (
      <Autocomplete variant="outlined" label="Selecteaza Hub" options={hubOptions || []} multiple />
    ),
    type: 'autocomplete',
    label: 'Selecteaza Hub'
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
    name: 'supportTypeId',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza Tip Suport"
        options={supportTypeOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza Tip Suport'
  },
  {
    name: 'truckType',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza traseu"
        options={returnTruckTypesOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza traseu'
  },
  {
    name: 'truckNumber',
    label: 'Numar inmatriculare',
    type: 'text',
    filter: <Input type="text" name="truckNumber" label="Numar inmatriculare" variant="outlined" />
  },
  {
    name: 'noticeNumbers',
    label: 'Aviz magazin',
    type: 'text',
    filter: <Input type="text" name="noticeNumbers" label="Aviz magazin" variant="outlined" />
  },
  {
    name: 'status',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează status"
        options={returnTruckStatusOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Status'
  },
  {
    name: 'startDate',
    value: currentDate,
    filter: (
      <DatePicker
        label="Selecteaza data de la "
        variant="outlined"
        value={currentDate}
        onChange={() => {}}
        required
      />
    ),
    type: 'date',
    label: 'Selecteaza data de la'
  },
  {
    name: 'endDate',
    value: currentDate,
    filter: (
      <DatePicker
        label="Selecteaza data pana la "
        variant="outlined"
        value={currentDate}
        onChange={() => {}}
        required
      />
    ),
    type: 'date',
    label: 'Selecteaza data pana la'
  }
]
