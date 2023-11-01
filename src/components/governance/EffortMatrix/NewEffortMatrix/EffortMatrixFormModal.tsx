import { useMemo } from 'react'
import { Button, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { getInitialValues, getValidationSchema } from './helpers'
import { makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { EffortMatrix, Role } from "../../interfaces";

interface NewEffortMatrixProps {
  roles?: Role[]
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: EffortMatrix
}

const EffortMatrixFormModal: React.FC<NewEffortMatrixProps> = props => {
  const { roles, isModalOpen, closeModal, isEdit, editItem, setShouldRefreshData } = props

  const { showNotification } = useNotification()

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])

  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {

        const payload = {
          role: formik.values.role,
          evaluationPhase: formik.values.evaluationPhase,
          analysisPhase: formik.values.analysisPhase,
          designPhase: formik.values.designPhase,
          developmentPhase: formik.values.developmentPhase,
          systemTestPhase: formik.values.systemTestPhase,
          uatPhase: formik.values.uatPhase,
          rolloutPhase: formik.values.rolloutPhase,
          hypercarePhase: formik.values.hypercarePhase
        }

        if (isEdit) {
          await makeCorePutRequest(`/governance/effortMatrix/${formik.values.id}`, payload)
        } else {
          await makeCorePostRequest('/governance/effortMatrix', payload)
        }

        setShouldRefreshData(true)
        closeModal()
      } catch (error) {
        showNotification({
          message: `Error while saving effort matrix data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })
  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? 'Edit Effort Matrix' : 'New Effort Matrix'}
    >
      <Grid container spacing={4}>
        <Grid xs={12} item>
          {isEdit ? (
            <FormInfoItems
              items={[
                {
                  label: 'Role:',
                  name: (editItem as EffortMatrix)?.role
                }
              ]}
            />
          ) : (
            <AsyncAutocomplete
              variant="standard"
              name="role"
              label="Role"
              options={roles ?? []}
              onChange={value => formik.setFieldValue('role', value)}
              value={formik.values.role}
              error={!!formik.errors.role}
              helperText={formik.errors.role as string}
              required
            />
          )}
        </Grid>
        <Grid xs={12} item>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Input
                type="number"
                value={formik.values.evaluationPhase}
                onChange={event => formik.setFieldValue('evaluationPhase', (event.target as HTMLInputElement).value)}
                label="Evaluation"
                variant="standard"
                style={{ width: '100%' }}
                error={!!formik.errors.evaluationPhase}
                helperText={formik.errors.evaluationPhase as string}
                required
              />
            </Grid>
            <Grid item md={6}>
              <Input
                type="number"
                value={formik.values.analysisPhase}
                onChange={event => formik.setFieldValue('analysisPhase', (event.target as HTMLInputElement).value)}
                label="Analysis"
                variant="standard"
                style={{ width: '100%' }}
                error={!!formik.errors.analysisPhase}
                helperText={formik.errors.analysisPhase as string}
                required
              />
            </Grid>
            <Grid item md={6}>
              <Input
                type="number"
                value={formik.values.designPhase}
                onChange={event => formik.setFieldValue('designPhase', (event.target as HTMLInputElement).value)}
                label="Design"
                variant="standard"
                style={{ width: '100%' }}
                error={!!formik.errors.designPhase}
                helperText={formik.errors.designPhase as string}
                required
              />
            </Grid>
            <Grid item md={6}>
              <Input
                type="number"
                value={formik.values.developmentPhase}
                onChange={event => formik.setFieldValue('developmentPhase', (event.target as HTMLInputElement).value)}
                label="Development"
                variant="standard"
                style={{ width: '100%' }}
                error={!!formik.errors.developmentPhase}
                helperText={formik.errors.developmentPhase as string}
                required
              />
            </Grid>
            <Grid item md={6}>
              <Input
                type="number"
                value={formik.values.systemTestPhase}
                onChange={event => formik.setFieldValue('systemTestPhase', (event.target as HTMLInputElement).value)}
                label="System Test"
                variant="standard"
                style={{ width: '100%' }}
                error={!!formik.errors.systemTestPhase}
                helperText={formik.errors.systemTestPhase as string}
                required
              />
            </Grid>
            <Grid item md={6}>
              <Input
                type="number"
                value={formik.values.uatPhase}
                onChange={event => formik.setFieldValue('uatPhase', (event.target as HTMLInputElement).value)}
                label="UAT"
                variant="standard"
                style={{ width: '100%' }}
                error={!!formik.errors.uatPhase}
                helperText={formik.errors.uatPhase as string}
                required
              />
            </Grid>
            <Grid item md={6}>
              <Input
                type="number"
                value={formik.values.rolloutPhase}
                onChange={event => formik.setFieldValue('rolloutPhase', (event.target as HTMLInputElement).value)}
                label="Roll-Out"
                variant="standard"
                style={{ width: '100%' }}
                error={!!formik.errors.rolloutPhase}
                helperText={formik.errors.rolloutPhase as string}
                required
              />
            </Grid>
            <Grid item md={6}>
              <Input
                type="number"
                value={formik.values.hypercarePhase}
                onChange={event => formik.setFieldValue('hypercarePhase', (event.target as HTMLInputElement).value)}
                label="Hypercare"
                variant="standard"
                style={{ width: '100%' }}
                error={!!formik.errors.hypercarePhase}
                helperText={formik.errors.hypercarePhase as string}
                required
              />
            </Grid>
          </Grid>
        </Grid>

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

export default EffortMatrixFormModal
