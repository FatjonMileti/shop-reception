import { createElement, useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { Components } from 'utils/dynamicRenderingConstants'
import { start } from 'utils/rulesService'
import { getGridSize } from '../helpers'
import { ModalInfo } from './ModalInfo'

const ModalForm = ({
  modalTitle,
  formItems,
  formInfoItems,
  gridSize,
  handleInputChange,
  editItem,
  formButtons,
  saveData,
  closeModal
}) => {
  const [processedFormItems, setProcessedFormItems] = useState(formItems)

  useEffect(() => {
    ;(async () => {
      // TODO: get the JSON schema; this is a GET to api
      try {
        if (formItems.some(item => item.dependencies?.conditions)) {
          const result = await start(formItems, editItem)
          setProcessedFormItems(result)
        }
        const itemsWithScript = formItems.filter(item => item.dependencies?.script)
        itemsWithScript.forEach(item => Function(item.dependencies.script)())
      } catch (error) {
        console.log(error)
      }
    })()
  }, [editItem, formItems])

  return (
    <form>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography component="h2" variant="medium">
            {modalTitle}
          </Typography>
        </Grid>
        <Grid item sx={12} md={12}>
          <ModalInfo formInfoItems={formInfoItems} editItem={editItem} />
        </Grid>
        {processedFormItems.map(formItem => {
          const { UIComponent, name, formItemsPerRow, ...rest } = formItem
          const key = rest.payloadKey || name
          const value = editItem[key] ? editItem[key] : rest.type === 'date' ? undefined : ''

          return (
            <Grid
              item
              key={formItem.name}
              xs={12}
              md={formItemsPerRow ? getGridSize(formItemsPerRow) : gridSize}
            >
              {createElement(Components[UIComponent], {
                ...rest,
                onChange: arg => {
                  rest.type === 'date'
                    ? handleInputChange(arg, name)
                    : rest.type === 'checkbox'
                    ? handleInputChange(arg.target.checked, key)
                    : handleInputChange(arg.target.value, key)
                },
                value
              })}
            </Grid>
          )
        })}
        <Grid item xs={12} style={{ textAlign: 'right' }}>
          {formButtons.map(formButton => {
            const { isSaveButton, ...rest } = formButton
            return (
              <Button
                key={formButton.label}
                {...rest}
                onClick={isSaveButton ? saveData : closeModal}
                style={{ marginLeft: '1.2rem' }}
              />
            )
          })}
        </Grid>
      </Grid>
    </form>
  )
}

export default ModalForm
