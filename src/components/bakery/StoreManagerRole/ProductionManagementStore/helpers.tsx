import { Box, Typography } from '@mui/material'
import { BooleanIcon } from 'components/core-ui/BooleanIcon'
import { BooleanText } from 'components/core-ui/BooleanText'
import { ImageCell } from 'components/core-ui/ImageCell'

import * as Yup from 'yup'
import { EditProductionItem } from './interfaces'
import { formatBakeryPayloadDate } from 'utils/helpers'

export const columns = openMetiModal => [
  {
    title: 'Produs',
    field: 'productName',
    align: 'left',
    render: (row: any) => (
      <Box display="flex">
        <ImageCell value={row.productName} imageUrl={row.imageUrl} />
      </Box>
    ),
    sticky: true,
    width: '200px',
    type: 'string',
    defaultPrintSelected: true
  },
  {
    title: 'Cod METI',
    field: 'productMetiCode',
    align: 'left',
    width: '100px',
    sticky: true,
    type: 'string',
    defaultPrintSelected: true,
    render: row => (
      <span style={{ cursor: 'pointer', color: '#2781E8' }} onClick={() => openMetiModal(row)}>
        {row.productMetiCode}
      </span>
    )
  },
  {
    title: 'Familie',
    field: 'familyName',
    align: 'left',
    type: 'string',
    defaultPrintSelected: false
  },
  {
    title: 'Subfamilie',
    field: 'subfamily',
    align: 'left',
    type: 'string',
    defaultPrintSelected: false
  },
  {
    title: 'MV',
    field: 'average',
    align: 'left',
    disableSorting: false,
    minWidth: '70px',
    type: 'string',
    defaultPrintSelected: false
  },
  {
    title: 'CP',
    field: 'calculation',
    align: 'left',
    disableSorting: false,
    minWidth: '70px',
    type: 'string',
    defaultPrintSelected: true
  },
  {
    title: 'CM',
    field: 'quantityToProduce',
    align: 'left',
    disableSorting: false,
    minWidth: '70px',
    type: 'string',
    defaultPrintSelected: false
  },

  {
    title: 'MV',
    field: 'average',
    align: 'left',
    disableSorting: false,
    minWidth: '70px',
    isGroup: true,
    type: 'string',
    defaultPrintSelected: false
  },
  {
    title: 'CP',
    field: 'calculation',
    align: 'left',
    disableSorting: false,
    minWidth: '70px',
    isGroup: true,
    type: 'string',
    defaultPrintSelected: true
  },
  {
    title: 'CM',
    field: 'quantityToProduce',
    align: 'left',
    disableSorting: false,
    minWidth: '70px',
    isGroup: true,
    type: 'string',
    defaultPrintSelected: false
  },

  {
    title: 'Gama produs',
    field: 'clusterMandatory',
    align: 'left',
    type: 'string',
    render: (row: any) => (
      <Box>
        <BooleanText value={row.clusterMandatory} onSuccess="O" onFailure="F" />
      </Box>
    )
  },
  {
    title: 'Oferta in ziua respectiva',
    field: 'inPromotion',
    align: 'left',
    type: 'boolean',
    render: (row: any) => (
      <Box>
        <BooleanIcon
          value={row.inPromotion}
          icon={'Flag'}
          onSuccess="#33691E"
          onFailure="#E5E5E5"
        />
      </Box>
    ),
    minWidth: '100px'
  },
  {
    title: 'Produs nou',
    field: 'newProduct',
    align: 'left',
    type: 'boolean',
    render: (row: any) => (
      <Box>
        <BooleanIcon value={row.newProduct} icon={'Flag'} onSuccess="#33691E" onFailure="#E5E5E5" />
      </Box>
    )
  },
  {
    title: 'Ultima persoana care a modificat fisierul',
    field: 'username',
    align: 'left',
    minWidth: '200px',
    type: 'string'
  }
]

export const getInitialValues = (editItem?: EditProductionItem) => {
  return (
    editItem || {
      map: {
        interval1: {
          quantityToProduce: editItem?.map?.interval1?.quantityToProduce ?? 0
        },
        interval2: {
          quantityToProduce: editItem?.map?.interval2?.quantityToProduce ?? 0
        },
        interval3: {
          quantityToProduce: editItem?.map?.interval3?.quantityToProduce ?? 0
        },
        interval4: {
          quantityToProduce: editItem?.map?.interval4?.quantityToProduce ?? 0
        },
        interval5: {
          quantityToProduce: editItem?.map?.interval5?.quantityToProduce ?? 0
        }
      }
    }
  )
}

export const editStoreValidationSchema = Yup.object().shape({
  map: Yup.object()
    .shape({
      interval1: Yup.object().shape({
        quantityToProduce: Yup.number().required()
      }),
      interval2: Yup.object().shape({
        quantityToProduce: Yup.number().required()
      }),
      interval3: Yup.object().shape({
        quantityToProduce: Yup.number().required()
      }),
      interval4: Yup.object().shape({
        quantityToProduce: Yup.number().required()
      }),
      interval5: Yup.object().shape({
        quantityToProduce: Yup.number().required()
      })
    })
    .required()
})

export const salesColumns = [
  {
    title: 'Ziua',
    field: 'date',
    align: 'left',
    minWidth: '200px',
    type: 'string'
  },

  {
    title: '06:00 - 10:00',
    field: 'interval1',
    align: 'left',
    minWidth: '200px',
    type: 'string'
  },

  {
    title: '10:00 - 14:00',
    field: 'interval2',
    align: 'left',
    minWidth: '200px',
    type: 'string'
  },

  {
    title: '14:00 - 18:00',
    field: 'interval3',
    align: 'left',
    minWidth: '200px',
    type: 'string'
  },

  {
    title: '18:00 - 22:00',
    field: 'interval4',
    align: 'left',
    minWidth: '200px',
    type: 'string'
  },

  {
    title: '22:00 - 06:00',
    field: 'interval5',
    align: 'left',
    minWidth: '200px',
    type: 'string'
  }
]

export const stockColumns = [
  {
    title: 'Data',
    field: 'date',
    align: 'left',
    minWidth: '200px',
    type: 'string',
    render: row => formatBakeryPayloadDate(row.date)
  },

  {
    title: 'Stoc minim de prezentare',
    field: 'minStock',
    align: 'left',
    minWidth: '400px',
    type: 'string'
  }
]
