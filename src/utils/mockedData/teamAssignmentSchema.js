export const JSONSchema = {
  UIComponent: 'Container',
  id: 'teamAssignmentTableContainer',
  className: '',
  children: [
    {
      UIComponent: 'Box',
      className: '',
      children: [
        {
          UIComponent: 'Table',
          width: '80%',
          title: 'Team Assignment',
          action: {
            url: '/teamAssignment',
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
              title: 'Domain',
              field: 'domain.name',
              align: 'left'
            },
            {
              title: 'Person',
              field: 'person.name',
              align: 'left'
            },
            {
              title: 'Role',
              field: 'role.name',
              align: 'left'
            },
            {
              title: 'Assigned Project Key',
              field: 'assignment.project.name',
              align: 'left'
            },
            {
              title: 'Assignment Start Date',
              field: 'assignment.startDate',
              align: 'left'
            },
            {
              title: 'Assignment End Date',
              field: 'assignment.endDate',
              align: 'left'
            }
          ],
          tableRowActions: {
            editAction: {
              updateUrl: '/teamAssignment',
              updateUrlType: 'PUT',
              getUrl: '/teamAssignment',
              getUrlType: 'GET',
              formItems: [
                {
                  UIComponent: 'Input',
                  type: 'text',
                  readonly: true,
                  variant: 'outlined',
                  name: 'person.name',
                  width: '100%',
                  label: 'Person'
                },
                {
                  UIComponent: 'Input',
                  type: 'text',
                  readonly: true,
                  variant: 'outlined',
                  name: 'role.name',
                  width: '100%',
                  label: 'Role'
                },
                {
                  UIComponent: 'Input',
                  type: 'text',
                  readonly: true,
                  variant: 'outlined',
                  name: 'project.name',
                  width: '100%',
                  label: 'Project Key'
                },
                {
                  UIComponent: 'DatePicker',
                  type: 'date',
                  name: 'assignment.startDate',
                  style: { width: '100%' },
                  label: 'Start Date'
                },
                {
                  UIComponent: 'DatePicker',
                  type: 'date',
                  name: 'assignment.endDate',
                  style: { width: '100%' },
                  label: 'End Date'
                }
              ],
              formItemsPerRow: 1,
              formButtons: [
                {
                  UIComponent: 'Button',
                  gradient: 'blue',
                  label: 'Cancel',
                  variant: 'text',
                  isCancelButton: true
                },
                {
                  UIComponent: 'Button',
                  gradient: 'blue',
                  label: 'Save',
                  variant: 'contained',
                  isSaveButton: true
                }
              ]
            }
          }
        }
      ]
    }
  ]
}
