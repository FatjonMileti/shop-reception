import { useEffect, useState } from 'react'
import { PublicHolidaysPerYear } from '../../interfaces'
import dayjs, { Dayjs } from 'dayjs'
import { makeCoreGetRequest } from '../../../../utils/api'
import { debounce } from '@mui/material'

export const usePublicHolidaysForDatePicker = () => {
  const [publicHolidaysPerYear, setPublicHolidaysPerYear] = useState<PublicHolidaysPerYear>({})
  const [publicHolidaysYearsLoading, setPublicHolidayYearsLoading] = useState<number[]>([])
  const [arePublicHolidaysLoading, setArePublicHolidaysLoading] = useState<boolean>(false)

  function arePublicHolidaysLoadedForYear(year: number) {
    return publicHolidaysPerYear[year] !== undefined
  }

  function arePublicHolidaysLoadingForYear(year: number) {
    return publicHolidaysYearsLoading.includes(year)
  }

  function addYearToLoadingQueue(year: number) {
    if (!arePublicHolidaysLoadingForYear(year)) {
      setPublicHolidayYearsLoading(prev => [...prev, year])
    }
  }

  function removeYearFromLoadingQueue(year: number) {
    if (arePublicHolidaysLoadingForYear(year)) {
      setPublicHolidayYearsLoading(prev => [...prev.filter(yearInQueue => yearInQueue !== year)])
    }
  }

  useEffect(() => {
    setArePublicHolidaysLoading(publicHolidaysYearsLoading.length > 0)

    // process year in queue, remove once response arrives
    publicHolidaysYearsLoading.forEach(year => {
      loadPublicHolidays(year)
    })
  }, [publicHolidaysYearsLoading])

  async function loadPublicHolidays(year: number) {
    try {
      const response = await makeCoreGetRequest(`/governance/publicHolidays/${year}`)
      setPublicHolidaysPerYear(currentPublicHolidays => {
        currentPublicHolidays = {
          ...currentPublicHolidays
        }
        currentPublicHolidays[year] = response

        return currentPublicHolidays
      })
    } catch (error) {
      setPublicHolidaysPerYear(currentPublicHolidays => {
        currentPublicHolidays = {
          ...currentPublicHolidays
        }
        currentPublicHolidays[year] = []

        return currentPublicHolidays
      })
    } finally {
      removeYearFromLoadingQueue(year)
    }
  }

  const debouncedAddToLoadingQueue = debounce(year => {
    addYearToLoadingQueue(year)
  }, 100)

  function datePickerShouldDisablePublicHolidaysDates(datePickerDate: Dayjs) {
    const year = datePickerDate.year()

    // date picker will sometimes want to check the prev/next year as well, if the current month is january or december
    // this function is called for each date of the current / prev month
    // the loading of the public holidays needs to be triggered only once per year
    if (!arePublicHolidaysLoadedForYear(year)) {
      debouncedAddToLoadingQueue(year)
    }

    return publicHolidaysPerYear[year]?.some(publicHoliday =>
      dayjs(publicHoliday.date).isSame(datePickerDate)
    )
  }

  return {
    arePublicHolidaysLoading,
    datePickerShouldDisablePublicHolidaysDates
  }
}
