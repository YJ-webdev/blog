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
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ContentLoading } from '@/app/components/content-loading';
import { debounce } from 'lodash';

interface EditorProps {
  editable: boolean;
  postId: string;
  initialContent?: string;
  onContentChange: (content: string) => void;
}

type TextCursorPosition = {
  block: Block;
  prevBlock: Block | undefined;
  nextBlock: Block | undefined;
};

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

async function saveToStorage(
  postId: string,
  jsonBlocks: Block[],
  onContentChange: (content: string) => void,
) {
  const key = `editorContent_${postId}`; // Unique key for each postId
  localStorage.setItem(key, JSON.stringify(jsonBlocks));
  onContentChange(JSON.stringify(jsonBlocks));
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
  const editorRef = useRef<BlockNoteEditor | null>(null);
  const cursorPositionRef = useRef<TextCursorPosition | null>(null); // To store cursor position

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
    const loadContent = async () => {
      if (editable) {
        const storedContent = await loadFromStorage(postId);

        if (storedContent && storedContent.length > 0) {
          setContent(storedContent);
        } else if (initialContent) {
          setContent(JSON.parse(initialContent));
        } else {
          setContent([{ type: 'paragraph', content: '' }]); // Ensure at least one block
        }
      } else {
        if (initialContent) {
          setContent(JSON.parse(initialContent));
        } else {
          setContent([{ type: 'paragraph', content: '' }]);
        }
      }
    };

    loadContent();
  }, [postId, initialContent, editable]);

  const editor = useMemo(() => {
    if (content === 'loading') {
      return undefined;
    }

    if (!editorRef.current) {
      editorRef.current = BlockNoteEditor.create({
        domAttributes: {
          block: {
            class: 'blocknote-block',
          },
        },
        initialContent: content,
        uploadFile,
      });
    }

    return editorRef.current;
  }, [content]);

  const debouncedSave = useCallback(
    debounce((jsonBlocks: Block[]) => {
      saveToStorage(postId, jsonBlocks, onContentChange);
    }, 1000),
    [postId, onContentChange],
  );

  const onChange = () => {
    if (editor) {
      // Save the current cursor position
      cursorPositionRef.current = editor.getTextCursorPosition();

      const jsonBlocks = editor.document;
      debouncedSave(jsonBlocks);
    }
  };

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  useEffect(() => {
    if (cursorPositionRef.current && editor) {
      // After saving content, restore the cursor position
      editor.setTextCursorPosition(cursorPositionRef.current.block, 'end');
    }
  }, [content, editor]);

  if (editor === undefined) {
    return <ContentLoading />;
  }

  return (
    <div className="flex flex-col w-full overflow-hidden md:overflow-visible mb-5">
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
