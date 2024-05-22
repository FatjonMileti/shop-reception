import { Autocomplete, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import dayjs from 'dayjs'
import { formatUIDate } from 'utils/helpers'

export const columns = [
  {
    title: 'Cod cursǎ',
    field: 'loadedSupportsNumber',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Tip cursǎ',
    field: 'truckType',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Loc încǎrcare',
    field: 'flowType',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Data încǎrcare',
    field: 'uploadDate',
    align: 'left',
    type: 'string',
    width: '100px',
    render: row => formatUIDate(row.uploadDate)
  },
  {
    title: 'Numǎr masina_DEPOZIT',
    field: 'truckNumber',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Nume Depozit',
    field: 'depositName',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Nume șofer',
    field: 'driverName',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Telefon șofer',
    field: 'driverPhone',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Denumire Hub',
    field: 'hubName',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Denumire Magazin',
    field: 'shopName',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Societate',
    field: 'parentSociety',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Categorie marfa',
    field: 'packageCategory',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Numǎr paleți',
    field: 'supportsNumberReleased',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Număr paleți descărcati',
    field: 'arrivedSupportsNumber',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Dată prezentare - descărcare in HUB',
    field: 'inHubLoadingDateTime',
    align: 'left',
    type: 'string',
    width: '100px',
    render: row => formatUIDate(row.inHubLoadingDateTime)
  },
  {
    title: 'Oră prezentare in HUB',
    field: 'inHubPresentationHour',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Oră descărcare in HUB',
    field: 'inHubReleaseHour',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Dată încărcare marfă din HUB',
    field: 'inHubReleaseDateTime',
    align: 'left',
    type: 'string',
    width: '100px',
    render: row => formatUIDate(row.inHubReleaseDateTime)
  },
  {
    title: 'Oră încărcare marfă din HUB',
    field: 'inHubLoadingHour',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Număr masina_HUB',
    field: 'truckNumberHub',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Nume şofer',
    field: 'driverNameHub',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Număr paleți încărcati',
    field: 'loadedSupportsNumber',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Dată descărcare marfă la magazin',
    field: 'inHubReleaseDateTime',
    align: 'left',
    type: 'string',
    width: '100px',
    render: row => formatUIDate(row.inHubReleaseDateTime)
  },
  {
    title: 'Oră descărcare marfă la magazin',
    field: 'inHubPresentationHour',
    align: 'left',
    type: 'string',
    width: '100px'
  }
]

export const drawerFilters = (
  shopOptions,
  depositOptions,
  hubOptions,
  societyOptions,
  locationOptions
) => [
  {
    name: 'shopName',
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
    name: 'depositName',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează depozit"
        options={depositOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Depozit'
  },
  {
    name: 'hubName',
    value: undefined,
    filter: (
      <Autocomplete variant="outlined" label="Selectează HUB" options={hubOptions || []} multiple />
    ),
    type: 'autocomplete',
    label: 'Hub'
  },
  {
    name: 'loadedSupportsNumber',
    filter: <Input variant="outlined" label="Cod cursa" type="text" />,
    type: 'text',
    label: 'Cod cursa'
  },
  {
    name: 'parentSociety',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează societate"
        options={societyOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Societate'
  },
  {
    name: 'truckNumber',
    filter: <Input variant="outlined" label="Numar masina_DEPOZIT" type="text" />,
    type: 'text',
    label: 'Numar masina depozit'
  },
  {
    name: 'truckNumberHub',
    filter: <Input variant="outlined" label="Numar masina_HUB" type="text" />,
    type: 'text',
    label: 'Numar masina hub'
  },
  {
    name: 'flowType',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează loc de incarcare"
        options={locationOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Loc de incarcare'
  },

  {
    name: 'uploadDate',
    value: undefined,
    filter: (
      <DatePicker
        label="Selecteaza data incarcare de la"
        variant="outlined"
        value={dayjs()}
        onChange={() => {}}
      />
    ),
    type: 'date',
    label: 'Data incarcare de la'
  },
  {
    name: '123',
    value: undefined,
    filter: (
      <DatePicker
        label="Selecteaza data incarcare pana la"
        variant="outlined"
        value={dayjs()}
        onChange={() => {}}
      />
    ),
    type: 'date',
    label: 'Data incarcare pana la'
  },
  {
    name: '123',
    value: undefined,
    filter: (
      <DatePicker
        label="Data descarcare hub"
        variant="outlined"
        value={dayjs()}
        onChange={() => {}}
      />
    ),
    type: 'date',
    label: 'Data descarcare hub'
  },
  {
    name: '123',
    value: undefined,
    filter: (
      <DatePicker
        label="Data descarcare magazin"
        variant="outlined"
        value={dayjs()}
        onChange={() => {}}
      />
    ),
    type: 'date',
    label: 'Data descarcare magazin'
  }
]
