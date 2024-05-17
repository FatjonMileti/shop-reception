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

export const getShopOptions = (showNotification: Function, validateQuery: boolean = true) => {
  return useQuery(
    ['shop-codes'],
    async () => {
      const result = await makeCoreGetRequest('/shop-reception/shops/codes')

      const resultOptions = result.list.map(
        (item: any): AutocompleteOption => ({
          label: item.displayName,
          value: item.code
        })
      )

      return resultOptions || []
    },
    {
      onError: error =>
        handleQueryError(error, 'A aparut o eroare la obtinerea magazinelor.', showNotification)
    }
  )
}

export const getHubOptions = (showNotification: Function, validateQuery: boolean = true) => {
  return useQuery(
    ['hubs'],
    async () => {
      const data = await makeCoreGetRequest('/shop-reception/hubs/accessible')
      return data.map(item => ({
        label: item.displayName,
        value: item.id
      }))
    },
    {
      onError: error =>
        handleQueryError(error, 'A aparut o eroare la obtinerea huburilor.', showNotification)
    }
  )
}

export const getSupportTypeOptions = (
  showNotification: Function,
  validateQuery: boolean = true
) => {
  return useQuery(
    ['hubs'],
    async () => {
      const data = await makeCoreGetRequest('/shop-reception/support-flows/support-types')
      return data.map(item => ({
        label: item.displayName,
        value: item.id
      }))
    },
    {
      onError: error =>
        handleQueryError(
          error,
          'A aparut o eroare la obtinerea tipurilor de suport.',
          showNotification
        )
    }
  )
}

export const getParentSocietyOptions = (
  showNotification: Function,
  validateQuery: boolean = true
) => {
  return useQuery(
    ['parent-societies'],
    async () => {
      const result = await makeCoreGetRequest('/shop-reception/shops/parent-society')
      const resultOptions = result.map(
        (item: string): AutocompleteOption => ({
          label: item,
          value: item
        })
      )
      return resultOptions || []
    },
    {
      onError: error =>
        handleQueryError(error, 'A aparut o eroare la obtinerea societatilor.', showNotification)
    }
  )
}

export const getDepositOptions = (showNotification: Function, validateQuery: boolean = true) => {
  return useQuery(
    ['deposits'],
    async () => {
      const data = await makeCoreGetRequest(`/shop-reception/deposits/accessible`)
      return data.map(item => ({
        label: item.displayName,
        value: item.id
      }))
    },
    {
      onError: error =>
        handleQueryError(error, 'A aparut o eroare la obtinerea depozitelor.', showNotification)
    }
  )
}

export const getStatusOptions = (showNotification: Function, validateQuery: boolean = true) => {
  return useQuery(
    ['status'],
    async () => {
      const data = await makeCoreGetRequest(`/shop-reception/deliveryTicket/statuses`)
      return data.map(item => ({
        label: item.deliveryTicketStatusValue,
        value: item.deliveryTicketStatus
      }))
    },
    {
      onError: error =>
        handleQueryError(error, 'A aparut o eroare la obtinerea depozitelor.', showNotification)
    }
  )
}


export const getLocation = (showNotification: Function, validateQuery: boolean = true) => {
  return useQuery(
    ['location'],
    async () => {
      const data = await makeCoreGetRequest(`/shop-reception/supportTypeFlow`)
      return data.map(item => ({
        label: item.deliveryTicketStatusValue,
        value: item.deliveryTicketStatus
      }))
    },
    {
      onError: error =>
        handleQueryError(error, 'A aparut o eroare la obtinerea locatiilor.', showNotification)
    }
  )
}

