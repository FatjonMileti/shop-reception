import { Autocomplete, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { PermissionRoles } from 'components/shop-reception/enums'
import dayjs from 'dayjs'

export const getColumns = (canView: boolean, type: string) => [
  {
    title: 'Depozit',
    field: 'depositName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Tip magazin',
    field: 'shopType',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Magazin',
    field: 'shopName',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Via',
    field: 'hubName',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Societate',
    field: 'parentSociety',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Data task magazin',
    field: 'created',
    align: 'left',
    type: 'date'
  },
  ...(canView
    ? [
        {
          title: 'Data rezolvare task magazin',
          field: 'shopFinaliseTime',
          align: 'left',
          type: 'date'
        }
      ]
    : []),
  ...(type === 'finalised'
    ? [
        {
          title: 'Data rezolvare task depozit',
          field: 'depositFinaliseTime',
          align: 'left',
          type: 'date'
        }
      ]
    : []),
  {
    title: 'Notificari trimise catre magazin',
    field: 'sentNotifications',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Numar aviz magazin',
    field: 'noticeCode',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Data aviz magazin',
    field: 'noticeCreated',
    align: 'left',
    type: 'date'
  },
  {
    title: 'Status',
    field: 'status',
    align: 'left',
    type: 'string'
  }
]

export const getFilters = (depositOptions, hubOptions, shopOptions, parentSocietyOptions) => [
  {
    name: 'depositId',
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
    label: 'Selectează depozit'
  },
  {
    name: 'hubId',
    value: undefined,
    filter: <Autocomplete variant="outlined" label="VIA" options={hubOptions || []} multiple />,
    type: 'autocomplete',
    label: 'VIA'
  },
  {
    name: 'noticeNumber',
    value: '',
    filter: <Input variant="outlined" label="Numar aviz magazin" type="text" />,
    type: 'text',
    label: 'Numar aviz magazin'
  },
  {
    name: 'noticeDate',
    value: '',
    filter: (
      <DatePicker
        label="Selecteaza data aviz magazin"
        variant="outlined"
        value={dayjs()}
        onChange={() => {}}
        adapterLocale="ro"
      />
    ),
    type: 'date',
    label: 'Selecteaza data aviz magazin'
  },
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
    label: 'Selecteaza magazin'
  },
  {
    name: 'taskDate',
    value: '',
    filter: (
      <DatePicker
        label="Selecteaza data task magazin"
        variant="outlined"
        value={dayjs()}
        onChange={() => {}}
        adapterLocale="ro"
      />
    ),
    type: 'date',
    label: 'Selecteaza data task magazin'
  },
  {
    name: 'expirationDate',
    value: '',
    filter: (
      <DatePicker
        label="Selecteaza data expirare task magazin"
        variant="outlined"
        value={dayjs()}
        onChange={() => {}}
        adapterLocale="ro"
      />
    ),
    type: 'date',
    label: 'Selecteaza data expirare task magazin'
  },
  {
    name: 'parentSociety',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza societate"
        options={parentSocietyOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza societate'
  }
]

export const roles = {
  viewRoles: [
    PermissionRoles.GG_RO_HQ_SHOP_RECEPTION_DIRECTOR,
    PermissionRoles.GG_RO_HQ_SHOP_RECEPTION_STORE,
    PermissionRoles.GG_RO_HQ_SHOP_RECEPTION_BACKOFFICE,
    PermissionRoles.GG_RO_HQ_SHOP_RECEPTION_ADMIN
  ]
}
