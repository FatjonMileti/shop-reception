export const JSONSchema = {
  UIComponent: 'Box',
  className: '',
  children: [
    {
      UIComponent: 'Table',
      width: '80%',
      title: 'Team members',
      action: {
        url: '/daysOff',
        type: 'GET'
      },
      hideCheckbox: true,
      orderBy: 'person.name',
      columns: [
        {
          title: '#',
          field: 'number',
          align: 'left'
        },
        {
          title: 'Person',
          field: 'person.name',
          align: 'left'
        },
        {
          title: 'Day-Off Type',
          field: 'daysOff.dayOffType',
          align: 'left'
        },
        {
          title: 'Start Date',
          field: 'daysOff.startDate',
          align: 'left'
        },
        {
          title: 'End Date',
          field: 'daysOff.endDate',
          align: 'left'
        },
        {
          title: 'Hours',
          field: 'daysOff.hours',
          align: 'left'
        }
      ],
      tableActions: {
        newAction: {
          modalTitle: 'New Time Off',
          formItems: [
            {
              UIComponent: 'AsyncSelectInput',
              type: 'select',
              action: {
                url: '/persons',
                type: 'GET'
              },
              variant: 'standard',
              name: 'person.name',
              payloadKey: 'person.id',
              width: '100%',
              label: 'Person name'
            },
            {
              UIComponent: 'Input',
              type: 'select',
              values: [
                { value: 'publicHoliday', label: 'Public Holiday' },
                { value: 'dayOff', label: 'Day-Off' },
                { value: 'teamEvent', label: 'Team Event' }
              ],
              name: 'daysOff.dayOffType',
              payloadKey: 'daysOff.dayOffType',
              variant: 'standard',
              width: '100%',
              label: 'Type of day-off'
            },
            {
              UIComponent: 'DatePicker',
              type: 'date',
              name: 'daysOff.startDate',
              style: { width: '100%' },
              label: 'Start Date',
              id: 'startDate',
              defaultValue: '#CURRENT_DATE',
              variant: 'standard'
            },
            {
              UIComponent: 'DatePicker',
              type: 'date',
              name: 'daysOff.endDate',
              style: { width: '100%' },
              label: 'End Date',
              defaultValue: '#CURRENT_DATE',
              id: 'endDate',
              variant: 'standard'
            },
            {
              UIComponent: 'Input',
              type: 'text',
              variant: 'standard',
              name: 'daysOff.hours',
              width: '100%',
              label: 'Number of hours',
              id: 'hours',
              dependencies: {
                conditions: {
                  operator: 'equal',
                  value: true,
                  params: 'daysOff.startDate|daysOff.endDate'
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
            url: '/daysOff'
          }
        },
        searchAction: {
          searchFields: ['person.name', 'daysOff.dayOffType'],
          inputProps: {
            variant: 'standard'
          }
        }
      },
      tableRowActions: {
        editAction: {
          updateUrl: '/daysOff',
          updateUrlType: 'PUT',
          getUrl: '/daysOff',
          getUrlType: 'GET',
          formItems: [
            {
              UIComponent: 'AsyncSelectInput',
              type: 'select',
              action: {
                url: '/persons',
                type: 'GET'
              },
              variant: 'standard',
              name: 'person.name',
              width: '100%',
              label: 'Person name'
            },
            {
              UIComponent: 'Input',
              type: 'select',
              values: [
                { value: 'publicHoliday', label: 'Public Holiday' },
                { value: 'dayOff', label: 'Day-Off' },
                { value: 'teamEvent', label: 'Team Event' }
              ],
              name: 'daysOff.dayOffType',
              variant: 'standard',
              width: '100%',
              label: 'Type of day-off'
            },
            {
              UIComponent: 'DatePicker',
              type: 'date',
              name: 'daysOff.startDate',
              style: { width: '100%' },
              label: 'Start Date',
              variant: 'standard'
            },
            {
              UIComponent: 'DatePicker',
              type: 'date',
              name: 'daysOff.endDate',
              style: { width: '100%' },
              label: 'End Date',
              variant: 'standard'
            },
            {
              UIComponent: 'Input',
              type: 'text',
              variant: 'standard',
              name: 'daysOff.hours',
              width: '100%',
              label: 'Number of hours',
              id: 'hours',
              dependencies: {
                conditions: {
                  operator: 'equal',
                  value: true,
                  params: 'daysOff.startDate|daysOff.endDate'
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
          url: '',
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
  ]
}
