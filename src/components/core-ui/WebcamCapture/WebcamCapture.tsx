import { useCallback, useRef } from 'react'
import Webcam from 'react-webcam'

const defaultVideoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user'
}

const WebcamCapture = props => {
  const { onImageCapture, videoConstraints } = props

  const webcamRef = useRef(null)

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    onImageCapture(imageSrc)
  }, [webcamRef])

  return (
    <>
      <Webcam
        audio={false}
        height={videoConstraints.height || defaultVideoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width || defaultVideoConstraints.width}
        videoConstraints={videoConstraints || defaultVideoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </>
  )
}

export default WebcamCapture
