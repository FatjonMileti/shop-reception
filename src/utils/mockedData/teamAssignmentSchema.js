export const JSONSchema = {
  UIComponent: 'Box',
  children: [
    {
      UIComponent: 'ComboBoxTable',
      id: 'the-cbt',
      combo: {
        UIComponent: 'Input',
        type: 'select',
        variant: 'standard',
        name: 'teamMember.domain',
        label: 'Domain',
        values: [
          {
            value: 'Store&Supply Chain',
            label: 'Store&Supply Chain'
          },
          {
            value: 'Digital Platforms',
            label: 'Digital Platforms'
          },
          {
            value: 'EDI',
            label: 'EDI'
          },
          {
            value: 'Security',
            label: 'Security'
          },
          {
            value: 'Enterprise Architecture',
            label: 'Enterprise Architecture'
          },
          {
            value: 'Innovation',
            label: 'Innovation'
          },
          {
            value: 'Infra&Support',
            label: 'Infra&Support'
          },
          {
            value: 'Data Science',
            label: 'Data Science'
          }
        ]
      },
      table: {
        UIComponent: 'Table',
        width: '80%',
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
            align: 'left',
            type: 'string'
          },
          {
            title: 'Person',
            field: 'teamMember.name',
            align: 'left',
            type: 'string'
          },
          {
            title: 'Role',
            field: 'role',
            align: 'left',
            type: 'string'
          },
          {
            title: 'Assigned Project Key',
            field: 'project.key',
            align: 'left',
            type: 'string'
          },
          {
            title: 'Assignment Start Date',
            field: 'assignmentStartDate',
            align: 'left',
            type: 'date'
          },
          {
            title: 'Assignment End Date',
            field: 'assignmentEndDate',
            align: 'left',
            type: 'date'
          }
        ],
        tableActions: {
          filters: [
            {
              UIComponent: 'Input',
              type: 'text',
              name: 'teamMember.name',
              label: 'Person',
              variant: 'standard'
            },
            {
              UIComponent: 'Input',
              type: 'text',
              name: 'project.key',
              label: 'Assigned Project Key',
              variant: 'standard'
            }
          ]
        },
        tableRowActions: {
          editAction: {
            updateUrl: '/teamAssignments',
            updateUrlType: 'PUT',
            getUrl: '/teamAssignments',
            getUrlType: 'GET',
            formInfoItems: [
              {
                name: 'teamMember.name',
                label: 'Person'
              },
              {
                name: 'role',
                label: 'Role'
              },
              {
                name: 'project.key',
                label: 'Project Key'
              }
            ],
            formItems: [
              {
                UIComponent: 'DatePicker',
                type: 'date',
                name: 'assignmentStartDate',
                style: {
                  width: '100%'
                },
                label: 'Start Date',
                variant: 'standard'
              },
              {
                UIComponent: 'DatePicker',
                type: 'date',
                name: 'assignmentEndDate',
                style: {
                  width: '100%'
                },
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
    }
  ]
}
