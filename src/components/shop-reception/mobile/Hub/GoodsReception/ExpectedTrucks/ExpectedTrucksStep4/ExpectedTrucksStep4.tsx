import { Autocomplete, Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { useMutation, useQuery } from 'react-query'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
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
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { useLocation, useNavigate } from 'react-router-dom'
import { URLS } from 'components/shop-reception/mobile/constants'
import { useState } from 'react'
import ImageUpload from 'components/shop-reception/mobile/Common/ImageUpload/ImageUpload'
import { useFormik } from 'formik'
import AlertModal from 'components/shop-reception/mobile/Common/AlertModal/AlertModal'

const ExpectedTrucksStep4 = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showNotification } = useNotification()

  const truckId = location.state.truckId
  const supportId = location.state.supportId

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [packageWithDifference, setPackageWithDifference] = useState([])

  const { data: hubName, isLoading: isLoadingHubName } = useQuery(
    ['hub-name'],
    async () => {
      const response = await makeCoreGetRequest(`/shop-reception-mobile/home/hub-name`)
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

  const { data: typeOptions, isLoading: isTypeOptionsLoading } = useQuery(
    ['type-options'],
    async () => {
      const response = await makeCoreGetRequest(
        `/shop-reception-mobile/support/shop/principal/type`
      )

      return response
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

  const confirmList = async (values: any) => {
    await makeCorePostRequest(
      `/shop-reception-mobile/support/shop/save/list/true/${truckId}/${supportId}`,
      values.typeOptions
    )
  }

  const { isLoading: isMutateLoading, mutate } = useMutation(confirmList, {
    onSuccess: res => {
      showNotification({
        message: `Confirmat`,
        type: 'success'
      })
      navigate(URLS.AUTH_DEPOSIT_EXPECTED_RETURNS_STEP_3)
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: { typeOptions },
    onSubmit: async (values: any) => {
      mutate(values)
    }
  })

  if (isLoadingHubName || isTypeOptionsLoading) {
    return (
      <div style={{ display: 'flex' }}>
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      </div>
    )
  }
  return (
    <Grid container spacing={2} justifyContent={'center'}>
      <Grid xs={12} item>
        <Typography
          component="h2"
          variant="medium"
          style={{ textAlign: 'center', textTransform: 'uppercase' }}
          pt={2}
        >
          {hubName.value}
        </Typography>
      </Grid>

      <Grid xs={10} item>
        <Table>
          <TableHead style={{ backgroundColor: '#0970E6' }}>
            <TableRow>
              <TableCell>Nume</TableCell>
              <TableCell>Calitativi</TableCell>
              <TableCell>Defecti</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formik.values?.typeOptions?.map((type, index) => (
              <>
                <TableRow>
                  <TableCell>{type.name}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      variant="outlined"
                      width="50px"
                      value={type.conform}
                      onChange={event =>
                        formik.setFieldValue(
                          `typeOptions[${index}].conform`,
                          (event.target as HTMLInputElement).value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      variant="outlined"
                      width="50px"
                      value={type.defect}
                      onChange={event =>
                        formik.setFieldValue(
                          `typeOptions[${index}].defect`,
                          (event.target as HTMLInputElement).value
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
                {type.defect && (
                  <Grid container>
                    <Grid xs={10} item>
                      <Autocomplete
                        variant="outlined"
                        label={`Motiv`}
                        disableClearable
                        options={[
                          { label: 'Prestator', value: 'PROVIDER' },
                          { label: 'Transportator', value: 'TRANSPORTER' },
                          { label: 'Sef depozit', value: 'SHOP' }
                        ]}
                        onChange={(event, option) =>
                          formik.setFieldValue(`typeOptions[${index}].reason`, option.value)
                        }
                      />
                    </Grid>
                    <Grid xs={10} item>
                      <Autocomplete
                        variant="outlined"
                        label={`Marca`}
                        disableClearable
                        options={[
                          { label: 'Legume fructe', value: 'VEGETABLES_FRUITS' },
                          { label: 'Deteriorate', value: 'DAMAGED' },
                          { label: 'Termen Scurt', value: 'SHORT_TERM' },
                          { label: 'Expirate', value: 'EXPIRED' },
                          { label: 'Calitate legume fructe', value: 'VEGETABLE_FRUIT_QUALITY' },
                          { label: 'Deteriorare-A', value: 'DETERIORATION_A' },
                          {
                            label: 'Diferenta cantitativa-A',
                            value: 'QUANTITATIVE_DIFFERENCE_A'
                          },
                          { label: 'Lipsa Bax', value: 'MISSING_BAX' },
                          { label: 'Diferenta cantitativa', value: 'QUANTITATIVE_DIFFERENCE' },
                          { label: 'Lipsa transportator', value: 'MISSING_CARRIER' },
                          { label: 'Paleti marfa lipsa', value: 'PALLETS_MERCHANDISE_MISSING' },
                          { label: 'VOL', value: 'VOLUME' }
                        ]}
                        onChange={(event, option) =>
                          formik.setFieldValue(`typeOptions[${index}].mark`, option.value)
                        }
                      />
                    </Grid>
                    <Grid xs={10} item>
                      <ImageUpload
                        uploadUrl={`/shop-reception-mobile/support/shop/upload/auxiliary/${truckId}/${type.id}`}
                        onSuccess={() => {
                          showNotification({
                            message: `Imaginea a fost incarcata cu succes.`,
                            type: 'success'
                          })
                        }}
                        onError={() =>
                          showNotification({
                            message: `A aparut o eroare la incarcarea imaginii.`,
                            type: 'error'
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid xs={10} item>
        <Button
          variant="contained"
          label="Confirma ambalaje"
          onClick={() => {
            let list = []
            const alerts = formik.values?.typeOptions?.map(item => {
              if (item.received != item.conform) {
                list.push(`${item.name}`)

                setPackageWithDifference(list)
                return true
              }

              return false
            })

            const showAlert = alerts.some(alert => alert === true)

            showAlert ? setIsAlertOpen(true) : formik.handleSubmit()
          }}
          style={{ width: '100%' }}
        />
      </Grid>
      <AlertModal
        open={isAlertOpen}
        handleClose={() => setIsAlertOpen(false)}
        title={'Atentie'}
        description={`Exista diferente intre cantitatea asteptata si cea descarcata pentru ${packageWithDifference}!`}
        buttons={[
          { label: 'Mai verific', onClick: () => setIsAlertOpen(false), color: 'primary' },
          { label: 'Am terminat', onClick: () => formik.handleSubmit(), color: 'primary' }
        ]}
      />
    </Grid>
  )
}

export default ExpectedTrucksStep4
