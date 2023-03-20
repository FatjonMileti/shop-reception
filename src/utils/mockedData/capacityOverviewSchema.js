export const JSONSchema = {
  UIComponent: 'Box',
  className: '',
  id: 'capacityOverviewTableContainer',
  children: [
    {
      UIComponent: 'ComboBoxTable',
      combo: {
        UIComponent: 'AsyncSelectInput',
        type: 'select',
        action: {
          url: '/domain',
          type: 'GET'
        },
        variant: 'standard',
        name: 'person.domain',
        payloadKey: 'person.domain.id',
        width: '100%',
        label: 'Domain',
        defaultValue: '#TOKEN.domain'
      },
      table: {
        UIComponent: 'Table',
        width: '80%',
        action: {
          url: '/capacityOverview',
          type: 'GET'
        },
        hideCheckbox: true,
        title: 'Team Capacity Overview',
        columns: [
          {
            title: 'Person',
            field: 'capacity.person.name',
            align: 'left',
            render: {
              UIComponent: 'Link',
              href: '/personCapacity',
              linkFilters: ['capacity.startDate', 'capacity.endDate'],
              idKeyName: 'capacity.person.id'
            }
          },
          {
            title: 'Total Effort (MD)',
            field: 'capacity.totalEffort',
            align: 'left'
          },
          {
            title: 'Total Available (MD)',
            field: 'capacity.totalAvailable',
            align: 'left'
          },
          {
            title: 'Remaining (MD)',
            field: 'capacity.remaining',
            align: 'left'
          }
        ],
        tableActions: {
          searchAction: {
            searchFields: ['capacity.person.name'],
            inputProps: {
              variant: 'standard'
            }
          },
          filters: [
            {
              UIComponent: 'DatePicker',
              type: 'date',
              name: 'capacity.startDate',
              label: 'Start Date',
              defaultValue: '#CURRENT_DATE',
              variant: 'standard',
              required: true
            },
            {
              UIComponent: 'DatePicker',
              type: 'date',
              name: 'capacity.endDate',
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
