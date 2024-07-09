import { Grid } from '../../../../Common/Grid'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../Common/TitleHeader'
import { TruckCard } from '../../../../admin/Common/TruckCard'
import { URLS } from '../../../constants'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from '../../../../../../utils/api'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'
import React from 'react'
import { CircularProgress } from '@mui/material'

const InProgressReturn = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const { data, isLoading } = useQuery(
    'inProgressReturnReception',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/hub/exit/in-process', null)
    },
    {
      initialData: [],
      onError: error => {
        showNotification({
          message: `Error while fetching trucks. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  let items = [
    <TitleHeader title="RETUR ÎN CURS DE RECEPȚIE" />,
    data &&
      data.map((item: any, index) => (
        <TruckCard
          key={item.id}
          onClick={() => {
            navigate(`${URLS.AUTH_EXPECTED_RETURN_DETAIL_STEP_2}?id=${item.id}`)
          }}
          truck={item}
        />
      )),
    !data && <Typography variant={'medium'}>Nu există camioane de retur în lucru.</Typography>
  ]

  if (isLoading) {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  return (
    <Grid gridContainerStyle={{ marginTop: '20px' }} maxWidth="xs" items={items} itemsPerRow={1} />
  )
}

export default InProgressReturn
