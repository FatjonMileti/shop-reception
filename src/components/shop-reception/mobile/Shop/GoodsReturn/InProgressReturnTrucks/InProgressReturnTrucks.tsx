import { Grid } from '../../../../Common/Grid'
import { TitleHeader } from '../../../Common/TitleHeader'
import { URLS } from '../../../constants'
import { useNavigate } from 'react-router-dom'
import { TruckCard } from '../../../../admin/Common/TruckCard'
import {useQuery} from "react-query";
import {makeCoreGetRequest} from "../../../../../../utils/api";
import {formatErrorMessage} from "../../../../../../utils/formatting";
import { useState } from "react";
import {useNotification} from "../../../../../../hooks";

const ReceptionProcessing = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const [hasTrucks, setHasTrucks] = useState(false)

  const { data: truckList, isLoading} = useQuery(
    'inProgressTrucks',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/exit/in_progress', null)
    },
    {
      onSuccess: (data) => {
        data.length > 0 ? setHasTrucks(true) : setHasTrucks(false);
      },
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
        hasTrucks ? truckList.map((item: any, index) => (
          <TruckCard
            key={item.id}
            onClick={() => {
              navigate(URLS.AUTH_RETURN_STEP_2, { state: { id: item.id } })
            }}
            truck={item}
          />
        )) :
        <div style={{ textAlign: 'center' }}>Nu există camioane în lucru.</div>
      ]}
      itemsPerRow={1}
    />
  )
}

export default ReceptionProcessing
