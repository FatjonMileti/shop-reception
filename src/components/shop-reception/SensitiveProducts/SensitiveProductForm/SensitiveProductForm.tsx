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
import { toAdminDepositPayload } from './serializers'

interface NewAdminDepositProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: SensitiveProduct
}

const SensitiveProductForm: React.FC<NewAdminDepositProps> = props => {
  const { isModalOpen, closeModal, isEdit, editItem, setShouldRefreshData } = props
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
        const payload = toAdminDepositPayload(formik.values)

        if (isEdit) {
        } else {
        }

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
      modalTitle={isEdit ? 'Editează regulă produse sensibile' : 'Adaugă regulă produse sensibile'}
      modalWidth="50%"
    >
      <Grid container spacing={4} justifyContent="flex-end">
        <Grid xs={12} item>
          {isEdit ? (
            <FormInfoItems
              items={[
                {
                  label: 'Nume Magazin:',
                  name: editItem?.storeName
                }
              ]}
            />
          ) : null}
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="select"
            value={formik.values.store?.value}
            onChange={event =>
              formik.setFieldValue('store', (event.target as HTMLInputElement).value)
            }
            label="Magazin"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.store}
            helperText={formik.errors.store as string}
            values={[
              {
                value: "AMBIENT",
                label: "AMBIENT"
              }
            ]}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="select"
            value={formik.values.district?.value}
            onChange={event =>
              formik.setFieldValue('district', (event.target as HTMLInputElement).value)
            }
            label="Raion"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.district}
            helperText={formik.errors.district as string}
            values={[
              {
                value: "AMBIENT",
                label: "AMBIENT"
              }
            ]}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="select"
            value={formik.values.family?.value}
            onChange={event =>
              formik.setFieldValue('family', (event.target as HTMLInputElement).value)
            }
            label="Familie"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.family}
            helperText={formik.errors.family as string}
            values={[
              {
                value: "AMBIENT",
                label: "AMBIENT"
              }
            ]}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="select"
            value={formik.values.subfamily?.value}
            onChange={event =>
              formik.setFieldValue('subfamily', (event.target as HTMLInputElement).value)
            }
            label="Familie"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.subfamily}
            helperText={formik.errors.subfamily as string}
            values={[
              {
                value: "AMBIENT",
                label: "AMBIENT"
              }
            ]}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="select"
            value={formik.values.UbCode?.value}
            onChange={event =>
              formik.setFieldValue('UbCode', (event.target as HTMLInputElement).value)
            }
            label="Familie"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.UbCode}
            helperText={formik.errors.UbCode as string}
            values={[
              {
                value: "AMBIENT",
                label: "AMBIENT"
              }
            ]}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="select"
            value={formik.values.productCode?.value}
            onChange={event =>
              formik.setFieldValue('productCode', (event.target as HTMLInputElement).value)
            }
            label="Familie"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.productCode}
            helperText={formik.errors.productCode as string}
            values={[
              {
                value: "AMBIENT",
                label: "AMBIENT"
              }
            ]}
            required
          />
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

export default SensitiveProductForm
