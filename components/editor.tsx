'use client';

import {
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  TextAlignButton,
  useCreateBlockNote,
} from '@blocknote/react';
import {
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  PartialBlock,
} from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { useEffect, useState } from 'react';
import { CreateLinkButton } from './create-link-button';
import { LinkedImageBlock } from './linked-image-block';

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

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    linkedImage: LinkedImageBlock,
  },
});

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
    schema,
    domAttributes: {
      block: {
        class: 'blocknote-block',
      },
    },
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile,
  });

  const onChange = () => {};

  return (
    <div className="flex flex-col w-full">
      <div className="-mx-[54px] -translate-y-2 z-50">
        <BlockNoteView
          editor={editor}
          editable={editable}
          onChange={onChange}
          theme={theme}
          data-theming-css-variables-demo
          formattingToolbar={false}
        >
          <FormattingToolbarController
            formattingToolbar={() => {
              const block = editor.getTextCursorPosition().block;

              if (block.type === 'image' || block.type === 'linkedImage') {
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

                    <CreateLinkButton />
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
