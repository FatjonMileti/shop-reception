import { Grid } from '../../../../../Common/Grid'
import {
  Button,
  Divider,
  IconButton,
  Input,
  Table,
  Typography
} from '@fullscreendigital/carrefour-dex-fe'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useNotification } from '../../../../../../../hooks'
import { getValidationSchema, initialValues } from './helpers'
import React, { useMemo, useState } from 'react'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../../utils/formatting'
import { TitleHeader } from '../../../../Common/TitleHeader'
import { FlexCenter } from '../../../../../Common/FlexCenter'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'
import { useQuery } from 'react-query'
import { makeCoreGetRequest, makeCorePostRequest } from '../../../../../../../utils/api'
import AlertModal from '../../../../Common/AlertModal/AlertModal'
import { URLS } from '../../../../constants'
import { CircularProgress } from '@mui/material'

const RegisterTruckStep2 = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const [counter, setCounter] = useState(0)
  const [isScanSuccessModalOpen, setIsScanSuccessModalOpen] = useState(false)
  const [scanSuccessModalContent, setScanSuccessModalContent] = useState({ title: '', buttons: [] })
  const [isInvalidScanModalOpen, setIsInvalidScanModalOpen] = useState(false)
  const [invalidScanModalContent, setInvalidScanModalContent] = useState({
    title: '',
    description: '',
    buttons: []
  })
  const [params] = useSearchParams()
  const id = params.get('id')

  const { data: truck, isLoading } = useQuery(
    'RTcounter',
    async () => {
      const truck = await makeCoreGetRequest('/shop-reception-mobile/truck/hub/summary/' + id, null)
      setCounter(truck.supportCounter)

      return truck
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

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async () => {
      try {
      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  const toggleIsSearching = async () => {
    try {
      if (formik.values.supportCode.length > 0) {
        const resp = await makeCorePostRequest(
          `/shop-reception-mobile/support/hub/register/scan/${id}`,
          { supportCode: formik.values.supportCode }
        )
        resp.scanSuccess && openScanSuccessModal(resp.message, resp.supportId)
        !resp.scanSuccess && openInvalidScanModal(resp.message)
      }
    } catch (error) {
      showNotification({
        message: `Eroare la trimitere. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const openScanSuccessModal = async (message, supportId) => {
    setScanSuccessModalContent({
      title: message,
      buttons: [
        {
          label: 'Refuză',
          onClick: () => {
            formik.setFieldValue('supportCode', '')
            setIsScanSuccessModalOpen(false)
          },
          color: 'primary'
        },
        {
          label: 'Urc în camion  confirm',
          onClick: async () => {
            try {
              const resp = await makeCorePostRequest(
                `/shop-reception-mobile/support/hub/add-in-truck/${id}`,
                { supportId: supportId }
              )
              formik.resetForm()
              setCounter(resp.supportCounter)
              setIsScanSuccessModalOpen(false)
            } catch (error) {
              showNotification({
                message: `Eroare la trimitere. ${formatErrorMessage(error)}`,
                type: 'error'
              })
            }
          },
          color: 'primary'
        }
      ]
    })
    setIsScanSuccessModalOpen(true)
  }

  const openInvalidScanModal = async message => {
    setInvalidScanModalContent({
      title: 'Atenție!',
      description: message,
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            formik.setFieldValue('supportCode', '')
            setIsInvalidScanModalOpen(false)
          },
          color: 'primary'
        }
      ]
    })
    setIsInvalidScanModalOpen(true)
  }

  const closeScanSuccessModal = () => {
    setIsScanSuccessModalOpen(false)
  }

  const closeInvalidScanModal = () => {
    setIsInvalidScanModalOpen(false)
  }

  const handleSubmit = async () => {
    let time = new Date().toLocaleTimeString()
    let date = new Date().toISOString()
    const payload = {
      receptionTruckId: id,
      supportsNumber: null,
      inHubReleaseDateTime: null,
      inHubPresentationHour: null,
      inHubReleaseHour: null,
      inHubLoadingDateTime: date,
      inHubLoadingHour: time,
      truckNumberHub: truck?.truckNumber,
      driverName: null,
      loadedSupportsNumber: counter,
      inShopReleaseDate: null,
      inShopReleaseHour: null
    }
    try {
      await makeCorePostRequest('/shop-reception-mobile/support-traceability', payload)
      navigate(`${URLS.AUTH_REGISTER_TRUCK_STEP_3}?id=${id}`)
    } catch (error) {
      showNotification({
        message: `Eroare la trimitere. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  if (isLoading) {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth="xs"
      items={[
        <TitleHeader title="ÎNREGISTREAZǍ CAMION" />,
        <FlexCenter>
          <Input
            type="text"
            label="Cod Suport"
            variant="standard"
            width="100%"
            value={formik.values.supportCode}
            onChange={event =>
              formik.setFieldValue('supportCode', (event.target as HTMLInputElement).value)
            }
            error={!!formik.errors.supportCode}
            helperText={formik.errors.supportCode as string}
          />
          <IconButton onClick={toggleIsSearching}>
            <ManageSearchIcon />
          </IconButton>
        </FlexCenter>,
        <Divider>SAU</Divider>,
        <Button
          type="button"
          variant="contained"
          label="Suporți finalizați"
          size="large"
          style={{ width: '100%', display: counter === 0 ? 'none' : 'block' }}
          onClick={() => handleSubmit()}
        />,
        <>
          <Typography variant="medium" component="p">
            Numǎr camion: {truck?.truckNumber}
          </Typography>
          <Typography variant="medium" component="p">
            Numǎr suporți scanați: {counter}
          </Typography>
        </>,
        <AlertModal
          open={isScanSuccessModalOpen}
          handleClose={closeScanSuccessModal}
          title={scanSuccessModalContent.title}
          buttons={scanSuccessModalContent.buttons}
        />,
        <AlertModal
          open={isInvalidScanModalOpen}
          handleClose={closeInvalidScanModal}
          title={invalidScanModalContent.title}
          description={invalidScanModalContent.description}
          buttons={invalidScanModalContent.buttons}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default RegisterTruckStep2
