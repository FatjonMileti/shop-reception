import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { handleQueryError } from 'utils/helpers'
import { toDepositTypesOptions } from './serializers'

export const getDepositTypesOptions = (
  showNotification: Function,
  validateQuery: boolean = true
) => {
  return useQuery(
    ['deposit-type-options'],
    async () => {
      // const types = await makeCoreGetRequest('/shop-reception/deposit-types')
      const types = [
        {
          id: 1,
          name: 'test1'
        },
        {
          id: 2,
          name: 'test2'
        }
      ]
      return toDepositTypesOptions(types) || []
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
