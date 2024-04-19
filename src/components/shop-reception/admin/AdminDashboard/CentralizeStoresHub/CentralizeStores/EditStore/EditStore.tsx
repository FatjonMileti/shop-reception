import { useMemo } from 'react'
import { Button, Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { Grid } from '@mui/material'
import { makeCoreGetRequest, makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { useMutation, useQuery } from 'react-query'

interface EditStoreProps {
  isOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editItem?: any
}

const EditStore: React.FC<EditStoreProps> = props => {
  const { isOpen, closeModal, editItem, setShouldRefreshData } = props
  const { showNotification } = useNotification()

  const { data: shopsFormData, isLoading: isLoadingShopsFormData } = useQuery(
    ['shops-form'],
    async () => {
      const data = await makeCoreGetRequest(
        `/shop-reception/delivery-matrix/shops/${editItem?.destinationId}/form-data`
      )
      return {
        depositList: data?.depositList.map(deposit => ({
          label: deposit.displayName,
          value: deposit.id
        })),
        hubList: data?.hubList.map(hub => ({ label: hub.displayName, value: hub.id })),
        selectedDeposits: data?.depositList
          .filter(deposit => deposit.isChecked)
          .map(deposit => ({ label: deposit.displayName, value: deposit.id })),
        selectedHubs: data?.hubList
          .filter(hub => hub.isChecked)
          .map(hub => ({ label: hub.displayName, value: hub.id }))
      }
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea huburilor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: typeof editItem !== 'undefined' && editItem?.destinationId !== null
    }
  )

  const mutateStore = async values => {
    await makeCorePostRequest(
      `/shop-reception/delivery-matrix/shops/${editItem?.destinationId}`,
      values
    )
  }

  const { isLoading, mutate } = useMutation(mutateStore, {
    onSuccess: () => {
      setShouldRefreshData(true)
      formik.resetForm()
      closeModal()
      showNotification({
        message: `Store updated successfully`,
        type: 'success'
      })
    },
    onError: res => {
      showNotification({
        message: `Error while trying to update store. ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const initialValues = useMemo(
    () => getInitialValues(editItem, shopsFormData),
    [editItem, shopsFormData]
  )
  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async values => {
      const payload = {
        depositIdList: values.depositIdList.map(depositId => depositId.value),
        hubIdList: values.hubIdList.map(hubIdList => hubIdList.value)
      }
      mutate(payload)
    }
  })

  return (
    <Modal
      isModalOpen={isOpen}
      closeModal={closeModal}
      modalTitle={`Editează matrice magazin`}
      modalWidth="50%"
    >
      <Grid container spacing={2}>
        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Livrare marfa din depozit"
            disableClearable
            required
            onChange={(event, option) => formik.setFieldValue('depositIdList', option)}
            value={formik.values.depositIdList}
            options={shopsFormData?.depositList || []}
            multiple
            error={!!formik.errors.depositIdList}
            helperText={formik.errors.depositIdList as string}
          />
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Huburi"
            disableClearable
            required
            onChange={(event, option) => formik.setFieldValue('hubIdList', option)}
            value={formik.values.hubIdList}
            options={shopsFormData?.hubList || []}
            multiple
            error={!!formik.errors.hubIdList}
            helperText={formik.errors.hubIdList as string}
          />
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
          <Button
            variant="contained"
            label={'Editeaza'}
            onClick={() => formik.handleSubmit()}
            disabled={isLoading}
          />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default EditStore
