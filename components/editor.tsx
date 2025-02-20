'use client';

// import TextareaAutosize from 'react-textarea-autosize';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { useEffect, useState } from 'react';

interface EditorProps {
  initialContent?: string;
  editable?: boolean;
}

export default function Editor({ initialContent, editable }: EditorProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const currentTheme = document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';
    setTheme(currentTheme);

    const observer = new MutationObserver(() => {
      setTheme(
        document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });

  const onChange = () => {};

  return (
    <div className="flex flex-col w-full">
      {/* <TextareaAutosize
        placeholder="Title"
        autoFocus
        className="w-fit resize-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none text-primary dark:placeholder-stone-400"
      /> */}
      <div className="-mx-[54px] -translate-y-2">
        <BlockNoteView
          editor={editor}
          editable={editable}
          onChange={onChange}
          theme={theme}
          data-theming-css-variables-demo
        />
      </div>
    </div>
  );
}
