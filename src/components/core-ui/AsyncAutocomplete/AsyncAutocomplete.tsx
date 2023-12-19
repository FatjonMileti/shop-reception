import * as React from 'react'
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { useMediaQuery } from '@mui/material'
import { AsyncAutocompleteProps } from './AsyncAutocompleteDefinitions'

const AsyncAutocomplete = (props: AsyncAutocompleteProps) => {
  const { value, options, onChange, onBlur, style, ...rest } = props
  const [open, setOpen] = React.useState(false)
  const loading = open && options.length === 0

  return (
    <Autocomplete
      {...rest}
      disablePortal
      id="async-demo"
      options={options}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      loading={loading}
      value={value}
      style={style || {}}
      onChange={(_, value) => onChange && onChange(value)}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderOption={(props, option) => (
        <li {...props} key={option.value}>
          {option.label}
        </li>
      )}
    />
  )
}

export default AsyncAutocomplete
