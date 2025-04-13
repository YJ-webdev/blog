import * as React from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { ImageIcon, Trash } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { upload } from '@vercel/blob/client';
// import { PutBlobResult } from '@vercel/blob';
import { toast } from 'sonner';

type ImageDropZoneProps = {
  imageKey: string;
  setBlob: React.Dispatch<React.SetStateAction<null | string>>;
  blob: null | string;
};

export const ImageDropZone = ({
  imageKey,
  setBlob,
  blob,
}: ImageDropZoneProps) => {
  const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

  // React.useEffect(() => {
  //   const stored = localStorage.getItem(imageKey);
  //   if (stored) setBlob(JSON.parse(stored));
  // }, [imageKey, setBlob]);

  const onDropAccepted = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    try {
      const newBlob = await upload(`${imageKey}/${file.name}`, file, {
        access: 'public',
        handleUploadUrl: '/api/post/upload',
      });
      setBlob(newBlob.url);
      localStorage.setItem(imageKey, JSON.stringify(newBlob));
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('이미지 업로드에 실패했습니다.');
    }
  };

  const onDropRejected = (fileRejections: FileRejection[]) => {
    const error = fileRejections[0].errors[0];
    if (error.code === 'file-too-large') {
      toast.error('파일 크기가 3MB를 초과했습니다.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxSize: MAX_FILE_SIZE,
    onDropAccepted,
    onDropRejected,
    multiple: false,
    accept: { 'image/*': [] },
  });

  const removeImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setBlob(null);
    localStorage.removeItem(imageKey);
  };

  return (
    <div
      {...getRootProps()}
      className={cn('relative w-full md:h-96 h-72 mt-2 cursor-pointer')}
    >
      <input {...getInputProps()} className="hidden" />{' '}
      {/* Hidden file input */}
      <div
        className={cn(
          'absolute top-0 left-0 w-full h-full bg-transparent flex items-center justify-center',
          blob ? '' : 'bg-muted-foreground/10 dark:bg-zinc-800',
        )}
      >
        {blob ? (
          <Image
            src={blob as string}
            alt="Image Preview"
            height={200}
            width={700}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageIcon
            className="w-10 h-10 text-muted-foreground"
            strokeWidth={1.5}
          />
        )}
      </div>
      {blob && (
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
