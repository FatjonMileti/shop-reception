import dayjs from 'dayjs'
import { makeCoreGetRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { Modal } from 'components/core-ui/Modal'
import React, { useEffect, useState } from 'react'
import { columns, toTableRowItems } from './helpers'
import { PublicHolidayItem } from '../interfaces'
import { Table } from '@fullscreendigital/carrefour-dex-fe'
import { formatErrorMessage } from '../../../utils/formatting'

interface PublicHolidaysProps {
  isModalOpen: boolean
  closeModal: Function
  year?: number
}

const PublicHolidays: React.FC<PublicHolidaysProps> = props => {
  const { isModalOpen, closeModal, year } = props

  const yearToFetch = year ?? dayjs().year()
  const { showNotification } = useNotification()

  const [tableItems, setTableItems] = useState<PublicHolidayItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (isModalOpen && tableItems.length === 0) {
      const loadData = async () => {
        setIsLoading(true)

        try {
          const response = await makeCoreGetRequest(`/governance/publicHolidays/${yearToFetch}`)
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
  }, [isModalOpen])

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Public Holidays'}>
      <Table
        hideCheckbox={true}
        isLoading={isLoading}
        columns={columns}
        rows={toTableRowItems(tableItems)}
        rowsPerPage={Number.MAX_VALUE}
        disablePagination={true}
      />
    </Modal>
  )
}

export default PublicHolidays
