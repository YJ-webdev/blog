'use client';

import {
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  TextAlignButton,
} from '@blocknote/react';
import { Block, BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

interface EditorProps {
  editable?: boolean;
  postId: string;
  initialContent?: string;
  onContentChange: (content: string) => void;
}

async function uploadFile(file: File) {
  const body = new FormData();
  body.append('file', file);

  const ret = await fetch('https://tmpfiles.org/api/v1/upload', {
    method: 'POST',
    body: body,
  });
  return (await ret.json()).data.url.replace(
    'tmpfiles.org/',
    'tmpfiles.org/dl/',
  );
}

async function saveToStorage(postId: string, jsonBlocks: Block[]) {
  const key = `editorContent_${postId}`; // Unique key for each postId
  localStorage.setItem(key, JSON.stringify(jsonBlocks));
}

async function loadFromStorage(postId: string) {
  const key = `editorContent_${postId}`; // Unique key for each postId
  const storageString = localStorage.getItem(key);
  return storageString
    ? (JSON.parse(storageString) as PartialBlock[])
    : undefined;
}

export default function Editor({
  editable,
  postId,
  initialContent,
  onContentChange,
}: EditorProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [content, setContent] = useState<
    PartialBlock[] | undefined | 'loading'
  >('loading');

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

  useEffect(() => {
    if (initialContent) {
      setContent(JSON.parse(initialContent));
    } else {
      loadFromStorage(postId).then((content) => {
        setContent(content);
      });
    }
  }, [postId, initialContent]);

  const editor = useMemo(() => {
    if (content === 'loading') {
      return undefined;
    }

    return BlockNoteEditor.create({
      domAttributes: {
        block: {
          class: 'blocknote-block',
        },
      },
      initialContent: content,
      uploadFile,
    });
  }, [content]);

  let saveTimeout: NodeJS.Timeout | null = null;

  const onChange = () => {
    if (editor) {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }

      saveTimeout = setTimeout(() => {
        const jsonBlocks = editor.document;
        saveToStorage(postId, jsonBlocks);
        onContentChange(JSON.stringify(jsonBlocks));
      }, 1000);
    }
  };

  if (editor === undefined) {
    return 'Loading content...';
  }

  return (
    <div className="flex flex-col w-full overflow-hidden md:overflow-visible">
      <div
        className={cn(
          'md:-mx-[54px] md:-translate-y-2 z-50',
          !editable && '-mx-[54px]',
        )}
      >
        <BlockNoteView
          editor={editor}
          editable={editable}
          onChange={onChange}
          theme={theme}
          formattingToolbar={false}
          spellCheck={false}
        >
          <FormattingToolbarController
            formattingToolbar={() => {
              const block = editor.getTextCursorPosition().block;

              if (block.type === 'image') {
                return (
                  <FormattingToolbar>
                    <FileCaptionButton key="fileCaptionButton" />
                    <FileReplaceButton key="replaceFileButton" />
                    <TextAlignButton
                      textAlignment="left"
                      key="textAlignLeftButton"
                    />
                    <TextAlignButton
                      textAlignment="center"
                      key="textAlignCenterButton"
                    />
                    <TextAlignButton
                      textAlignment="right"
                      key="textAlignRightButton"
                    />
                  </FormattingToolbar>
                );
              }
              return <FormattingToolbar />;
            }}
          />
        </BlockNoteView>
      </div>
    </div>
  );
}
