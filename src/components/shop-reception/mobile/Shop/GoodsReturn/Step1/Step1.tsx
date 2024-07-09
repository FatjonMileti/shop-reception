import { Grid } from '../../../../Common/Grid'
import { Button, Checkbox, Input } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../Common/TitleHeader'
import { useEffect, useMemo, useState } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'
import { useQuery } from 'react-query'
import { makeCoreGetRequest, makeCorePostRequest } from '../../../../../../utils/api'
import { URLS } from '../../../constants'
import { useLocation, useNavigate } from 'react-router-dom'
import AlertModal from '../../../Common/AlertModal/AlertModal'
import { CircularProgress } from '@mui/material'

const Step1 = () => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()
  const [isInProgressModalOpen, setIsInProgressModalOpen] = useState(false)
  const [inProgressModalContent, setInProgressModalContent] = useState({
    title: '',
    description: '',
    buttons: []
  })
  const [isChep, setIsChep] = useState(false)
  const [readOnly, setReadOnly] = useState(false)
  const [truckId, setTruckId] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const truckNumber = location.state?.truckNumber
    const driverName = location.state?.driverName

    if (truckNumber) {
      formik.setFieldValue('registrationNumber', truckNumber)
    }

    if (driverName) {
      formik.setFieldValue('driver', driverName)
    }

    if (truckNumber && driverName) {
      setReadOnly(true)
    }
  }, [location])

  // TODO when navigating back from step 2 set the fields with the correct information
  // if (params['truckId'] !== undefined) {
  //   readOnlyFields = params['hubFlow'];
  //   truckId = params['truckId'];
  //   loadReturnTruck(this.savedTruckId);
  //   loadDepositList(false);
  // }

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      const hubCode = isChep ? null : returnHub.code

      try {
        const resp = await makeCorePostRequest('/shop-reception-mobile/truck/shop/exit/save', {
          id: truckId,
          truckNumber: values.registrationNumber,
          driverName: values.driver,
          depositId: values.deposit,
          packageReturn: values.isPackingReturn,
          productReturn: values.isProductReturn,
          depositType: null,
          hubCode: hubCode
        })

        if (resp.success) {
          const id = resp.id

          setTruckId(id)
          navigate(URLS.AUTH_RETURN_STEP_2, { state: { id } })
        } else {
          setInProgressModalContent({
            title: 'Atenție!',
            description:
              'Există deja un camion în curs de înregistrare cu acest număr pentru aceeasi dată!',
            buttons: [
              {
                label: 'Ok',
                onClick: () => {
                  setIsInProgressModalOpen(false)
                },
                color: 'primary'
              }
            ]
          })
          setIsInProgressModalOpen(true)
        }
      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  const closeInProgressModal = () => {
    setIsInProgressModalOpen(false)
  }

  const { data: returnHub, isLoading: isLoadingHub } = useQuery(
    'returnHub',
    async () => {
      const hub = await makeCoreGetRequest('/shop-reception-mobile/truck/shop/exit/hub', null)

      await formik.setFieldValue('returnHub', hub.name)
      return hub
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching hub. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: depositList, isLoading: isLoadingDeposits } = useQuery(
    'depositList',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/shop/exit/deposits', null)
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching deposits. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const loadReturnTruck = id => {
    try {
      makeCoreGetRequest('/shop-reception-mobile/truck/shop/exit/truck/' + id, null).then(truck => {
        formik.setValues({
          destination: truck.depositId,
          registrationNumber: truck.truckNumber,
          driver: truck.driverName,
          isPackingReturn: truck.packageReturn,
          isProductReturn: truck.productReturn
        })
      })
    } catch (error) {
      showNotification({
        message: `Error while fetching truck. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const checkIfChep = selectedDepositId => {
    const selectedDeposit = depositList.find(deposit => deposit.id === selectedDepositId)
    setIsChep(selectedDeposit.code === 'CHP')
  }

  if (isLoadingHub || isLoadingDeposits) {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth="xs"
      items={[
        <TitleHeader title="ÎNREGISTREAZǍ CAMION" />,
        <Input
          type="select"
          label="Destinație"
          variant="standard"
          width="100%"
          value={formik.values.destination}
          values={depositList?.map(deposit => ({ value: deposit.id, label: deposit.name }))}
          onChange={event => {
            const selectedValue = (event.target as HTMLInputElement).value
            formik.setFieldValue('destination', selectedValue)
            checkIfChep(selectedValue)
          }}
          error={!!formik.errors.destination}
          helperText={formik.errors.destination as string}
        />,
        returnHub && (
          <Input
            type="text"
            label="VIA"
            variant="standard"
            width="100%"
            value={formik.values.returnHub}
            readonly
            error={!!formik.errors.returnHub}
            helperText={formik.errors.returnHub as string}
          />
        ),
        <Input
          type="text"
          label="Numǎr înmatriculare"
          variant="standard"
          width="100%"
          value={formik.values.registrationNumber}
          onChange={event =>
            formik.setFieldValue('registrationNumber', (event.target as HTMLInputElement).value)
          }
          error={!!formik.errors.registrationNumber}
          helperText={formik.errors.registrationNumber as string}
          readonly={readOnly}
        />,
        <Input
          type="text"
          label="Șofer"
          variant="standard"
          width="100%"
          value={formik.values.driver}
          onChange={event =>
            formik.setFieldValue('driver', (event.target as HTMLInputElement).value)
          }
          error={!!formik.errors.driver}
          helperText={formik.errors.driver as string}
          readonly={readOnly}
        />,
        <Checkbox
          checked={formik.values.isPackingReturn}
          onChange={event =>
            formik.setFieldValue('isPackingReturn', (event.target as HTMLInputElement).checked)
          }
          label="Retur ambalaje"
        />,
        <Button
          type="button"
          variant="contained"
          label="PASUL URMǍTOR"
          onClick={() => formik.handleSubmit()}
          style={{ width: '100%' }}
          disabled={
            formik.values.isPackingReturn === false && formik.values.isProductReturn === false
          }
        />,
        <AlertModal
          open={isInProgressModalOpen}
          handleClose={closeInProgressModal}
          title={inProgressModalContent.title}
          description={inProgressModalContent.description}
          buttons={inProgressModalContent.buttons}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default Step1
