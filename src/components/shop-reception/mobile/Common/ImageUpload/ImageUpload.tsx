import { useRef, useState } from "react";
import { makeCorePostRequest } from '../../../../../utils/api';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { CameraAlt as CameraIcon } from '@mui/icons-material';
import { Button, IconButton } from '@fullscreendigital/carrefour-dex-fe';
import { WebcamCapture } from 'components/core-ui/WebcamCapture';
import ImageIcon from '@mui/icons-material/Image';
import s from './ImageUpload.modules.scss';
import { resizeFile } from "../../../../../utils/helpers";

const ImageUpload = ({
  uploadUrl,
  onSuccess,
  onError,
  isButton = false,
  label = 'Adauga imagine',
  btnStyle = {}
}) => {
  const [imageSelected, setImageSelected] = useState(false);
  const [showPhotoCapture, setShowPhotoCapture] = useState(false);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);

  const inputFileRef = useRef<HTMLInputElement>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowPhotoCapture(false);
  };

  const saveFile = async (file: File): Promise<void> => {
    setShowPhotoCapture(false);

    try {
      const resizedFile = await resizeFile({ file }) as Blob;

      const formData = new FormData();
      formData.append('photoFile', resizedFile);

      const response = await makeCorePostRequest(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (onSuccess) {
        setFile(file);
        onSuccess(response);
        handleClose();
      }
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };

  return (
    <div>
      {file ? (
        <Box className={s.imageContainer}>
          <img
            src={URL.createObjectURL(file)}
            style={{ maxWidth: '300px', maxHeight: '300px', objectFit: 'cover' }}
          />
        </Box>
      ) : (
        <>
          {isButton ? (
            <Button
              type="button"
              variant="outlined"
              label={label}
              style={{ ...btnStyle, width: '100%' }}
              onClick={handleClickOpen}
            />
          ) : (
            <IconButton
              onClick={handleClickOpen}
              style={{ ...btnStyle, color: imageSelected ? 'green' : '#0970E6' }}
            >
              <CameraIcon />
            </IconButton>
          )}
        </>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" style={{ textAlign: 'center' }}>
        <DialogTitle>Adauga imagine</DialogTitle>
        <DialogContent style={{ paddingBottom: '0' }}>
          {showPhotoCapture ? (
            <Box className={s.webcamContainer}>
              <WebcamCapture
                buttonStyle={{ width: '100%' }}
                onImageCapture={async imageSrc => {
                  fetch(imageSrc)
                    .then(res => res.blob())
                    .then(async blob => {
                      const file = new File([blob], 'image.JPEG', { type: 'image/png' });
                      await saveFile(file);
                    });
                }}
                videoConstraints={{ width: 300, height: 300, facingMode: 'environment' }}
              />
            </Box>
          ) : (
            <>
              <IconButton
                variant="outlined"
                onClick={() => setShowPhotoCapture(true)}
                style={{ marginBottom: '16px' }}
                startIcon={<ImageIcon />}
              >
                Captura foto
              </IconButton>
              <IconButton
                variant="outlined"
                onClick={() => inputFileRef?.current?.click()}
                startIcon={<ImageIcon />}
                sx={{ marginBottom: '16px' }}
              >
                Incarca foto
              </IconButton>
              <input
                ref={inputFileRef}
                style={{ display: 'none' }}
                type="file"
                accept="image/*"
                onChange={e => {
                  if (e.target.files) {
                    saveFile(e.currentTarget.files[0]);
                  }
                }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} label=''>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImageUpload;
