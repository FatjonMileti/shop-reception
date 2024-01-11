import { ImageCell } from 'components/core-ui/ImageCell'
import { Link } from 'components/core-ui/Link'

export const divisionTypes = [
    { label: 'Super', value: 'SUPER' }, 
    { label: 'Hyper', value: 'HYPER' },
    { label: 'Hyper&Super', value: 'HYPER_AND_SUPER'},
    { label: 'Ingrediente', value: 'INGREDIENTS'}
]

  export const famInBakeryScopes = [
      { label: "Da", value: "Da" },
      { label: "Nu", value: "Nu" }
  ]

export const columns = [
  {
    title: 'Cod',
    field: 'code',
    align: 'left'
  },
  {
    title: 'Nume familie',
    field: 'name',
    align: 'left',
    render: (row: any) => (
      <Link
        href={`/bakery/admin/family-products?id=${row.id}`}
        style={{ textDecoration: 'inherit' }}
      >
        {row.name}
      </Link>
    )
  },
  {
    title: 'Divizie',
    field: 'divisionType',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Modul',
    field: 'moduleName',
    align: 'left',
    collapsible: true
  }
]

export const columnsFamilyProducts = [
  {
    title: 'Produs',
    field: 'name',
    align: 'left',
    render: (row: any) => (
      <ImageCell imageUrl={row.imageUrl} value={row.name} />
    )
  },
  {
    title: 'Nume subfamilie',
    field: 'subfamily',
    align: 'left'
  },
]

export const getInitialValues = editItem => ({
    id: editItem?.id ?? '',
    code: editItem?.code ?? '',
    name: editItem?.name ?? '',
    enable: editItem?.enable ? "Da" : "Nu",
    divisionType: editItem?.divisionType ?? '',
    moduleName: editItem?.moduleName ?? '',
    moduleId: editItem?.moduleId ?? ''
})

