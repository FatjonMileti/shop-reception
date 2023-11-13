import { CircularProgress, Paper } from '@mui/material'
import s from './ExistingClient.modules.scss'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Table } from 'components/core-ui/Table'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { ChangeEvent, useState } from 'react'
import { makeCoreGetRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { columns, toTableRowItems } from './helpers'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CreateClientModal } from './CreateClientModal'

const ExistingClient: React.FC = () => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

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

  const openCreateClientTab = (): void => {
    setSearchParams({ tab: '1' })
    const searchString = searchParams.toString()
    navigate(window.location.pathname + '?' + searchString)
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
              columns={columns}
              items={tableItems}
              fetchData={() => {}}
              isLoading={isLoading}
              totalCount={totalCount}
              shouldRefreshData={shouldRefreshData}
              setShouldRefreshData={setShouldRefreshData}
              rowActions={[
                {
                  label: 'Detalii',
                  labelColor: 'white',
                  typographyVariant: 'medium',
                  backgroundColor: '#33691E',
                  onClick: (e, rowId) => navigate(`/supplyOmni/shoppingCartClientDetails/${rowId}`)
                }
              ]}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default ExistingClient
