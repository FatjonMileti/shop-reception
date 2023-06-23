import s from './FileUpload.modules.scss'

function FileViewDetails({ selectedFile, selectedFileUrl, displayImage }) {
  return (
    <>
      <div className={s.fileContainer}>
        <div className={s.image}>
          {displayImage && (
            <img width="40px" height="40px" src={selectedFileUrl} alt="Selected file" />
          )}
          <p className={s.text}>{selectedFile.name}</p>
        </div>
      </div>
    </>
  )
}

export default FileViewDetails
