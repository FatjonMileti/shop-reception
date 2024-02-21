import { Modal } from '../../../../core-ui/Modal'
import { CircularProgress, Grid } from '@mui/material'
import { Autocomplete, Button, RadioButtonGroup } from '@fullscreendigital/carrefour-dex-fe'
import React from 'react'
import { useFormik } from 'formik'
import { correctReceivedProductSchema } from './helper'
import { useMutation, useQuery } from 'react-query'
import { ReceivedProduct } from '../interfaces'
import { makeCoreGetRequest, makeCorePutRequest } from '../../../../../utils/api'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'

export interface EditReceivedProductRequestData {
  batchStatus: string
  closeReason: string
  verified: boolean

  // productId: string
  // supplierId: string
  // entryDate: string
  // batchName: string
  // hasExpireDate: boolean
  // expireDate: string
  // hasSecondaryDlc: boolean
  // dlcDays: number
  // batchQuantity: number
  // imageUrl: 'string'
  // storeId: string
  // verifiedBy: 'string'
  // verifiedDate: '2024-01-18T11:43:36.604Z'
}

interface EditReceivedProductProps {
  isModalOpen: boolean
  closeModal: () => void
  batchId?: string | number
}

export const BATCH_STATUS = {
  CLOSED: 'CLOSED',
  AVAILABLE: 'AVAILABLE'
}

const batchStatusOptions = [
  { value: BATCH_STATUS.CLOSED, label: 'Inchis' },
  { value: BATCH_STATUS.AVAILABLE, label: 'Disponibil' },
]

const closeReasonOptions = [
  { value: 'OUT_OF_STOCK', label: 'Epuizat' },
  { value: 'NON_CONFORM', label: 'Neconform' },
  { value: 'WITHDRAWN', label: 'Retragere Lot)' },
  { value: 'EXPIRED', label: 'Expirat' },
  { value: 'OTHER', label: 'Alte deficiente' }
]

export const EditReceivedProduct = ({
  isModalOpen,
  closeModal,
  batchId
}: EditReceivedProductProps) => {
  const { showNotification } = useNotification()

  const receivedProductQuery = useQuery<ReceivedProduct>(
    ['received-product', batchId],
    async () => {
      return await makeCoreGetRequest(`/bakery/batch/${batchId}`)
    },
    {
      enabled: !!batchId,
      onError: error => {
        showNotification({
          message: `An error occurred while getting the product details. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  const initialValues = {
    batchStatus: receivedProductQuery?.data?.batchStatus || '',
    closeReason: receivedProductQuery?.data?.closeReason || '',
    verified: receivedProductQuery?.data?.verified || false
  }

  const form = useFormik<EditReceivedProductRequestData>({
    enableReinitialize: true,
    validationSchema: correctReceivedProductSchema,
    validateOnChange: false,
    initialValues: initialValues,
    onSubmit: () => {
      productEditMutation.mutate()
    }
  })

  const productEditMutation = useMutation(
    async () => {
      const data: EditReceivedProductRequestData = {
        batchStatus: form.values.batchStatus,
        closeReason: form.values.closeReason,
        verified: form.values.verified
      }

      await makeCorePutRequest(`/bakery/batch/verification/${batchId}`, data)
    },
    {
      onSuccess: () => {
        closeModal()
        showNotification({
          message: `Product added successfully`,
          type: 'success'
        })
      },
      onError: res => {
        showNotification({
          message: `Error while trying add product, ${formatErrorMessage(res)}`,
          type: 'error'
        })
      }
    }
  )

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle="Editare" modalWidth="50%">
      <Grid container rowSpacing={3.5}>
        {receivedProductQuery.isFetching || productEditMutation.isLoading ? (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        ) : (
          <>
            <Grid item xs={12} container spacing={2} alignItems="flex-end">
              <Grid item sm={6} xs={12}>
                <Autocomplete
                  variant="outlined"
                  label="Status lot"
                  options={batchStatusOptions}
                  value={batchStatusOptions.find(({ value }) => value === form.values.batchStatus) || null}
                  onChange={(_, value) => {
                    form.setFieldValue('batchStatus', value?.value)
                  }}
                  error={!!form.errors.batchStatus}
                  helperText={form.errors.batchStatus as string}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Autocomplete
                  variant="outlined"
                  label="Motiv"
                  value={
                    closeReasonOptions.find(({ value }) => value === form.values.closeReason) ||
                    null
                  }
                  onChange={(_, value) => {
                    form.setFieldValue('closeReason', value?.value)
                  }}
                  options={closeReasonOptions}
                  error={!!form.errors.closeReason}
                  helperText={form.errors.closeReason as string}
                />
              </Grid>
            </Grid>

            {(receivedProductQuery?.data?.createdUser === false) && (
              <Grid item xs={12} style={{ display: 'grid' }}>
                <RadioButtonGroup
                  label="Bifa Verificare de catre validator Trasabilitate"
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
            )}

            <Grid item xs={12} container justifyContent="space-between">
              <Grid>
                <Button size="large" variant="outlined" label="Anuleaza" onClick={closeModal} />
              </Grid>

              <Grid>
                <Button
                  size="large"
                  variant="contained"
                  label="Continua"
                  onClick={async () => form.submitForm()}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Modal>
  )
}
