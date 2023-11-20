import { Tabs } from 'components/core-ui/Tabs'
import { ExistingClient } from './ExistingClient'
import { NewClient } from './NewClient'

interface SelectClientProps {
  selectNewClient?: boolean
}

const SelectClient: React.FC<SelectClientProps> = ({ selectNewClient }) => {
  const tabs = [
    {
      content: <ExistingClient selectNewClient={selectNewClient} />,
      label: 'Client existent',
      tabIndex: 0
    },
    {
      content: <NewClient selectNewClient={selectNewClient} />,
      label: 'Client nou',
      tabIndex: 1
    }
  ]

  return <Tabs tabs={tabs} />
}

export default SelectClient
