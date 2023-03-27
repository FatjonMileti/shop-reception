export const JSONSchema = {
  UIComponent: 'Box',
  id: 'the-box',
  className: '',
  children: [
    {
      UIComponent: 'Table',
      id: 'the-table',
      width: '100%',
      title: 'Effort Matrix',
      action: {
        url: '/effortMatrix',
        type: 'GET'
      },
      hideCheckbox: true,
      stickyRatio: 0.25,
      columns: [
        {
          title: '',
          field: 'role',
          align: 'left',
          sticky: true
        },
        {
          title: 'Evaluation',
          field: 'evaluationPhase',
          align: 'center',
          sticky: true,
          weight: 2
        },
        {
          title: 'Analysis',
          field: 'analysisPhase',
          align: 'center',
          sticky: true,
          width: '20px'
        },
        {
          title: 'Design',
          field: 'designPhase',
          align: 'center',
          collapsible: true
        },
        {
          title: 'Development',
          field: 'developmentPhase',
          align: 'center',
          collapsible: true,
          width: '20px'
        },
        {
          title: 'System Test',
          field: 'systemTestPhase',
          align: 'center',
          collapsible: true,
          weight: 0.5
        },
        {
          title: 'UAT',
          field: 'uatPhase',
          align: 'center',
          collapsible: true
        },
        {
          title: 'Go-Live',
          field: 'goLivePhase',
          align: 'center',
          collapsible: true
        },
        {
          title: 'SOAK',
          field: 'soakPhase',
          align: 'center',
          collapsible: true
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
                { value: 'IT PM', label: 'IT PM' },
                { value: 'Business Analyst', label: 'Business Analyst' },
                { value: 'System Analyst', label: 'System Analyst' },
                { value: 'Solution Architect', label: 'Solution Architect' },
                { value: 'Developer', label: 'Developer' },
                { value: 'QA Officer', label: 'QA Officer' },
                { value: 'DevOps', label: 'DevOps' },
                { value: 'Support Engineer', label: 'Support Engineer' },
                { value: 'Technical Lead', label: 'Technical Lead' }
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
              name: 'evaluationPhase',
              width: '100%',
              label: 'Evaluation',
              infoIcon: 'Percent'
            },
            {
              UIComponent: 'Input',
              type: 'text',
              variant: 'standard',
              name: 'analysisPhase',
              width: '100%',
              label: 'Analysis',
              infoIcon: 'Percent'
            },
            {
              UIComponent: 'Input',
              type: 'text',
              variant: 'standard',
              name: 'designPhase',
              width: '100%',
              label: 'Design',
              infoIcon: 'Percent'
            },
            {
              UIComponent: 'Input',
              type: 'text',
              variant: 'standard',
              name: 'developmentPhase',
              width: '100%',
              label: 'Development',
              infoIcon: 'Percent'
            },
            {
              UIComponent: 'Input',
              type: 'text',
              variant: 'standard',
              name: 'systemTestPhase',
              width: '100%',
              label: 'System Test',
              infoIcon: 'Percent'
            },
            {
              UIComponent: 'Input',
              type: 'text',
              variant: 'standard',
              name: 'uatPhase',
              width: '100%',
              label: 'UAT',
              infoIcon: 'Percent'
            },
            {
              UIComponent: 'Input',
              type: 'text',
              variant: 'standard',
              name: 'goLivePhase',
              width: '100%',
              label: 'Go-Live',
              infoIcon: 'Percent'
            },
            {
              UIComponent: 'Input',
              type: 'text',
              variant: 'standard',
              name: 'soakPhase',
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
          formInfoItems: [{ name: 'role', label: 'Role' }],
          formItems: [
            {
              UIComponent: 'Input',
              type: 'text',
              variant: 'standard',
              name: 'evaluationPhase',
              width: '100%',
              label: 'Evaluation',
              infoIcon: 'Percent'
            },
            {
              UIComponent: 'Input',
              type: 'text',
              variant: 'standard',
              name: 'analysisPhase',
              width: '100%',
              label: 'Analysis',
              infoIcon: 'Percent'
            },
            {
              UIComponent: 'Input',
              type: 'text',
              variant: 'standard',
              name: 'designPhase',
              width: '100%',
              label: 'Design',
              infoIcon: 'Percent'
            },
            {
              UIComponent: 'Input',
              type: 'text',
              variant: 'standard',
              name: 'developmentPhase',
              width: '100%',
              label: 'Development',
              infoIcon: 'Percent'
            },
            {
              UIComponent: 'Input',
              type: 'text',
              variant: 'standard',
              name: 'systemTestPhase',
              width: '100%',
              label: 'System Test',
              infoIcon: 'Percent'
            },
            {
              UIComponent: 'Input',
              type: 'text',
              variant: 'standard',
              name: 'uatPhase',
              width: '100%',
              label: 'UAT',
              infoIcon: 'Percent'
            },
            {
              UIComponent: 'Input',
              type: 'text',
              variant: 'standard',
              name: 'goLivePhase',
              width: '100%',
              label: 'Go-Live',
              infoIcon: 'Percent'
            },
            {
              UIComponent: 'Input',
              type: 'text',
              variant: 'standard',
              name: 'soakPhase',
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
