export const JSONSchema = {
  UIComponent: 'Box',
  children: [
    {
      UIComponent: 'Table',
      width: '80%',
      title: 'Team Assignment',
      action: {
        url: '/teamAssignments',
        type: 'GET'
      },
      hideCheckbox: true,
      orderBy: 'teamMember.name',
      columns: [
        {
          title: 'Domain',
          field: 'domain',
          align: 'left'
        },
        {
          title: 'Person',
          field: 'teamMember.name',
          align: 'left'
        },
        {
          title: 'Role',
          field: 'role',
          align: 'left'
        },
        {
          title: 'Assigned Project Key',
          field: 'project.key',
          align: 'left'
        },
        {
          title: 'Assignment Start Date',
          field: 'assignmentStartDate',
          align: 'left'
        },
        {
          title: 'Assignment End Date',
          field: 'assignmentEndDate',
          align: 'left'
        }
      ],
      tableRowActions: {
        editAction: {
          updateUrl: '/teamAssignments',
          updateUrlType: 'PUT',
          getUrl: '/teamAssignments',
          getUrlType: 'GET',
          formInfoItems: [
            { name: 'teamMember.name', label: 'Person' },
            { name: 'role', label: 'Role' },
            { name: 'project.key', label: 'Project Key' }
          ],
          formItems: [
            {
              UIComponent: 'DatePicker',
              type: 'date',
              name: 'assignmentStartDate',
              style: { width: '100%' },
              label: 'Start Date',
              variant: 'standard'
            },
            {
              UIComponent: 'DatePicker',
              type: 'date',
              name: 'assignmentEndDate',
              style: { width: '100%' },
              label: 'End Date',
              variant: 'standard'
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
