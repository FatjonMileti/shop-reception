import { createElement, useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { Components } from 'utils/dynamicRenderingConstants'
import { start } from 'utils/rulesService'
import { getGridSize } from '../helpers'
import { ModalInfo } from './ModalInfo'
import { get } from 'lodash'
import { useNotification } from 'hooks'
import s from './ModalForm.scss'

const ModalForm = ({
  modalTitle,
  formItems,
  formInfoItems,
  gridSize,
  handleInputChange,
  editItem,
  formButtons,
  saveData,
  closeModal,
  comboValue
}) => {
  const [processedFormItems, setProcessedFormItems] = useState(formItems)

  const { showNotification } = useNotification()

  useEffect(() => {
    ;(async () => {
      try {
        if (formItems.some(item => item.dependencies?.conditions)) {
          const result = await start(formItems, editItem)
          setProcessedFormItems(result)
        }
        const itemsWithScript = formItems.filter(item => item.dependencies?.script)
        itemsWithScript.forEach(item => Function(item.dependencies.script)())
      } catch (error) {
        showNotification({
          message: `Error while setting item rules. ${error}`,
          type: 'error'
        })
      }
    })()
  }, [editItem, formItems])

  return (
    <form>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography component="h2" variant="medium">
            <span className={s.modalTitle}>{modalTitle}</span>
          </Typography>
        </Grid>
        {!!formInfoItems?.length && (
          <Grid item xs={12} md={12}>
            <ModalInfo formInfoItems={formInfoItems} editItem={editItem} />
          </Grid>
        )}
        {processedFormItems.map(formItem => {
          const { UIComponent, name, formItemsPerRow, ...rest } = formItem
          const key = rest.payloadKey || name
          let value = get(editItem, name)
          if (value == '' && rest.type === 'date') {
            value = null // value=undefined => current date | value=null => input left blank
          }

          return (
            <Grid
              item
              key={formItem.name}
              xs={12}
              sm={formItemsPerRow ? getGridSize(formItemsPerRow) : gridSize}
            >
              {createElement(Components[UIComponent], {
                ...rest,
                value,
                comboValue,
                ...(rest.type === 'date' ? { inputFormat: 'DD/MM/YYYY' } : {}),
                onChange: arg => {
                  switch (rest.type) {
                    case 'date':
                      handleInputChange(arg, name, rest.type)
                      break
                    case 'checkbox':
                      handleInputChange(arg.target.checked, key, rest.type)
                      break
                    case 'autocomplete':
                      handleInputChange(arg?.value, key, rest.type)
                      handleInputChange(arg?.label, name, rest.type)
                      break
                    default:
                      handleInputChange(arg.target.value, key, rest.type)
                      break
                  }
                }
              })}
            </Grid>
          )
        })}
        <Grid item xs={12} style={{ padding: '4px' }} />{' '}
        {/* [~] so that we start counting grid columns again on a new line */}
        {[...Array(12 / gridSize - 1)].map((_, i) => (
          <Grid item key={i} xs={12} sm={gridSize} />
        ))}
        <Grid item xs={12} sm={gridSize} className={s.modalButtons}>
          {formButtons.map(formButton => {
            const { isSaveButton, ...rest } = formButton
            return (
              <Button
                key={formButton.label}
                {...rest}
                onClick={isSaveButton ? saveData : closeModal}
              />
            )
          })}
        </Grid>
      </Grid>
    </form>
  )
}

export default ModalForm
