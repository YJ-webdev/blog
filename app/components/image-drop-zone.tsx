'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useDropzone, FileRejection } from 'react-dropzone';
import { ImageIcon, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type ImageDropZoneProps = {
  imageKey: string;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  image?: string | null;
};

export default function ImageDropZone({
  imageKey,
  setFile,
  image,
}: ImageDropZoneProps) {
  const [preview, setPreview] = useState(image || null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedImage = localStorage.getItem(imageKey);
    if (storedImage) {
      setPreview(storedImage);
    }
  }, [imageKey]);

  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 3MB
  // base64 only & auto replace image
  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Image = reader.result as string;
        setPreview(base64Image);
        setFile(file);
        localStorage.setItem(imageKey, base64Image);
      };
    },
    [imageKey, setPreview, setFile],
  );

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    fileRejections.forEach((rejection) => {
      rejection.errors.forEach((error) => {
        if (error.code === 'file-too-large') {
          toast.warning('Image too large. Maximum file size is 3MB.');
        } else {
          toast.error('Upload error: ' + error.message);
        }
      });
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    accept: { 'image/*': [] },
    onDropRejected,
    onDropAccepted,
  });

  // Remove the image
  const removeImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setPreview(null);
    localStorage.removeItem(imageKey); // Remove from localStorage
  };

  return (
    <div
      {...getRootProps()}
      className={cn('relative w-full aspect-video h-auto cursor-pointer')}
    >
      <input {...getInputProps()} className="hidden" />{' '}
      {/* Hidden file input */}
      <div
        className={cn(
          'absolute top-0 left-0 w-full h-full bg-transparent flex items-center justify-center',
          preview ? '' : 'bg-muted-foreground/10 dark:bg-zinc-800',
        )}
      >
        {preview ? (
          <Image
            src={preview}
            alt="Image Preview"
            height={200}
            width={700}
            className="max-w-[750px] w-full h-full object-cover"
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
          onClick={removeImage}
          className="absolute top-4 right-5 rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-stone-800/30 bg-stone-300/60 cursor-pointer"
        >
          <Trash className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
