export const JSONSchema = {
  UIComponent: 'Container',
  id: 'capacityOverviewTableContainer',
  className: '',
  children: [
    {
      UIComponent: 'Box',
      className: '',
      children: [
        {
          UIComponent: 'Table',
          width: '80%',
          action: {
            url: '/capacityOverview',
            type: 'POST'
          },
          hideCheckbox: true,
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
                defaultValue: 'CURRENT_DATE',
                variant: 'standard'
              },
              {
                UIComponent: 'DatePicker',
                type: 'date',
                name: 'capacity.endDate',
                label: 'End Date',
                defaultValue: 'CURRENT_DATE',
                variant: 'standard'
              }
            ]
          }
        }
      ]
    }
  ]
}
