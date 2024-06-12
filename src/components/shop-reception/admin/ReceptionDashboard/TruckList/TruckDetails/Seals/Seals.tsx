import { useParams } from 'react-router-dom'
import { makeCoreGetRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { BasicTable } from '@fullscreendigital/carrefour-dex-fe'
import { useQuery } from 'react-query'
import { columns } from './helpers'
import s from '../../../../../commonStyles.modules.scss'

const Seals = () => {
  const { showNotification } = useNotification()
  const { id } = useParams()

  const shopCode = new URLSearchParams(location.search).get('shopCode')

  const { data } = useQuery(
    ['truck-seals', id],
    async () => {
      if (id) {
        const result = await makeCoreGetRequest(
          `/shop-reception/truck/details/${id}?tab=seals&shopCode=${shopCode}`
        )
        return result
      }
      return null
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea datelor din tabel. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  return (
    <BasicTable
      columns={columns}
      rows={data?.sealModels || []}
      containerProps={{
        className: s.table
      }}
    />
  )
}

export default Seals
