import { useMemo } from 'react'
import { Input, Checkbox, Autocomplete, Button } from '@fullscreendigital/carrefour-dex-fe'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification, useSearchInput } from 'hooks'
import { handleQueryError } from 'utils/helpers'
import { useMutation, useQuery } from 'react-query'
import { makeCoreGetRequest, makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { Grid, createFilterOptions } from '@mui/material'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { formatErrorMessage } from 'utils/formatting'

interface NewAdminDepositProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: AdminDeposit
}

const filter = createFilterOptions()

const AdminDepositModal: React.FC<NewAdminDepositProps> = props => {
  const { showNotification } = useNotification()
  const { isModalOpen, closeModal, isEdit, editItem, setShouldRefreshData } = props

  const mutateDeposit = async values => {
    editItem
      ? await makeCorePutRequest(`/shop-reception/deposits/${editItem?.id}`, values)
      : await makeCorePostRequest('/shop-reception/deposits', values)
  }

  const { isLoading, mutate } = useMutation(mutateDeposit, {
    onSuccess: res => {
      setShouldRefreshData(true)
      closeModal()
      formik.resetForm()
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

  const { data: depositUsersOptions } = useQuery(
    ['deposits-users'],
    async () => {
      const result = await makeCoreGetRequest(`/shop-reception/deposits/${editItem?.id}/users`)

      const resultOptions = result.list.map(item => item.username)
      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: typeof editItem !== 'undefined'
    }
  )

  const { data: depositsOptions, isLoading: isLoadingDepositOptions } = useQuery(
    ['deposits'],
    async () => {
      const result = await makeCoreGetRequest('/shop-reception/deposits/types')

      const resultOptions = result.map(
        (item: any): AutocompleteOption => ({
          label: item.value,
          value: item.key
        })
      )
      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const initialValues = useMemo(
    () => getInitialValues(editItem, depositUsersOptions, depositsOptions),
    [editItem, depositUsersOptions, depositsOptions]
  )
  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async values => {
      const payload = {
        ...values,
        type: values.type.value,
        emails: values.emails.split(';')
      }

      mutate(payload)
    }
  })

  const selectProductSearch = useSearchInput(
    'name',
    'deposit-responsible',
    '/shop-reception/deposits/responsible'
  )

  const clearModal = () => {
    formik.resetForm()
    closeModal()
  }

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={clearModal}
      modalTitle={isEdit ? 'Editeaza depozit' : 'Adauga depozit'}
      modalWidth="50%"
    >
      <Grid container spacing={2}>
        <Grid xs={12} item>
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
          />
        </Grid>

        <Grid xs={12} item>
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
          />
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Tip depozit"
            disableClearable
            required
            onChange={(event, option) => formik.setFieldValue('type', option)}
            value={formik.values.type}
            options={depositsOptions || []}
            error={!!formik.errors.type}
            helperText={formik.errors.type as string}
            loading={isLoadingDepositOptions}
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.address}
            onChange={event =>
              formik.setFieldValue('address', (event.target as HTMLInputElement).value)
            }
            label="Adresa"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.address}
            helperText={formik.errors.address as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="number"
            value={formik.values.validityPercentage}
            onChange={event =>
              formik.setFieldValue('validityPercentage', (event.target as HTMLInputElement).value)
            }
            label="Procent valabilitate"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.validityPercentage}
            helperText={formik.errors.validityPercentage as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
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
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.cif}
            onChange={event =>
              formik.setFieldValue('cif', (event.target as HTMLInputElement).value)
            }
            label="C.I.F"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.cif}
            helperText={formik.errors.cif as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.office}
            onChange={event =>
              formik.setFieldValue('office', (event.target as HTMLInputElement).value)
            }
            label="Sediu"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.office}
            helperText={formik.errors.office as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.bankAccount}
            onChange={event =>
              formik.setFieldValue('bankAccount', (event.target as HTMLInputElement).value)
            }
            label="Cont"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.bankAccount}
            helperText={formik.errors.bankAccount as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.bankName}
            onChange={event =>
              formik.setFieldValue('bankName', (event.target as HTMLInputElement).value)
            }
            label="Banca"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.bankName}
            helperText={formik.errors.bankName as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.capital}
            onChange={event =>
              formik.setFieldValue('capital', (event.target as HTMLInputElement).value)
            }
            label="Capital social subscris varsat"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.capital}
            helperText={formik.errors.capital as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.workingPoint}
            onChange={event =>
              formik.setFieldValue('workingPoint', (event.target as HTMLInputElement).value)
            }
            label="Punct de lucru"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.workingPoint}
            helperText={formik.errors.workingPoint as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
          <Checkbox
            checked={formik.values.active}
            defaultChecked={formik.values.active}
            onChange={event => formik.setFieldValue('active', !formik.values.active)}
            label="Activ"
          />
        </Grid>

        <Grid xs={12} item>
          <Checkbox
            checked={formik.values.acceptReturn}
            defaultChecked={formik.values.acceptReturn}
            onChange={event => formik.setFieldValue('acceptReturn', !formik.values.acceptReturn)}
            label="Accepta retur ambalaje"
          />
        </Grid>

        {formik.values.acceptReturn && (
          <Grid xs={12} item>
            <Input
              type="text"
              value={formik.values.packagingResponsibleEmail}
              onChange={event =>
                formik.setFieldValue(
                  'packagingResponsibleEmail',
                  (event.target as HTMLInputElement).value
                )
              }
              label="Email responsabil ambalaje"
              variant="outlined"
              style={{ width: '100%' }}
              error={!!formik.errors.packagingResponsibleEmail}
              helperText={formik.errors.packagingResponsibleEmail as string}
              required
            />
          </Grid>
        )}

        <Grid xs={12} item>
          <Autocomplete
            {...selectProductSearch}
            variant="outlined"
            label="Utilizatori asignaţi pe depozit"
            autoComplete={false}
            required
            filterOptions={x => x}
            multiple
            onChange={(event, value) => {
              if (value) {
                formik.setFieldValue('depositUsers', value)
              } else {
                formik.setFieldValue('depositUsers', null)
              }
            }}
            value={formik.values.depositUsers || null}
            error={!!formik.errors.depositUsers}
            helperText={formik.errors.depositUsers as string}
          />
        </Grid>
        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Anuleaza" onClick={clearModal} />
          <Button
            variant="contained"
            label={isEdit ? 'Editeaza' : 'Salveaza'}
            onClick={() => formik.handleSubmit()}
            disabled={isLoading}
          />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default AdminDepositModal
