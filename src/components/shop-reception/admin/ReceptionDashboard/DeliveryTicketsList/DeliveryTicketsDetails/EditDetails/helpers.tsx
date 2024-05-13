import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { formatUIDate } from 'utils/helpers'

export const columns = [
  {
    title: 'Numar comanda (INFOLOG)',
    field: 'externalOrderId',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Numar comanda origine',
    field: 'originalOrderId',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Cod suport',
    field: 'supportCode',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Eticheta suport',
    field: 'heterogeneousCode',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Tip suport asteptat',
    field: 'expectedSupportType',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Tip ambalaj secundar asteptat',
    field: 'secondarySupportType',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Status receptie suport',
    field: 'supportStatus',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Cod EAN',
    field: 'eanCode',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'EAN receptionat',
    field: 'eanReceived',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Cod produs',
    field: 'productCode',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Nume produs',
    field: 'productName',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Prioritar vanzare',
    field: 'priorityForSale',
    align: 'left',
    type: 'string',
    width: '120px',
    render: row => (row.priorityForSale ? 'Da' : 'Nu')
  },
  {
    title: 'Unitate de masura',
    field: 'measureUnit',
    align: 'left',
    type: 'string'
  },
  {
    title: 'Cantitate asteptata pe suport',
    field: 'deliveredQuantity',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Cantitate asteptata in comanda',
    field: 'totalDeliveredQuantity',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Cantitate receptionata calitativa',
    field: 'qualitativeQuantity',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Cantitate receptionata deteriorata',
    field: 'defectQuantity',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Diferenta',
    field: 'missingQuantity',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Motiv defectiune',
    field: 'defectReason',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Tip scanare recomandat',
    field: 'recommendedScanType',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Tip scanare suport',
    field: 'scanType',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Numar colete asteptate',
    field: 'secondarySupportNumber',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Produs cu DLC scurt',
    field: 'shortDlc',
    align: 'left',
    type: 'string',
    width: '120px',
    render: row => (row.shortDlc ? 'Da' : 'Nu')
  },
  {
    title: 'Data limita de consum asteptata',
    field: 'dlcDate',
    align: 'left',
    type: 'string',
    width: '120px',

    render: row => formatUIDate(row.dlcDate)
  },
  {
    title: 'Data limita de consum receptionata',
    field: 'dlcDateExcel',
    align: 'left',
    type: 'string',
    width: '120px',
    render: row => formatUIDate(row.dlcDateExcel)
  },
  {
    title: 'Lot',
    field: 'batch',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Produs sensibil',
    field: 'sensitive',
    align: 'left',
    type: 'string',
    width: '120px',
    render: row => (row.sensitive ? 'Da' : 'Nu')
  },
  {
    title: 'Produs verificat',
    field: 'verified',
    align: 'left',
    type: 'string',
    width: '120px',
    render: row => (row.verified ? 'Da' : 'Nu')
  },
  {
    title: 'Produs lipsa',
    field: 'missing',
    align: 'left',
    type: 'string',
    width: '120px',
    render: row => (row.missing ? 'Da' : 'Nu')
  },
  {
    title: 'Magazin',
    field: 'shopName',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Data receptie',
    field: 'receptionDate',
    align: 'left',
    type: 'string',
    width: '120px',
    render: row => formatUIDate(row.receptionDate)
  },
  {
    title: 'Procent valabilitate',
    field: 'validityPercentage',
    align: 'left',
    type: 'string',
    width: '120px'
  },
  {
    title: 'Produs cu SGR',
    field: 'sgr',
    align: 'left',
    type: 'string',
    width: '120px',
    render: row => (row.sgr ? 'Da' : 'Nu')
  }
]

export const drawerFilters = [
  {
    name: 'shopCode',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează cod suport"
        disableClearable
        options={[]}
      />
    ),
    type: 'autocomplete',
    label: 'Selectează cod suport'
  },

  {
    name: 'productCode',
    value: '',
    filter: (
      <Autocomplete variant="outlined" label="Selecteaza produs" disableClearable options={[]} />
    ),
    type: 'autocomplete',
    label: 'Selecteaza produs'
  }
]
