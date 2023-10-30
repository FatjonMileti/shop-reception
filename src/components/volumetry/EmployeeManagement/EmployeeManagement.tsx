import { Tabs } from 'components/core-ui/Tabs'
import { EmployeesTab } from './EmployeesTab'
import { MerchandisersTab } from './MerchandisersTab'

const EmployeeManagement = () => {
  return (
    <Tabs
      tabs={[
        { label: 'Angajati', tabIndex: 0, content: <EmployeesTab /> },
        { label: 'Merchandisers', tabIndex: 1, content: <MerchandisersTab /> }
      ]}
    />
  )
}

export default EmployeeManagement
