import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { handleQueryError } from 'utils/helpers'
import { toDepositTypesOptions } from './serializers'
import { DEPOSIT_TYPES } from './AdminDashboard/AdminDeposit/AdminDepositModal/constants'

export const getDepositTypesOptions = (
  showNotification: Function,
  validateQuery: boolean = true
) => {
  return useQuery(
    ['deposit-type-options'],
    async () => {
      // const types = await makeCoreGetRequest('/shop-reception/deposit-types')
      // TODO get the list from an endpoint
      return toDepositTypesOptions(DEPOSIT_TYPES) || []
    },
    {
      onError: error =>
        handleQueryError(
          error,
          'A aparut o eroare la obtinerea tipurilor de depozit.',
          showNotification
        ),

      enabled: validateQuery
    }
  )
}
