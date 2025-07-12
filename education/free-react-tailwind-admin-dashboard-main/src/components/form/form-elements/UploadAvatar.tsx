// components/AvatarDropzone.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { uploadFile } from '../../../utils/api-axios';

type Props = {
    handleChange: (imageUrl : string) => void;
    imageUrl: string | undefined
}


const UploadAvatar: React.FC<Props> = ({handleChange,imageUrl}) => {
  const [previewUrl, setPreviewUrl] = useState<string>(imageUrl || "");
  console.log(imageUrl)
  const [uploading, setUploading] = useState(false);

  const onDrop =  useCallback(async (acceptedFiles: File[]) => {
    const selected = acceptedFiles[0];
    const formData = new FormData();
    formData.append('image', selected); // name must match NestJS interceptor

    try {
        const res = await uploadFile(formData);
        setPreviewUrl(res.data.path)
        handleChange(res.data.path)
    } catch (error) {
        alert("Updload failed")
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.value;
    handleChange(file)
   
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/*': [],
    },
  });

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-bold">Upload Avatar</h2>

      <div
        {...getRootProps()}
        className={`w-32 h-32 flex items-center justify-center rounded-full border-2 border-dashed cursor-pointer ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-400'
        }`}
      >
        <input name='avatar' {...getInputProps()}  />
        {previewUrl ? (
            <>
                <img
                    src={previewUrl}
                    alt="Avatar Preview"
                    className="w-32 h-32 rounded-full object-cover"
                    />
                    <input style={{ display:"none"}} type="hidden" name='avatar' value={previewUrl} onChange={handleFileChange} />
            </>
          
        ) : (
          <span className="text-gray-500 text-center text-sm px-2">
            Drag & drop or click to select an image
          </span>
        )}
      </div>
    </div>
  );
};

export default UploadAvatar;
