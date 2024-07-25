import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import {
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { URLS } from 'components/shop-reception/mobile/constants'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { useFormik } from 'formik'
import { useMemo, useState } from 'react'
import AlertModal from 'components/shop-reception/mobile/Common/AlertModal/AlertModal'

const ExpectedDepositReturnsStep2 = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [stackWithDifference, setStackWithDifference] = useState([])
  const item = location.state.item

  const { data: stackList, isLoading: isLoadingStackList } = useQuery(
    ['stack-list'],
    async () => {
      const response = await makeCoreGetRequest(
        `/shop-reception-mobile/truck/deposit/return/stacks/${item.id}`
      )
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

  const confirmStackList = async (values: any) => {
    await makeCorePostRequest(`/shop-reception-mobile/truck/deposit/return/confirm-stacks`, values)
  }

  const { isLoading, mutate } = useMutation(confirmStackList, {
    onSuccess: res => {
      showNotification({
        message: `Confirmat`,
        type: 'success'
      })
      navigate(URLS.AUTH_DEPOSIT_EXPECTED_RETURNS_STEP_3, {
        state: { item: item, nextTruckId: stackList.nextTruckId, tuckId: stackList.id }
      })
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare ${formatErrorMessage(res)}`,
        type: 'error'
      })
      navigate(URLS.AUTH_DEPOSIT_EXPECTED_RETURNS_STEP_3, { state: { item: item } })
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: stackList || { stackList: [] },
    onSubmit: async (values: any) => {
      const payload = {
        id: item.id,
        stackList: values?.stackList.map(stackItem => ({
          confirmedRollsNumber: stackItem.confirmedRollsNumber,
          confirmedStackNumber: stackItem.confirmedStackNumber,
          truckId: stackItem.truckId
        }))
      }
      mutate(payload)
    }
  })

  const isSubmitButtonDisabled = useMemo(
    () =>
      formik.values?.stackList?.some(
        stackItem => !stackItem.confirmedStackNumber || +stackItem.confirmedStackNumber === 0
      ),
    [formik.values?.stackList]
  )

  if (isLoadingStackList && typeof formik.values === 'undefined') {
    return (
      <div style={{ display: 'flex' }}>
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      </div>
    )
  }

  return (
    <Grid container spacing={2} justifyContent={'center'}>
      <Grid xs={10} item justifyContent="center">
        <Typography
          component="p"
          variant="medium"
          style={{ textAlign: 'center', color: 'black', marginBottom: '12px' }}
        >
          {stackList?.truckNumber} / {stackList?.driverName}
        </Typography>
        <Typography
          component="p"
          variant="medium"
          style={{ textAlign: 'center', color: 'black', marginBottom: '12px' }}
        >
          {stackList?.shopNamesAndCodes}
        </Typography>
        <Typography
          component="p"
          variant="medium"
          style={{ textAlign: 'center', color: 'black', marginBottom: '12px' }}
        >
          Descarcare stive
        </Typography>
      </Grid>
      <Grid xs={10} item>
        <Table>
          <TableHead style={{ backgroundColor: '#0970E6' }}>
            <TableRow>
              <TableCell>Magazin</TableCell>
              <TableCell>Numar stive</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formik.values?.stackList?.map((stack, index) => (
              <TableRow>
                <TableCell>{stack.shopName}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    variant="outlined"
                    width="100%"
                    value={stack.confirmedStackNumber}
                    onChange={event =>
                      formik.setFieldValue(
                        `stackList[${index}].confirmedStackNumber`,
                        (event.target as HTMLInputElement).value
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid xs={10} item>
        <Button
          variant="contained"
          label="Pasul urmator"
          onClick={() => {
            let list = []
            const alerts = formik.values?.stackList?.map(stackItem => {
              if (stackItem.confirmedStackNumber != stackItem.stackNumber) {
                list.push(`${stackItem.shopName}(${stackItem.shopCode})`)

                setStackWithDifference(list)
                return true
              }

              return false
            })

            const showAlert = alerts.some(alert => alert === true)

            showAlert ? setIsAlertOpen(true) : formik.handleSubmit()
          }}
          style={{ width: '100%' }}
          disabled={isSubmitButtonDisabled || isLoading}
        />
      </Grid>
      <AlertModal
        open={isAlertOpen}
        handleClose={() => setIsAlertOpen(false)}
        title={'Atentie'}
        description={`Exista diferente intre cantitatea asteptata si cea descarcata pentru numarul de stive la ${stackWithDifference}!`}
        buttons={[
          { label: 'Mai verific', onClick: () => setIsAlertOpen(false), color: 'primary' },
          { label: 'Am terminat', onClick: () => formik.handleSubmit(), color: 'primary' }
        ]}
      />
    </Grid>
  )
}

export default ExpectedDepositReturnsStep2
