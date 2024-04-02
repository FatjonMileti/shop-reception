import { BasicTable } from '@fullscreendigital/carrefour-dex-fe'
import s from './ReportsLinks.modules.scss'
import { Link } from 'react-router-dom'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const columns = [
  {
    field: 'reportName',
    title: 'Nume raport'
  },
  {
    field: 'link',
    title: 'Link raport',
    render: row => <Link to={row.link}><OpenInNewIcon /></Link>
  }
]

const rows = [
  { reportName: 'Raport 1', link: 'https://carrefour.ro' },
  { reportName: 'Raport 2', link: 'https://en.wikipedia.org/wiki/Carrefour' }
]

const ReportsLinks = () => {
  return (
    <div className={s.mainContainer}>
      <BasicTable
        columns={columns}
        rows={rows}
        containerProps={{
          className: s.table
        }}
      />
    </div>
  )
}

export default ReportsLinks
