import { useMemo, useState } from 'react'
import { Grid, Paper } from '@mui/material'
import { renderComponent } from 'utils/dynamicRenderingService'
import s from './FiltersWithResultsTable.modules.scss'
import { formatPayloadDate, getDefaultItemValue } from 'utils/helpers'
import { hasNullFilters } from './helpers'

function FiltersWithResultsTable(props) {
  const { filters, table } = props

  const filterByFilters = useMemo(() => filters.filter(filter => !filter.isCustomField), [filters])
  const customFilterByFilters = useMemo(
    () => filters.filter(filter => filter.isCustomField),
    [filters]
  )

  const [filterValues, setFilterValues] = useState(
    window.history.state.filteredTableState?.filterValues ||
      Object.assign(
        {},
        ...filterByFilters.map(filter => ({
          [filter.name]: filter.defaultValue
            ? { value: getDefaultItemValue(filter.defaultValue) }
            : null
        }))
      )
  )

  const [customFilterValues, setCustomFilterValues] = useState(
    window.history.state.filteredTableState?.customFilterValues ||
      Object.assign(
        {},
        ...customFilterByFilters.map(filter => ({
          [filter.name]: filter.defaultValue
            ? { value: getDefaultItemValue(filter.defaultValue) }
            : null
        }))
      )
  )

  const allFiltersHaveValues = useMemo(
    () =>
      !hasNullFilters(filterByFilters, filterValues) &&
      !hasNullFilters(customFilterByFilters, customFilterValues),
    [filterValues, customFilterValues]
  )

  const filterValuesToUrlParams = useMemo(() => {
    return allFiltersHaveValues
      ? filterByFilters.map(filter => ({
          name: filter.name,
          value:
            Array.isArray(filterValues[filter.name]) && filterValues[filter.name].length
              ? filterValues[filter.name].map(item => item.value)
              : filterValues[filter.name]?.value
        }))
      : ''
  }, [allFiltersHaveValues, filterValues])

  const customFilterValuesToUrlParams = useMemo(() => {
    return allFiltersHaveValues
      ? customFilterByFilters.map(filter => ({
          name: filter.name,
          value: customFilterValues[filter.name]?.value
        }))
      : ''
  }, [allFiltersHaveValues, customFilterValues])

  const setValueForFilter = (name, value, type, isCustomField) => {
    if (isCustomField) {
      setCustomFilterValues({
        ...customFilterValues,
        [name]: type === 'date' ? { value: formatPayloadDate(value.value) } : value
      })
      window.history.replaceState(
        {
          ...window.history.state,
          filteredTableState: {
            filterValues: filterValues,
            customFilterValues: {
              ...customFilterValues,
              [name]: type === 'date' ? { value: formatPayloadDate(value.value) } : value
            }
          }
        },
        document.title
      )
    } else {
      setFilterValues({
        ...filterValues,
        [name]: type === 'date' ? { value: formatPayloadDate(value.value) } : value
      })
      window.history.replaceState(
        {
          ...window.history.state,
          filteredTableState: {
            customFilterValues: customFilterValues,
            filterValues: {
              ...filterValues,
              [name]: type === 'date' ? { value: formatPayloadDate(value.value) } : value
            }
          }
        },
        document.title
      )
    }
  }

  return (
    <div className={s.mainContainer}>
      <Paper className={s.filtersContainer}>
        <Grid container spacing={4}>
          {filters.map(filter => {
            const { name, label, isCustomField, defaultValue, type } = filter
            const filterValue = isCustomField
              ? customFilterValues[filter.name]
              : filterValues[filter.name]

            return (
              <Grid key={name} xs={12} md={3} item>
                {renderComponent({
                  ...filter,
                  value: type === 'date' ? filterValue.value : filterValue,
                  ...(type === 'checkbox'
                    ? {
                        checked: filterValue.value ?? getDefaultItemValue(defaultValue)
                      }
                    : {}),
                  label: label,
                  onChange: arg => {
                    const { type, name } = filter
                    switch (type) {
                      case 'date':
                        setValueForFilter(name, { value: arg }, type, isCustomField)
                        break
                      case 'autocomplete':
                      case 'static':
                        setValueForFilter(name, arg, type, isCustomField)
                        break
                      case 'checkbox':
                        setValueForFilter(name, { value: arg.target.checked }, type, isCustomField)
                        break
                      default:
                        setValueForFilter(arg.target.name, arg.target.value, type, isCustomField)
                        break
                    }
                  },
                  setValueForFilter,
                  siblingValues: filterValues
                })}
              </Grid>
            )
          })}
        </Grid>
      </Paper>

      {allFiltersHaveValues &&
        renderComponent({
          ...table,
          extraUrlParams: filterValuesToUrlParams,
          extraCustomUrlParams: customFilterValuesToUrlParams
        })}
    </div>
  )
}

export default FiltersWithResultsTable
