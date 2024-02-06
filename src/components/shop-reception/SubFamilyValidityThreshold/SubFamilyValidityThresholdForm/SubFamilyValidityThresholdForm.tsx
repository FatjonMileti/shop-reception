import { useMemo } from 'react'
import { Button, Input, Checkbox } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toPayload } from './serializers'

interface NewAdminDepositProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editItem?: SubFamilyValidityThreshold
}

const SubFamilyValidityThresholdForm: React.FC<NewAdminDepositProps> = props => {
  const { isModalOpen, closeModal, editItem, setShouldRefreshData } = props
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
        const payload = toPayload(formik.values)

        setShouldRefreshData(true)
        closeModal()
        formik.resetForm()
      } catch (error) {
        showNotification({
          message: `Error while data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })
  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={'Editare prag valabilitate'}
      modalWidth="50%"
    >
      <Grid container spacing={4} justifyContent="flex-end">
        <Grid xs={12} item>
          <FormInfoItems
            items={[
              {
                label: 'Cod familie:',
                name: editItem?.familyCode
              }
            ]}
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="text"
            value={formik.values.subfamilyCode}
            onChange={event =>
              formik.setFieldValue('subfamilyCode', (event.target as HTMLInputElement).value)
            }
            label="Cod sub familie"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.subfamilyCode}
            helperText={formik.errors.subfamilyCode as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="text"
            value={formik.values.subfamily}
            onChange={event =>
              formik.setFieldValue('subfamily', (event.target as HTMLInputElement).value)
            }
            label="Sub familie"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.subfamily}
            helperText={formik.errors.subfamily as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="text"
            value={formik.values.familyCode}
            onChange={event =>
              formik.setFieldValue('familyCode', (event.target as HTMLInputElement).value)
            }
            label="Cod familie"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.familyCode}
            helperText={formik.errors.familyCode as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="text"
            value={formik.values.family}
            onChange={event =>
              formik.setFieldValue('family', (event.target as HTMLInputElement).value)
            }
            label="Familie"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.family}
            helperText={formik.errors.family as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="text"
            value={formik.values.districtCode}
            onChange={event =>
              formik.setFieldValue('districtCode', (event.target as HTMLInputElement).value)
            }
            label="Cod raion"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.districtCode}
            helperText={formik.errors.districtCode as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="text"
            value={formik.values.district}
            onChange={event =>
              formik.setFieldValue('district', (event.target as HTMLInputElement).value)
            }
            label="Raion"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.district}
            helperText={formik.errors.district as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="number"
            value={formik.values.validityThreshold}
            onChange={event =>
              formik.setFieldValue('validityThreshold', (event.target as HTMLInputElement).value)
            }
            label="Prag valabilitate"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.validityThreshold}
            helperText={formik.errors.validityThreshold as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item />
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

export default SubFamilyValidityThresholdForm
