import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { useNotification } from 'hooks'
import { ChangeEvent, MouseEvent, useMemo } from 'react'
import { useMutation } from 'react-query'
import { makeCorePutRequest } from 'utils/api'
import * as yup from 'yup'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { getFormInitialValues } from './helpers'
import { handleQueryError } from 'utils/helpers'
import { EditAllocationModalProps } from '../TaskAllocationsDefinitions'
import { TASK_STATUS_ACTIONS } from '../Employee/constants'

const validationSchema = (hideWorkload) =>
  yup.object({
    allocatedWorkload: hideWorkload
      ? yup.string().nullable()
      : yup.number().required('Acest camp este obligatoriu.'),
    performedWorkload: yup.string().nullable(),
    comment: yup.string()
  })

const EditAllocationModal = (props: EditAllocationModalProps) => {
  const {
    isModalOpen,
    closeModal,
    editItem,
    employee,
    setShouldRefreshData,
    setSelectedRowId,
    task,
    hideWorkload
  } = props
  const { showNotification } = useNotification()

  const editCurrentAllocation = async values => {
    await makeCorePutRequest(`/volumetry/tasks/${editItem ? editItem?.id : employee.id}`, {
      ...values,
      ...(editItem ? {} : { action: TASK_STATUS_ACTIONS.STOP })
    })
  }

  const { isLoading, mutate } = useMutation(editCurrentAllocation, {
    onSuccess: res => {
      setSelectedRowId(task.taskTemplateId)
      setShouldRefreshData(true)
      closeModal()
      showNotification({
        message: editItem ? 'Alocarea a fost editata cu succes' : 'Taskul a fost oprit cu succes',
        type: 'success'
      })
    },
    onError: error => {
      handleQueryError(
        error,
        `A aparut o eroare la ${editItem ? 'editarea alocarii' : 'oprirea taskului'}.`,
        showNotification
      )
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: getFormInitialValues(editItem || employee, hideWorkload),
    validationSchema: validationSchema(hideWorkload),
    onSubmit: async (values: any, { resetForm }) => {
      mutate(values)
      resetForm()
    }
  })

  const cancel = () => {
    closeModal()
  }

  const submit = () => {
    formik.handleSubmit()
  }

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={cancel}
      modalTitle={editItem ? 'Editeaza alocare' : 'Opreste task'}
      modalWidth="50%"
      onClick={(e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <Grid container spacing={2}>
        <Grid xs={12} item>
          <FormInfoItems
            items={[
              { label: 'Task:', name: task?.taskName },
              { label: 'Departament/Raion:', name: task?.departmentAlias },
              !hideWorkload && {
                label: 'Angajat:',
                name: employee?.workerFullName
              }
            ]}
          />
        </Grid>

        {!hideWorkload && (
          <>
            <Grid xs={12} item>
              <Input
                type="number"
                variant="outlined"
                name="allocatedWorkload"
                label="Volum alocat"
                value={formik.values.allocatedWorkload}
                width="100%"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  formik.setFieldValue(
                    'allocatedWorkload',
                    (event.target as HTMLInputElement).value
                  )
                }
                error={!!formik.errors.allocatedWorkload}
                helperText={formik.errors.allocatedWorkload as string}
                required
              />
            </Grid>
            {editItem?.timerStatus !== 'FINISHED' && (
              <Grid xs={12} item>
                <Input
                  type="number"
                  variant="outlined"
                  name="performedWorkload"
                  label="Volum efectuat"
                  value={formik.values.performedWorkload}
                  width="100%"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    formik.setFieldValue(
                      'performedWorkload',
                      (event.target as HTMLInputElement).value
                    )
                  }
                  error={!!formik.errors.performedWorkload}
                  helperText={formik.errors.performedWorkload as string}
                  required
                />
              </Grid>
            )}
          </>
        )}

        <Grid xs={12} item>
          <Input
            type="textarea"
            variant="outlined"
            name="comment"
            label="Mesaj"
            value={formik.values.comment}
            width="100%"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formik.setFieldValue('comment', (event.target as HTMLInputElement).value)
            }
            rows={7}
          />
        </Grid>

        <Grid xs={12} item>
          <Grid container spacing={2}>
            <Grid md={6} xs={12} item></Grid>
            <Grid md={6} xs={12} item className={s.modalButtons}>
              <Button variant="outlined" label="Anuleaza" onClick={cancel} />
              <Button variant="contained" label="Salveaza" onClick={() => submit()} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default EditAllocationModal
