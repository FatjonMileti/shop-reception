import { ImageCell } from 'components/core-ui/ImageCell'

export const columns = [
    {
      title: 'Produs',
      field: 'name',
      align: 'left',
			render: (row: any) => (
				<ImageCell imageUrl={row.imageUrl} value={row.name} />
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
			field: 'familyModuleName',
			align: 'left',
    }
  ]

export const getInitialValues = editItem => ({
    id: editItem?.id ?? '',
    name: editItem?.name ?? '',
    metiCode: editItem?.metiCode ?? '',
		familyModuleName: editItem?.familyModuleName ?? ''
})

