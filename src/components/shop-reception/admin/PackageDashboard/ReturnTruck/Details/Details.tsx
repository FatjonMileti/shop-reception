import { BasicTable } from '@fullscreendigital/carrefour-dex-fe'
import { getColumns } from './helpers'
import s from '../../../../commonStyles.modules.scss'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { CircularProgress } from '@mui/material'
import { toTableRowItems } from './serializers'

const Details = ({ id, isForShop }) => {
  const { showNotification } = useNotification()

  const { data: details, isLoading: isDataLoading } = useQuery(
    ['return-truck-details', id],
    async () => {
      if (id) {
        const result = await makeCoreGetRequest(
          `/shop-reception/return-trucks/${id}/details/tabs/details`
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

  return isDataLoading ? (
    <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  ) : (
    <BasicTable
      columns={getColumns(isForShop)}
      rows={details}
      containerProps={{
        className: s.table
      }}
    />
  )
}

export default Details
