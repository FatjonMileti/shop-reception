import { Grid } from "../../../../Common/Grid";
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from "../../../Common/TitleHeader";
import { TruckCard } from "../../../../admin/Common/TruckCard";
import { URLS } from '../../../constants'
import { useNavigate } from 'react-router-dom'
import { useQuery } from "react-query";
import { makeCoreGetRequest } from "../../../../../../utils/api";
import { formatErrorMessage } from "../../../../../../utils/formatting";
import { useNotification } from "../../../../../../hooks";
import React from "react";




const ExpectedReturns = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const { data: truckList, isLoading} = useQuery(
    'exceptedReturnsTrucks',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/hub/exit/list', null)
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching trucks. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  if (isLoading) {
    return <div>Loading...</div>;
  }



  let items = [
    <TitleHeader title='RETURURI AȘTEPTATE' />,
    ...truckList.map((item: any, index) => (
      <TruckCard
        key={index}
        onClick={() => {
          navigate(URLS.AUTH_EXPECTED_RETURN_DETAIL, { state: {item} })
        }}
        truck={item}
      />
    ))
  ]

  if (items.length === 0) {
    items.push(<Typography variant='light' component='p' style={{ textAlign: 'center', textTransform: 'uppercase' }}>
      Nu existǎ camioane de retur în așteptare.</Typography>)
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={items}
      itemsPerRow={1}
    />
  )
}

export default ExpectedReturns