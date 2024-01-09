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
import { handleQueryError } from 'components/volumetry/utils'
import { AsyncAutocompleteOption } from 'components/core-ui/AsyncAutocomplete/AsyncAutocompleteDefinitions'
import { useMemo } from 'react'
import { toCollaboratorPayload } from 'components/volumetry/EmployeeManagement/CollaboratorsTab/CreateEditCollaborator/serializers'

interface CreateEditCollaboratorProps {
  isModalOpen: boolean
  closeModal: Function
  editItem?: EmployeeManagementItem
  setShouldRefreshData: Function
  departmentsOptions: AsyncAutocompleteOption[]
  isDepartmentsOptionsLoading: boolean
  jobTitlesOptions: AsyncAutocompleteOption[]
  isjobTitlesOptionsLoading: boolean
}

const CreateEditCollaborator: React.FC<CreateEditCollaboratorProps> = props => {
  const {
    isModalOpen,
    closeModal,
    editItem,
    setShouldRefreshData,
    departmentsOptions,
    isDepartmentsOptionsLoading,
    jobTitlesOptions,
    isjobTitlesOptionsLoading
  } = props
  const { showNotification } = useNotification()

  const mutateCollaborator = async (values: EmployeeManagementItem) => {
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
    onSubmit: async (values: EmployeeManagementItem, { resetForm }) => {
      mutate(toCollaboratorPayload(values))
      resetForm()
    }
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={editItem ? 'Editeaza colaborator' : 'Adauga colaborator'}
    >
      <Grid container spacing={4}>
        {(isLoading || isDepartmentsOptionsLoading || isjobTitlesOptionsLoading) && (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        )}
        <Grid xs={12} item>
          <Input
            type="text"
            name="name"
            label="Nume colaborator"
            fullWidth
            variant="outlined"
            value={formik.values.fullName}
            onChange={event => formik.setFieldValue('fullName', event.currentTarget.value)}
            error={!!formik.errors.fullName}
            helperText={formik.errors.fullName as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
          <AsyncAutocomplete
            variant="outlined"
            name="department"
            label="Selecteaza magazin"
            disableClearable
            value={formik.values.department}
            options={departmentsOptions || []}
            onChange={value => formik.setFieldValue('department', value)}
            required
            error={!!formik.errors.department}
            helperText={formik.errors.department as string}
          />
        </Grid>

        <Grid xs={12} item>
          <AsyncAutocomplete
            variant="outlined"
            name="jobTitle"
            label="Selecteaza functia"
            disableClearable
            value={formik.values.jobTitle}
            options={jobTitlesOptions || []}
            onChange={value => formik.setFieldValue('jobTitle', value)}
            required
            error={!!formik.errors.jobTitle}
            helperText={formik.errors.jobTitle as string}
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
