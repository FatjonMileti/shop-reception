import React, {useState} from 'react';
import {makeCorePostRequest} from "../../../../utils/api";
import {IconButton} from "@mui/material";
import { CameraAlt as CameraIcon } from '@mui/icons-material';

const ImageUpload = ({ uploadUrl, onSuccess, onError }) => {
    const [imageSelected, setImageSelected] = useState(false);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await makeCorePostRequest(uploadUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (onSuccess) {
                    onSuccess(response);
                }
            } catch (error) {
                if (onError) {
                    onError(error);
                }
            } finally {
                setImageSelected(true);
            }
        }
    };

    return (
        <div>
            <label htmlFor="image-upload" style={{cursor: 'pointer'}}>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{display: 'none'}}
                />
                <IconButton
                    onClick={() => {
                        document.getElementById('image-upload').click();
                    }}
                    style={{ color: imageSelected ? 'green' : '#0970E6' }}
                >
                    <CameraIcon/>
                </IconButton>
            </label>
        </div>
    );
};

export default ImageUpload;
