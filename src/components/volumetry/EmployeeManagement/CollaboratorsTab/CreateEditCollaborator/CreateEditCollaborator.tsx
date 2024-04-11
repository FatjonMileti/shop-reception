import { Modal } from 'components/core-ui/Modal'
import { CircularProgress, Grid } from '@mui/material'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useNotification } from 'hooks'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { useMutation } from 'react-query'
import { EmployeeManagementItem } from 'components/volumetry/interfaces'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { handleQueryError } from 'utils/helpers'
import { AsyncAutocompleteOption } from 'components/core-ui/AsyncAutocomplete/AsyncAutocompleteDefinitions'
import { useMemo } from 'react'
import { toCollaboratorPayload } from 'components/volumetry/EmployeeManagement/CollaboratorsTab/CreateEditCollaborator/serializers'
import { getCollaboratorsTypesOptions, getContractorsNamesOptions } from 'components/volumetry/api'

interface CreateEditCollaboratorProps {
  isModalOpen: boolean
  closeModal: Function
  editItem?: EmployeeManagementItem
  setShouldRefreshData: Function
  departmentsOptions: AsyncAutocompleteOption[]
  isDepartmentsOptionsLoading: boolean
}

const CreateEditCollaborator: React.FC<CreateEditCollaboratorProps> = props => {
  const {
    isModalOpen,
    closeModal,
    editItem,
    setShouldRefreshData,
    departmentsOptions,
    isDepartmentsOptionsLoading
  } = props
  const { showNotification } = useNotification()

  const mutateCollaborator = async values => {
    editItem
      ? await makeCorePutRequest(`/volumetry/workers/contractors/${editItem?.id}`, values)
      : await makeCorePostRequest(`/volumetry/workers/contractors`, values)
  }

  const { isLoading, mutate } = useMutation(mutateCollaborator, {
    onSuccess: res => {
      setShouldRefreshData(true)
      closeModal()
      showNotification({
        message: `Colaboratorul a fost ${editItem ? 'editat' : 'adaugat'} cu succes!`,
        type: 'success'
      })
    },
    onError: error =>
      handleQueryError(
        error,
        `Eroare la ${editItem ? 'editarea' : 'adaugarea colaboratorului.'}`,
        showNotification
      )
  })

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])
  const validationSchema = useMemo(() => getValidationSchema(), [editItem])

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any, { resetForm }) => {
      mutate(toCollaboratorPayload(values, editItem, departmentsOptions))
      resetForm()
    }
  })

  const { data: contractorsTypesOptions, isLoading: isContractorsTypesOptions } =
    getCollaboratorsTypesOptions(showNotification)

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={editItem ? 'Editeaza colaborator' : 'Adauga colaborator'}
      modalWidth="50%"
    >
      <Grid container spacing={4}>
        {(isLoading || isDepartmentsOptionsLoading || isContractorsTypesOptions) && (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        )}
        <Grid xs={6} item>
          <Input
            type="text"
            name="name"
            label="Nume colaborator"
            fullWidth
            variant="outlined"
            value={formik.values.lastName}
            onChange={event => formik.setFieldValue('lastName', event.currentTarget.value)}
            error={!!formik.errors.lastName}
            helperText={formik.errors.lastName as string}
            required
          />
        </Grid>
        <Grid xs={6} item>
          <Input
            type="text"
            name="name"
            label="Prenume colaborator"
            fullWidth
            variant="outlined"
            value={formik.values.firstName}
            onChange={event => formik.setFieldValue('firstName', event.currentTarget.value)}
            error={!!formik.errors.firstName}
            helperText={formik.errors.firstName as string}
            required
          />
        </Grid>
        <Grid xs={6} item>
          <Input
            type="text"
            name="name"
            label="Nume mijlociu colaborator"
            fullWidth
            variant="outlined"
            value={formik.values.middleName}
            onChange={event => formik.setFieldValue('middleName', event.currentTarget.value)}
            error={!!formik.errors.middleName}
            helperText={formik.errors.middleName as string}
          />
        </Grid>
        <Grid xs={6} item>
          <Input
            type="text"
            name="name"
            label="Email"
            fullWidth
            variant="outlined"
            value={formik.values.email}
            onChange={event => formik.setFieldValue('email', event.currentTarget.value)}
            error={!!formik.errors.email}
            helperText={formik.errors.email as string}
          />
        </Grid>

        <Grid xs={6} item>
          <AsyncAutocomplete
            variant="outlined"
            name="genericDepartment"
            label="Selecteaza departament"
            disableClearable
            value={formik.values.genericDepartment}
            options={departmentsOptions || []}
            onChange={value => formik.setFieldValue('genericDepartment', value)}
            required
            error={!!formik.errors.genericDepartment}
            helperText={formik.errors.genericDepartment as string}
          />
        </Grid>

        <Grid xs={6} item>
          <AsyncAutocomplete
            variant="outlined"
            name="workerType"
            label="Selecteaza tip colaborator"
            disableClearable
            value={formik.values.workerType}
            options={contractorsTypesOptions || []}
            onChange={value => formik.setFieldValue('workerType', value)}
            required
            error={!!formik.errors.workerType}
            helperText={formik.errors.workerType as string}
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            name="employer"
            label="Angajator"
            fullWidth
            variant="outlined"
            value={formik.values.employer}
            onChange={event => formik.setFieldValue('employer', event.currentTarget.value)}
            error={!!formik.errors.employer}
            helperText={formik.errors.employer as string}
            required
          />
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Anuleaza" onClick={() => closeModal()} />
          <Button variant="contained" label="Salveaza" onClick={() => formik.handleSubmit()} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default CreateEditCollaborator
