import { Autocomplete, Input } from '@fullscreendigital/carrefour-dex-fe'
import { formatUIDate } from 'utils/helpers'

export const columns = [
  {
    title: 'Cod produs',
    field: 'prodCode',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'Nume produs',
    field: 'prodName',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'Comanda de origine',
    field: 'originalOrderId',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'Unitate de masura',
    field: 'unitCode',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'Cantitate asteptata',
    field: 'expectedQuantity',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'Cantitate receptionata calitativa',
    field: 'receivedQuantity',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'Cantitate receptionata defecta',
    field: 'defectQuantity',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'Abatere (gramaj)',
    field: 'deviation',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'Cantitate trimisa in stoc',
    field: 'stockQuantity',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'Diferenta',
    field: 'missingQuantity',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'DLC minim',
    field: 'dlc',
    align: 'left',
    type: 'string',
    width: '70px',
    render: row => formatUIDate(row.dlc)
  },
  {
    title: 'Lot',
    field: 'batch',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'Cod cursa',
    field: 'transportCode',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'Numar inmatriculare',
    field: 'truckNumber',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'Sofer',
    field: 'driverCode',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'Comanda Meti',
    field: 'metiOrderId',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'Status comanda Meti',
    field: 'metiOrderStatus',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'Cantitate meti',
    field: 'metiQuantity',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'Cod prestator',
    field: 'metiSupplier',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'Cod rezultat',
    field: 'metiResultCode',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'Eroare meti',
    field: 'metiError',
    align: 'left',
    type: 'string',
    width: '70px'
  }
]

export const drawerFilters = [
  {
    name: 'productCode',
    filter: <Input variant="outlined" label="Cod produs" type="text" />,
    type: 'text',
    label: 'Cod produs'
  },
  {
    name: 'productName',
    filter: <Input variant="outlined" label="Nume produs" type="text" />,
    type: 'text',
    label: 'Nume produs'
  },
  {
    name: 'originalOrderId',
    filter: <Input variant="outlined" label="Comanda de origine" type="text" />,
    type: 'text',
    label: 'Comanda de origine'
  },
  {
    name: 'transportCode',
    filter: <Input variant="outlined" label="Cod cursa" type="text" />,
    type: 'text',
    label: 'Cod cursa'
  },
  {
    name: 'metiOrderId',
    filter: <Input variant="outlined" label="Comanda METI" type="text" />,
    type: 'text',
    label: 'Comanda METI'
  },
  {
    name: 'metiOrderStatus',
    filter: <Input variant="outlined" label="Status comanda METI" type="text" />,
    type: 'text',
    label: 'Status comanda METI'
  },
  {
    name: 'hasError',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează cu erori"
        disableClearable
        options={[
          { label: 'Da', value: 'true' },
          { label: 'Nu', value: 'false' }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Cu erori'
  },
  {
    name: 'hasMetiDifference',
    value: '',
    filter: (
      <Autocomplete
        variant="outlined"
        label="Selectează cu diferente METI"
        disableClearable
        options={[
          { label: 'Da', value: 'true' },
          { label: 'Nu', value: 'false' }
        ]}
      />
    ),
    type: 'autocomplete',
    label: 'Cu diferente METI'
  }
]
