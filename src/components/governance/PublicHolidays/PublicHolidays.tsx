import dayjs from 'dayjs'
import { makeCoreGetRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { Modal } from 'components/core-ui/Modal'
import React, { useEffect, useState } from 'react'
import { columns, toTableRowItems } from './helpers'
import { PublicHolidayItem } from '../interfaces'
import { DatePicker, Divider, Table } from '@fullscreendigital/carrefour-dex-fe'
import { formatErrorMessage } from '../../../utils/formatting'
import { Grid } from '@mui/material'

interface PublicHolidaysProps {
  isModalOpen: boolean
  closeModal: Function
}

const PublicHolidays: React.FC<PublicHolidaysProps> = props => {
  const { isModalOpen, closeModal } = props

  const { showNotification } = useNotification()

  const minDate = dayjs('2023-01-01')
  const maxDate = dayjs('2030-12-31')

  const [dateToLoad, setDateToLoad] = useState<dayjs.Dayjs>(dayjs())
  const [tableItems, setTableItems] = useState<PublicHolidayItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (isModalOpen && dateToLoad && tableItems.length === 0) {
      const loadData = async () => {
        setIsLoading(true)

        try {
          const response = await makeCoreGetRequest(
            `/governance/publicHolidays/${dateToLoad.year()}`
          )
          setTableItems(response)
          setIsLoading(false)
        } catch (error) {
          showNotification({
            message: `Error while fetching public holidays: ${formatErrorMessage(error)}`,
            type: 'error'
          })
          closeModal()
          setIsLoading(false)
        }
      }

      loadData().then()
    }
  }, [isModalOpen, dateToLoad])

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Public Holidays'}>
      <DatePicker
        value={dateToLoad}
        onChange={value => {
          setDateToLoad(value)
          setTableItems([])
        }}
        label="Year"
        modalLabel="Select year"
        closeButtonLabel="Cancel"
        views={['year']}
        openTo={'year'}
        format={'YYYY'}
        variant="outlined"
        style={{ width: '100%' }}
        minDate={minDate}
        maxDate={maxDate}
        required
      />
      <Grid xs={12} item paddingTop={2}>
        <Divider />
      </Grid>
      <Table
        hideCheckbox={true}
        isLoading={isLoading}
        columns={columns}
        rows={toTableRowItems(tableItems)}
        rowsPerPage={5}
        rowsPerPageOptions={[]}
      />
    </Modal>
  )
}

export default PublicHolidays
