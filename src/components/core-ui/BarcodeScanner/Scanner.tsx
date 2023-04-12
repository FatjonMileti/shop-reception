import * as React from 'react'
import { useZxing } from 'hooks'

const Scanner = ({onResult = result => {}, onError = error => {}}) => {
  const { ref } = useZxing({ onResult, onError })

  return <video ref={ref} width={500} height={500} />
}

export default Scanner
