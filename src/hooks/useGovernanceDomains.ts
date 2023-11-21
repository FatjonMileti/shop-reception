import { useDispatch } from 'react-redux'
import { GovernanceDomainsActions } from 'reducers/domainsSlice'
import { GovernanceDomainModel } from 'shared/interfaces'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import useNotification from './useNotification'

export const useGovernanceDomains = () => {
  const dispatch = useDispatch()
  const { showNotification } = useNotification()

  const dispatchFetchDomains = async () => {
    try {
      const domains = (await makeCoreGetRequest('/governance/domains')) as GovernanceDomainModel[]
      dispatch(GovernanceDomainsActions.setData(domains))
    } catch (error) {
      dispatch(GovernanceDomainsActions.setData([]))
      showNotification({
        message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return { dispatchFetchDomains }
}

export default useGovernanceDomains
