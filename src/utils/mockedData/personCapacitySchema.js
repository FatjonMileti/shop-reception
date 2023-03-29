export const JSONSchema = {
  UIComponent: 'Box',
  className: '',
  children: [
    {
      UIComponent: 'Table',
      width: '80%',
      action: {
        url: '/personCapacity',
        type: 'POST'
      },
      hideCheckbox: true,
      columns: [
        {
          title: 'Person',
          field: 'person.name',
          align: 'left',
          type: 'string'
        },
        {
          title: 'IIB Key',
          field: 'person.iibKey',
          align: 'left',
          type: 'string'
        },
        {
          title: 'IPB Key',
          field: 'person.ipbKey',
          align: 'left',
          type: 'string'
        },
        {
          title: 'Assigned Project',
          field: 'person.assignedProject.name',
          align: 'left',
          type: 'string'
        },
        {
          title: 'Role',
          field: 'person.assignedProject.role',
          align: 'left',
          type: 'string'
        },
        {
          title: 'T-Shirt Size',
          field: 'person.assignedProject.tshirtSize',
          align: 'left',
          type: 'string'
        },
        {
          title: 'Project Stage',
          field: 'person.assignedProject.stage',
          align: 'left',
          type: 'string'
        },
        {
          title: 'Estimated Workload',
          field: 'person.assignedProject.estimatedWorkload',
          align: 'left',
          type: 'number'
        },
        {
          title: 'T-Shirt Size Multiplier',
          field: 'person.assignedProject.tshirtSizeMultiplier',
          align: 'left',
          type: 'string'
        },
        {
          title: 'Real Effort',
          field: 'person.assignedProject.realEffort',
          align: 'left',
          type: 'number'
        },
        {
          title: 'Effort (h)',
          field: 'person.assignedProject.hoursEffort',
          align: 'left',
          type: 'number'
        },
        {
          title: 'Effort (md)',
          field: 'person.assignedProject.mdEffort',
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
            variable: 'capacity.startDate',
            variant: 'standard',
            required: true
          },
          {
            UIComponent: 'DatePicker',
            type: 'date',
            name: 'project.endDate',
            label: 'End Date',
            variable: 'capacity.endDate',
            variant: 'standard',
            required: true
          },
          {
            UIComponent: 'Input',
            type: 'text',
            name: 'person.id',
            label: 'Person Id',
            inputProps: { hidden: true },
            variable: 'id'
          }
        ]
      }
    }
  ]
}
