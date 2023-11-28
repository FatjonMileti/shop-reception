import axios from 'axios'
import { useEffect, useState } from 'react'

const getCityFromCoordinates = async (latitude, longitude) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    const response = await axios.get(url)

    if (
      response.data &&
      response.data.address &&
      (response.data.address.city || response.data.address.town)
    ) {
      const city = response.data.address.city || response.data.address.town
      return city
    } else {
      return null
    }
  } catch (error) {
    throw error
  }
}

const useGetLocation = () => {
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude

          try {
            const city = await getCityFromCoordinates(latitude, longitude)
            setLocation(city)
          } catch (error) {
            setError(error)
          } finally {
            setLoading(false)
          }
        },
        function (error) {
          setError(error)
          setLoading(false)
        }
      )
    } else {
      setError(new Error('Geolocation is not supported by this browser'))
      setLoading(false)
    }
  }, [])

  return { location, loading, error }
}

export default useGetLocation
