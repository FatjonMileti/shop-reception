export const JSONSchema = {
  UIComponent: 'Box',
  className: '',
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
        title: 'Team members',
        action: {
          url: '/teamTimeOff',
          type: 'GET'
        },
        hideCheckbox: true,
        orderBy: 'teamMember.name',
        columns: [
          {
            title: 'Person',
            field: 'teamMember.name',
            align: 'left',
            type: 'string'
          },
          {
            title: 'Day-Off Type',
            field: 'dayOffType',
            align: 'left',
            type: 'string'
          },
          {
            title: 'Start Date',
            field: 'startDate',
            align: 'left',
            collapsible: true,
            type: 'date'
          },
          {
            title: 'End Date',
            field: 'endDate',
            align: 'left',
            collapsible: true,
            type: 'date'
          },
          {
            title: 'Hours',
            field: 'numberOfHours',
            align: 'left',
            collapsible: true,
            type: 'number'
          }
        ],
        tableActions: {
          newAction: {
            modalTitle: 'New Time Off',
            formItems: [
              {
                UIComponent: 'AsyncAutocomplete',
                type: 'autocomplete',
                action: {
                  url: '/teamMembers',
                  type: 'GET',
                  valueKey: 'id',
                  labelKey: 'name',
                  comboQueryKey: 'domain'
                },
                variant: 'standard',
                name: 'teamMember.name',
                width: '100%',
                label: 'Person name',
                payloadKey: 'teamMember.id'
              },
              {
                UIComponent: 'Input',
                type: 'select',
                values: [
                  { value: 'Public Holiday', label: 'Public Holiday' },
                  { value: 'Day-Off', label: 'Day-Off' },
                  { value: 'Team Event', label: 'Team Event' }
                ],
                name: 'dayOffType',
                variant: 'standard',
                width: '100%',
                label: 'Type of day-off'
              },
              {
                UIComponent: 'DatePicker',
                type: 'date',
                name: 'startDate',
                style: { width: '100%' },
                label: 'Start Date',
                variant: 'standard',
                defaultValue: '#CURRENT_DATE'
              },
              {
                UIComponent: 'DatePicker',
                type: 'date',
                name: 'endDate',
                style: { width: '100%' },
                label: 'End Date',
                variant: 'standard',
                defaultValue: '#CURRENT_DATE'
              },
              {
                UIComponent: 'Input',
                type: 'text',
                variant: 'standard',
                name: 'numberOfHours',
                width: '100%',
                label: 'Number of hours',
                id: 'hours',
                dependencies: {
                  conditions: {
                    operator: 'equal',
                    value: true,
                    params: 'startDate|endDate'
                  },
                  UIAttributes: {
                    onSuccess: { inputProps: { hidden: false } },
                    onFailure: { inputProps: { hidden: true } }
                  }
                }
              }
            ],
            formItemsPerRow: 1,
            formButtons: [
              {
                UIComponent: 'Button',
                gradient: 'blue',
                label: 'Save',
                variant: 'contained',
                isSaveButton: true
              },
              {
                UIComponent: 'Button',
                gradient: 'blue',
                label: 'Cancel',
                variant: 'text',
                isCancelButton: true
              }
            ],
            formAction: {
              type: 'POST',
              url: '/teamTimeOff'
            }
          },
          filters: [
            {
              UIComponent: 'Input',
              type: 'text',
              name: 'teamMember.name',
              label: 'Team Member',
              variant: 'standard'
            }
          ]
        },
        tableRowActions: {
          editAction: {
            updateUrl: '/teamTimeOff',
            updateUrlType: 'PUT',
            getUrl: '/teamTimeOff',
            getUrlType: 'GET',
            formInfoItems: [{ name: 'teamMember.name', label: 'Person name' }],
            formItems: [
              {
                UIComponent: 'Input',
                type: 'select',
                values: [
                  { value: 'Public Holiday', label: 'Public Holiday' },
                  { value: 'Day-Off', label: 'Day-Off' },
                  { value: 'Team Event', label: 'Team Event' }
                ],
                name: 'dayOffType',
                variant: 'standard',
                width: '100%',
                label: 'Type of day-off'
              },
              {
                UIComponent: 'DatePicker',
                type: 'date',
                name: 'startDate',
                style: { width: '100%' },
                label: 'Start Date',
                variant: 'standard'
              },
              {
                UIComponent: 'DatePicker',
                type: 'date',
                name: 'endDate',
                style: { width: '100%' },
                label: 'End Date',
                variant: 'standard'
              },
              {
                UIComponent: 'Input',
                type: 'text',
                variant: 'standard',
                name: 'numberOfHours',
                width: '100%',
                label: 'Number of hours',
                id: 'hours',
                dependencies: {
                  conditions: {
                    operator: 'equal',
                    value: true,
                    params: 'startDate|endDate'
                  },
                  UIAttributes: {
                    onSuccess: { inputProps: { hidden: false } },
                    onFailure: { inputProps: { hidden: true } }
                  }
                }
              }
            ],
            formItemsPerRow: 1,
            formButtons: [
              {
                UIComponent: 'Button',
                label: 'Cancel',
                variant: 'standard',
                isCancelButton: true
              },
              {
                UIComponent: 'Button',
                label: 'Save',
                variant: 'contained',
                isSaveButton: true
              }
            ]
          },
          deleteAction: {
            url: '/teamTimeOff',
            confirmText: 'Are you sure you want to delete this entry?',
            formButtons: [
              {
                UIComponent: 'Button',
                label: 'Cancel',
                variant: 'standard',
                isCancelButton: true
              },
              {
                UIComponent: 'Button',
                label: 'Delete',
                variant: 'contained',
                isDeleteButton: true
              }
            ]
          }
        }
      }
    }
  ]
}
