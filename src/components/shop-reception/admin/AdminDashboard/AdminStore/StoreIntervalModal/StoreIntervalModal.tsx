import { useMemo, useState } from 'react'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { useNotification } from 'hooks'
import { Box, CircularProgress, Grid } from '@mui/material'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { Button, FormTable } from '@fullscreendigital/carrefour-dex-fe'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from 'utils/formatting'
import { useMutation, useQuery } from 'react-query'
import ss from './StoreIntervalModal.modules.scss'
import { FormTableColoumnInterface } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/FormTable/FormTable'
import { getColumns } from './helpers'

interface StoreIntervalModalProps {
  isOpen: boolean
  closeModal: Function
  item: any
}

const AdminStoreForm: React.FC<StoreIntervalModalProps> = props => {
  const { isOpen, closeModal, item } = props
  const { showNotification } = useNotification()
  const [tableItems, setTableItems] = useState<any[]>([])
  const [initialValues, setInitialValues] = useState([])

  const { data, isLoading, isFetching } = useQuery(
    ['store-delivery-intervals'],
    async () => {
      const response = await makeCoreGetRequest(
        `/shop-reception/shops/delivery-interval/${item.id}`
      )
      const values = toTableRowItems(response)
      setInitialValues(values)
      setTableItems(values)
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea intervalelor de livrare. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      },
      enabled: isOpen
    }
  )

  const addStoreInterval = async values => {
    const data = values.filter(value => value.receiveFromDeposit)
    if (data) {
      await makeCorePostRequest(`/shop-reception/shops/delivery-interval/${item.id}`, data)
    }
  }

  const { isLoading: isMutationLoading, mutate } = useMutation(addStoreInterval, {
    onSuccess: () => {
      closeModal()
      formik.resetForm()
      showNotification({
        message: `Magazinul a fost modificat cu succes.`,
        type: 'success'
      })
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare la modificarea datelor. ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    onSubmit: async (values: any) => {
      mutate(values)
    }
  })

  const columns: FormTableColoumnInterface[] = useMemo(
    () => getColumns(formik, setTableItems),
    [formik, setTableItems]
  )

  return (
    <Modal
      isModalOpen={isOpen}
      closeModal={closeModal}
      modalTitle={'Intervale orare magazin'}
      modalWidth="95%"
    >
      <Grid container spacing={2} className={ss.tableGrid}>
        <Box className={ss.formTableContainer}>
          {isLoading || isFetching ? (
            <CircularProgress color="primary" disableShrink />
          ) : (
            <FormTable columns={columns} rows={tableItems} />
          )}
        </Box>

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Anuleaza" onClick={() => closeModal()} />
          <Button
            variant="contained"
            label={'Salveaza'}
            onClick={() => formik.handleSubmit()}
            disabled={isMutationLoading}
          />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default AdminStoreForm
