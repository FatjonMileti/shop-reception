import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { ChangeEvent, useState } from 'react'

import { CountyCitySelect } from 'components/core-ui/CountyCitySelect'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { CountyCityInterface } from 'components/supplyomni/SelectClient/NewClient/interfaces'

interface NewAddressProps {
  onFieldUpdate: Function
  formik: any
}

const NewAddress: React.FC<NewAddressProps> = props => {
  const { onFieldUpdate, formik } = props

  return (
    <Box padding={4}>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.hasDeliveryDate}
              onClick={() =>
                onFieldUpdate('hasDeliveryDate', !formik.values.hasDifferentDeliveryAddress)
              }
            />
          }
          label="Adauga data de livrare"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.hasDifferentDeliveryAddress}
              onClick={() =>
                onFieldUpdate(
                  'hasDifferentDeliveryAddress',
                  !formik.values.hasDifferentDeliveryAddress
                )
              }
            />
          }
          label="Adauga alta adresa de livrare"
        />
      </FormGroup>

      {formik.values.hasDifferentDeliveryAddress && (
        <>
          <Box paddingY={2}>
            <Input
              type="text"
              name="address"
              label="Adresa"
              variant="standard"
              value={formik.values.newDeliveryAddress.address}
              fullWidth
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onFieldUpdate('newDeliveryAddress', {
                  address: e.target.value
                })
              }
              required
              error={!!formik.errors.newDeliveryAddress}
              helperText={formik.errors.newDeliveryAddress as string}
            />
          </Box>

          <Box paddingY={2}>
            <CountyCitySelect
              required
              county={{
                action: {
                  url: '/supply-omni/address/counties',
                  type: 'GET',
                  valueKey: 'id',
                  labelKey: 'name'
                },
                width: 100,
                label: 'Judet',
                variant: 'standard'
              }}
              city={{
                action: {
                  url: '/supply-omni/address/cities',
                  type: 'GET',
                  valueKey: 'id',
                  labelKey: 'name'
                },
                width: 100,
                label: 'Oras',
                variant: 'standard'
              }}
              value={{
                county: { value: formik.values.county.id, label: formik.values.county.name },
                city: { value: formik.values.city.id, label: formik.values.city.name }
              }}
              onChange={(newValue: CountyCityInterface, fieldToUpdate: string) =>
                onFieldUpdate(fieldToUpdate, { id: newValue?.value, name: newValue?.label })
              }
              error={!!formik.errors.county || !!formik.errors.city}
              helperText="required"
            />
          </Box>
        </>
      )}
    </Box>
  )
}

export default NewAddress
