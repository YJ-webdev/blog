'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImageIcon, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ImageDropZone = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Cleanup old object URLs when a new file is selected
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }, // Accepts all image types
    multiple: false,
  });

  // Cleanup preview URL on component unmount
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div
      {...getRootProps()}
      className="relative w-full md:h-96 h-72 cursor-pointer"
    >
      <input {...getInputProps()} />

      <div
        className={cn(
          'absolute top-0 left-0 w-full h-full bg-transparent flex items-center justify-center',
          preview
            ? ''
            : 'border-2 rounded-lg border-dashed border-primary/50 dark:border-white/25 ',
        )}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageIcon
            className="w-10 h-10 text-muted-foreground"
            strokeWidth={1.5}
          />
        )}
      </div>

      {preview && (
        <div
          onClick={(event) => {
            event.stopPropagation(); // Prevent triggering file selection
            setPreview(null);
          }}
          className="absolute top-4 right-5 rounded-full w-10 h-10 flex items-center justify-center text-white  hover:bg-stone-800/30 bg-stone-300/60 cursor-pointer"
        >
          <Trash className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};
