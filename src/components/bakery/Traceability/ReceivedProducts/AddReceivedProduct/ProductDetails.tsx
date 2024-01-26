import { FormLabel, Grid, Tooltip } from '@mui/material'
import {
  Button,
  DatePicker,
  IconButton,
  Input,
  RadioButtonGroup
} from '@fullscreendigital/carrefour-dex-fe'
import React from 'react'
import { useFormik } from 'formik'
import dayjs from 'dayjs'

import ImageIcon from '@mui/icons-material/Image'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import InfoIcon from '@mui/icons-material/Info'
import { FormInfoItems } from '../../../../core-ui/FormInfoItems'
import { Supplier, Product } from '../interfaces'
import { productDetailsSchema } from '../helper'

interface ProductDetailsProps {
  onContinue: (data: ProductDetails) => void
  onCancel: () => void
  selectedProduct: Product
  selectedSupplier: Supplier
}

export interface ProductDetails {
  entryDate: dayjs.Dayjs
  hasExpirationDate: boolean
  expirationDate?: dayjs.Dayjs
  hasSecondaryDLC: boolean
  secondaryDLC?: string
  amount?: string
  lot?: string
  picture: File
}

const initialValues: ProductDetails = {
  entryDate: dayjs(),
  hasExpirationDate: true,
  expirationDate: null,
  hasSecondaryDLC: true,
  secondaryDLC: '',
  amount: '',
  lot: '',
  picture: undefined
}

export const ProductDetails = ({
  selectedProduct,
  selectedSupplier,
  onContinue,
  onCancel
}: ProductDetailsProps) => {
  const inputFileRef = React.useRef<HTMLInputElement>()

  const form = useFormik<ProductDetails>({
    enableReinitialize: false,
    validationSchema: productDetailsSchema,
    validateOnChange: false,
    initialValues: initialValues,
    onSubmit: (values) => {
      onContinue(values)
    }
  })


  return (
    <Grid container rowSpacing={3.5}>
      <Grid item xs={12} spacing={2}>
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
      <Grid item xs={12} container spacing={2} alignItems="flex-end">
        <Grid item xl={3} lg={4} sm={6} xs={12}>
          <DatePicker
            error={!!form.errors.entryDate}
            helperText={form.errors.entryDate as string}
            label="Data intrare in raion"
            onChange={value => form.handleChange({ target: { name: 'entryDate', value } })}
            required
            value={form.values.entryDate}
            variant="outlined"
            maxDate={dayjs()}
          />
        </Grid>
        <Grid item xl={3} lg={4} sm={6} xs={12}>
          <RadioButtonGroup
            label='Data expirare'
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
        <Grid item xl={3} lg={4} sm={6} xs={12}>
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
        <Grid item xl={3} lg={4} sm={6} xs={12}>
          <RadioButtonGroup
            label='DLC Secundar'
            dotStyle
            name="hasSecondaryDLC"
            onChange={e => {
              const value = e.target.value === 'true'
              form.setFieldValue('hasSecondaryDLC', value)
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
        <Grid item xl={3} lg={4} sm={6} xs={12}>
          <Input
            type="number"
            variant="outlined"
            label="Numar zile DLC"
            onChange={form.handleChange}
            value={form.values.secondaryDLC}
            name="secondaryDLC"
            disabled={!form.values.hasSecondaryDLC}
            error={!!form.errors.secondaryDLC}
            helperText={form.errors.secondaryDLC as string}
          />
        </Grid>
        <Grid item xl={3} lg={4} sm={6} xs={12}>
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
        <Grid item xl={3} lg={4} sm={6} xs={12}>
          <Input
            type="number"
            variant="outlined"
            label="Cantitatea intrata"
            onChange={form.handleChange}
            value={form.values.amount}
            name="amount"
            suffix={selectedProduct.metricUnit}
            error={!!form.errors.amount}
            helperText={form.errors.amount as string}
          />
        </Grid>

        <Grid item xl={3} lg={4} sm={6} xs={12} spacing={2} container alignItems="center">
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
          ) : (
            <Grid item>
              <IconButton
                label="Incarca foto"
                onClick={() => {
                  inputFileRef?.current?.click()
                }}
                startIcon={<ImageIcon />}
                variant="outlined"
                size="large"
              />
            </Grid>
          )}

          <input
            ref={inputFileRef}
            style={{ display: 'none' }}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={e => {
              if (e.target.files) {
                form.setFieldValue('picture', e.currentTarget.files[0])
              }
            }}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container justifyContent="space-between">
        <Grid>
          <Button size="large" variant="outlined" label="Anuleaza" onClick={onCancel} />
        </Grid>
        <Grid>
          <Button
            size="large"
            variant="contained"
            label="Salveaza"
            onClick={() => form.submitForm()}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
