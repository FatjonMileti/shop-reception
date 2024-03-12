import { Modal } from 'components/core-ui/Modal'
import { CircularProgress, Grid } from '@mui/material'
import { useNotification } from 'hooks'
import { Button, Input, RadioButtonGroup } from '@fullscreendigital/carrefour-dex-fe'
import { useFormik } from 'formik'
import { makeCoreGetRequest, makeCorePutRequest } from 'utils/api'
import { useMutation, useQuery } from 'react-query'
import { formatErrorMessage } from 'utils/formatting'
import { toBoolean } from 'utils/helpers'
import { validationSchema } from './helpers'
import React from 'react'

interface EditOwnProductionTraceabilityModalProps {
  closeModal: () => void
  itemIdToEdit?: number
  setShouldRefreshData: (should: boolean) => void
}
export const EditOwnProductionTraceabilityModal = ({
  closeModal,
  itemIdToEdit,
  setShouldRefreshData
}: EditOwnProductionTraceabilityModalProps) => {
  const { showNotification } = useNotification()

  const editItemQuery = useQuery(
    ['own-production-traceability-item', itemIdToEdit],
    async () => {
      return await makeCoreGetRequest(`/bakery/traceability/production/${itemIdToEdit}`)
    },
    {
      enabled: !!itemIdToEdit
    }
  )

  const item = editItemQuery?.data

  const itemToEditMutation = useMutation(
    async (values: any) => {
      await makeCorePutRequest(`/bakery/traceability/production/verification/${item.id}`, values)
    },
    {
      onSuccess: () => {
        setShouldRefreshData(true)
        formik.resetForm()
        closeModal()
        showNotification({
          message: `Data added successfully`,
          type: 'success'
        })
      },
      onError: res => {
        showNotification({
          message: `Error while trying to add data, ${formatErrorMessage(res)}`,
          type: 'error'
        })
      }
    }
  )

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      conform: item?.conform || false,
      nonComplianceReason: item?.nonComplianceReason || '',
      productDestination: item?.productDestination || '',
      isVerified: item?.verified || false
    },
    onSubmit: async (values: any) => {
      itemToEditMutation.mutate(values)
    }
  })

  return (
    <Modal
      isModalOpen={!!itemIdToEdit}
      closeModal={closeModal}
      modalTitle={`${'Editare trasabilitate productie proprie'}`}
      modalWidth="50%"
    >
      <Grid container spacing={2}>
        {editItemQuery.isFetching || !editItemQuery.data || itemToEditMutation.isLoading ? (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        ) : (
          <>
            <Grid item xs={6} display="flex" alignItems={'center'}>
              <RadioButtonGroup
                label="Conform"
                dotStyle
                name="conform"
                onChange={(e, option) => {
                  const conform = toBoolean(option)
                  formik.setFieldValue('conform', conform)

                  if (conform) {
                    formik.setFieldValue('nonComplianceReason', null)
                    formik.setFieldValue('productDestination', null)
                  }
                }}
                value={formik.values.conform}
                defaultValue={formik.initialValues.conform ? 'DA' : 'NU'}
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
            <Grid item xs={6}>
              <Input
                type="text"
                variant="outlined"
                label="Motiv neconformitate"
                onChange={e => formik.setFieldValue('nonComplianceReason', e.currentTarget.value)}
                value={formik.values.nonComplianceReason ?? ''}
                name="nonComplianceReason"
                required={!formik.values.conform}
                disabled={formik.values.conform}
                error={!!formik.errors.nonComplianceReason}
                helperText={formik.errors.nonComplianceReason as string}
              />
            </Grid>

            {!item?.createdUser && (
              <Grid item xs={6} display="flex" alignItems={'center'}>
                <RadioButtonGroup
                  label="Bifa verificare de catre validator Trasabilitate"
                  dotStyle
                  name="isVerified"
                  onChange={(e, option) => {
                    formik.setFieldValue('isVerified', toBoolean(option))
                  }}
                  value={formik.values.isVerified}
                  defaultValue={formik.initialValues.isVerified ? 'DA' : 'NU'}
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
            <Grid item xs={!item?.createdUser ? 6 : 12}>
              <Input
                type="text"
                variant="outlined"
                label="Destinatia produsului neconform"
                onChange={e => formik.setFieldValue('productDestination', e.currentTarget.value)}
                value={formik.values.productDestination ?? ''}
                name="productDestination"
                required={!formik.values.conform}
                disabled={formik.values.conform}
                fullWidth={item?.createdUser}
                error={!!formik.errors.productDestination}
                helperText={formik.errors.productDestination as string}
              />
            </Grid>

            <Grid item xs={12} container justifyContent="space-between">
              <Grid>
                <Button size="large" variant="outlined" label="Anuleaza" onClick={closeModal} />
              </Grid>

              <Grid>
                <Button
                  size="large"
                  variant="contained"
                  label="Salveaza"
                  onClick={() => formik.handleSubmit()}
                  disabled={false}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Modal>
  )
}
