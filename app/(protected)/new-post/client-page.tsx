'use client';

import { ClientOnly } from '@/app/components/client-only';
import { ImageDropZone } from '@/app/components/image-drop-zone';
import { Editor } from '@/components/dynamic-editor';
import { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export const ClientPage = () => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    const storedText = localStorage.getItem('typedTitle');
    if (storedText) {
      setTitle(storedText);
    }
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    localStorage.setItem('typedTitle', e.target.value);
  };

  return (
    <>
      <ClientOnly>
        <div className="lg:-ml-24 lg:w-[125%] sm:w-[100%] w-[95%] -mt-14">
          <TextareaAutosize
            placeholder="Title"
            autoFocus
            value={title}
            onChange={handleTitleChange}
            className="w-full resize-none overflow-hidden bg-transparent tracking-tight lg:text-6xl sm:text-5xl text-4xl font-bold focus:outline-none text-primary dark:placeholder-stone-400"
          />
        </div>
        <ImageDropZone />
      </ClientOnly>
      <Editor />
    </>
  );
};
