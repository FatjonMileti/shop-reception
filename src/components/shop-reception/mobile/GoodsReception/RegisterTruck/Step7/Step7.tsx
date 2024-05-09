import { Grid } from '../../../../Common/Grid'
import { Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../TitleHeader'
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { makeCoreGetRequest } from "../../../../../../utils/api";
import { formatErrorMessage } from "../../../../../../utils/formatting";
import { useNotification } from "../../../../../../hooks";
import { useState } from "react";

const Step7 = () => {
  const { showNotification } = useNotification()
  const [infoLoaded, setInfoLoaded] = useState(false)
  const navigate = useNavigate()
  let { id } = useParams();

  const { data: manualTruck, isLoading: isLoadingManualTruck} = useQuery(
    'manualTruck',
    async () => {
      return await makeCoreGetRequest('/rm-api/truck/getManualCreatedInfo/' + id, null)
    },
    {
      onSuccess: () => setInfoLoaded(true),
      onError: error => {
        showNotification({
          message: `Error while fetching supports. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: truck, isLoading: isLoadingTruck} = useQuery(
    'truck',
    async () => {
      return await makeCoreGetRequest('/rm-api/truck/' + id, null)
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching supports. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: counter, isLoading: isLoadingCounter} = useQuery(
    'counter',
    async () => {
      return await makeCoreGetRequest('/rm-api/support/counter/' + id, null)
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

  const { data: canReturnToHub, isLoading: isLoadingCanReturnToHub} = useQuery(
    'hubAssigned',
    async () => {
      return await makeCoreGetRequest('rm-api/truck/exit/confirmHubAssigned', null)
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching supports. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  if (isLoadingManualTruck || isLoadingTruck || isLoadingCounter || isLoadingCanReturnToHub) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='ÎNREGISTREAZǍ CAMION' />,
        (manualTruck && !infoLoaded) &&
        <Button
          type='button'
          variant='contained'
          label='CAMION GOL'
          style={{ width: '100%' }}
          onClick={null}
        />,
        (manualTruck && !infoLoaded) &&
        <Button
          type='button'
          variant='contained'
          label='RESIGILEAZĂ CAMION'
          style={{ width: '100%' }}
          onClick={null}
        />,
        (manualTruck && !infoLoaded) &&
        <Button
          type='button'
          variant='contained'
          label='RETUR AMBALAJE'
          style={{ width: '100%' }}
          onClick={null}
          disabled
        />,
        (manualTruck && infoLoaded && canReturnToHub && (truck.flowType === 'OUT_HUB')) &&
        <Button
          type='button'
          variant='contained'
          label='FINALIZEAZĂ CAMION'
          style={{ width: '100%' }}
          onClick={null}
          disabled
        />,
        <>
          <Typography variant='medium' component='p'>Numǎr camion: {counter.truckNumber}</Typography>
          <Typography variant='medium' component='p'>Numǎr suporți scanați: {counter.counter}</Typography>
        </>
      ].filter(Boolean)}
      itemsPerRow={1}
    />
  )
}

export default Step7
