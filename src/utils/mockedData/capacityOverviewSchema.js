export const JSONSchema = {
  UIComponent: 'Box',
  className: '',
  id: 'capacityOverviewTableContainer',
  children: [
    {
      UIComponent: 'ComboBoxTable',
      combo: {
        UIComponent: 'Input',
        type: 'select',
        variant: 'standard',
        name: 'teamMember.domain',
        label: 'Domain',
        values: [
          { value: 'Store&Supply Chain', label: 'Store&Supply Chain' },
          { value: 'Digital Platforms', label: 'Digital Platforms' },
          { value: 'EDI', label: 'EDI' },
          { value: 'Security', label: 'Security' },
          { value: 'Enterprise Architecture', label: 'Enterprise Architecture' },
          { value: 'Innovation', label: 'Innovation' },
          { value: 'Infra&Support', label: 'Infra&Support' },
          { value: 'Data Science', label: 'Data Science' }
        ]
      },
      table: {
        UIComponent: 'Table',
        width: '80%',
        action: {
          url: '/teamCapacity',
          type: 'GET'
        },
        hideCheckbox: true,
        title: 'Team Capacity Overview',
        columns: [
          {
            title: 'Person',
            field: 'teamMember.name',
            align: 'left',
            type: 'string',
            render: {
              UIComponent: 'Link',
              href: '/individualCapacity',
              linkFilters: ['startDate', 'endDate'],
              idKeyName: 'teamMember.id'
            }
          },
          {
            title: 'Total Effort (MD)',
            field: 'totalEffort',
            align: 'left',
            type: 'number'
          },
          {
            title: 'Total Available (MD)',
            field: 'totalAvailable',
            align: 'left',
            type: 'number'
          },
          {
            title: 'Remaining (MD)',
            field: 'remaining',
            align: 'left',
            type: 'number'
          }
        ],
        tableActions: {
          filters: [
            {
              UIComponent: 'DatePicker',
              type: 'date',
              name: 'startDate',
              label: 'Start Date',
              defaultValue: '#CURRENT_DATE',
              variant: 'standard',
              required: true
            },
            {
              UIComponent: 'DatePicker',
              type: 'date',
              name: 'endDate',
              label: 'End Date',
              defaultValue: '#CURRENT_DATE',
              variant: 'standard',
              required: true
            }
          ]
        }
      }
    }
  ]
}
