import { Tabs } from 'components/core-ui/Tabs'
import { EmployeesTab } from './EmployeesTab'
import { CollaboratorsTab } from './CollaboratorsTab'

const EmployeeManagement = () => {
  return (
    <Tabs
      tabs={[
        { label: 'Angajati', tabIndex: 0, content: <EmployeesTab /> },
        { label: 'Colaboratori', tabIndex: 1, content: <CollaboratorsTab /> }
      ]}
    />
  )
}

export default EmployeeManagement
