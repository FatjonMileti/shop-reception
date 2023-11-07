import { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { Button, IconButton, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { start } from 'utils/rulesService'
import { ModalInfo } from './ModalInfo'
import { useNotification } from 'hooks'
import { FormItem } from './FormItem'
import { isEmpty } from 'lodash'
import { Icon } from '../../Icon'
import cn from 'classnames'
import s from './ModalForm.modules.scss'
import { getRemoteDependencies } from '../helpers'

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
  extraUrlParams = {},
  isPageForm = false,
  errors,
  isLoading = false
}) => {
  const [processedFormItems, setProcessedFormItems] = useState(formItems)

  const { showNotification } = useNotification()

  useEffect(() => {
    ;(async () => {
      try {
        let result = []
        if (formItems.some(item => item.dependencies?.conditions) && !isEmpty(editItem)) {
          result = await start(formItems, editItem)
        }
        if (formItems.some(item => item.dependencies?.action) && !isEmpty(editItem)) {
          result = await getRemoteDependencies(result)
        }

        if (result.length) {
          setProcessedFormItems(
            result.filter(item => !(item.hidden || (item.inputProps && item.inputProps.hidden)))
          )
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
        {modalTitle && modalTitle.length > 0 && (
          <Grid item xs={12}>
            <Typography component="h2" variant="medium">
              <span className={s.modalTitle}>{modalTitle}</span>
            </Typography>
          </Grid>
        )}
        {!!formInfoItems?.length && (
          <Grid item xs={12} md={12}>
            <ModalInfo formInfoItems={formInfoItems} editItem={editItem} />
          </Grid>
        )}
        {processedFormItems.map(formItem => {
          const { UIComponent, name, formItemsPerRow, type, ...rest } = formItem

          return (
            <FormItem
              key={name || rest.id}
              name={name}
              type={type}
              editItem={editItem}
              UIComponent={UIComponent}
              formItemsPerRow={formItemsPerRow}
              rest={rest}
              handleInputChange={handleInputChange}
              gridSize={gridSize}
              extraUrlParams={extraUrlParams}
              errors={errors}
            />
          )
        })}
        <Grid item xs={12} style={{ padding: '4px' }} />{' '}
        {/* [~] so that we start counting grid columns again on a new line */}
        {[...Array(12 / gridSize - 1)].map((_, i) => (
          <Grid item key={i} xs={12} sm={gridSize} />
        ))}
        <Grid
          item
          xs={12}
          sm={gridSize}
          className={cn(s.modalButtons, { [s.pageFormButtons]: isPageForm })}
        >
          {formButtons.map(formButton => {
            const { isSaveButton, UIComponent, startIcon, endIcon, iconFill, ...rest } = formButton
            return UIComponent === 'IconButton' ? (
              <IconButton
                key={formButton.label}
                startIcon={
                  startIcon && <Icon iconName={startIcon} tiny fill={iconFill || 'white'} />
                }
                endIcon={endIcon && <Icon iconName={endIcon} tiny fill={iconFill || 'white'} />}
                style={isPageForm ? { maxWidth: 'fit-content' } : {}}
                {...rest}
                onClick={() => {
                  isSaveButton ? saveData(processedFormItems) : closeModal()
                }}
                disabled={isLoading}
              />
            ) : (
              <Button
                key={formButton.label}
                style={isPageForm ? { maxWidth: 'fit-content' } : {}}
                {...rest}
                onClick={() => {
                  isSaveButton ? saveData(processedFormItems) : closeModal()
                }}
              />
            )
          })}
        </Grid>
      </Grid>
    </form>
  )
}

export default ModalForm
