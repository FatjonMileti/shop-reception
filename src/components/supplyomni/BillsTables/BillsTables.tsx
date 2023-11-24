import { Tabs } from 'components/core-ui/Tabs'
import { BillsTable } from './BillsTable/BillsTable'
import {
  ALL_RESOURCE_URI,
  WITHOUT_INVOICE_RESOURCE_URI,
  WITH_INVOICE_RESOURCE_URI
} from './BillsTable/constants'
import { TableType } from './BillsTable/interaces'

export const BillsTables = () => {
  const tabs = [
    {
      content: <BillsTable urlResource={ALL_RESOURCE_URI} tableType={TableType.ALL} />,
      label: 'TOATE COMENZILE',
      tabIndex: 0
    },
    {
      content: (
        <BillsTable urlResource={WITH_INVOICE_RESOURCE_URI} tableType={TableType.WITH_INVOICE} />
      ),
      label: 'COMENZI CU FACTURA',
      tabIndex: 1
    },
    {
      content: (
        <BillsTable
          urlResource={WITHOUT_INVOICE_RESOURCE_URI}
          tableType={TableType.WITHOUT_INVOICE}
        />
      ),
      label: 'COMENZI FARA FACTURA',
      tabIndex: 2
    }
  ]

  return <Tabs tabs={tabs} />
}

export default BillsTables
