import { Link } from 'react-router-dom'

export const columns = [
  {
    title: 'Cod suport',
    field: 'supportCode',
    type: 'string',
    render: row => (
      <Link to={`/shop-reception/reception/deliverySupportAction/${row.supportCode}`}>
        {row.supportCode}
      </Link>
    )
  },
  {
    title: 'Etichetă suport',
    field: 'heterogeneousCode',
    type: 'string'
  },
  {
    title: 'Status recepţie suport',
    field: 'supportStatusValue',
    type: 'string'
  },
  {
    title: 'Bon livrare',
    field: 'ticketExternalId',
    type: 'string',
    render: row => (
      <Link to={`/shop-reception/reception/deliverySlips/${row.ticketId}`}>
        {row.ticketExternalId}
      </Link>
    )
  },
  {
    title: 'Nume depozit',
    field: 'depositName',
    type: 'string'
  },
  {
    title: 'Magazin aşteptat',
    field: 'shopName',
    type: 'string'
  },
  {
    title: 'Magazin recepţionat',
    field: 'receivingShopName',
    type: 'string'
  },
  {
    title: 'Ordine scanare',
    field: 'shopScanOrder',
    type: 'string'
  }
]
