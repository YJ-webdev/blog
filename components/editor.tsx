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

interface EditorProps {
  initialContent?: string;
  editable?: boolean;
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

async function saveToStorage(jsonBlocks: Block[]) {
  localStorage.setItem('editorContent', JSON.stringify(jsonBlocks));
}

async function loadFromStorage() {
  const storageString = localStorage.getItem('editorContent');
  return storageString
    ? (JSON.parse(storageString) as PartialBlock[])
    : undefined;
}

export default function Editor({ editable }: EditorProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [initialContent, setInitialContent] = useState<
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
    loadFromStorage().then((content) => {
      setInitialContent(content);
    });
  }, []);

  const editor = useMemo(() => {
    if (initialContent === 'loading') {
      return undefined;
    }
    return BlockNoteEditor.create({
      domAttributes: {
        block: {
          class: 'blocknote-block',
        },
      },
      initialContent,
      uploadFile,
    });
  }, [initialContent]);

  if (editor === undefined) {
    return 'Loading content...';
  }

  const onChange = () => {
    saveToStorage(editor.document);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="-mx-[54px] -translate-y-2 z-50">
        <BlockNoteView
          editor={editor}
          editable={editable}
          onChange={onChange}
          theme={theme}
          formattingToolbar={false}
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

                    {/* <CreateLinkButton /> */}
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
