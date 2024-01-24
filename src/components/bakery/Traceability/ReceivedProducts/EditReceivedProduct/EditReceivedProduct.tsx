import { Modal } from '../../../../core-ui/Modal'
import { Grid } from '@mui/material'
import { Autocomplete, Button, RadioButtonGroup } from '@fullscreendigital/carrefour-dex-fe'
import React from 'react'
import { useFormik } from 'formik'
import { correctReceivedProductSchema } from './helper'

export interface ReceivedProductToEdit {
  batchStatus: string
  closeReason: string
  verified: boolean
}

const initialValues: ReceivedProductToEdit = {
  batchStatus: undefined,
  closeReason: undefined,
  verified: false
}

interface EditReceivedProductProps {
  isModalOpen: boolean
  closeModal: () => void
}

const batchStatusOptions = [{ value: 'Inchis', label: 'Inchis' }]
const closeReasonOptions = [
  { value: 'Epuizat', label: 'Epuizat' },
  { value: 'Neconform', label: 'Neconform' },
  { value: 'Retragere Lot (AlertNet)', label: 'Retragere Lot (AlertNet)' },
  { value: 'Expirat', label: 'Expirat' },
  { value: 'Alte deficiente', label: 'Alte deficiente' }
]

export const EditReceivedProduct = ({ isModalOpen, closeModal }: EditReceivedProductProps) => {
  const form = useFormik<ReceivedProductToEdit>({
    enableReinitialize: false,
    validationSchema: correctReceivedProductSchema,
    validateOnChange: false,
    initialValues: initialValues,
    onSubmit: async (values, { resetForm }) => {}
  })

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle="Editare" modalWidth="50%">
      <Grid container rowSpacing={3.5}>
        <Grid item xs={12} container spacing={2} alignItems="flex-end">
          <Grid item xl={3} lg={4} sm={6} xs={12}>
            <Autocomplete
              variant="outlined"
              label="Status lot"
              options={batchStatusOptions}
              value={batchStatusOptions.find(({value}) => value === form.values.batchStatus)}
              onChange={(_, value) => {
                form.setFieldValue('batchStatus', value?.value)
              }}
              error={!!form.errors.batchStatus}
              helperText={form.errors.batchStatus as string}
            />
          </Grid>

          <Grid item xl={6} lg={4} sm={6} xs={12}>
            <Autocomplete
              variant="outlined"
              label="Motiv"
              value={closeReasonOptions.find(({value}) => value === form.values.closeReason)}
              onChange={(_, value) => {
                form.setFieldValue('closeReason', value?.value)
              }}
              options={closeReasonOptions}
              error={!!form.errors.closeReason}
              helperText={form.errors.closeReason as string}
            />
          </Grid>

          <Grid item xl={3} lg={4} sm={6} xs={12}>
            <RadioButtonGroup
              label="Data expirare"
              dotStyle
              name="hasExpirationDate"
              onChange={e => {
                const value = e.target.value === 'true'
                form.setFieldValue('verified', value)
              }}
              value={form.values.verified ? 'true' : 'false'}
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
        </Grid>

        <Grid item xs={12} container justifyContent="space-between">
          <Grid>
            <Button size="large" variant="outlined" label="Anuleaza" onClick={closeModal} />
          </Grid>

          <Grid>
            <Button
              size="large"
              variant="contained"
              label="Continua"
              onClick={async () => {
                const errors = await form.validateForm()
                if (!Object.keys(errors).length) {
                  // onContinue(form.values)
                  // productCorrectionMutation.mutate()
                } else {
                  console.log('continue errors')
                }
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}
