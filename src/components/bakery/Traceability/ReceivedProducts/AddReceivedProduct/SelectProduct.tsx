import { Grid } from '@mui/material'
import { Autocomplete, Button, Tabs } from '@fullscreendigital/carrefour-dex-fe'
import React from 'react'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { isScannerDevice } from '../../../../../utils/helpers'
import { ScanProduct } from './ScanProduct'
import { Product } from '../interfaces'

interface SelectProductProps {
  setSelectedProduct: (product: Product) => void
  selectedProduct: Product
}
const SelectProduct = ({ setSelectedProduct, selectedProduct }: SelectProductProps) => {
  const [searchText, setSearchText] = React.useState('')
  const [debouncedTerm, setDebouncedTerm] = React.useState('')

  const [timeOutId, setTimeoutId] = React.useState<NodeJS.Timeout | null>(null)

  const productQuery = useQuery(
    ['search', debouncedTerm],

    async () => {
      try {
        return await makeCoreGetRequest(
          `/bakery/product/traceability/nameOrCodeOrEan/${debouncedTerm}`
        )
      } catch (err) {}
    },

    {
      initialData: [],
      enabled: debouncedTerm.length > 0,
      keepPreviousData: true
    }
  )

  return (
    <Grid container rowSpacing={3.5}>
      <Grid item xs={12}>
        <Autocomplete
          variant="outlined"
          options={productQuery.data.map(({ id, name }) => ({ value: id, label: name }))}
          label="Cauta dupa Cod METI / Cod EAN / Nume produs "
          onInputChange={(e, value) => {
            setSearchText(value)

            if (e?.type === 'change') {
              if (timeOutId) {
                setTimeoutId(null)
                clearTimeout(timeOutId)
              }

              const id = setTimeout(() => {
                setDebouncedTerm(value)
                setTimeoutId(null)
              }, 300)

              setTimeoutId(id)
            }
          }}
          inputValue={searchText}
          onChange={(event, value) => {
            setSelectedProduct(
              value ? productQuery.data.find(({ id }) => id === value.value) : null
            )
          }}
          value={selectedProduct && { label: selectedProduct.name, value: selectedProduct.id }}
          autoComplete={false}
          filterOptions={x => x}
        />
      </Grid>
    </Grid>
  )
}

interface SelectOrScanProductProps {
  setSelectedProduct: (product: Product) => void
  onContinue: () => void
  onCancel: () => void
  selectedProduct: Product
}
export const SelectOrScanProduct = ({
  setSelectedProduct,
  selectedProduct,
  onContinue,
  onCancel
}: SelectOrScanProductProps) => {
  const [selectedTab, setSelectedTab] = React.useState(0)
  const [scannerDevice, setScannerDevice] = React.useState(true)

  // React.useEffect(() => {
  //   isScannerDevice(() => {
  //     setScannerDevice(false)
  //   })
  // }, [])

  return (
    <Grid container rowSpacing={3.5}>
      <Grid item xs={12}>
        {scannerDevice ? (
          <Tabs
            containerStyle={{}}
            tabContentBoxStyle={{
              padding: 0
            }}
            tabs={[
              {
                content: (
                  <ScanProduct
                    setSelectedProduct={setSelectedProduct}
                    selectedProduct={selectedProduct}
                  />
                ),
                label: 'Scaneaza',
                tabIndex: 0
              },
              {
                content: (
                  <SelectProduct
                    setSelectedProduct={setSelectedProduct}
                    selectedProduct={selectedProduct}
                  />
                ),
                label: 'Cauta',
                tabIndex: 1
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
        ) : (
          <SelectProduct
            setSelectedProduct={setSelectedProduct}
            selectedProduct={selectedProduct}
          />
        )}
      </Grid>
      <Grid item xs={12} container justifyContent="space-between">
        <Grid>
          <Button size="large" variant="outlined" label="Anuleaza" onClick={onCancel} />
        </Grid>

        <Grid>
          <Button
            size="large"
            variant="contained"
            label="Continua"
            onClick={onContinue}
            disabled={!selectedProduct}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
