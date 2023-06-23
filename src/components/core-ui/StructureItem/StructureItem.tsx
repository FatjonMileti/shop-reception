import { useNotification } from 'hooks'
import React from 'react'
import { makeCoreGetRequest } from 'utils/api'
import { toAsyncSelectOptions } from '../AsyncAutocomplete/serializers'
import { Autocomplete, Checkbox } from '@fullscreendigital/carrefour-dex-fe'
import s from './StructureItem.modules.scss'

function StructureItem(props) {
  const {
    roleName,
    defaultChecked,
    removeAddStructure,
    value,
    selectLabel,
    action,
    comboValue,
    width,
    ...rest
  } = props

  const [open, setOpen] = React.useState(false)
  const [checked, setChecked] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const [selectedValue, setSelectedValue] = React.useState(null)
  const loading = open && options.length === 0

  const { showNotification } = useNotification()

  React.useEffect(() => {
    let active = true

    if (defaultChecked) {
      setChecked(true)
    }

    ;(async () => {
      try {
        let url = action.url
        const result = await makeCoreGetRequest(url)
        const optionItems = result.list.map(item => ({ label: item.name, value: item.id }))
        setOptions(optionItems)

        const selected = optionItems.find(opt => opt.value === props?.value?.structureId)
        setSelectedValue(selected)
      } catch (error) {
        showNotification({
          message: `Error while fetching dropdown data. ${error?.message}`,
          type: 'error'
        })
      }
    })()
    return () => {
      active = false
    }
  }, [loading, value])

  return (
    <div className={s.container}>
      <Checkbox
        checked={checked}
        label={roleName.label}
        onChange={() => removeAddStructure(roleName.value)}
      />
      {checked && (
        <Autocomplete
          {...rest}
          disableClearable
          variant="standard"
          label={selectLabel}
          disablePortal
          id="async-demo"
          options={options}
          style={{ width: width ?? 300 }}
          open={open}
          onOpen={() => {
            setOpen(true)
          }}
          onClose={() => {
            setOpen(false)
          }}
          loading={loading}
          value={selectedValue ?? ''}
          onChange={(_, value) => props.onChange(value, roleName.value)}
        />
      )}
    </div>
  )
}

export default StructureItem
