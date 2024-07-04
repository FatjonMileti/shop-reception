import { Autocomplete, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { DownloadIcon } from 'icons'
import { getCurrentDate } from 'utils/helpers'

const currentDate = getCurrentDate()

export const getColumns = downloadImage => [
  {
    title: 'Magazin',
    field: 'shopName',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Depozit',
    field: 'depositName',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Bon livrare',
    field: 'deliveryTicketId',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Tip suport',
    field: 'supportTypeName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Cod suport',
    field: 'supportTypeCode',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Conformitate suport',
    field: 'nonCompliantReason',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Data receptie',
    field: 'created',
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
  despositsOptions,
  parentSocietyOptions,
  nonCompliantReasonOptions
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
      <Autocomplete
        variant="outlined"
        label="Selecteaza Depozit"
        options={despositsOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza Depozit'
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
    name: 'nonCompliantReason',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Conformitate Suport"
        options={nonCompliantReasonOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Conformitate Suport'
  },
  {
    name: 'supportCode',
    label: 'Cod suport',
    type: 'text',
    filter: <Input type="text" name="supportCode" label="Cod suport" variant="outlined" />
  },
  {
    name: 'ticketId',
    label: 'Bon livrare',
    type: 'text',
    filter: <Input type="text" name="ticketId" label="Bon livrare" variant="outlined" />
  },
  {
    name: 'created',
    value: currentDate,
    filter: (
      <DatePicker
        label="Selecteaza data de la "
        variant="outlined"
        value={currentDate}
        onChange={() => {}}
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
        label="Selecteaza data pana la "
        variant="outlined"
        value={currentDate}
        onChange={() => {}}
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
