import { Grid } from '../../../Common/Grid'
import { TitleHeader } from '../../TitleHeader'
import { URLS } from '../../constants'
import { useNavigate } from 'react-router-dom'
import { TruckCard } from '../../../admin/Common/TruckCard'
import {useQuery} from "react-query";
import {makeCoreGetRequest} from "../../../../../utils/api";
import {formatErrorMessage} from "../../../../../utils/formatting";
import React from "react";
import {useNotification} from "../../../../../hooks";

const ReceptionProcessing = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const { data: truckList, isLoading} = useQuery(
    'inProgressTrucks',
    async () => {
        return await makeCoreGetRequest('/rm-api/truck/list/in_progress', null)
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

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='Procesarea Recepției' />,
        ...truckList.map((item: any, index) => (
          <TruckCard
            //key={item.id}
            onClick={() => {
              navigate(URLS.AUTH_SUPPORT_CODE, { state: { item } })
            }}
            truck={item}
          />
        ))
      ]}
      itemsPerRow={1}
    />
  )
}

export default ReceptionProcessing
