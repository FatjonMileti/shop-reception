import { useState } from 'react'
import { ListTable } from '@fullscreendigital/carrefour-dex-fe'
import s from './Tasks.modules.scss'
import { Box } from '@mui/material'
import { toListTableRows } from './serializers'
import { useNotification } from 'hooks'
import { handleQueryError } from 'components/volumetry/utils'

const Tasks = () => {
  const { showNotification } = useNotification()
  const [totalCount, setTotalCount] = useState<number>(null)
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchData = async (page, rowsPerPage) => {
    setIsLoading(true)

    try {
      const response = {
        list: [
          {
            id: 0,
            productName: 'Legatura leustean RO',
            date: 'Astazi',
            interval: '10:00 - 12:00',
            metiCode: '0123456789',
            category: 'Legume',
            quantity: 10,
            stock: 50
          },
          {
            id: 1,
            productName: 'Legatura patrunjel RO',
            date: 'Maine',
            interval: '10:00 - 12:00',
            metiCode: '1234567890',
            category: 'Legume',
            quantity: 5,
            stock: 11
          },
          {
            id: 2,
            productName: 'Castraveti RO',
            date: 'Maine',
            interval: '12:00 - 13:00',
            metiCode: '2345678901',
            category: 'Legume',
            quantity: 15,
            stock: 20
          }
        ],
        page: { totalCount: 10 }
      }

      setRows(toListTableRows(response.list))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      error =>
        handleQueryError(
          error,
          'A aparut o eroare la obtinerea datelor pentru tabel.',
          showNotification
        )
    }
  }

  return (
    <div className={s.mainContainer}>
      <Box>
        <ListTable
          rows={rows}
          handleRemoteData={fetchData}
          isLoading={isLoading}
          totalCount={totalCount}
          rowActionsWidth="90px"
        />
      </Box>
    </div>
  )
}

export default Tasks
