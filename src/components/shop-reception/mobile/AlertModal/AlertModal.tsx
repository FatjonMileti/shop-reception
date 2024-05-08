import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

type ButtonColor = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";

const AlertModal = ({ open, handleClose, title, description, buttons }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography id="modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
          {title}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <div style={{ display: 'flex', marginTop: 20, justifyContent: 'space-evenly' }}>
          {buttons && buttons.map((button, index) => (
            <Button key={index} variant="contained" color={button.color as ButtonColor || "primary"} onClick={button.onClick} style={{ marginRight: 10 }}>
              {button.label}
            </Button>
          ))}
        </div>
      </Box>
    </Modal>
  );
}

export default AlertModal;
