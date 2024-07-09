import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import {
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { Autocomplete, Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { URLS } from 'components/shop-reception/mobile/constants'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { useFormik } from 'formik'
import { useState } from 'react'
import ImageUpload from 'components/shop-reception/mobile/Common/ImageUpload/ImageUpload'
import AlertModal from 'components/shop-reception/mobile/Common/AlertModal/AlertModal'

const ExpectedDepositReturnsStep3 = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const item = location.state.item

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [supportWithDifference, setSupportWithDifference] = useState([])
  const [uploadedImages, setUploadedImages] = useState(0)

  const { data: supportList, isLoading: isLoadingSupportList } = useQuery(
    ['support-list-table'],
    async () => {
      const response = await makeCoreGetRequest(
        `/shop-reception-mobile/truck/deposit/return/supports/${item.id}?parentId=${item.id}`
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

  const { data: allSupportList, isLoading: isLoadingAllSupportList } = useQuery(
    ['all-support-list'],
    async () => {
      const response = await makeCoreGetRequest(
        `/shop-reception-mobile/truck/deposit/return/all-supports/${item.id}`
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

  const confirmSupportList = async (values: any) => {
    await makeCorePostRequest(
      `/shop-reception-mobile/truck/deposit/return/confirm-supports`,
      values
    )
  }

  const { isLoading: isMutateLoading, mutate } = useMutation(confirmSupportList, {
    onSuccess: res => {
      showNotification({
        message: `Confirmat`,
        type: 'success'
      })
      navigate(URLS.AUTH_DEPOSIT_EXPECTED_RETURNS_STEP_4, { state: { item: item } })
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare ${formatErrorMessage(res)}`,
        type: 'error'
      })
      navigate(URLS.AUTH_DEPOSIT_EXPECTED_RETURNS_STEP_4, { state: { item: item } })
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: supportList || { supportList: [] },
    onSubmit: async (values: any) => {
      mutate(values)
    }
  })

  if (isLoadingSupportList && isLoadingAllSupportList && typeof formik.values === 'undefined') {
    return (
      <div style={{ display: 'flex' }}>
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      </div>
    )
  }

  return (
    <Grid container spacing={0} justifyContent={'center'}>
      <Grid xs={10} item>
        <Table>
          <TableHead style={{ backgroundColor: '#0970E6' }}>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Cantitate</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formik.values?.supportList?.map((supportItem, index) => (
              <TableRow>
                <TableCell>{supportItem.supportCode}</TableCell>
                <TableCell>{supportItem.supportTypeName}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    variant="outlined"
                    width="100%"
                    value={supportItem.confirmedSupportNumber}
                    onChange={event =>
                      formik.setFieldValue(
                        `supportList[${index}].confirmedSupportNumber`,
                        (event.target as HTMLInputElement).value
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <ImageUpload
                    uploadUrl={`/shop-reception-mobile/truck/deposit/return/upload-support/${item.id}/${supportItem.id}?supportCode=${supportItem.supportCode}`}
                    onSuccess={() => {
                      showNotification({
                        message: `Imaginea a fost incarcata cu succes.`,
                        type: 'success'
                      })
                      setUploadedImages(prev => prev + 1)
                    }}
                    onError={() =>
                      showNotification({
                        message: `A aparut o eroare la incarcarea imaginii.}`,
                        type: 'error'
                      })
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>

      <Grid xs={10} item>
        <Autocomplete
          variant="outlined"
          label="Adauga ambalaj"
          disableClearable
          options={
            allSupportList?.map(item => ({ label: item.supportTypeNameAndCode, value: item })) || []
          }
          onChange={(event, option) => {
            const isExistent = formik.values?.supportList?.some(item => item.id === option.value.id)
            !isExistent &&
              formik.setFieldValue('supportList', [...formik.values.supportList, option.value])
          }}
        />
      </Grid>

      <Grid xs={10} item>
        <Button
          variant="contained"
          label="Pasul urmator"
          onClick={() => {
            let list = []
            const alerts = formik.values?.supportList?.map(supportItem => {
              if (supportItem.confirmedSupportNumber != supportItem.supportNumber) {
                list.push(`${supportItem.supportTypeName}`)

                setSupportWithDifference(list)
                return true
              }

              return false
            })

            const showAlert = alerts.some(alert => alert === true)

            showAlert ? setIsAlertOpen(true) : formik.handleSubmit()
          }}
          disabled={uploadedImages < formik.values?.supportList.length}
          style={{ width: '100%' }}
        />
      </Grid>
      <AlertModal
        open={isAlertOpen}
        handleClose={() => setIsAlertOpen(false)}
        title={'Atentie'}
        description={`Exista diferente intre cantitatea asteptata si cea descarcata pentru ${supportWithDifference}!`}
        buttons={[
          { label: 'Mai verific', onClick: () => setIsAlertOpen(false), color: 'primary' },
          { label: 'Am terminat', onClick: () => formik.handleSubmit(), color: 'primary' }
        ]}
      />
    </Grid>
  )
}

export default ExpectedDepositReturnsStep3
