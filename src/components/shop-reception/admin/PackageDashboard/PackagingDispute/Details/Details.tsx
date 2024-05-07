import { useMemo } from 'react'
import { BasicTable } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../../../commonStyles.modules.scss'
import { getColumns, getDownloadUrl } from './helpers'
import { makeCoreGetFileRequest, makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { formatAndDownloadResponse, handleQueryError } from 'utils/helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { useMutation, useQuery } from 'react-query'
import { toResponsibleOptions } from './serializers'

const Details = ({
  list,
  showMessage,
  showResponsibility,
  depositUserClassified,
  refreshData,
  showAccept
}) => {
  const { showNotification } = useNotification()

  const downloadImages = async (supportId, type) => {
    try {
      const url = getDownloadUrl(supportId, type)
      const response = await makeCoreGetFileRequest(url, {
        responseType: 'blob'
      })
      formatAndDownloadResponse(response)
    } catch (error) {
      showNotification({
        message: `Error while download file. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const mutateAccepted = async ({ value, supportId }) => {
    const val = value.value === 'DA'
    await makeCorePostRequest(
      `/shop-reception/return-litigation/details/supports/${supportId}/save-accept?option=${val}`
    )
  }

  const { mutate } = useMutation(mutateAccepted, {
    onSuccess: res => {
      showNotification({
        message: 'Schimbarile au fost salvate cu succes',
        type: 'success'
      })
      refreshData()
    },
    onError: error =>
      handleQueryError(error, 'A aparut o eroare la salvarea campului Accepta.', showNotification)
  })

  const { data: responsibleOptions } = useQuery(
    ['responsible'],
    async () => {
      const result = await makeCoreGetRequest(
        '/shop-reception/return-litigation/details/responsible'
      )
      return toResponsibleOptions(result)
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea detaliilor litigiului. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  const mutateResponsible = async ({ value, supportId }) => {
    await makeCorePostRequest(
      `/shop-reception/return-litigation/details/supports/${supportId}/save-deposit-option?responsibilityType=${value}`
    )
  }

  const { mutate: updateResponsible } = useMutation(mutateResponsible, {
    onSuccess: res => {
      showNotification({
        message: 'Schimbarile au fost salvate cu succes',
        type: 'success'
      })
      refreshData()
    },
    onError: error =>
      handleQueryError(error, 'A aparut o eroare la salvarea campului Accepta.', showNotification)
  })

  const columns = useMemo(
    () =>
      getColumns({
        downloadImages,
        showMessage,
        updateAccepted: mutate,
        showResponsibility,
        depositUserClassified,
        responsibleOptions,
        updateResponsible,
        showAccept
      }),
    [responsibleOptions, showMessage, showResponsibility]
  )

  return (
    <BasicTable
      columns={columns}
      rows={list}
      containerProps={{
        className: s.table
      }}
    />
  )
}

export default Details
