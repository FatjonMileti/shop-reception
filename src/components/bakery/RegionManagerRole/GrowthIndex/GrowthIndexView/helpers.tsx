import { Link } from 'components/core-ui/Link'

export const columns = [
    {
      title: 'Magazin',
      field: 'name',
      align: 'left', 
      render: (row: any) => (
        <Link
          href={`/bakery/regionManager/growthIndexProductsView?id=${row.id}`}
          style={{ textDecoration: 'inherit' }}
        >
          {row.name}
        </Link>
      )     
    },
    {
      title: 'Coeficient',
      field: 'growth',
      align: 'left',
    },
    {
        title: 'Divizie',
        field: 'divisionType',
        align: 'left',
      },
    {
      title: 'Ultima actualizare',
      field: 'username',
      align: 'left',
    },
    {
      title: 'Ultima modificare',
      field: 'lastChange',
      align: 'left',
    }
]

