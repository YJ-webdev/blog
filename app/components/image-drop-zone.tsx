import * as React from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { ImageIcon, Trash } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageDropZoneProps {
  imageKey: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
}

export const ImageDropZone = ({
  setImageUrl,
  imageUrl,
  imageKey,
}: ImageDropZoneProps) => {
  const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

  React.useEffect(() => {
    const storedImage = localStorage.getItem(imageKey);
    if (storedImage) setImageUrl(storedImage);
  }, [imageKey, setImageUrl]);

  const onDropAccepted = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result as string;
      setImageUrl(base64Image);
      localStorage.setItem(imageKey, base64Image);
    };
  };

  const onDropRejected = (fileRejections: FileRejection[]) => {
    const error = fileRejections[0].errors[0];
    if (error.code === 'file-too-large') {
      alert('File size exceeds the 3MB limit.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxSize: MAX_FILE_SIZE,
    onDropAccepted,
    onDropRejected,
    multiple: false, // Allow only one file at a time
    accept: { 'image/*': [] }, // Only accept images
  });

  const removeImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setImageUrl('');
    localStorage.removeItem(imageKey);
  };

  return (
    <div
      {...getRootProps()}
      className={cn('relative w-full md:h-96 h-72 mb-5 mt-2 cursor-pointer')}
    >
      <input {...getInputProps()} className="hidden" />{' '}
      {/* Hidden file input */}
      <div
        className={cn(
          'absolute top-0 left-0 w-full h-full bg-transparent flex items-center justify-center',
          imageUrl ? '' : 'bg-muted-foreground/10 dark:bg-zinc-800',
        )}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Image Preview"
            height={200}
            width={700}
            className="w-full h-full object-cover"
            objectFit="cover" // Maintain aspect ratio and cover the area
          />
        ) : (
          <ImageIcon
            className="w-10 h-10 text-muted-foreground"
            strokeWidth={1.5}
          />
        )}
      </div>
      {imageUrl && (
        <div
          onClick={removeImage}
          className="absolute top-4 right-5 rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-stone-800/30 bg-stone-300/60 cursor-pointer"
        >
          <Trash className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};
