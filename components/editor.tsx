'use client';

import { Block, BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { useState, useEffect, useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ContentLoading } from '@/app/components/content-loading';
import { debounce } from 'lodash';

interface EditorProps {
  editable: boolean;
  contentKey: string;
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
  contentKey,
  initialContent,
  onContentChange,
}: EditorProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [content, setContent] = useState<
    PartialBlock[] | undefined | 'loading'
  >('loading');
  const editorRef = useRef<BlockNoteEditor | null>(null);

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
        const storedContent = await loadFromStorage(contentKey);

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
  }, [contentKey, initialContent, editable]);

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
        tables: {
          splitCells: true,
          cellBackgroundColor: true,
          cellTextColor: true,
          headers: true,
        },

        initialContent: [
          {
            id: '7e498b3d-d42e-4ade-9be0-054b292715ea',
            type: 'heading',
            props: {
              textColor: 'default',
              backgroundColor: 'default',
              textAlignment: 'left',
              level: 2,
            },
            content: [
              {
                type: 'text',
                text: 'Advanced Tables',
                styles: {},
              },
            ],
            children: [],
          },
          {
            id: 'cbf287c6-770b-413a-bff5-ad490a0b562a',
            type: 'table',
            props: {
              textColor: 'default',
            },
            content: {
              type: 'tableContent',
              columnWidths: [199, 148, 201],
              headerRows: 1,
              rows: [
                {
                  cells: [
                    {
                      type: 'tableCell',
                      content: [
                        {
                          type: 'text',
                          text: 'This row has headers',
                          styles: {},
                        },
                      ],
                      props: {
                        colspan: 1,
                        rowspan: 1,
                        backgroundColor: 'default',
                        textColor: 'default',
                        textAlignment: 'center',
                      },
                    },
                    {
                      type: 'tableCell',
                      content: [
                        {
                          type: 'text',
                          text: 'This is ',
                          styles: {},
                        },
                        {
                          type: 'text',
                          text: 'RED',
                          styles: {
                            bold: true,
                          },
                        },
                      ],
                      props: {
                        colspan: 1,
                        rowspan: 1,
                        backgroundColor: 'red',
                        textColor: 'default',
                        textAlignment: 'center',
                      },
                    },
                    {
                      type: 'tableCell',
                      content: [
                        {
                          type: 'text',
                          text: 'Text is Blue',
                          styles: {},
                        },
                      ],
                      props: {
                        colspan: 1,
                        rowspan: 1,
                        backgroundColor: 'default',
                        textColor: 'blue',
                        textAlignment: 'center',
                      },
                    },
                  ],
                },
                {
                  cells: [
                    {
                      type: 'tableCell',
                      content: [
                        {
                          type: 'text',
                          text: 'This spans 2 columns\nand 2 rows',
                          styles: {},
                        },
                      ],
                      props: {
                        colspan: 2,
                        rowspan: 2,
                        backgroundColor: 'yellow',
                        textColor: 'default',
                        textAlignment: 'left',
                      },
                    },
                    {
                      type: 'tableCell',
                      content: [
                        {
                          type: 'text',
                          text: 'Sooo many features',
                          styles: {},
                        },
                      ],
                      props: {
                        colspan: 1,
                        rowspan: 1,
                        backgroundColor: 'gray',
                        textColor: 'default',
                        textAlignment: 'left',
                      },
                    },
                  ],
                },
                {
                  cells: [
                    {
                      type: 'tableCell',
                      content: [],
                      props: {
                        colspan: 1,
                        rowspan: 1,
                        backgroundColor: 'gray',
                        textColor: 'purple',
                        textAlignment: 'left',
                      },
                    },
                  ],
                },
                {
                  cells: [
                    {
                      type: 'tableCell',
                      content: [
                        {
                          type: 'text',
                          text: 'A cell',
                          styles: {},
                        },
                      ],
                      props: {
                        colspan: 1,
                        rowspan: 1,
                        backgroundColor: 'default',
                        textColor: 'default',
                        textAlignment: 'left',
                      },
                    },
                    {
                      type: 'tableCell',
                      content: [
                        {
                          type: 'text',
                          text: 'Another Cell',
                          styles: {},
                        },
                      ],
                      props: {
                        colspan: 1,
                        rowspan: 1,
                        backgroundColor: 'default',
                        textColor: 'default',
                        textAlignment: 'right',
                      },
                    },
                    {
                      type: 'tableCell',
                      content: [
                        {
                          type: 'text',
                          text: 'Aligned center',
                          styles: {},
                        },
                      ],
                      props: {
                        colspan: 1,
                        rowspan: 1,
                        backgroundColor: 'default',
                        textColor: 'default',
                        textAlignment: 'center',
                      },
                    },
                  ],
                },
              ],
            },
            children: [],
          },
          {
            id: '16e76a94-74e5-42e2-b461-fc9da9f381f7',
            type: 'paragraph',
            props: {
              textColor: 'default',
              backgroundColor: 'default',
              textAlignment: 'left',
            },
            content: [
              {
                type: 'text',
                text: 'Featuring:',
                styles: {},
              },
            ],
            children: [
              {
                id: '785fc9f7-8554-47f4-a4df-8fe2f1438cac',
                type: 'bulletListItem',
                props: {
                  textColor: 'default',
                  backgroundColor: 'default',
                  textAlignment: 'left',
                },
                content: [
                  {
                    type: 'text',
                    text: 'Cell background & foreground coloring',
                    styles: {},
                  },
                ],
                children: [],
              },
              {
                id: '1d0adf08-1b42-421a-b9ea-b3125dcc96d9',
                type: 'bulletListItem',
                props: {
                  textColor: 'default',
                  backgroundColor: 'default',
                  textAlignment: 'left',
                },
                content: [
                  {
                    type: 'text',
                    text: 'Splitting & merging cells',
                    styles: {},
                  },
                ],
                children: [],
              },
              {
                id: '99991aa7-9d86-4d06-9073-b1a9c0329062',
                type: 'bulletListItem',
                props: {
                  textColor: 'default',
                  backgroundColor: 'default',
                  textAlignment: 'left',
                },
                content: [
                  {
                    type: 'text',
                    text: 'Header row & column',
                    styles: {},
                  },
                ],
                children: [],
              },
            ],
          },
          {
            id: 'c7bf2a7c-8972-44f1-acd8-cf60fa734068',
            type: 'paragraph',
            props: {
              textColor: 'default',
              backgroundColor: 'default',
              textAlignment: 'left',
            },
            content: [],
            children: [],
          },
        ],
        uploadFile,
      });
    }

    return editorRef.current;
  }, [content]);

  const onChange = () => {
    if (editor) {
      const jsonBlocks = editor.document;

      debounce((jsonBlocks: Block[]) => {
        saveToStorage(contentKey, jsonBlocks, onContentChange);
      }, 1000)(jsonBlocks);
    }
  };

  if (editor === undefined) {
    return <ContentLoading />;
  }

  return (
    <div className="z-[10] max-w-screen flex flex-col overflow-hidden md:overflow-visible mb-5">
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
          spellCheck={false}
        ></BlockNoteView>
      </div>
    </div>
  );
}
