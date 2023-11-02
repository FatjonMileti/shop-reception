import { Input } from 'components/core-ui/Input'
import { TableFilters } from './models'

export const buildTableFilterInputs = (
  tableFilter: TableFilters,
  setTableFilter: (tableFilters: TableFilters) => void
) => [
  {
    name: 'projectName',
    label: 'Project name',
    type: 'text',
    filter: (
      <Input
        type="text"
        name="projectName"
        label="Project name"
        variant="standard"
        onChange={(value: string) => setTableFilter({ ...tableFilter, projectName: value })}
        value={tableFilter.projectName}
      />
    )
  },
  {
    name: 'stage',
    label: 'Stage',
    type: 'text',
    filter: (
      <Input
        type="text"
        name="stage"
        label="Stage"
        variant="standard"
        onChange={(value: string) => setTableFilter({ ...tableFilter, stage: value })}
        value={tableFilter.stage}
      />
    )
  },
  {
    name: 'iibKey',
    label: 'IIB Key',
    type: 'text',
    filter: (
      <Input
        type="text"
        name="iibKey"
        label="IIB Key"
        variant="standard"
        onChange={(value: string) => setTableFilter({ ...tableFilter, iibKey: value })}
        value={tableFilter.iibKey}
      />
    )
  },
  {
    name: 'ipbKey',
    label: 'IPB Key',
    type: 'text',
    filter: (
      <Input
        type="text"
        name="ipbKey"
        label="IPB Key"
        variant="standard"
        onChange={value => setTableFilter({ ...tableFilter, ipbKey: value })}
        value={tableFilter.ipbKey}
      />
    )
  }
]
