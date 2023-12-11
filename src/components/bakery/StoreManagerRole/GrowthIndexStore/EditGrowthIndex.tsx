import { Modal } from 'components/core-ui/Modal'
import { CircularProgress, Grid } from '@mui/material'
import { FormInfoItems } from '../../../core-ui/FormInfoItems'
import { useMutation, useQuery } from 'react-query'
import { makeCoreGetRequest, makeCorePutRequest } from '../../../../utils/api'
import { formatErrorMessage } from '../../../../utils/formatting'
import { useNotification } from '../../../../hooks'
import { GrowthIndex } from './interfaces'
import { useFormik } from 'formik'
import { ChangeEvent, useMemo } from 'react'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../../core-ui/Modal/Modal.modules.scss'
import { editGrowthIndexValidationSchema, getInitialValues } from './helpers'

interface EditGrowthIndexProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editGrowthIndexId?: string | number
}

export const EditGrowthIndex = ({
  isModalOpen,
  closeModal,
  editGrowthIndexId,
  setShouldRefreshData
}: EditGrowthIndexProps) => {
  const { showNotification } = useNotification()

  const growthIndexQuery = useQuery(
    ['growth-index-store', editGrowthIndexId],
    async () => {
      if (editGrowthIndexId) {
        const result = await makeCoreGetRequest(`/bakery/store/growth/${editGrowthIndexId}`)
        return result || null
      }
      return null
    },
    {
      onError: error => {
        showNotification({
          message: `An error occurred while getting the Growth index. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  const growthIndexMutation = useMutation(
    async (values: any) => {
      await makeCorePutRequest(`/bakery/store/growth`, values)
    },
    {
      onSuccess: () => {
        setShouldRefreshData(true)
        closeModal()
        showNotification({
          message: `Growth index edited successfully`,
          type: 'success'
        })
      },
      onError: res => {
        showNotification({
          message: `Error while trying to update field, ${formatErrorMessage(res)}`,
          type: 'error'
        })
      }
    }
  )

  const initialValues = useMemo(() => getInitialValues(growthIndexQuery.data), [growthIndexQuery.data])

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: editGrowthIndexValidationSchema,
    onSubmit: async (values: any, { resetForm }) => {
      growthIndexMutation.mutate(values)
      resetForm()
    }
  })

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Edit'} modalWidth="50%">

      <Grid container rowSpacing={3.5}>
        {growthIndexMutation.isLoading || growthIndexQuery.isFetching ? (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        ) : (
          <>
            <Grid xs={12} item>
              <FormInfoItems
                items={[
                  {
                    label: 'Magazin',
                    name: (growthIndexQuery.data as GrowthIndex)?.name
                  }
                ]}
              />
            </Grid>

            <Grid container rowSpacing={3} item>
              <Grid xs={12} item>
                <Input
                  type="text"
                  variant="standard"
                  name="growth"
                  label="Coeficient"
                  width="100%"
                  value={formik.values.growth}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    formik.setFieldValue('growth', event.currentTarget.value)
                  }
                  error={!!formik.errors.growth}
                  helperText={formik.errors.growth as string}
                />
              </Grid>
            </Grid>

            <Grid xs={12} item className={s.modalButtons}>
              <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
              <Button variant="contained" label="Save" onClick={() => formik.handleSubmit()} />
            </Grid>
          </>
        )}
      </Grid>


    </Modal>
  )
}