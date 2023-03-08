export const JSONSchema = {
  UIComponent: 'Container',
  id: 'effortMatrixTableContainer',
  className: '',
  children: [
    {
      UIComponent: 'Box',
      className: '',
      children: [
        {
          UIComponent: 'Table',
          width: '100%',
          title: 'Effort Matrix',
          action: {
            url: '/effortMatrix',
            type: 'GET'
          },
          hideCheckbox: true,
          columns: [
            {
              title: '',
              field: 'role',
              align: 'left'
            },
            {
              title: 'Evaluation',
              field: 'evaluation',
              align: 'left'
            },
            {
              title: 'Analysis',
              field: 'analysis',
              align: 'left'
            },
            {
              title: 'Design',
              field: 'design',
              align: 'left'
            },
            {
              title: 'Development',
              field: 'development',
              align: 'left'
            },
            {
              title: 'System Test',
              field: 'systemTest',
              align: 'left'
            },
            {
              title: 'UAT',
              field: 'uat',
              align: 'left'
            },
            {
              title: 'Go-Live',
              field: 'goLive',
              align: 'left'
            },
            {
              title: 'SOAK',
              field: 'soak',
              align: 'left'
            }
          ],
          tableActions: {
            newAction: {
              modalTitle: 'New Effort',
              buttonProps: {
                gradient: 'blue',
                label: 'NEW Effort',
                variant: 'contained'
              },
              formItems: [
                {
                  UIComponent: 'Input',
                  type: 'select',
                  values: [
                    { value: 'itPM', label: 'IT PM' },
                    { value: 'businessAnalyst', label: 'Business Analyst' },
                    { value: 'systemAnalyst', label: 'System Analyst' },
                    { value: 'solutionArchitect', label: 'Solution Architect' },
                    { value: 'developer', label: 'Developer' },
                    { value: 'qaOfficer', label: 'QA Officer' },
                    { value: 'devOps', label: 'DevOps' },
                    { value: 'supportEngineer', label: 'Support Engineer' },
                    { value: 'technicalLead', label: 'Technical Lead' }
                  ],
                  name: 'role',
                  variant: 'standard',
                  width: '100%',
                  label: 'Role',
                  formItemsPerRow: 1
                },
                {
                  UIComponent: 'Input',
                  type: 'text',
                  variant: 'standard',
                  name: 'evaluation',
                  width: '100%',
                  label: 'Evaluation',
                  infoIcon: 'Percent'
                },
                {
                  UIComponent: 'Input',
                  type: 'text',
                  variant: 'standard',
                  name: 'analysis',
                  width: '100%',
                  label: 'Analysis',
                  infoIcon: 'Percent'
                },
                {
                  UIComponent: 'Input',
                  type: 'text',
                  variant: 'standard',
                  name: 'design',
                  width: '100%',
                  label: 'Design',
                  infoIcon: 'Percent'
                },
                {
                  UIComponent: 'Input',
                  type: 'text',
                  variant: 'standard',
                  name: 'development',
                  width: '100%',
                  label: 'Development',
                  infoIcon: 'Percent'
                },
                {
                  UIComponent: 'Input',
                  type: 'text',
                  variant: 'standard',
                  name: 'systemTest',
                  width: '100%',
                  label: 'System Test',
                  infoIcon: 'Percent'
                },
                {
                  UIComponent: 'Input',
                  type: 'text',
                  variant: 'standard',
                  name: 'uat',
                  width: '100%',
                  label: 'UAT',
                  infoIcon: 'Percent'
                },
                {
                  UIComponent: 'Input',
                  type: 'text',
                  variant: 'standard',
                  name: 'goLive',
                  width: '100%',
                  label: 'Go-Live',
                  infoIcon: 'Percent'
                },
                {
                  UIComponent: 'Input',
                  type: 'text',
                  variant: 'standard',
                  name: 'soak',
                  width: '100%',
                  label: 'SOAK',
                  infoIcon: 'Percent'
                }
              ],
              formItemsPerRow: 2,
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
              ],
              formAction: {
                type: 'POST',
                url: '/effortMatrix'
              }
            }
          },
          tableRowActions: {
            editAction: {
              updateUrl: '/effortMatrix',
              updateUrlType: 'PUT',
              getUrl: '/effortMatrix',
              getUrlType: 'GET',
              formItems: [
                {
                  UIComponent: 'Input',
                  type: 'text',
                  variant: 'standard',
                  name: 'role',
                  width: '100%',
                  label: 'Role',
                  readonly: true,
                  formItemsPerRow: 1
                },
                {
                  UIComponent: 'Input',
                  type: 'text',
                  variant: 'standard',
                  name: 'evaluation',
                  width: '100%',
                  label: 'Evaluation',
                  infoIcon: 'Percent'
                },
                {
                  UIComponent: 'Input',
                  type: 'text',
                  variant: 'standard',
                  name: 'analysis',
                  width: '100%',
                  label: 'Analysis',
                  infoIcon: 'Percent'
                },
                {
                  UIComponent: 'Input',
                  type: 'text',
                  variant: 'standard',
                  name: 'design',
                  width: '100%',
                  label: 'Design',
                  infoIcon: 'Percent'
                },
                {
                  UIComponent: 'Input',
                  type: 'text',
                  variant: 'standard',
                  name: 'development',
                  width: '100%',
                  label: 'Development',
                  infoIcon: 'Percent'
                },
                {
                  UIComponent: 'Input',
                  type: 'text',
                  variant: 'standard',
                  name: 'systemTest',
                  width: '100%',
                  label: 'System Test',
                  infoIcon: 'Percent'
                },
                {
                  UIComponent: 'Input',
                  type: 'text',
                  variant: 'standard',
                  name: 'uat',
                  width: '100%',
                  label: 'UAT',
                  infoIcon: 'Percent'
                },
                {
                  UIComponent: 'Input',
                  type: 'text',
                  variant: 'standard',
                  name: 'goLive',
                  width: '100%',
                  label: 'Go-Live',
                  infoIcon: 'Percent'
                },
                {
                  UIComponent: 'Input',
                  type: 'text',
                  variant: 'standard',
                  name: 'soak',
                  width: '100%',
                  label: 'SOAK',
                  infoIcon: 'Percent'
                }
              ],
              formItemsPerRow: 2,
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
            },
            deleteAction: {
              url: '/effortMatrix',
              confirmText: 'Are you sure you want to delete this entry?',
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
