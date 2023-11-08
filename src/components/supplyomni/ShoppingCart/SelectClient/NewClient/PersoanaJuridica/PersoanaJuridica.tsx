import { Box } from '@mui/material'
import { useNotification } from 'hooks'
import s from '../NewClient.modules.scss'
import { useMutation } from 'react-query'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { CountyCitySelect } from 'components/core-ui/CountyCitySelect'
import { formatErrorMessage } from 'utils/formatting'
import { useFormik } from 'formik'
import { makeCorePostRequest } from 'utils/api'
import { ChangeEvent } from 'react'
import { initialValues, validationSchema } from './helpers'
import { CountyCityInterface, PersoanaJuridica } from '../interfaces'

const PersoanaJuridica: React.FC = () => {
  const { showNotification } = useNotification()

  const addNewClient = async (values: PersoanaJuridica) => {
    await makeCorePostRequest(`/supply-omni/client`, values)
  }

  const { mutate } = useMutation(addNewClient, {
    onSuccess: () => {
      showNotification({
        message: 'Clientul a fost salvat cu success!',
        type: 'success'
      })
    },
    onError: res => {
      showNotification({
        message: `Error while adding data. ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: PersoanaJuridica) => {
      try {
        mutate(values)
      } catch (error) {
        showNotification({
          message: `Error while saving time off data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  const onUpdateValues = (field: string, value: string) => {
    formik.setFieldValue(field, value)
  }

  return (
    <Box>
      <Box className={s.row}>
        <Input
          type="text"
          name="name"
          label="Nume"
          variant="standard"
          value={formik.values.name}
          fullWidth
          onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdateValues('name', e.target.value)}
          required
        />
      </Box>

      <Box className={s.row} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Input
          type="text"
          name="cif"
          label="CIF/COD"
          variant="standard"
          value={formik.values.cif}
          width="280px"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdateValues('cif', e.target.value)}
          required
        />
        <Input
          type="text"
          name="tradeRegister"
          label="Registrul Comertului"
          variant="standard"
          value={formik.values.tradeRegister}
          width="280px"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onUpdateValues('tradeRegister', e.target.value)
          }
          required
        />
      </Box>

      <Box className={s.row} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Input
          type="text"
          name="bank"
          label="Banca"
          variant="standard"
          value={formik.values.bank}
          width="280px"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdateValues('bank', e.target.value)}
          required
        />
        <Input
          type="text"
          name="bankAccount"
          label="IBAN"
          variant="standard"
          value={formik.values.bankAccount}
          width="280px"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onUpdateValues('bankAccount', e.target.value)
          }
          required
        />
      </Box>

      <Box className={s.row} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Input
          type="number"
          name="phone"
          label="Telefon"
          variant="standard"
          value={formik.values.phone}
          width="280px"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdateValues('phone', e.target.value)}
          required
        />
        <Input
          type="text"
          name="email"
          label="Email"
          variant="standard"
          value={formik.values.email}
          width="280px"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdateValues('email', e.target.value)}
          required
        />
      </Box>

      <Box className={s.row}>
        <Input
          type="text"
          name="address"
          label="Adresa"
          variant="standard"
          value={formik.values.address}
          fullWidth
          onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdateValues('address', e.target.value)}
          required
        />
      </Box>

      <Box className={s.row}>
        <CountyCitySelect
          required
          county={{
            action: {
              url: '/supply-omni/address/counties',
              type: 'GET',
              valueKey: 'name',
              labelKey: 'name'
            },
            width: 100,
            label: 'Judet',
            variant: 'standard'
          }}
          city={{
            action: {
              url: '/supply-omni/address/cities',
              type: 'GET',
              valueKey: 'name',
              labelKey: 'name'
            },
            width: 100,
            label: 'Oras',
            variant: 'standard'
          }}
          value={{
            county: { value: formik.values.county, label: formik.values.county },
            city: { value: formik.values.city, label: formik.values.city }
          }}
          onChange={(newValue: CountyCityInterface, fieldToUpdate: string) =>
            onUpdateValues(fieldToUpdate, newValue.value)
          }
        />
      </Box>

      <Box className={s.row} sx={{ textAlign: 'right' }}>
        <Button variant="contained" label="Save" onClick={() => formik.handleSubmit()} />
      </Box>
    </Box>
  )
}

export default PersoanaJuridica
