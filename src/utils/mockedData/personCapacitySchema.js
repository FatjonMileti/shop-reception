export const JSONSchema = {
  UIComponent: 'Box',
  className: '',
  children: [
    {
      UIComponent: 'Table',
      width: '80%',
      action: {
        url: '/individualCapacity',
        type: 'GET'
      },
      hideCheckbox: true,
      columns: [
        {
          title: 'Person',
          field: 'teamMember.name',
          align: 'left',
          type: 'string'
        },
        {
          title: 'IIB Key',
          field: 'project.key',
          align: 'left',
          type: 'string'
        },
        {
          title: 'IPB Key',
          field: 'project.ipbKey',
          align: 'left',
          type: 'string'
        },
        {
          title: 'Assigned Project',
          field: 'project.name',
          align: 'left',
          type: 'string'
        },
        {
          title: 'Role',
          field: 'role',
          align: 'left',
          type: 'string'
        },
        {
          title: 'Start Date',
          field: 'startDate',
          align: 'left',
          type: 'date'
        },
        {
          title: 'End Date',
          field: 'endDate',
          align: 'left',
          type: 'date'
        },
        {
          title: 'T-Shirt Size',
          field: 'tshirtSize',
          align: 'left',
          type: 'string'
        },
        {
          title: 'Project Stage',
          field: 'stage',
          align: 'left',
          type: 'string'
        },
        {
          title: 'Estimated Workload',
          field: 'estimatedWorkload',
          align: 'left',
          type: 'number'
        },
        {
          title: 'T-Shirt Size Multiplier',
          field: 'tshirtSizeMultiplier',
          align: 'left',
          type: 'string'
        },
        {
          title: 'Real Effort',
          field: 'realEffort',
          align: 'left',
          type: 'number'
        },
        {
          title: 'Total available (h)',
          field: 'totalAvailableInHours',
          align: 'left',
          type: 'number'
        },
        {
          title: 'Total timeoff (h)',
          field: 'totalTimeOffInHours',
          align: 'left',
          type: 'number'
        },
        {
          title: 'Real availability (h)',
          field: 'realAvailabilityInHours',
          align: 'left',
          type: 'number'
        },
        {
          title: 'Total Effort (h)',
          field: 'totalEffortInHours',
          align: 'left',
          type: 'number'
        },
        {
          title: 'Effort (md)',
          field: 'totalEffortInMD',
          align: 'left',
          type: 'number'
        }
      ],
      tableActions: {
        filters: [
          {
            UIComponent: 'DatePicker',
            type: 'date',
            name: 'project.startDate',
            label: 'Start Date',
            variable: 'startDate',
            variant: 'standard',
            required: true
          },
          {
            UIComponent: 'DatePicker',
            type: 'date',
            name: 'project.endDate',
            label: 'End Date',
            variable: 'endDate',
            variant: 'standard',
            required: true
          },
          {
            UIComponent: 'Input',
            type: 'text',
            name: 'person.id',
            label: 'Person Id',
            inputProps: { hidden: true },
            variable: 'id',
            hidden: true
          }
        ]
      }
    }
  ]
}
