import { FormLabel, Grid, Tooltip } from '@mui/material'
import {
  Button,
  DatePicker,
  IconButton,
  Input,
  RadioButtonGroup
} from '@fullscreendigital/carrefour-dex-fe'
import React from 'react'
import dayjs from 'dayjs'

import ImageIcon from '@mui/icons-material/Image'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import InfoIcon from '@mui/icons-material/Info'
import { FormInfoItems } from '../../../../core-ui/FormInfoItems'
import { Supplier, Product } from '../interfaces'
import { WebcamCapture } from 'components/core-ui/WebcamCapture'

interface ProductDetailsProps {
  onCancel: () => void
  selectedProduct: Product
  selectedSupplier: Supplier
  form: any
  setIsPictureChanged?: (value: boolean) => void
}

export interface ProductDetails {
  entryDate: dayjs.Dayjs
  hasExpirationDate: boolean
  expirationDate?: any
  hasSecondaryDLC: boolean
  secondaryDLC?: number
  amount?: number
  lot?: string
  picture: File
}

export const ProductDetails = ({
  selectedProduct,
  selectedSupplier,
  onCancel,
  form,
  setIsPictureChanged
}: ProductDetailsProps) => {
  const [showPhotoCapture, setShowPhotoCapture] = React.useState(false)

  const inputFileRef = React.useRef<HTMLInputElement>()

  return (
    <Grid container rowSpacing={3.5}>
      <Grid
        item
        xs={12}
        spacing={2}
        sx={{
          '& div': {
            whiteSpace: 'unset !important'
          }
        }}
      >
        <FormInfoItems
          items={[
            {
              label: 'Furnizor:',
              name: selectedSupplier.supplierName
            },
            {
              label: 'Furnizor cod Meti:',
              name: selectedSupplier.supplierCode.toString()
            },

            {
              label: 'Produs:',
              name: selectedProduct.name
            },
            {
              label: 'Produs cod Meti:',
              name: selectedProduct.metiCode.toString()
            }
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <DatePicker
              error={!!form.errors.entryDate}
              helperText={form.errors.entryDate as string}
              label="Data intrare in raion"
              onChange={value => form.handleChange({ target: { name: 'entryDate', value } })}
              required
              value={form.values.entryDate}
              variant="outlined"
              maxDate={dayjs()}
              id="entry-date"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12} sx={{ marginTop: '17px' }}>
            <RadioButtonGroup
              label="Data expirare"
              dotStyle
              name="hasExpirationDate"
              onChange={e => {
                const value = e.target.value === 'true'
                form.setFieldValue('hasExpirationDate', value)
                if (!value) {
                  form.setFieldValue('expirationDate', null)
                }
              }}
              value={form.values.hasExpirationDate ? 'true' : 'false'}
              row
              options={[
                {
                  label: 'DA',
                  value: 'true'
                },
                {
                  label: 'NU',
                  value: 'false'
                }
              ]}
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <DatePicker
              error={!!form.errors.expirationDate}
              helperText={form.errors.expirationDate as string}
              label="Data expirare"
              onChange={value => form.handleChange({ target: { name: 'expirationDate', value } })}
              required
              value={form.values.expirationDate}
              variant="outlined"
              minDate={form.values.entryDate}
              disabled={!form.values.hasExpirationDate}
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12} sx={{ marginTop: '17px' }}>
            <RadioButtonGroup
              label="DLC Secundar"
              dotStyle
              name="hasSecondaryDLC"
              onChange={e => {
                const hasSecondaryDLC = e.target.value === 'true'
                form.setFieldValue('hasSecondaryDLC', hasSecondaryDLC)
                if (!hasSecondaryDLC) {
                  form.setFieldValue('secondaryDLC', null)
                }
              }}
              value={form.values.hasSecondaryDLC ? 'true' : 'false'}
              row
              options={[
                {
                  label: 'DA',
                  value: 'true'
                },
                {
                  label: 'NU',
                  value: 'false'
                }
              ]}
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <Input
              type="number"
              variant="outlined"
              label="Numar zile DLC"
              onChange={form.handleChange}
              value={form.values.secondaryDLC?.toString() ?? ''}
              name="secondaryDLC"
              disabled={!form.values.hasSecondaryDLC}
              error={!!form.errors.secondaryDLC}
              helperText={form.errors.secondaryDLC as string}
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <Input
              type="text"
              variant="outlined"
              label="Lot"
              onChange={form.handleChange}
              value={form.values.lot}
              name="lot"
              error={!!form.errors.lot}
              helperText={form.errors.lot as string}
              infoIcon={
                <Tooltip
                  placement="top"
                  title="Daca lotul este dat de data expirarii sau receptiei se va introduce sub forma ZZ.LL.AAAA"
                >
                  <InfoIcon />
                </Tooltip>
              }
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <Input
              type="number"
              variant="outlined"
              label="Cantitatea intrata"
              onChange={form.handleChange}
              value={form.values.amount?.toString()}
              name="amount"
              suffix={selectedProduct.metricUnit}
              error={!!form.errors.amount}
              helperText={form.errors.amount as string}
              id="amount"
            />
          </Grid>

          <Grid item xs={12} spacing={2} container alignItems="center">
            {form.values.picture ? (
              <>
                <Grid item>
                  <FormLabel>{form.values.picture.name}</FormLabel>
                </Grid>
                <Grid item>
                  <Button
                    label=""
                    variant="outlined"
                    size="large"
                    onClick={() => form.setFieldValue('picture', undefined)}
                  >
                    <DeleteOutlineIcon />
                  </Button>
                </Grid>
              </>
            ) : showPhotoCapture ? (
              <Grid item>
                <WebcamCapture
                  onImageCapture={imageSrc => {
                    fetch(imageSrc)
                      .then(res => res.blob())
                      .then(blob => {
                        const file = new File([blob], 'image.JPEG', { type: 'image/png' })
                        form.setFieldValue('picture', file)
                        setIsPictureChanged(true)
                        setShowPhotoCapture(false)
                      })
                  }}
                  videoConstraints={{ width: 500, height: 400, facingMode: 'environment' }}
                />
              </Grid>
            ) : (
              <Grid item style={{ marginTop: '24px'}}>
                <IconButton
                  label="Deschide camera"
                  onClick={() => setShowPhotoCapture(true)}
                  startIcon={<ImageIcon />}
                  variant="outlined"
                  // size="large"
                  style={{ marginRight: '24px'}}
                />
                SAU
                <IconButton
                  label="Incarca foto"
                  onClick={() => {
                    inputFileRef?.current?.click()
                  }}
                  startIcon={<ImageIcon />}
                  variant="outlined"
                  // size="large"
                  style={{ marginLeft: '24px'}}
                />

                {!!form.errors.picture && (
                  <p
                    style={{
                      color: '#AA0D11',
                      fontFamily: 'Ubuntu',
                      fontWeight: '400',
                      fontSize: '0.75rem',
                      lineHeight: '1.66',
                      margin: '4px 0 0 14px'
                    }}
                  >
                    {form.errors.picture as string}
                  </p>
                )}
              </Grid>
            )}

            <input
              ref={inputFileRef}
              style={{ display: 'none' }}
              type="file"
              accept="image/*"
              onChange={e => {
                if (e.target.files) {
                  form.setFieldValue('picture', e.currentTarget.files[0])
                }
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item>
            <Button size="large" variant="outlined" label="Anuleaza" onClick={onCancel} />
          </Grid>
          <Grid item>
            <Button
              size="large"
              variant="contained"
              label="Salveaza"
              onClick={event => {
                event.preventDefault()
                form.submitForm()
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
