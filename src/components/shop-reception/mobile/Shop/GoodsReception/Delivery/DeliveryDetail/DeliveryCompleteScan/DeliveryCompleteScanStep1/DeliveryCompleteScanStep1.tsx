import { Button, Divider, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { useLocation, useNavigate } from 'react-router-dom'
import { useNotification } from 'hooks'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { CircularProgress, Grid, Paper } from "@mui/material";
import { TitleHeader } from 'components/shop-reception/mobile/Common/TitleHeader'
import { URLS } from 'components/shop-reception/mobile/constants'
import React, { useState } from 'react'
import AlertModal from "../../../../../../Common/AlertModal/AlertModal";

const DeliveryCompleteScanStep1 = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showNotification } = useNotification()

  const { truckId, ticketId } = location.state
  const supportFinalised = location.state.supportFinalised || false;

  const [supportCode, setSupportCode] = useState('')
  const [totalSupportNumber, setTotalSupportNumber] = useState(0)
  const [supportCounter, setSupportCounter] = useState(0)
  const [isSupportScanModalOpen, setIsSupportScanModalOpen] = useState(false)
  const [supportScanModalContent, setSupportScanModalContent] = useState({ title: '', description: '', buttons: [] })

  const { data: ticketSummary, isLoading: isLoadingTicketSummary } = useQuery(
    ['ticket-summary'],
    async () => {
      const response = await makeCoreGetRequest(`/shop-reception-mobile/integral/ticket/summary/${truckId}/${ticketId}`, null)

      setTotalSupportNumber(response.totalSupportNumber)
      setSupportCounter(response.supportCounter)
      return response || []
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const {
    data: scanCode,
    isLoading: isLoadingScanCode,
    refetch: refetchScanCode
  } = useQuery(
    ['truck'],
    async () => {
      const response = await makeCoreGetRequest(`/shop-reception-mobile/integral/support/scan/${supportCode}?truckId=${truckId}&ticketId=${ticketId}`, null)

      if (response.totalSupportNumber > 0) setTotalSupportNumber(response.totalSupportNumber)
      if (response.supportCounter > 0) setSupportCounter(response.supportCounter)

      const scanOk = response.scanSuccess;
      const mess = response.errorMessage;

      if (scanOk !== true) {openSupportScanModal(mess)}
      setSupportCode('')

      return response || []
    },
    {
      onSuccess: data => {
        if (data.errorMessage === null) {
          navigate(URLS.AUTH_DELIVERY_COMPLETE_SCAN_STEP_2, {
            state: { truckId, ticketId, supportCode, data: data }
          })
        } else {
          showNotification({
            message: `${data.errorMessage}`,
            type: 'error'
          })
        }
      },
      onError: error => {
        showNotification({
          message: `A aparut o eroare. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: false
    }
  )

  const openSupportScanModal = msg => {
    setSupportScanModalContent({
      title: 'Atenție!',
      description: msg,
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            setSupportCode('')
            setIsSupportScanModalOpen(false)
          },
          color: 'primary'
        }
      ]
    })
    setIsSupportScanModalOpen(true)
  }

  const closeSupportScanModal = () => {
    setIsSupportScanModalOpen(false)
  }

  if (isLoadingTicketSummary || isLoadingScanCode) {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink/>;
  }

  return (
    <Grid container spacing={2} justifyContent={'center'}>
      <Grid item xs={10}>
        <TitleHeader title="VALIDARE LIVRARE SCANARE INTEGRALǍ" />
      </Grid>

      <Grid item xs={10} mb={2}>
        <Paper elevation={3} style={{ padding: '20px' }} onClick={() => {}}>
          <Typography variant="medium" component="h5">
            SCANARE INTEGRALA
          </Typography>
          <Typography variant="medium" component="p">
            Numar inmatriculare: {ticketSummary?.truckNumber}
          </Typography>
          <Typography variant="medium" component="p">
            BL: {ticketSummary?.ticketNumber}
          </Typography>
          <Typography variant="medium" component="p">
            Suporti verificati: {supportCounter}/{totalSupportNumber}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={10}>
        <Input
          type="search"
          variant="outlined"
          label="Cod suport"
          autoFocus
          id="scan-input"
          value={supportCode}
          onChange={e => {
            const target = e.target as HTMLInputElement
            setSupportCode(target.value)
          }}
          onSearchIconClick={() => {refetchScanCode()}}
          onSearchCloseClick={() => setSupportCode('')}
          width="100%"
        />
      </Grid>

      <Grid item xs={10}>
        <Divider>SAU</Divider>
      </Grid>

      <Grid xs={10} item>
        <Button
          variant="contained"
          label="Scaneaza suport"
          onClick={() => document.getElementById('scan-input').focus()}
          style={{ width: '100%' }}
        />
      </Grid>

      {truckId && supportFinalised && (
        <>
          <Grid xs={10} mt={4} item>
            <Button
              variant="contained"
              label="Finalizeaza BL"
              onClick={() => async () => {
                try {
                  await makeCoreGetRequest(`/shop-reception-mobile/ticket/close/${truckId}/${ticketId}`, null)

                  showNotification({
                    message: `Bonul de livrare a fost validat cu succes.`,
                    type: 'success'
                  })

                  navigate(URLS.AUTH_DELIVERY_DETAIL, {state: {id: truckId}})
                } catch (e) {
                  showNotification({
                    message: `A aparut o eroare. ${formatErrorMessage(e)}`,
                    type: 'error'
                  })
                }
              }}
              style={{ width: '100%' }}
              disabled={totalSupportNumber > supportCounter}
            />
          </Grid>
          <Grid xs={10} item>
            <Button
              variant="contained"
              label="Sumar BL"
              onClick={() => () => {}}
              style={{ width: '100%' }}
            />
          </Grid>
        </>
      )}

      <AlertModal
        open={isSupportScanModalOpen}
        handleClose={closeSupportScanModal}
        title={supportScanModalContent.title}
        description={supportScanModalContent.description}
        buttons={supportScanModalContent.buttons}
      />
    </Grid>
  )
}
export default DeliveryCompleteScanStep1
