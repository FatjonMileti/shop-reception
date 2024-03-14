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

interface EditFrozenTraceabilityModalProps {
  closeModal: () => void
  itemIdToEdit?: number
  setShouldRefreshData: (should: boolean) => void
}
export const EditFrozenTraceabilityModal = ({
  closeModal,
  itemIdToEdit,
                                              setShouldRefreshData
}: EditFrozenTraceabilityModalProps) => {
  const { showNotification } = useNotification()

  const itemToEditQuery = useQuery(
    ['traceability-item-frozen', itemIdToEdit],
    async () => {
      return await makeCoreGetRequest(`/bakery/traceability/frozen/${itemIdToEdit}`)
    },
    {
      enabled: !!itemIdToEdit
    }
  )

  const item = itemToEditQuery?.data

  const editFrozenTraceAbilityMutation = useMutation(
    async (values: any) => {
      await makeCorePutRequest(`/bakery/traceability/frozen/verification/${item.id}`, values)
    },
    {
      onSuccess: () => {
        formik.resetForm()
        closeModal()
        setShouldRefreshData(true)
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
      editFrozenTraceAbilityMutation.mutate(values)
    }
  })

  return (
    <Modal
      isModalOpen={!!itemIdToEdit}
      closeModal={closeModal}
      modalTitle="Editare trasabilitate congelate"
      modalWidth="50%"
    >
      <Grid container spacing={2}>
        {(itemToEditQuery.isFetching || editFrozenTraceAbilityMutation.isLoading) && (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        )}
        {!itemToEditQuery.isFetching &&
          !editFrozenTraceAbilityMutation.isLoading &&
          itemToEditQuery.data && (
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
                      formik.setFieldValue('isVerified', option)
                    }}
                    value={formik.values.isVerified}
                    defaultValue={formik.initialValues.isVerified ? 'DA' : 'NU'}
                    row
                    options={[
                      {
                        label: 'DA',
                        value: 'true' // TODO: make this boolean after adding support in UI Library
                      },
                      {
                        label: 'NU',
                        value: 'false' // TODO: make this boolean after adding support in UI Library
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
