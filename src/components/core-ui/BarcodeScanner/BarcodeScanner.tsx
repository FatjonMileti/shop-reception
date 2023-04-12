import * as React from 'react'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import Scanner from './Scanner'

const BarcodeScanner = () => {
  const [data, setData] = React.useState('')

  const onResult = result => setData(result.text)

  const onError = error => console.log(error)

  return data ? (
    <div>
      <div>{data}</div>
      <Button label=" Scan again" variant="contained" onClick={() => setData('')} />
    </div>
  ) : (
    <Scanner onResult={onResult} onError={onError} />
  )
}

export default BarcodeScanner
