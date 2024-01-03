import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from './TaskAllocation.modules.scss'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { Input } from 'components/core-ui/Input'
import { ChangeEvent, useMemo } from 'react'
import { useFormik } from 'formik'
import { makeCorePostRequest } from 'utils/api'
import { useMutation } from 'react-query'
import { useNotification } from 'hooks'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { getEmployeesOptions } from '../api'
import { handleQueryError } from '../utils'

interface ProdStandardUM {
  id: number
  name: string
  unit: string
}
interface AssignEmployeeProps {
  isModalOpen: boolean
  closeModal: Function
  taskName: string
  department: string
  prodStandardUM: ProdStandardUM
}

const AssignEmployee = (props: AssignEmployeeProps) => {
  const { isModalOpen, closeModal, taskName, department, prodStandardUM } = props
  const { showNotification } = useNotification()

  const { data: employeeOptions, isLoading: isEmployeeOptionsLoading } =
    getEmployeesOptions(showNotification, isModalOpen)

  const assignEmployee = async values => {
    await makeCorePostRequest('/volumetry/taskAllocation/assignEmployee', values)
  }

  const { isLoading, mutate } = useMutation(assignEmployee, {
    onSuccess: res => {
      closeModal()
      showNotification({
        message: `Employee assigned successfully!`,
        type: 'success'
      })
    },
    onError: error =>
      handleQueryError(error, 'A aparut o eroare la asignarea angajatului.', showNotification)
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      selectEmployee: null,
      volume: null
    },
    onSubmit: async (values, { resetForm }) => {
      const payload = { volume: values.volume, selectEmployee: values.selectEmployee.value }
      mutate(payload)
      resetForm()
      closeModal()
    }
  })

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle="Selecteaza angajat">
      <Grid container spacing={4}>
        <Grid xs={12} item>
          <FormInfoItems
            items={[
              { label: 'Task:', name: taskName },
              { label: 'Departament/Raion:', name: department },
              { label: 'UM:', name: `${prodStandardUM.name}/${prodStandardUM.unit}` }
            ]}
          />
        </Grid>

        <Grid xs={12} item>
          {!isEmployeeOptionsLoading && (
            <AsyncAutocomplete
              variant="outlined"
              name="selectEmployee"
              label="Selecteaza angajat"
              value={formik.values.selectEmployee}
              options={employeeOptions}
              onChange={(value: ChangeEvent<HTMLInputElement>) =>
                formik.setFieldValue('selectEmployee', value)
              }
              groupBy={option => option.groupBy}
            />
          )}
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            name="volume"
            label={`Volum ${prodStandardUM.name}/${prodStandardUM.unit}`}
            variant="outlined"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formik.setFieldValue('volume', event.target.value)
            }
            value={formik.values.volume}
            style={{ width: '100%' }}
          />
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label={'Anuleaza'} onClick={() => closeModal()} />
          <Button variant="contained" label={'Salveaza'} onClick={() => formik.handleSubmit()} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default AssignEmployee
