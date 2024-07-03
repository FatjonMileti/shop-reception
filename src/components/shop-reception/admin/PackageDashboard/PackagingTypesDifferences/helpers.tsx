import { Autocomplete, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { DownloadIcon } from 'icons'
import { getCurrentDate } from 'utils/helpers'

const currentDate = getCurrentDate()

export const getColumns = downloadImage => [
  {
    title: 'Depozit',
    field: 'depositName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Magazin',
    field: 'shopName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'HUB',
    field: 'hubName',
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
    title: 'Cod suport',
    field: 'supportCode',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Bon livrare',
    field: 'deliveryTicket',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Tip suport asteptat',
    field: 'supportTypeExpected',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Tip suport confirmat',
    field: 'supportTypeConfirmed',
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
    title: 'Data',
    field: 'date',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Descarca imagini',
    field: 'pictureId',
    align: 'left',
    type: 'string',
    disableSorting: true,
    render: row =>
      row.pictureId ? (
        <div onClick={() => downloadImage(row.pictureId)}>
          <DownloadIcon />
        </div>
      ) : (
        <div />
      )
  }
]

export const getFilters = ({
  shopOptions,
  hubOptions,
  despositOptions,
  parentSocietyOptions,
  supportTypeOptions
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
    name: 'supportCode',
    label: 'Cod suport',
    type: 'text',
    filter: <Input type="text" name="supportCode" label="Cod suport" variant="outlined" />
  },
  {
    name: 'ticketNumber',
    label: 'Bon livraret',
    type: 'text',
    filter: <Input type="text" name="ticketNumber" label="Bon livrare" variant="outlined" />
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
    name: 'supportTypeIdExpected',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Tip suport asteptat"
        options={supportTypeOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Tip suport asteptat'
  },
  {
    name: 'supportTypeIdConfirmed',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Tip suport confirmat"
        options={supportTypeOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Tip suport confirmat'
  },
  {
    name: 'startDate',
    value: currentDate,
    filter: (
      <DatePicker
        label="Selecteaza data de la"
        variant="outlined"
        value={currentDate}
        onChange={() => {}}
        required
        adapterLocale="ro"
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
        label="Selecteaza data pana la"
        variant="outlined"
        value={currentDate}
        onChange={() => {}}
        required
        adapterLocale="ro"
      />
    ),
    type: 'date',
    label: 'Selecteaza data pana la'
  }
]
