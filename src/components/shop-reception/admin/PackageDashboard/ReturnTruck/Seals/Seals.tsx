import { BasicTable } from '@fullscreendigital/carrefour-dex-fe'
import { columns } from './helpers'
import s from '../../../../commonStyles.modules.scss'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { CircularProgress } from '@mui/material'
import { toTableRowItems } from './serializers'

const Seals = ({ id }) => {
  const { showNotification } = useNotification()

  const { data: seals, isLoading: isSealDataLoading } = useQuery(
    ['return-truck-seals', id],
    async () => {
      if (id) {
        const result = await makeCoreGetRequest(
          `/shop-reception/return-trucks/${id}/details/tabs/seals`
        )
        return toTableRowItems(result)
      }
      return null
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea sigiliilor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  return isSealDataLoading ? (
    <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  ) : (
    <BasicTable
      columns={columns}
      rows={seals}
      containerProps={{
        className: s.table
      }}
    />
  )
}

export default Seals
