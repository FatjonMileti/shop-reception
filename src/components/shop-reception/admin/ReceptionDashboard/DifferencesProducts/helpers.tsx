import { Autocomplete, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import dayjs from 'dayjs'
import { formatUIDate } from 'utils/helpers'

export const columns = downloadImage => [
  {
    title: 'Bon livrare',
    field: 'externalTicketId',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Magazin',
    field: 'shopName',
    align: 'left',
    type: 'string',
    render: row => row.shopName
  },
  {
    title: 'Depozit',
    field: 'depositName',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Nume produs',
    field: 'productCode',
    align: 'left',
    type: 'string',
    render: row => row.productName
  },
  {
    title: 'Comandǎ de origine',
    field: 'originalOrderId',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Comandǎ Meti',
    field: 'metiOrderId',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Unitate de mǎsurǎ',
    field: 'measureUnit',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Cantitate așteptatǎ',
    field: 'orderedQuantity',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Cantitate receptionată calitativă',
    field: 'receivedQuantity',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Cantitate receptionată defectǎ',
    field: 'brokenQuantity',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Abatere (grame)',
    field: 'receptionDeviation',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Cantitate trimisǎ în stoc',
    field: 'stockQuantity',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Diferențǎ',
    field: 'missingQuantity',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Cod cursǎ',
    field: 'transporterCode',
    align: 'left',
    type: 'string',
    disableSorting: true
  },
  {
    title: 'Datǎ trimitere către Meti',
    field: 'created',
    align: 'left',
    type: 'string',
    render: row => formatUIDate(row.metiSentDate)
  },
  {
    title: 'Operator integrare',
    field: 'integrationOperator',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Descarca imagini',
    align: 'left',
    field: 'archivePath',
    type: 'string',
    render: row =>
      row.archivePath ? (
        <div style={{ cursor: 'pointer' }} onClick={() => downloadImage(row.id)}>
          Da
        </div>
      ) : (
        <div>Nu</div>
      ),
    disableSorting: true
  }
]

export const drawerFilters = (shopCodes, metiRayons, despositOptions) => [
  {
    name: 'ticketNumber',
    value: '',
    filter: <Input variant="outlined" label="Bon livrare" type="text" />,
    type: 'text',
    label: 'Bon livrare'
  },
  {
    name: 'shopCode',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează magazin"
        disableClearable
        options={shopCodes || []}
      />
    ),
    type: 'autocomplete',
    label: 'Selectează magazin'
  },
  {
    name: 'depositCode',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează depozit"
        disableClearable
        options={despositOptions || []}
      />
    ),
    type: 'autocomplete',
    label: 'Selectează depozit'
  },
  {
    name: 'productCode',
    value: '',
    filter: <Input variant="outlined" label="Cod produs" type="text" />,
    type: 'text',
    label: 'Cod produs'
  },
  {
    name: 'originalOrderId',
    value: '',
    filter: <Input variant="outlined" label="Comandă de origine" type="text" />,
    type: 'text',
    label: 'Comandă de origine'
  },
  {
    name: 'metiOrderId',
    value: '',
    filter: <Input variant="outlined" label="Comandă Meti" type="text" />,
    type: 'text',
    label: 'Comandă Meti'
  },
  {
    name: 'transportCode',
    value: '',
    filter: <Input variant="outlined" label="Cod cursa" type="text" />,
    type: 'text',
    label: 'Cod cursa'
  },
  {
    name: 'metiSentDate',
    value: '',
    filter: (
      <DatePicker
        label="Selecteaza data METI"
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
    label: 'Selecteaza data METI'
  },
  {
    name: 'hasImage',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Imagini"
        disableClearable
        options={[
          {
            value: 'true',
            label: 'Da'
          },

          {
            value: 'false',
            label: 'Nu'
          }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Imagini'
  }
]
