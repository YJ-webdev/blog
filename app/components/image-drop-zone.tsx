import React, { useEffect, useRef, useCallback } from 'react';
import { ImageIcon, Trash } from 'lucide-react';
import Image from 'next/image'; // Import Next.js Image component
import { cn } from '@/lib/utils';

interface ImageDropZoneProps {
  imageKey: string;
  setImageUrl: (url: string) => void;
  imageUrl: string;
  isEditable: boolean;
}

export const ImageDropZone = ({
  setImageUrl,
  isEditable,
  imageKey,
  imageUrl,
}: ImageDropZoneProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to file input

  useEffect(() => {
    const storedImage = localStorage.getItem(imageKey);
    if (storedImage) setImageUrl(storedImage);
  }, [imageKey, setImageUrl]);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!isEditable) return;

      const file = event.dataTransfer.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64Image = reader.result as string;
          setImageUrl(base64Image);
          localStorage.setItem(imageKey, base64Image);
        };
      }
    },
    [imageKey, isEditable, setImageUrl],
  );

  const removeImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!isEditable) return;
    setImageUrl('');
    localStorage.removeItem(imageKey);
  };

  const handleClick = () => {
    if (!isEditable) return;
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger click on file input when div is clicked
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()} // Allow dropping
      onDrop={handleDrop} // Handle file drop
      onClick={handleClick} // Open file picker on div click
      className={cn(
        'relative w-full md:h-96 h-72 my-5',
        isEditable && 'cursor-pointer',
      )}
    >
      <input
        ref={fileInputRef} // Reference to the file input
        type="file"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const base64Image = reader.result as string;
              setImageUrl(base64Image);
              localStorage.setItem(imageKey, base64Image);
            };
          }
        }}
        className="hidden" // Hide the file input
      />

      <div
        className={cn(
          'absolute top-0 left-0 w-full h-full bg-transparent flex items-center justify-center',
          imageUrl
            ? ''
            : 'border-2 rounded-lg border-dashed border-primary/50 dark:border-white/25',
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

      {imageUrl && isEditable && (
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
