import { createElement, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { Components } from 'utils/dynamicRenderingConstants'

const ModalForm = ({
  modalTitle,
  formItems,
  gridSize,
  handleInputChange,
  editItem,
  formButtons,
  saveData,
  closeModal
}) => {
  useEffect(() => {
    formItems.map(formItem => {
      if (formItem.changeDependencies?.script) {
        eval(formItem.changeDependencies?.script)
      }
    })
  }, [formItems, editItem])

  return (
    <form>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography component="h2" variant="medium">
            {modalTitle}
          </Typography>
        </Grid>
        {formItems.map(formItem => {
          const { UIComponent, name, ...rest } = formItem
          const key = rest.payloadKey || name
          const value = editItem[key] ? editItem[key] : rest.type === 'date' ? undefined : ''

          return (
            <Grid item key={formItem.name} xs={12} md={gridSize}>
              {createElement(Components[UIComponent], {
                ...rest,
                onChange: arg => {
                  rest.type === 'date'
                    ? handleInputChange(arg, name)
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
