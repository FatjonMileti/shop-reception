import * as React from 'react'
import { Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { useMediaQuery } from '@mui/material'
import { AsyncAutocompleteProps } from './AsyncAutocompleteDefinitions'

const AsyncAutocomplete = (props: AsyncAutocompleteProps) => {
  const {
    value,
    options,
    onChange,
    onBlur,
    width,
    ...rest
  } = props
  
  const [open, setOpen] = React.useState(false)
  const loading = open && options.length === 0

  const isXs = useMediaQuery('(max-width:624px)')

  return (
    <Autocomplete
      {...rest}
      disablePortal
      id="async-demo"
      options={options}
      //TO DO: fix styling for all autocomplete and filters
      style={{ maxWidth: isXs ? '100%' : width ?? 300 }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      loading={loading}
      value={value}
      onChange={(_, value) => onChange(value)}
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
