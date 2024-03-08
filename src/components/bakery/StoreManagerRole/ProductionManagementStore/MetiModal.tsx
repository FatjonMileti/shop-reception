import { Tabs } from '@fullscreendigital/carrefour-dex-fe'
import { CircularProgress, Grid, Typography } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import { makeCoreGetRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { useQuery } from 'react-query'
import { salesColumns, stockColumns } from './helpers'
import { useEffect, useState } from 'react'
import { Table } from 'components/core-ui/Table'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'

interface MetiModalProps {
  isModalOpen: boolean
  closeModal: Function
  metiProduct: any
}

export const MetiModal: React.FC<MetiModalProps> = props => {
  const { isModalOpen, closeModal, metiProduct } = props
  const { showNotification } = useNotification()

  const [selectedTab, setSelectedTab] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [tableItems, setTableItems] = useState<any[]>([])
  const [isStockLoading, setIsStockLoading] = useState<boolean>(false)
  const [stockTableItems, setStockTableItems] = useState<any[]>([])

  const {
    data: productRecipe,
    isLoading: isProductRecipeLoading,
    refetch: fetchProductRecipe
  } = useQuery(
    ['product-recipe'],
    async () => {
      const result = await makeCoreGetRequest(`/bakery/product/recipe/${metiProduct.id}`)
      return result || null
    },
    {
      onError: error => {
        showNotification({
          message: `An error occurred while getting the product recipe. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  useEffect(() => {
    if (isModalOpen && metiProduct.id) fetchProductRecipe()
  }, [isModalOpen, metiProduct])

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/sales/history',
          filters: [],
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      const toTableRowItems = items =>
        items.map(item => ({
          id: item?.id || '',
          date: item.date || '',
          interval1: item.list[0].quantity || 0,
          interval2: item.list[1].quantity || 0,
          interval3: item.list[2].quantity || 0,
          interval4: item.list[3].quantity || 0,
          interval5: item.list[4].quantity || 0
        }))

      setTableItems(toTableRowItems(response.list))
      setIsLoading(false)

      return
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const fetchStockData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsStockLoading(true)

    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/bakery/store/stock/presentation',
          filters: [],
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      setStockTableItems(response.list)
      setIsStockLoading(false)

      return
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={metiProduct?.productName || ''}
      modalWidth="80%"
    >
      {isProductRecipeLoading ? (
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      ) : (
        <Grid container rowSpacing={3.5}>
          <Tabs
            containerStyle={{}}
            tabContentBoxStyle={{
              padding: 0
            }}
            tabs={[
              {
                content: (
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography sx={{ fontWeight: 600 }} ml={2}>
                        INGREDIENTE
                      </Typography>
                      <ul>
                        {productRecipe?.fabricationMethod.split('.').map((step: string) => (
                          <li>{step}</li>
                        ))}
                      </ul>
                    </Grid>
                    <Grid item xs={6} display={'flex'} justifyContent={'end'}>
                      <img
                        src={productRecipe?.imageUrl}
                        width="140px"
                        height="140px"
                        style={{
                          borderRadius: '50%'
                        }}
                      />
                    </Grid>
                  </Grid>
                ),
                label: 'Reteta produs',
                tabIndex: 0
              },
              {
                content: (
                  <Table
                    hideCheckbox
                    columns={salesColumns}
                    items={tableItems}
                    fetchData={fetchData}
                    isLoading={isLoading}
                    disablePagination
                  />
                ),
                label: 'Istoric vanzari',
                tabIndex: 1
              },
              {
                content: (
                  <Table
                    hideCheckbox
                    columns={stockColumns}
                    items={stockTableItems}
                    fetchData={fetchStockData}
                    isLoading={isStockLoading}
                    disablePagination
                  />
                ),
                label: 'Stoc minim de prezentare',
                tabIndex: 2
              }
            ]}
            tabsAriaLabel="basic tabs example"
            tabsContainerStyle={{
              borderBottom: 1,
              marginBottom: '24px',
              borderColor: '#223fa0',
              '.MuiTabs-flexContainer': {
                '.MuiButtonBase-root': {
                  maxWidth: 'fit-content'
                }
              }
            }}
            value={selectedTab}
            onChange={(_, value) => setSelectedTab(value)}
          />
        </Grid>
      )}
    </Modal>
  )
}
