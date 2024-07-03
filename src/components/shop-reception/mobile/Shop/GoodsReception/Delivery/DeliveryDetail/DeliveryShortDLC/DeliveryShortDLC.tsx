import { useLocation, useNavigate } from 'react-router-dom'
import {
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { TitleHeader } from 'components/shop-reception/mobile/Common/TitleHeader'
import { Autocomplete, Button, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { useMutation, useQuery } from 'react-query'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { useFormik } from 'formik'
import dayjs from 'dayjs'
import ImageUpload from 'components/shop-reception/mobile/Common/ImageUpload/ImageUpload'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { useState } from 'react'

const DeliveryShortDLC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showNotification } = useNotification()

  const { truck, support } = location.state
  const [productCode, setProductCode] = useState(null)

  const { data: products, isLoading } = useQuery(
    ['short-dlc-products'],
    async () => {
      const result = await makeCoreGetRequest(
        `/shop-reception-mobile/sensitive/short-dlc-products/${truck.id}`
      )

      return result || []
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea datelor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const saveProduct = async (values: any) => {
    return await makeCorePostRequest(
      `/shop-reception-mobile/sensitive/short-dlc-product-save/${truck.id}/${support.id}`,
      values
    )
  }

  const { mutate } = useMutation(saveProduct, {
    onSuccess: (res, data) => {
      showNotification({
        message: `Produsul a fost salvat cu success.`,
        type: 'success'
      })
      navigate('/')
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
    initialValues: products || { productList: [] },
    onSubmit: async (values: any) => {
      mutate(values.productList)
    }
  })

  if (isLoading) {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  return (
    <Grid container justifyContent={'center'} rowSpacing={2}>
      <Grid item xs={10}>
        <TitleHeader title="" />
      </Grid>

      <Grid item xs={10} mb={2}>
        <Paper elevation={3} style={{ padding: '20px' }} onClick={() => {}}>
          <Typography variant="medium" component="h5">
            PRODUSE SENSIBILE
          </Typography>
          <Typography variant="medium" component="p">
            Eticheta suport: {support.supportCode}
          </Typography>
          <Typography variant="medium" component="p">
            Numar suport: {support.supportNumber}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={10}>
        <Input
          type="search"
          variant="outlined"
          label="Cod produs"
          autoFocus
          value={productCode}
          onChange={e => {
            const target = e.target as HTMLInputElement
            setProductCode(target.value)
          }}
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
          onClick={() => () => {}}
          style={{ width: '100%' }}
        />
      </Grid>

      <Grid xs={10} item>
        <Table>
          <TableHead style={{ backgroundColor: '#0970E6' }}>
            <TableRow>
              <TableCell>Produs</TableCell>
              <TableCell>Calitativ</TableCell>
              <TableCell>Defect</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {formik.values?.productList?.map((product, index) => (
              <>
                <TableRow>
                  <TableCell> {product.name}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      variant="outlined"
                      width="100%"
                      value={product.integral}
                      onChange={event =>
                        formik.setFieldValue(
                          `productList[${index}].integral`,
                          parseInt((event.target as HTMLInputElement).value)
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      variant="outlined"
                      width="100%"
                      value={product.broken}
                      onChange={event =>
                        formik.setFieldValue(
                          `productList[${index}].broken`,
                          parseInt((event.target as HTMLInputElement).value)
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {formik.values.productList[index].broken > 0 && (
                      <ImageUpload
                        uploadUrl={`/shop-reception-mobile/integral/upload/${support.id}/${truck.id}`}
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
                        inputId={`supportCode`}
                      />
                    )}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    {product.ean} ({product.code}) ({product.unit})
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      variant="outlined"
                      width="100%"
                      value={product?.newIntegral}
                      onChange={event =>
                        formik.setFieldValue(
                          `productList[${index}].newIntegral`,
                          parseInt((event.target as HTMLInputElement).value)
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      variant="outlined"
                      width="100%"
                      value={product?.newBroken}
                      onChange={event =>
                        formik.setFieldValue(
                          `productList[${index}].newBroken`,
                          parseInt((event.target as HTMLInputElement).value)
                        )
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      label="+"
                      onClick={() => {
                        formik.setFieldValue(
                          `productList[${index}].integral`,
                          formik.values.productList[index].integral +
                            (formik.values.productList[index].newIntegral || 0)
                        )

                        formik.setFieldValue(
                          `productList[${index}].broken`,
                          formik.values.productList[index].broken +
                            (formik.values.productList[index].newBroken || 0)
                        )

                        formik.setFieldValue(`productList[${index}].newBroken`, 0)
                        formik.setFieldValue(`productList[${index}].newIntegral`, 0)
                      }}
                      style={{ width: '100%' }}
                    />
                  </TableCell>
                </TableRow>

                {product.integral !== product.quantity && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Autocomplete
                        variant="outlined"
                        label={`Marca`}
                        disableClearable
                        options={[
                          { label: 'Paleti marfa lipsa', value: 'PALLETS_MERCHANDISE_MISSING' },
                          { label: 'Lipsa transportator', value: 'MISSING_CARRIER' },
                          { label: 'Diferenta cantitativa', value: 'QUANTITATIVE_DIFFERENCE' }
                        ]}
                        onChange={(event, option) => formik.setFieldValue('mark', option.value)}
                      />
                    </TableCell>
                  </TableRow>
                )}

                {product.integral !== product.quantity && product.mark && (
                  <TableRow>
                    <TableCell colSpan={4}>
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
                          formik.setFieldValue('defectReason', option.value)
                        }
                        required
                      />
                    </TableCell>
                  </TableRow>
                )}

                <TableCell colSpan={4}>
                  <DatePicker
                    onChange={value => formik.setFieldValue(`productList[${index}].dlc`, value)}
                    value={dayjs(product.dlc)}
                    variant="outlined"
                    style={{ display: 'flex', justifyContent: 'center' }}
                    adapterLocale="ro"
                  />
                </TableCell>
              </>
            ))}
          </TableBody>
        </Table>
      </Grid>

      <Grid xs={10} item>
        <Button
          variant="contained"
          label="Confirma cantitati"
          onClick={() => formik.handleSubmit()}
          style={{ width: '100%' }}
          disabled={formik.values.productList.some(product => product.integral == 0)}
        />
      </Grid>
    </Grid>
  )
}
export default DeliveryShortDLC
