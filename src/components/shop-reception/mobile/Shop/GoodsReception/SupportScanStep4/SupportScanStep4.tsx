import { Grid } from '../../../../Common/Grid'
import { Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../Common/TitleHeader'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from '../../../../../../utils/api'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'
import { useState } from 'react'
import AlertModal from '../../../Common/AlertModal/AlertModal'
import { URLS } from '../../../constants'
import { CircularProgress } from '@mui/material'

const SupportScanStep4 = () => {
  const { showNotification } = useNotification();
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [isEmptyTruckModalOpen, setIsEmptyTruckModalOpen] = useState(false);
  const [finalizeEmptyTruckContent, setEmptyTruckModalContent] = useState({
    title: '',
    description: '',
    buttons: []
  });
  const [isFinalizedTruckModalOpen, setIsFinalizedTruckModalOpen] = useState(false)
  const [finalizeTruckContent, setFinalizedTruckModalContent] = useState({
    title: '',
    description: '',
    buttons: []
  });
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state || '';

  const { data: manualTruck, isLoading: isLoadingManualTruck } = useQuery(
    'manualTruck',
    async () => {
      return await makeCoreGetRequest(
        '/shop-reception-mobile/truck/shop/manual-created-info/' + id,
        null
      )
    },
    {
      onSuccess: () => setInfoLoaded(true),
      onError: error => {
        showNotification({
          message: `Error while fetching truck. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: truck, isLoading: isLoadingTruck } = useQuery(
    'truck',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/shop/' + id, null)
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching truck. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: counter, isLoading: isLoadingCounter } = useQuery(
    'counter',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/support/shop/counter/' + id, null)
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching truck. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: canReturnToHub, isLoading: isLoadingCanReturnToHub } = useQuery(
    'hubAssigned',
    async () => {
      return await makeCoreGetRequest(
        '/shop-reception-mobile/truck/shop/exit/confirm-hub-assigned',
        null
      )
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching hub data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const finalizeTruck = destination => {
    try {
      makeCoreGetRequest('/shop-reception-mobile/support/shop/finalise/' + id, null).then()

      if (destination === 'home') {
        navigate('/goodsReception')
      } else if (destination === 'return') {
        navigate(URLS.AUTH_RETURN_STEP_1, {
          state: {
            truckNumber: truck?.truckNumber,
            driverName: truck?.driverName
          }
        })
      }
    } catch (error) {
      showNotification({
        message: `Error while finalizing truck. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const openEmptyTruckModal = () => {
    setEmptyTruckModalContent({
      title: 'Camionul nu mai conţine suporţi de descărcat în nici o altă destinaţie! Confirmaţi: ',
      description: '',
      buttons: [
        {
          label: 'Da',
          onClick: () => {
            finalizeTruck('home')
            setIsEmptyTruckModalOpen(false)
          },
          color: 'primary'
        },
        {
          label: 'Nu',
          onClick: () => {
            setIsEmptyTruckModalOpen(false)
          },
          color: 'secondary'
        }
      ]
    })
    setIsEmptyTruckModalOpen(true)
  }

  const closeEmptyTruckModal = () => {
    setIsEmptyTruckModalOpen(false)
  }

  const openFinalizeTruckModal = () => {
    setFinalizedTruckModalContent({
      title: 'Confirmaţi finalizarea recepţiei camionului?',
      description: '',
      buttons: [
        {
          label: 'Da',
          onClick: () => {
            finalizeTruck('home')
            setIsFinalizedTruckModalOpen(false)
          },
          color: 'primary'
        },
        {
          label: 'Nu',
          onClick: () => {
            setIsFinalizedTruckModalOpen(false)
          },
          color: 'secondary'
        }
      ]
    })
    setIsFinalizedTruckModalOpen(true)
  }

  const closeFinalizeTruckModal = () => {
    setIsFinalizedTruckModalOpen(false)
  }

  if (isLoadingManualTruck || isLoadingTruck || isLoadingCounter || isLoadingCanReturnToHub) {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth="xs"
      items={[
        <TitleHeader title="ÎNREGISTREAZǍ CAMION" />,
        !manualTruck && infoLoaded && (
          <Button
            type="button"
            variant="contained"
            label="CAMION GOL"
            style={{ width: '100%' }}
            onClick={openEmptyTruckModal}
          />
        ),
        !manualTruck && infoLoaded && (
          <Button
            type="button"
            variant="contained"
            label="RESIGILEAZĂ CAMION"
            style={{ width: '100%' }}
            onClick={() => {
              navigate(URLS.AUTH_SUPPORT_SCAN_STEP_5, {state: id})
            }}
          />
        ),
        !manualTruck && infoLoaded && canReturnToHub && truck.flowType === 'OUT_HUB' && (
          <Button
            type="button"
            variant="contained"
            label="RETUR AMBALAJE"
            style={{ width: '100%' }}
            onClick={() => {
              finalizeTruck('return')
            }}
          />
        ),
        manualTruck && infoLoaded && (
          <Button
            type="button"
            variant="contained"
            label="FINALIZEAZĂ CAMION"
            style={{ width: '100%' }}
            onClick={openFinalizeTruckModal}
          />
        ),
        <AlertModal
          open={isEmptyTruckModalOpen}
          handleClose={closeEmptyTruckModal}
          title={finalizeEmptyTruckContent.title}
          description={finalizeEmptyTruckContent.description}
          buttons={finalizeEmptyTruckContent.buttons}
        />,
        <AlertModal
          open={isFinalizedTruckModalOpen}
          handleClose={closeFinalizeTruckModal}
          title={finalizeTruckContent.title}
          description={finalizeTruckContent.description}
          buttons={finalizeTruckContent.buttons}
        />,
        <>
          <Typography variant="medium" component="p">
            Numǎr camion: {counter?.truckNumber}
          </Typography>
          <Typography variant="medium" component="p">
            Numǎr suporți scanați: {counter?.counter}
          </Typography>
        </>
      ].filter(Boolean)}
      itemsPerRow={1}
    />
  )
}

export default SupportScanStep4
