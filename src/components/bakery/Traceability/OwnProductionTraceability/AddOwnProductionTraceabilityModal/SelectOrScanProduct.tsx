import { Product } from '../../ReceivedProducts/interfaces'
import React from 'react'
import { Grid } from '@mui/material'
import { Tabs } from '@fullscreendigital/carrefour-dex-fe'
import { ScanProduct } from './ScanProduct'
import { SelectProduct } from './SelectProduct'
import { isScannerDevice } from 'utils/helpers'

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

  React.useEffect(() => {
    isScannerDevice(() => {
      setScannerDevice(false)
    })
  }, [])

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
                    onContinue={onContinue}
                    onCancel={onCancel}
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
                    onContinue={onContinue}
                    onCancel={onCancel}
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
            onContinue={onContinue}
            onCancel={onCancel}
          />
        )}
      </Grid>
    </Grid>
  )
}
