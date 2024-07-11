import { Autocomplete, DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import dayjs from 'dayjs'
import { formatUIDate } from 'utils/helpers'

export const columns = [
  {
    title: 'Nume magazin',
    field: 'shopName',
    align: 'left',
    type: 'string',
    width: '100px',
    disableSorting: true
  },
  {
    title: 'Date',
    field: 'dateInfo',
    align: 'left',
    type: 'string',
    width: '100px',
    render: row => formatUIDate(row.dateInfo),
    disableSorting: true
  },
  {
    title: 'Numar articole sensibile receptionate',
    field: 'scannedNo',
    align: 'left',
    type: 'string',
    disableSorting: true,
    width: '100px'
  },
  {
    title: 'Numar articole sensibile verificate',
    field: 'verifiedNo',
    align: 'left',
    type: 'string',
    width: '100px',
    disableSorting: true
  },

  {
    title: '% Realizat',
    field: 'donePercent',
    align: 'left',
    type: 'string',
    disableSorting: true,
    width: '100px'
  }
]

export const drawerFilters = (shopTypesOptions, shopOptions, reportType, regionTypes) => [
  {
    name: 'userShopTypeList',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează tip magazin"
        options={shopTypesOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Tip magazin'
  },
  {
    name: 'shopCodesIn',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează magazin"
        options={shopOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Magazin'
  },
  {
    name: 'reportType',
    value: undefined,
    filter: (
      <Autocomplete variant="outlined" label="Selectează tip raport" options={reportType || []} />
    ),
    type: 'autocomplete',
    label: 'Tip raport'
  },
  {
    name: 'regionList',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează regiune"
        options={regionTypes || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Regiune'
  },
  {
    name: 'start',
    value: undefined,
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
    value: undefined,
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
