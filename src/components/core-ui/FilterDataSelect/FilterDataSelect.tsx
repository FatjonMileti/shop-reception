import { useState, useEffect, MouseEvent } from 'react'
import {
  Box,
  Button,
  Checkbox,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Paper,
  Popover,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material'
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Search as SearchIcon,
  Close as CloseIcon
} from '@mui/icons-material'
import { FilterDataSelectProps, FilterDataSelectOption } from './FilterDataSelectDefinitions'
import {
  StyledBadge,
  StyledDrawer,
  StyledButton,
  StyledListItem,
  StyledMultiListItem,
  StyledGreyCheckbox
} from './FilterDataSelectStyles'

const FilterDataSelect = (props: FilterDataSelectProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [componentToOpen, setComponentToOpen] = useState<string>('menu')
  const [open, setOpen] = useState<Boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedData, setSelectedData] = useState<any[]>([])
  const [options, setOptions] = useState<any | {}>({})
  // const open = Boolean(anchorEl);

  const isXs = useMediaQuery('(max-width:624px)')

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (isXs) {
      setComponentToOpen('drawer')
    } else {
      setAnchorEl(event.currentTarget)
      setComponentToOpen('menu')
    }

    setOpen(!open)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpen(false)
  }

  useEffect(() => {
    if (props.defaultSelectedData) {
      if (
        !(props.defaultSelectedData instanceof Array) &&
        Object.keys(props.defaultSelectedData).length > 0
      ) {
        setSelectedData([props.defaultSelectedData])
      } else if (
        props.defaultSelectedData instanceof Array &&
        props.defaultSelectedData.length > 0
      ) {
        setSelectedData(props.defaultSelectedData)
      }
    }
  }, [])

  useEffect(() => {
    if (props.options) {
      let crtOptions = props.options
      if (props.allTypesLabel)
        crtOptions = [{ label: props.allTypesLabel, value: '' }, ...props.options]
      setOptions(crtOptions)
    }
  }, [props.options?.length])

  useEffect(() => {
    if (searchValue.length > 0 && props.options) {
      const filteredData = props.options?.filter((item: any) => {
        return item.label.toLowerCase().includes(searchValue.toLowerCase())
      })
      setOptions(filteredData)
    } else if (props.options) {
      let crtOptions = props.options
      setOptions(crtOptions)
    }
  }, [searchValue])

  const changeAllSelectedData = async () => {
    if (props.multiSelect === true) {
      if (selectedData.length == props.options.length) {
        setSelectedData([])
      } else {
        setSelectedData(props.options)
      }

      if (props.onSelect) props.onSelect([])
    } else {
      setSelectedData([])
      if (props.onSelect) props.onSelect({})
    }
  }

  const changeSelectedData = async (itm: any) => {
    if (props.multiSelect === true) {
      let crtSelectedData = [...selectedData]

      let selectedValues = crtSelectedData.map((i: any) => i.value)
      if (selectedValues.indexOf(itm.value) !== -1) {
        crtSelectedData = crtSelectedData.filter((i: any) => i.value != itm.value && i.value)
      } else {
        crtSelectedData.push(itm)
      }

      setSelectedData(crtSelectedData)

      if (props.onSelect) props.onSelect(crtSelectedData)
    } else {
      if (!itm.value) setSelectedData([])
      else setSelectedData([itm])

      if (props.onSelect) props.onSelect(itm)
    }

    return
  }

  const getList = () => {
    if (!props.multiSelect) {
      return (
        <List dense={true} sx={{ minWidth: 400 }}>
          {props?.allTypesLabel && (
            <StyledListItem
              onClick={ev => {
                changeAllSelectedData()
                setOpen(false)
              }}
            >
              {props?.allTypesLabel}
            </StyledListItem>
          )}
          {options?.length > 0 &&
            options.map((item: any, index: any) => {
              return (
                <StyledListItem
                  key={'ddlst' + index}
                  className={
                    selectedData && selectedData[0] && selectedData[0].value == item.value
                      ? 'selectedItem'
                      : ''
                  }
                  onClick={ev => {
                    changeSelectedData(item)
                    setOpen(false)
                  }}
                >
                  {item.label}
                </StyledListItem>
              )
            })}
          {!options?.length && (
            <StyledListItem className="noDataItem">
              {props.noDataFoundLabel || 'No data found!'}
            </StyledListItem>
          )}
        </List>
      )
    } else {
      return (
        <List dense={true} sx={{ minWidth: 400 }}>
          {props?.allTypesLabel && (
            <StyledMultiListItem key={'ddmltlst_alldata'}>
              <ListItemButton
                role={undefined}
                onClick={ev => {
                  changeAllSelectedData()
                }}
                dense
                disableRipple
              >
                <ListItemIcon>
                  <StyledGreyCheckbox
                    edge="start"
                    checked={selectedData.length == props.options.length}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': 'lblid_all' }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={'lblid_all'}
                  sx={{ fontStyle: 'italic', color: '#999a9b' }}
                  primary={props?.allTypesLabel}
                />
              </ListItemButton>
            </StyledMultiListItem>
          )}
          {options?.length > 0 &&
            options.map((item: any, index: any) => {
              const isChecked =
                selectedData.length > 0
                  ? selectedData.map((s: any) => s?.value).indexOf(item?.value) !== -1
                  : false

              return (
                <StyledMultiListItem key={'ddmltlst' + index}>
                  <ListItemButton
                    role={undefined}
                    onClick={ev => {
                      changeSelectedData(item)
                    }}
                    dense
                    disableRipple
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={isChecked}
                        tabIndex={-1}
                        disableRipple
                        sx={{ color: '#1976d2' }}
                        inputProps={{ 'aria-labelledby': 'lblid_' + index }}
                      />
                    </ListItemIcon>
                    <ListItemText id={'lblid_' + index} primary={item.label} />
                  </ListItemButton>
                </StyledMultiListItem>
              )
            })}
          {!options?.length && (
            <StyledListItem className="noDataItem">
              {props.noDataFoundLabel || 'No data found!'}
            </StyledListItem>
          )}
        </List>
      )
    }
  }

  const getSearchInput = () => {
    if (!props.showCounter && !props.showSearch) return null

    return (
      <Box sx={{ padding: '1rem 1rem 0.5rem 1rem', width: '100%' }}>
        {props.showCounter === true && (
          <StyledBadge badgeContent={options?.length || 0} sx={{ mt: 0, mb: 1 }}>
            <Typography style={{ color: '#0e224e', fontWeight: 600, fontSize: '14px' }}>
              {props.counterLabel || 'Rezultate'}
            </Typography>
          </StyledBadge>
        )}
        {props.showSearch === true && (
          <Paper
            className="srcInput"
            elevation={0}
            sx={{
              boxShadow: 'none',
              padding: '3px',
              borderRadius: '18px',
              backgroundColor: '#e8f1fb',
              display: 'flex',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <SearchIcon sx={{ color: '#316ede', ml: 1, fontSize: '1.4rem', fontWeight: 800 }} />
            <InputBase
              sx={{ ml: 1, mr: 0, flex: 1, color: '#3f5982', fontSize: '14px' }}
              inputRef={input => input && input.focus()}
              tabIndex={0}
              value={searchValue}
              placeholder="Search"
              onChange={e => {
                setSearchValue(e.target.value)
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            {searchValue.length > 0 && (
              <CloseIcon
                className="closeIcon"
                onClick={e => {
                  setSearchValue('')
                }}
                sx={{ color: '#316ede', mr: 1, cursor: 'pointer', fontSize: '1.2rem' }}
              />
            )}
          </Paper>
        )}
      </Box>
    )
  }

  const getDisplayValue = () => {
    let displayedValue = props.placeholderButton || 'Select'

    if (selectedData.length > 0) {
      if (selectedData.length == props.options.length && props.allTypesLabel) {
        displayedValue = props.allTypesLabel
      } else {
        displayedValue = selectedData
          .filter((i: any) => i.value)
          .map((i: any) => i.label)
          .join(', ')
      }
    }

    return displayedValue
  }

  let btnStyle: object = {
    backgroundColor: '#0970E6',
    borderRadius: 6,
    lineHeight: 2,
    padding: '.3rem 1.5rem',
    fontSize: '.8rem',
    fontWeight: 600,
    minWidth: '250px',
    width: '250px',
    textTransform: 'initial'
  }
  if (isXs) btnStyle = { ...btnStyle, width: '100%' }

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" spacing={2}>
        {!isXs && props.label && (
          <Box sx={{ lineHeight: 2, padding: '.3rem 1.5rem', color: '#575757', fontSize: '12px' }}>
            {props.label}
          </Box>
        )}
        <Box sx={!isXs ? {} : { width: '100%' }}>
          <StyledButton
            id="main-button"
            aria-describedby={componentToOpen}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            disableRipple
            sx={btnStyle}
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            <Typography
              sx={{
                whiteSpace: 'nowrap',
                fontSize: '.9rem',
                width: '80%',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {getDisplayValue()}
            </Typography>
          </StyledButton>
        </Box>
      </Stack>
      {!isXs ? (
        <Popover
          id="menu"
          open={open && Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          {getSearchInput()}
          {getList()}
        </Popover>
      ) : (
        <StyledDrawer anchor={'bottom'} open={Boolean(open)} onClose={ev => setOpen(false)}>
          {getSearchInput()}
          {getList()}
          <Box sx={{ pt: 2, pb: 2, pl: 4, pr: 4, textAlign: 'center' }}>
            <Button
              variant="outlined"
              size="large"
              sx={{ width: '100%', fontWeight: 600, textTransform: 'none' }}
              onClick={ev => setOpen(false)}
            >
              Anuleaza
            </Button>
          </Box>
        </StyledDrawer>
      )}
    </Box>
  )
}

export default FilterDataSelect
