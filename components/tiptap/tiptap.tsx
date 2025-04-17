'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  BubbleMenu,
  EditorContent,
  useEditor,
  FloatingMenu,
} from '@tiptap/react';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { CaptionedImage } from './captioned-image';
import Youtube from '@tiptap/extension-youtube';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import { TextAlign } from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';

import './style.css';
import { cn } from '@/lib/utils';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  // AlignCenter,
  // AlignLeft,
  // AlignRight,
  Bold,
  Brackets,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ImagePlay,
  Italic,
  Link2,
  List,
  ListOrdered,
  SquareCode,
  Strikethrough,
  TextQuote,
  Trash,
  UnderlineIcon,
} from 'lucide-react';
import { LuLink2Off } from 'react-icons/lu';
import { TbBracketsOff } from 'react-icons/tb';
import { TiptapButton } from './tiptap-button';
import { TiptapDropdownMenu } from './tiptap-dropdown-menu';

interface TiptapProps {
  contentKey: string;
  editable: boolean;
  setContent: (content: string) => void;
  initialContent?: string;
}
const Tiptap = ({
  contentKey,
  editable,
  setContent,
  initialContent,
}: TiptapProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [floatingElement, setFloatingElement] = useState<HTMLElement | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [positionAbove, setPositionAbove] = useState(false);

  //toggle dropdown position depending on space above/below
  const toggleDropdown = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const dropdownHeight = 240; // Adjust based on your menu height
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      setPositionAbove(true);
    } else {
      setPositionAbove(false);
    }

    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const el = document.querySelector('.floating-menu') as HTMLElement;
    if (el) {
      setFloatingElement(el);
    }
  }, []);

  const editor = useEditor(
    {
      immediatelyRender: false,
      editable,
      extensions: [
        StarterKit.configure({
          bulletList: {
            HTMLAttributes: {
              class: 'list-disc',
              types: ['bulletList'],
            },
          },
          orderedList: {
            HTMLAttributes: {
              class: 'list-decimal',
              types: ['orderedList'],
            },
          },
          blockquote: {
            HTMLAttributes: {
              class:
                'border-l-2 border-zinc-500 text-zinc-600 pl-6 my-4 italic',
              types: ['blockquote'],
            },
          },
          codeBlock: {
            languageClassPrefix: 'tsx',
            exitOnTripleEnter: false,
            HTMLAttributes: {
              types: ['code'],
            },
          },
        }),
        Youtube.configure({
          HTMLAttributes: {
            class: 'aspect-video w-full h-auto',
            types: ['youtube'],
          },
        }),
        CaptionedImage,
        Table.configure({
          HTMLAttributes: {
            class:
              'table w-full border-collapse table-fixed overflow-hidden mb-6', // matches .tiptap table
            types: ['table'],
          },
        }),
        TableHeader.configure({
          HTMLAttributes: {
            class:
              'bg-gray-100 font-bold text-left border border-zinc-300 px-2', // matches th styling
            types: ['tableHeader'],
          },
        }),
        TableCell.configure({
          HTMLAttributes: {
            class: 'border border-zinc-300 px-2 text-left align-top', // matches td styling
            types: ['tableCell'],
          },
        }),
        TableRow.configure({
          HTMLAttributes: {
            class: 'border border-zinc-200', // rows themselves usually don't need much unless for hover/effects
            types: ['tableRow'],
          },
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Highlight.configure({
          HTMLAttributes: {
            class: '',
          },
        }),
        Underline.configure({
          HTMLAttributes: {
            class: '',
          },
        }),
        HorizontalRule.configure({
          HTMLAttributes: {
            class: 'my-4',
          },
        }),
        Link.configure({
          openOnClick: true,
          autolink: true,
          defaultProtocol: 'https',
          protocols: ['http', 'https'],
          isAllowedUri: (url, ctx) => {
            try {
              const parsedUrl = url.includes(':')
                ? new URL(url)
                : new URL(`${ctx.defaultProtocol}://${url}`);
              if (!ctx.defaultValidate(parsedUrl.href)) return false;
              const disallowedProtocols = ['ftp', 'file', 'mailto'];
              const protocol = parsedUrl.protocol.replace(':', '');
              if (disallowedProtocols.includes(protocol)) return false;
              const allowedProtocols = ctx.protocols.map((p) =>
                typeof p === 'string' ? p : p.scheme,
              );
              if (!allowedProtocols.includes(protocol)) return false;
              const disallowedDomains = [
                'example-phishing.com',
                'malicious-site.net',
              ];
              return !disallowedDomains.includes(parsedUrl.hostname);
            } catch {
              return false;
            }
          },
          shouldAutoLink: (url) => {
            try {
              const parsedUrl = url.includes(':')
                ? new URL(url)
                : new URL(`https://${url}`);
              const disallowedDomains = [
                'example-no-autolink.com',
                'another-no-autolink.com',
              ];
              return !disallowedDomains.includes(parsedUrl.hostname);
            } catch {
              return false;
            }
          },
        }),
      ],
      content:
        initialContent ||
        JSON.parse(localStorage.getItem(contentKey) || 'null'),
      onUpdate: ({ editor }) => {
        const json = editor.getJSON();
        // send the content to an API here
        const stringfiedJson = JSON.stringify(json);
        localStorage.setItem(contentKey, stringfiedJson);
        setContent(stringfiedJson);
      },
      editorProps: {
        attributes: {
          class: 'border-none outline-none w-full mb-20',
        },
      },
    },
    [floatingElement],
  );

  // links for text
  const setLink = useCallback(() => {
    if (!editor) {
      return;
    }
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link

    try {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    } catch {
      alert('Invalid URL');
    }
  }, [editor]);

  // links for image
  const setImageLink = useCallback(() => {
    if (!editor) return;

    const { from, to } = editor.state.selection;
    let updated = false;

    editor.commands.command(({ tr, state }) => {
      state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type.name === 'captionedImage' || node.type.name === 'image') {
          const currentHref = node.attrs.href || '';
          const url = window.prompt('Enter image link URL', currentHref);
          if (url === null) return false;

          tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            href: url || null,
          });

          updated = true;
        }
      });

      return updated;
    });
  }, [editor]);

  const unsetImageLink = useCallback(() => {
    if (!editor) return;

    const { from } = editor.state.selection;
    const node = editor.state.doc.nodeAt(from);

    if (node?.type.name === 'captionedImage' || node?.type.name === 'image') {
      editor
        .chain()
        .focus()
        .updateAttributes(node.type.name, { href: null })
        .run();
    }
  }, [editor]);

  const isImageLinked = () => {
    if (!editor) return false;

    const { from } = editor.state.selection;
    const node = editor.state.doc.nodeAt(from);

    const isImage =
      node?.type.name === 'captionedImage' || node?.type.name === 'image';

    return isImage && !!node.attrs.href;
  };

  //rerender for dropdownmenu reposition on scroll + close on click outside
  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = 270; // Approx. height of your dropdown
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      setPositionAbove(
        spaceBelow < dropdownHeight && spaceAbove > dropdownHeight,
      );
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    // Run immediately and set up listeners
    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  //add additional paragraph if none exists
  useEffect(() => {
    if (!editor) return;

    const handleUpdate = ({ editor }: { editor: Editor }) => {
      const { state, view } = editor;
      const { doc, schema, tr } = state;
      const lastNode = doc.lastChild;

      const isLastEmptyParagraph =
        lastNode?.type.name === 'paragraph' && lastNode.content.size === 0;

      if (!isLastEmptyParagraph) {
        const paragraph = schema.nodes.paragraph.create();
        const pos = doc.content.size;

        const transaction = tr.insert(pos, paragraph);
        view.dispatch(transaction); // this preserves the current selection
      }
    };

    editor.on('update', handleUpdate);

    return () => {
      editor.off('update', handleUpdate);
    };
  }, [editor]);

  return (
    <>
      {editor && (
        <BubbleMenu
          className="bg-white rounded-md shadow-md w-fit border flex"
          tippyOptions={{
            duration: 100,
            appendTo: () => document.body,
          }}
          editor={editor}
        >
          {/* DropdownMenu */}
          {!editor.isActive('image') && (
            <button
              ref={buttonRef}
              onClick={() => toggleDropdown()}
              className="px-3 text-nowrap py-2 flex w-full text-sm rounded hover:bg-zinc-100"
            >
              <span className="px-1 mr-2">T</span> Paragraph
            </button>
          )}
          {isOpen && (
            <div
              ref={dropdownRef}
              className={cn(
                'absolute w-40 bg-white border border-gray-200 rounded shadow-lg z-10',
                positionAbove ? 'bottom-full mb-1' : 'top-9 mt-1',
              )}
            >
              <div className="py-1 text-sm text-gray-700">
                <p className="ml-3 mt-1 text-[10px] font-light">Paragraph</p>
                <TiptapButton
                  onClick={() => {
                    editor.chain().focus().setParagraph().run();
                    setIsOpen(false);
                  }}
                  className={cn(
                    'z-50 text-nowrap w-full px-3 flex items-center gap-4',
                    editor.isActive('heading', { level: 1 }) ? 'is-active' : '',
                  )}
                >
                  <span className="mx-[5px]">T</span> Pragraph
                </TiptapButton>
                <TiptapButton
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                    setIsOpen(false);
                  }}
                  className={cn(
                    'z-50 text-nowrap w-full px-3 flex items-center gap-4',
                    editor.isActive('heading', { level: 1 }) ? 'is-active' : '',
                  )}
                >
                  <Heading1 className="w-5 h-5" strokeWidth={1.5} /> Heading 1
                </TiptapButton>
                <TiptapButton
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                    setIsOpen(false);
                  }}
                  className={cn(
                    'text-nowrap w-full px-3 flex items-center gap-4',
                    editor.isActive('heading', { level: 2 }) ? 'is-active' : '',
                  )}
                >
                  <Heading2 className="w-5 h-5" strokeWidth={1.5} /> Heading 2
                </TiptapButton>
                <TiptapButton
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 3 }).run();
                    setIsOpen(false);
                  }}
                  className={cn(
                    'text-nowrap w-full px-3 flex items-center gap-4',
                    editor.isActive('heading', { level: 3 }) ? 'is-active' : '',
                  )}
                >
                  <Heading3 className="w-5 h-5" strokeWidth={1.5} /> Heading 3
                </TiptapButton>
                <p className="ml-3 mt-1 text-[10px] font-light">Lists</p>
                <TiptapButton
                  onClick={() => {
                    editor.chain().focus().toggleBulletList().run();
                    setIsOpen(false);
                  }}
                  className={cn(
                    'text-nowrap w-full px-3 flex items-center gap-4',
                    editor.isActive('bulletList') ? 'is-active' : '',
                  )}
                >
                  <List className="w-5 h-5" strokeWidth={1.5} />
                  Bullet List
                </TiptapButton>
                <TiptapButton
                  onClick={() => {
                    editor.chain().focus().toggleOrderedList().run();
                    setIsOpen(false);
                  }}
                  className={cn(
                    'text-nowrap w-full px-3 flex items-center gap-4',
                    editor.isActive('orderedList') ? 'is-active' : '',
                  )}
                >
                  <ListOrdered className="w-5 h-5" strokeWidth={1.5} />
                  Ordered List
                </TiptapButton>
                <p className="ml-3 mt-1 text-[10px] font-light">Others</p>
                <TiptapButton
                  onClick={() => {
                    editor.chain().focus().toggleBlockquote().run();
                    setIsOpen(false);
                  }}
                  className={cn(
                    'text-nowrap w-full px-3 flex items-center gap-4',
                    editor.isActive('blockquote') ? 'is-active' : '',
                  )}
                >
                  <TextQuote className="w-5 h-5" strokeWidth={1.5} />
                  Quote
                </TiptapButton>
                <TiptapButton
                  onClick={() => {
                    editor.chain().focus().toggleCodeBlock().run();
                    setIsOpen(false);
                  }}
                  className={cn(
                    'text-nowrap w-full px-3 flex items-center gap-4',
                    editor.isActive('codeBlock') ? 'is-active' : '',
                  )}
                >
                  <SquareCode className="w-5 h-5" strokeWidth={1.5} />
                  Code block
                </TiptapButton>
              </div>
            </div>
          )}

          {!editor.isActive('image') && (
            <TiptapButton
              onClick={() => {
                editor.chain().focus().toggleBold().run();
                setIsOpen(false);
              }}
              className={editor.isActive('bold') ? 'is-active' : ''}
            >
              <Bold className="size-4" />
            </TiptapButton>
          )}
          {!editor.isActive('image') && (
            <TiptapButton
              onClick={() => {
                editor.chain().focus().toggleItalic().run();
                setIsOpen(false);
              }}
              className={editor.isActive('italic') ? 'is-active' : ''}
            >
              <Italic className="size-4" />
            </TiptapButton>
          )}
          {!editor.isActive('image') && (
            <TiptapButton
              onClick={() => {
                editor.chain().focus().toggleStrike().run();
                setIsOpen(false);
              }}
              className={editor.isActive('strike') ? 'is-active' : ''}
            >
              <Strikethrough className="size-4" />
            </TiptapButton>
          )}
          {!editor.isActive('image') && (
            <TiptapButton
              onClick={() => {
                editor.chain().focus().toggleUnderline().run();
                setIsOpen(false);
              }}
              className={editor.isActive('underline') ? 'is-active' : ''}
            >
              <UnderlineIcon className="size-4" />
            </TiptapButton>
          )}
          {!editor.isActive('image') && (
            <TiptapButton
              onClick={() => {
                editor.chain().focus().toggleHighlight().run();
                setIsOpen(false);
              }}
              className={editor.isActive('highlight') ? 'is-active' : ''}
            >
              <Highlighter className="size-4" />
            </TiptapButton>
          )}
          {/* Text alignments */}
          {!editor.isActive('image') && (
            <>
              <TiptapButton
                onClick={() => {
                  editor.chain().focus().setTextAlign('left').run();
                  setIsOpen(false);
                }}
                className={
                  editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''
                }
              >
                <AlignLeft className="size-4" />
              </TiptapButton>

              <TiptapButton
                onClick={() => {
                  editor.chain().focus().setTextAlign('center').run();
                  setIsOpen(false);
                }}
                className={
                  editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''
                }
              >
                <AlignCenter className="size-4" />
              </TiptapButton>
              <TiptapButton
                onClick={() => {
                  editor.chain().focus().setTextAlign('right').run();
                  setIsOpen(false);
                }}
                className={
                  editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''
                }
              >
                <AlignRight className="size-4" />
              </TiptapButton>
            </>
          )}

          {/* links for text */}
          {!editor.isActive('image') && (
            <>
              <TiptapButton
                onClick={() => {
                  setIsOpen(false);
                  setLink(); // for text
                }}
                className={editor.isActive('link') ? 'is-active' : ''}
              >
                <Link2 className="size-4" />
              </TiptapButton>
              <TiptapButton
                onClick={() => {
                  editor.chain().focus().unsetLink().run();
                  setIsOpen(false);
                }}
              >
                <LuLink2Off className="size-4" />
              </TiptapButton>
            </>
          )}

          {editor.isActive('image') && (
            <TiptapButton
              onClick={() => {
                const node = editor.getAttributes('image');
                const currentSmall = node.small || false;

                editor
                  .chain()
                  .focus()
                  .updateAttributes('image', { small: !currentSmall })
                  .run();
              }}
            >
              <ImagePlay className="size-4" />
            </TiptapButton>
          )}

          {/* links for image */}
          {editor.isActive('image') && (
            <>
              <TiptapButton
                onClick={() => {
                  setImageLink(); // for image
                }}
                className={isImageLinked() ? 'is-active' : ''}
              >
                <Link2 className="size-4" />
              </TiptapButton>
              <TiptapButton
                onClick={() => {
                  unsetImageLink(); // for image
                }}
              >
                <LuLink2Off className="size-4" />
              </TiptapButton>
            </>
          )}

          {/* caption for image */}
          {editor.isActive('image') && (
            <>
              <TiptapButton
                onClick={() => {
                  const caption = prompt('Enter caption for image');
                  if (!caption) return;

                  editor
                    ?.chain()
                    .focus()
                    .updateAttributes('image', { title: caption })
                    .run();
                }}
                // className={editor.isActive('image') ? 'is-active' : ''}
              >
                <Brackets className="size-4" />
              </TiptapButton>

              <TiptapButton
                onClick={() => {
                  // Assuming 'captionedImage' is your custom node
                  editor
                    ?.chain()
                    .focus()
                    .updateAttributes('image', { title: '' })
                    .run();
                }}
              >
                <TbBracketsOff className="size-4" />
              </TiptapButton>
            </>
          )}

          {editor.isActive('image') && (
            <TiptapButton
              onClick={() => {
                editor.commands.deleteSelection();
              }}
            >
              <Trash className="size-4" />
            </TiptapButton>
          )}
        </BubbleMenu>
      )}
      <EditorContent editor={editor} ref={editorRef} spellCheck={false} />
      {editor && editable && (
        <FloatingMenu
          editor={editor}
          tippyOptions={{
            appendTo: () => document.body,
            getReferenceClientRect: () => {
              const { state, view } = editor;
              const { from } = state.selection;

              const resolvedPos = state.doc.resolve(from);

              for (let depth = resolvedPos.depth; depth >= 0; depth--) {
                const node = resolvedPos.node(depth);

                if (node.isBlock) {
                  try {
                    const pos = resolvedPos.before(depth + 1);
                    const dom = view.nodeDOM(pos);

                    // Ensure it's an actual HTMLElement
                    if (
                      dom instanceof HTMLElement &&
                      typeof dom.getBoundingClientRect === 'function'
                    ) {
                      return dom.getBoundingClientRect();
                    }
                  } catch (err) {
                    // nodeDOM might throw if position is invalid
                    console.warn('Error accessing nodeDOM:', err);
                  }
                }
              }

              return new DOMRect(); // fallback to something safe
            },

            placement: 'left-start',
            offset: [0, 8],
          }}
          shouldShow={({ editor }) =>
            editor.isActive('paragraph') || editor.isActive('heading')
          }
        >
          <TiptapDropdownMenu editor={editor} />
        </FloatingMenu>
      )}
    </>
  );
};

export default Tiptap;
