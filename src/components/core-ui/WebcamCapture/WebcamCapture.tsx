import { IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { useCallback, useRef } from 'react'
import Webcam from 'react-webcam'
import ImageIcon from '@mui/icons-material/Image'

const defaultVideoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'environment'
}

const WebcamCapture = props => {
  const { onImageCapture, videoConstraints, buttonLabel } = props

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
      />
    </>
  )
}

export default WebcamCapture
