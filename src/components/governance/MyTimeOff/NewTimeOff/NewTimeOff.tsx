import { Button, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { useNotification } from 'hooks'
import { useMemo } from 'react'
import { makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { areSameDayDates, formatPayloadDate } from 'utils/helpers'
import { TableRowModel } from '../interfaces'
import { dayOfTypes, getInitialValues, getValidationSchema } from './helpers'

interface NewTimeOffProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: TableRowModel | number
}

const NewTimeOff: React.FC<NewTimeOffProps> = props => {
  const { isModalOpen, closeModal, isEdit, editItem, setShouldRefreshData } = props

  const { showNotification } = useNotification()

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])

  const validationSchema = useMemo(() => getValidationSchema(), [editItem])

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        const payload = {
          teamMember: {
            id: isEdit ? (editItem as TableRowModel).teamMemberId : values.teamMember.value
          },
          dayOffType: values.dayOffType,
          startDate: formatPayloadDate(values.startDate),
          endDate: formatPayloadDate(values.endDate),
          ...(values.numberOfHours && { numberOfHours: values.numberOfHours })
        }

        if (isEdit) {
          await makeCorePutRequest(`/governance/myTimeOff/${formik.values.id}`, payload)
        } else {
          await makeCorePostRequest('/governance/myTimeOff', payload)
        }

        setShouldRefreshData(true)
        closeModal()
      } catch (error) {
        showNotification({
          message: `Error while saving time off data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? 'Edit' : 'Create'}
    >
      <Grid container spacing={2}>
        <Grid xs={12} item>
          <Input
            label="Type of day-off"
            type="select"
            values={dayOfTypes}
            variant="standard"
            width="100%"
            value={formik.values.dayOffType}
            onChange={event => {
              const inputValue = (event.target as HTMLInputElement).value
              formik.setFieldValue('dayOffType', inputValue)
            }}
            error={!!formik.errors.dayOffType}
            helperText={formik.errors.dayOffType as string}
            required
          />
        </Grid>
        <Grid xs={12} item>
          <DatePicker
            value={formik.values.startDate}
            onChange={value => formik.setFieldValue('startDate', value)}
            label="Start date"
            variant="standard"
            style={{ width: '100%' }}
            error={!!formik.errors.startDate}
            helperText={formik.errors.startDate as string}
            required
          />
        </Grid>
        <Grid xs={12} item>
          <DatePicker
            value={formik.values.endDate}
            onChange={value => formik.setFieldValue('endDate', value)}
            label="End date"
            variant="standard"
            style={{ width: '100%' }}
            error={!!formik.errors.endDate}
            helperText={formik.errors.endDate as string}
            required
          />
        </Grid>
        {areSameDayDates(formik.values.startDate, formik.values.endDate) && (
          <Grid item xs={12}>
            <Input
              type="number"
              name="numberOfHours"
              label="Number of hours"
              fullWidth
              variant="standard"
              value={formik.values.numberOfHours}
              onChange={event => formik.setFieldValue('numberOfHours', event.currentTarget.value)}
              error={!!formik.errors.numberOfHours}
              helperText={formik.errors.numberOfHours as string}
            />
          </Grid>
        )}
        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
          <Button
            variant="contained"
            type="submit"
            label="Submit"
            onClick={() => formik.handleSubmit()}
          />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default NewTimeOff
