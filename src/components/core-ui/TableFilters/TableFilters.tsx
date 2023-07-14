import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Paper } from '@mui/material'
import { TableActions } from 'reducers/tableSlice'
import { renderComponent } from 'utils/dynamicRenderingService'
import { RootState } from 'configureStore'
import { formatPayloadDate } from 'utils/helpers'
import s from './TableFilters.modules.scss'

function TableFilters(props) {
  const { filterArr } = props
  const dispatch = useDispatch()
  const filterState = useSelector((state: RootState) => state.table.filters)

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
          {filterArr.map(filter => (
            <Grid key={filter.name} xs={12} md={3} item>
              {renderComponent({
                ...filter,
                value: filterState[filter.name],
                label: filter.label,
                onChange: (arg, variable) => {
                  const { type, name } = filter
                  switch (type) {
                    case 'date':
                      setFilterValues(name, arg, type)
                      break
                    case 'autocomplete':
                      setFilterValues(name, arg, type)
                      break
                    default:
                      setFilterValues(arg.target.name, arg.target.value, type)
                      break
                  }
                },
                setFilterValues
              })}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  )
}

export default TableFilters
