export const JSONSchema = {
  UIComponent: 'Container',
  id: 'tableContainer',
  className: '',
  children: [
    {
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
                  variant: 'outlined',
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
                  variant: 'outlined',
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
                  changeDependencies: {
                    script: `
                      document.getElementById('hours').closest('.MuiGrid-item').style.visibility =
                        document.getElementById('startDate').value === document.getElementById('endDate').value
                          ? 'visible'
                          : 'hidden'
                    `
                  }
                },
                {
                  UIComponent: 'DatePicker',
                  type: 'date',
                  name: 'daysOff.endDate',
                  style: { width: '100%' },
                  label: 'End Date',
                  id: 'endDate',
                  changeDependencies: {
                    script: `
                      document.getElementById('hours').closest('.MuiGrid-item').style.visibility =
                        document.getElementById('startDate').value === document.getElementById('endDate').value
                          ? 'visible'
                          : 'hidden'
                    `
                  }
                },
                {
                  UIComponent: 'Input',
                  type: 'text',
                  variant: 'outlined',
                  name: 'daysOff.hours',
                  width: '100%',
                  label: 'Number of hours',
                  id: 'hours'
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
              searchFields: ['person.name'],
              inputProps: {
                variant: 'outlined'
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
                  variant: 'outlined',
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
                  variant: 'outlined',
                  width: '100%',
                  label: 'Type of day-off'
                },
                {
                  UIComponent: 'DatePicker',
                  type: 'date',
                  name: 'daysOff.startDate',
                  style: { width: '100%' },
                  label: 'Start Date'
                },
                {
                  UIComponent: 'DatePicker',
                  type: 'date',
                  name: 'daysOff.endDate',
                  style: { width: '100%' },
                  label: 'End Date'
                },
                {
                  UIComponent: 'Input',
                  type: 'text',
                  variant: 'outlined',
                  name: 'daysOff.hours',
                  width: '100%',
                  label: 'Number of hours'
                }
              ],
              formItemsPerRow: 1,
              formButtons: [
                {
                  UIComponent: 'Button',
                  label: 'Cancel',
                  variant: 'outlined',
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
                  variant: 'outlined',
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
  ]
}

// const changeHoursVisibility = () => {
//   document.getElementById('hours').closest('.MuiGrid-item').style.visibility =
//     document.getElementById('startDate').value === document.getElementById('endDate').value
//       ? 'hidden'
//       : 'visible'
// }

// const changeDateListener = event => {
//   const element = event.target
//   if (element.id === 'startDate' || element.id === 'endDate') {
//     changeHoursVisibility()
//   }
// }

// document.addEventListener('change', event => changeDateListener(event))
