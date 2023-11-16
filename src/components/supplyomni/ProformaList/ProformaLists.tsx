import { Tabs } from 'components/core-ui/Tabs'
import { ProformaTable } from './table/ProformaTable'

export const ProformaLists = () => {
  const tabs = [
    {
      content: <ProformaTable proformaType="active" />,
      label: 'ACTIVE',
      tabIndex: 0
    },
    {
      content: <ProformaTable proformaType="all" />,
      label: 'TOATE',
      tabIndex: 1
    }
  ]

  return <Tabs tabs={tabs} />
}

export default ProformaLists
