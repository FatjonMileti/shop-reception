import { BooleanIcon } from 'components/core-ui/BooleanIcon'
import { ImageCell } from 'components/core-ui/ImageCell'

export const batchValues = [
  { label: "Da", value: "Da" },
  { label: "Nu", value: "Nu" }
]

export const columns = [
    {
      title: 'Produs',
      field: 'name',
      align: 'left',
        render: (row: any) => (
          <ImageCell imageUrl={row.imageUrl} value={row.productName} />
        )
    },
    {
      title: 'Cod METI',
      field: 'metiCode',
      align: 'left'
    },
    {
      title: 'Cod Plu',
      field: 'pluCode',
      align: 'left',
    },
    {
      title: "Familie",
      field: 'familyName',
      align: 'left',
    },
    {
      title: "Lot",
      field: 'batch',
      align: 'left',
      render: row => (
        <BooleanIcon value={row.batch} icon="Flag" onFailure='#FFFFFF' onSuccess='#33691E' />
      ) 
    }
  ]

export const getInitialValues = editItem => ({
    batch: editItem?.batch ? 'Da' : 'Nu',
    minStock: editItem?.minStock ?? '',
    scheduleProduct: editItem?.scheduleProduct
})

