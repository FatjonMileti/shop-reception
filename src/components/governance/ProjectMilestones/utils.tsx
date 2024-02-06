import { Input } from 'components/core-ui/Input'
import { TableFilters } from './models'

export const buildTableFilterInputs = (
  tableFilter: TableFilters,
  setTableFilter: (tableFilters: TableFilters) => void
) => [
  {
    name: 'project.name',
    label: 'Project name',
    type: 'text',
    filter: (
      <Input
        type="text"
        name="project.name"
        label="Project name"
        variant="outlined"
        onChange={(value: string) => setTableFilter({ ...tableFilter, 'project.name': value })}
        value={tableFilter['project.name']}
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
        variant="outlined"
        onChange={(value: string) => setTableFilter({ ...tableFilter, stage: value })}
        value={tableFilter.stage}
      />
    )
  },
  {
    name: 'project.iibKey',
    label: 'IIB Key',
    type: 'text',
    filter: (
      <Input
        type="text"
        name="project.iibKey"
        label="IIB Key"
        variant="outlined"
        onChange={(value: string) => setTableFilter({ ...tableFilter, 'project.iibKey': value })}
        value={tableFilter['project.iibKey']}
      />
    )
  },
  {
    name: 'project.ipbKey',
    label: 'IPB Key',
    type: 'text',
    filter: (
      <Input
        type="text"
        name="project.ipbKey"
        label="IPB Key"
        variant="outlined"
        onChange={value => setTableFilter({ ...tableFilter, 'project.ipbKey': value })}
        value={tableFilter['project.ipbKey']}
      />
    )
  }
]
