import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useNotification } from 'hooks'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { formatErrorMessage } from 'utils/formatting'
import s from '../../../../commonStyles.modules.scss'
import { Table } from 'components/core-ui/Table'
import { columns } from './helpers'
import { toTableRowItems } from './serializers'
import { useFormik } from 'formik'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import sm from 'components/core-ui/Modal/Modal.modules.scss'
import { Grid } from '@mui/material'
import { useMutation } from 'react-query'

const DeliveryInterval = () => {
  const { id } = useParams()
  const { showNotification } = useNotification()
  const [tableItems, setTableItems] = useState<AdminHubDeliveryInterval[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [initialValues, setInitialValues] = useState([])
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: `/shop-reception/hubs/delivery-interval/${id}`,
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      setInitialValues(response)
      setTableItems(toTableRowItems(response))
      setIsLoading(false)
    } catch (error) {
      console.log('debug err', error)
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const mutatiDeliveryInterval = async values => {
    await makeCorePostRequest(`/shop-reception/hubs/delivery-interval/${id}`, values)
  }

  const { mutate } = useMutation(mutatiDeliveryInterval, {
    onSuccess: () => {
      showNotification({
        message: `Delivery interval created successfully.`,
        type: 'success'
      })
    },
    onError: res => {
      showNotification({
        message: `Error while trying to create
        delivery interval, ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    onSubmit: async (values: any) => {
      try {
        mutate(values)
        setShouldRefreshData(true)
      } catch (error) {
        showNotification({
          message: `Error while data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })
  return (
    <div className={s.mainContainer}>
      <Table
        hideCheckbox
        columns={columns(formik, setTableItems)}
        items={tableItems}
        fetchData={fetchData}
        isLoading={isLoading}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
      />

      <Grid xs={12} item className={sm.modalButtons}>
        <Button variant="contained" label="Salveaza" onClick={() => formik.handleSubmit()} />
      </Grid>
    </div>
  )
}

export default DeliveryInterval
