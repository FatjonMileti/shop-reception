import { Box, CircularProgress, Paper } from '@mui/material'
import s from './ExistingClient.modules.scss'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Table } from 'components/core-ui/Table'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { ChangeEvent, useMemo, useState } from 'react'
import { makeCoreGetRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { columns, toTableRowItems } from './helpers'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useNavigate } from 'react-router-dom'
import { CreateClientModal } from './CreateClientModal'

const ExistingClient: React.FC = () => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()

  const [searchField, setSearchField] = useState<string>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [tableItems, setTableItems] = useState(null)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const [isCreateClientModalOpen, setIsCreateClientModalOpen] = useState<boolean>(false)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/supply-omni/client',
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy,
          searchFields: ['name', 'cif', 'phone'],
          searchText: searchField
        })
      )
      setTableItems(toTableRowItems(response.list))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)

      if (searchField && response.list.length === 0) {
        setIsCreateClientModalOpen(true)
      }
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const columnsWithActions = useMemo(() => {
    const actionsRow = {
      title: '',
      field: 'actions',
      align: 'right',
      width: '112px',
      collapsible: 'true',
      render: row => (
        <Box display="flex">
          <Button
            onClick={() => navigate(`/shoppingCartClientDetails/${row.id}`)}
            style={{ minWidth: '0.7rem', background: 'transparent' }}
            label=""
          >
            <VisibilityIcon />
          </Button>
        </Box>
      )
    } as any

    return [...columns, actionsRow]
  }, [columns])

  const openCreateClientTab = (): void => {
    const currentUrl = new URL(window.location.href)
    currentUrl.searchParams.set('tab', '1')
    navigate(currentUrl.pathname + currentUrl.search)
  }

  return (
    <>
      {isLoading && (
        <div style={{ display: 'flex' }}>
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        </div>
      )}

      {isCreateClientModalOpen && (
        <CreateClientModal
          isOpen={isCreateClientModalOpen}
          closeModal={() => setIsCreateClientModalOpen(false)}
          onSubmit={openCreateClientTab}
        />
      )}

      <div className={s.mainContainer}>
        <Paper sx={{ display: 'flex', justifyContent: 'space-between', padding: '12px' }}>
          <Input
            type="text"
            name="name"
            label="CUI / Nume / Telefon"
            variant="standard"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchField(e.target.value)}
            value={searchField}
            width="80%"
            style={{ justifyContent: 'center' }}
          />
          <Button
            onClick={() =>
              searchField &&
              fetchData({
                page: 0,
                rowsPerPage: 5,
                order: 'asc',
                orderBy: 'name',
                tableFilters: {}
              })
            }
            label=""
            variant="contained"
            style={{ marginTop: '16px' }}
          >
            <SearchOutlinedIcon /> CAUTA CLIENT
          </Button>
        </Paper>

        {tableItems && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px'
            }}
          >
            <Table
              hideCheckbox
              orderBy="name"
              order="asc"
              columns={columnsWithActions}
              items={tableItems}
              fetchData={() => {}}
              isLoading={isLoading}
              totalCount={totalCount}
              shouldRefreshData={shouldRefreshData}
              setShouldRefreshData={setShouldRefreshData}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default ExistingClient
