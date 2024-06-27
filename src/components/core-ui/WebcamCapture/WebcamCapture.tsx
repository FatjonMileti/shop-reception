import { IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { useCallback, useRef } from 'react'
import Webcam from 'react-webcam'
import ImageIcon from '@mui/icons-material/Image'

const defaultVideoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'environment'
}

interface VideoConstraints {
  width: number
  height: number
  facingMode: string
}
export interface WebcamCaptureProps {
  onImageCapture: Function
  videoConstraints?: VideoConstraints
  buttonLabel?: string
  buttonStyle?: any
}

const WebcamCapture = (props: WebcamCaptureProps) => {
  const { onImageCapture, videoConstraints, buttonLabel, buttonStyle } = props

  const webcamRef = useRef(null)

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    onImageCapture(imageSrc)
  }, [webcamRef])

  return (
    <>
      <Webcam
        audio={false}
        height={videoConstraints?.height || defaultVideoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints?.width || defaultVideoConstraints.width}
        videoConstraints={videoConstraints || defaultVideoConstraints}
      />
      <IconButton
        label={buttonLabel || 'Captura foto'}
        onClick={capture}
        startIcon={<ImageIcon />}
        variant="outlined"
        style={buttonStyle}
      />
    </>
  )
}

export default WebcamCapture
