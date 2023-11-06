import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Paper } from '@mui/material'
import { TableActions } from 'reducers/tableSlice'
import { renderComponent } from 'utils/dynamicRenderingService'
import { RootState } from 'configureStore'
import { formatPayloadDate, getDefaultItemValue } from 'utils/helpers'
import s from './TableFilters.modules.scss'

function TableFilters(props) {
  const { filterArr } = props
  const dispatch = useDispatch()
  const tableState = useSelector((state: RootState) => state.table)

  const filterState = tableState.filters

  useEffect(() => {
    filterArr
      .filter(filter => filter.defaultValue)
      .map(filter => {
        const { defaultValue, name, type } = filter
        const filterDefaultValue = getDefaultItemValue(defaultValue)
        dispatch(
          TableActions.setFilters({
            ...filterState,
            [name]: type === 'date' ? formatPayloadDate(defaultValue) : filterDefaultValue
          })
        )
      })
  }, [])

  useEffect(() => {
    return () => {
      dispatch(TableActions.clearFiltersData())
    }
  }, [])

  const setFilterValues = (name, value, type) => {
    dispatch(
      TableActions.setFilters({
        ...filterState,
        [name]: type === 'date' ? formatPayloadDate(value) : value
      })
    )
  }

  return (
    <Paper className={s.searchContainer}>
      <Box>
        <Grid container spacing={4}>
          {filterArr.map(filter => {
            const { name, label, defaultValue, type } = filter
            const filterValue = filterState[name]

            return (
              <Grid key={name} xs={12} md={3} item>
                {renderComponent({
                  ...filter,
                  value: filterValue,
                  ...(type === 'checkbox'
                    ? {
                        checked: filterValue ?? getDefaultItemValue(defaultValue)
                      }
                    : {}),
                  label: label,
                  onChange: arg => {
                    const { type, name } = filter
                    switch (type) {
                      case 'date':
                        setFilterValues(name, arg, type)
                        break
                      case 'autocomplete':
                        setFilterValues(name, arg, type)
                        break
                      case 'checkbox':
                        setFilterValues(name, arg.target.checked, type)
                        break
                      default:
                        setFilterValues(arg.target.name, arg.target.value, type)
                        break
                    }
                  },
                  setFilterValues
                })}
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Paper>
  )
}

export default TableFilters
