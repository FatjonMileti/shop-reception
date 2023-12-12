import { Box, CircularProgress, Paper, Typography, Grid } from '@mui/material'
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
import { TableRowItem } from './interfaces'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import { Edit } from '@mui/icons-material'
import { Icon_v2 } from 'components/core-ui/Icon_v2'

interface ExistingClientProps {
  selectNewClient?: boolean
}

const ExistingClient: React.FC<ExistingClientProps> = ({ selectNewClient }) => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [searchField, setSearchField] = useState<string>('')
  const [showTable, setShowTable] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [tableItems, setTableItems] = useState<TableRowItem[]>([])
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

      <Box className={s.searchPaper}>
        <Box className={s.searchContainer}>
          <div>
            <Input
              type="text"
              name="name"
              label="CUI / Nume / Telefon"
              variant="outlined"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchField(e.target.value)}
              value={searchField}
              fullWidth
              style={{ justifyContent: 'center' }}
            />
          </div>
          <Button
            onClick={() => {
              if (searchField) {
                // to avoid initiallly making 2 calls
                showTable && setShouldRefreshData(true)
                setShowTable(true)
              }
            }}
            label=""
            variant="contained"
            style={{ marginTop: '16px', marginLeft: '16px' }}
          >
            <SearchOutlinedIcon /> CAUTA CLIENT
          </Button>
        </Box>
      </Box>

      {searchField && showTable ? (
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
            fetchData={fetchData}
            isLoading={isLoading}
            totalCount={totalCount}
            shouldRefreshData={shouldRefreshData}
            setShouldRefreshData={setShouldRefreshData}
            rowActions={[
              {
                label: 'Selecteaza',
                labelColor: 'white',
                typographyVariant: 'medium',
                backgroundColor: '#0970E6',
                desktopIcon: <Icon_v2  iconName="Eye" iconType="Icon" />, 
                onClick: (e, rowId) =>
                  selectNewClient
                    ? navigate(
                        `/supplyOmni/receiptClientDetails/${rowId}?orderId=${searchParams.get(
                          'orderId'
                        )}`
                      )
                    : navigate(`/supplyOmni/shoppingCartClientDetails/${rowId}`)
              }
            ]}
          />
        </div>
      ) : (
        <Grid sx={{ mt: 4 }} container justifyContent="center" spacing={2}>
          <Box sx={{ textAlign: 'center' }}>
            <PersonSearchIcon sx={{ fontSize: '100px', color: '#cecece' }} />
            <br />
            <Typography sx={{ fontSize: '14px', color: '#cecece' }}>Cauta client</Typography>
            <br />
          </Box>
        </Grid>
      )}
    </>
  )
}

export default ExistingClient
