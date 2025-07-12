// components/AvatarDropzone.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';



const UploadAvatar: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selected = acceptedFiles[0];
    if (selected) {
      setFile(selected);
      const preview = URL.createObjectURL(selected);
      setPreviewUrl(preview);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/*': [],
    },
  });

  const handleUpload = async () => {
    
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-bold">Upload Avatar</h2>

      <div
        {...getRootProps()}
        className={`w-32 h-32 flex items-center justify-center rounded-full border-2 border-dashed cursor-pointer ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-400'
        }`}
      >
        <input  {...getInputProps()} />
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Avatar Preview"
            className="w-32 h-32 rounded-full object-cover"
          />
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
