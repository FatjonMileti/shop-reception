import { useMemo, useState } from 'react'
import { Input, Checkbox, Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '../../../../Common/Grid'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { toPayload } from './serializers'
import { ModalFormActionButtons } from '../../../Common/ModalFormActionButtons'
import { getDepositTypesOptions } from 'components/shop-reception/admin/api'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { handleQueryError } from 'utils/helpers'
import { useMutation } from 'react-query'
import { makeRmPostRequest, makeRmPatchRequest } from 'utils/api'
import { createFilterOptions } from '@mui/material'

interface NewAdminDepositProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: AdminDeposit
}

//TODO fetch the data from BE
const initialUsersOptions = [
  { value: 'paula', label: 'paula' },
  { value: 'adrian', label: 'adrian' }
]

const filter = createFilterOptions()

const AdminDepositModal: React.FC<NewAdminDepositProps> = props => {
  const { isModalOpen, closeModal, isEdit, editItem, setShouldRefreshData } = props

  const [usersOptions, setUsersOptions] = useState(initialUsersOptions)

  const { showNotification } = useNotification()

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])

  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  const { data: typesOptions } = getDepositTypesOptions(showNotification, isModalOpen)

  const editDeposit = async values =>
    isEdit
      ? await makeRmPatchRequest(`/deposits/${editItem?.id}`, values)
      : await makeRmPostRequest('/deposits', values)

  const { isLoading, mutate } = useMutation(editDeposit, {
    onSuccess: res => {
      setShouldRefreshData(true)
      closeModal()
      showNotification({
        message: `Depozitul a fost ${isEdit ? 'editat' : 'creat'} cu succes`,
        type: 'success'
      })
    },
    onError: error =>
      handleQueryError(
        error,
        `A aparut o eroare la ${isEdit ? 'editarea' : 'crearea'} depozitului.`,
        showNotification
      )
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      mutate(toPayload(values))
    }
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? 'Editeaza depozit' : 'Adauga depozit'}
      modalWidth="50%"
    >
      <Grid
        gridContainerStyle={{ margin: 0 }}
        items={[
          <Input
            type="text"
            value={formik.values.code}
            onChange={event =>
              formik.setFieldValue('code', (event.target as HTMLInputElement).value)
            }
            label="Cod depozit"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.code}
            helperText={formik.errors.code as string}
            required
          />,
          <Input
            type="text"
            value={formik.values.name}
            onChange={event =>
              formik.setFieldValue('name', (event.target as HTMLInputElement).value)
            }
            label="Nume"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.name}
            helperText={formik.errors.name as string}
            required
          />,
          <AsyncAutocomplete
            variant="outlined"
            name="type"
            label="Tip depozit"
            options={typesOptions}
            onChange={value => formik.setFieldValue('type', value)}
            value={formik.values.type}
            error={!!formik.errors.type}
            helperText={formik.errors.type as string}
            required
          />,
          <Input
            type="text"
            value={formik.values.address}
            onChange={event =>
              formik.setFieldValue('address', (event.target as HTMLInputElement).value)
            }
            label="Adresă"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.address}
            helperText={formik.errors.address as string}
            required
          />,
          <Input
            type="text"
            value={formik.values.validityPercentage}
            onChange={event =>
              formik.setFieldValue('validityPercentage', (event.target as HTMLInputElement).value)
            }
            label="Procent valabilitate"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.validityPercentage}
            helperText={formik.errors.validityPercentage as string}
          />,
          <Input
            type="text"
            value={formik.values.emails}
            onChange={event =>
              formik.setFieldValue('emails', (event.target as HTMLInputElement).value)
            }
            label="Comunicare depozit (emails)"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.emails}
            helperText={formik.errors.emails as string}
            required
          />,
          <Checkbox
            checked={formik.values.active}
            onChange={event => formik.setFieldValue('active', !formik.values.active)}
            label="Activ"
          />,
          <Autocomplete
            value={formik.values.depositUsers}
            multiple
            options={usersOptions}
            freeSolo
            variant="outlined"
            label="Utilizatori asignati pe depozit"
            onChange={(event, value) => {
              const result = value.map(val => {
                return val.inputValue
                  ? {
                    value: val.inputValue,
                    label: val.inputValue
                  }
                  : val
              })
              formik.setFieldValue('depositUsers', result)
            }}
            error={!!formik.errors.depositUsers}
            helperText={formik.errors.depositUsers as string}
            required
            filterOptions={(options, params) => {
              const filtered = filter(options, params)

              // Suggest the creation of a new value
              if (params.inputValue !== '') {
                filtered.push({
                  inputValue: params.inputValue,
                  label: `Add "${params.inputValue}"`
                })
              }

              return filtered
            }}
          />
        ]}
        itemsPerRow={2}
      />
      <ModalFormActionButtons
        onCancel={() => closeModal()}
        onSubmit={() => formik.handleSubmit()}
      />
    </Modal>
  )
}

export default AdminDepositModal
