import { Tabs } from 'components/core-ui/Tabs'
import { ExistingClient } from './ExistingClient'
import { NewClient } from './NewClient'

const SelectClient: React.FC = () => {
  const tabs = [
    {
      content: <ExistingClient />,
      label: 'Client existent',
      tabIndex: 0
    },
    {
      content: <NewClient />,
      label: 'Client nou',
      tabIndex: 1
    }
  ]

  return <Tabs tabs={tabs} />
}

export default SelectClient
