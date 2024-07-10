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

const ExpectedReturns = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const { data: truckList, isLoading } = useQuery(
    'exceptedReturnsTrucks',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/hub/exit', null)
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
    <TitleHeader title="RETURURI AȘTEPTATE" />,
    truckList &&
      truckList.map((item: any, index) => (
        <TruckCard
          key={index}
          onClick={() => {
            navigate(`${URLS.AUTH_EXPECTED_RETURN_DETAIL}?id=${item.id}`)
          }}
          truck={item}
        />
      )),
    !truckList && (
      <Typography variant={'medium'}>Nu există camioane de retur în aşteptare.</Typography>
    )
  ]

  if (isLoading) {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  return (
    <Grid gridContainerStyle={{ marginTop: '20px' }} maxWidth="xs" items={items} itemsPerRow={1} />
  )
}

export default ExpectedReturns
