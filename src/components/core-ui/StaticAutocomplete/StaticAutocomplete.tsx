import * as React from 'react'
import { Autocomplete as MuiAutocomplete } from '@fullscreendigital/carrefour-dex-fe'

const StaticAutocomplete = props => {
  const [open, setOpen] = React.useState(false)

  const {
    width,
    options,
    ...rest
  } = props

  return (
    <MuiAutocomplete
      {...rest}
      disablePortal
      id="async-demo"
      options={options}
      style={{ maxWidth: width ?? 300 }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      value={props.value || (props.multiple ? [] : '')}
      onChange={(_, value) => { console.log(_), props.onChange(value)}}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderOption={(props, option) => (
        <li {...props} key={option.value}>
          {option.label}
        </li>
      )}
    />
  )
}

export default StaticAutocomplete
