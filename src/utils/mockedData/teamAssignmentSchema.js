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
          field: 'projectKey',
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
          formItems: [
            {
              UIComponent: 'Input',
              type: 'text',
              readonly: true,
              variant: 'standard',
              name: 'teamMember.name',
              width: '100%',
              label: 'Person'
            },
            {
              UIComponent: 'Input',
              type: 'text',
              readonly: true,
              variant: 'standard',
              name: 'role',
              width: '100%',
              label: 'Role'
            },
            {
              UIComponent: 'Input',
              type: 'text',
              readonly: true,
              variant: 'standard',
              name: 'projectKey',
              width: '100%',
              label: 'Project Key'
            },
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
