import { Autocomplete, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { DownloadIcon } from 'icons'
import { getCurrentDate } from 'utils/helpers'

export const getColumns = downloadImage => [
  {
    title: 'Depozit',
    field: 'depositName',
    align: 'left',
    type: 'string',
    sticky: true
  },
  {
    title: 'Magazin',
    field: 'shopName',
    align: 'left',
    type: 'string',
    sticky: true
  },

  {
    title: 'HUB',
    field: 'receptionHubName',
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
    title: 'Locatie camion',
    field: 'type',
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
    title: 'Cod suport',
    field: 'supportCode',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Bon livrare',
    field: 'deliveryTicketExternalId',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Numar aviz',
    field: 'noticeNumber',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Intrare',
    field: 'intactNumber',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Iesire',
    field: 'brokenNumber',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Stoc final dupa inventar',
    field: 'difference',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Data',
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

const currentDate = getCurrentDate()

export const getFilters = ({
  shopOptions,
  depositOptions,
  hubOptions,
  supportTypeFlowOptions,
  supportTypeOptions,
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
    name: 'hubId',
    value: undefined,
    filter: (
      <Autocomplete variant="outlined" label="Selecteaza Hub" options={hubOptions || []} multiple />
    ),
    type: 'autocomplete',
    label: 'Selecteaza Hub'
  },
  {
    name: 'depositId',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza Depozit"
        options={depositOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza Depozit'
  },
  {
    name: 'type',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selecteaza Tip"
        options={supportTypeFlowOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Selecteaza Tip'
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
    name: 'supportCode',
    label: 'Cod suport',
    type: 'text',
    filter: <Input type="text" name="supportCode" label="Cod suport" variant="outlined" />
  },
  {
    name: 'ticketNumber',
    label: 'Bon livrare',
    type: 'text',
    filter: <Input type="text" name="ticketNumber" label="Bon livrare" variant="outlined" />
  },
  {
    name: 'noticeNumber',
    label: 'Numar aviz',
    type: 'text',
    filter: <Input type="text" name="noticeNumber" label="Numar aviz" variant="outlined" />
  },
  {
    name: 'nonCompliantReason',
    value: undefined,
    filter: (
      <Autocomplete
        variant="outlined"
        label="Conformitate suport"
        options={nonCompliantReasonOptions || []}
        multiple
      />
    ),
    type: 'autocomplete',
    label: 'Status'
  },
  {
    name: 'createdDate',
    value: currentDate,
    filter: (
      <DatePicker
        label="Selecteaza data de la "
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
    name: 'endedDate',
    value: currentDate,
    filter: (
      <DatePicker
        label="Selecteaza data pana la "
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
