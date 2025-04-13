'use client';

import './style.css';
import {
  BubbleMenu,
  EditorContent,
  useEditor,
  FloatingMenu as UIFloatingMenu,
} from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';
import React, { useCallback, useRef } from 'react';
import { TextAlign } from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import {
  Bold,
  Code,
  Highlighter,
  Italic,
  Link2,
  Strikethrough,
  UnderlineIcon,
  Unlink2,
} from 'lucide-react';
import { TiptapButton } from './tiptap-button';
import { TiptapDropdownMenu } from './tiptap-dropdown-menu';

const Tiptap = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [floatingElement, setFloatingElement] =
    React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const el = document.querySelector('.floating-menu') as HTMLElement;
    if (el) {
      setFloatingElement(el);
    }
  }, []);

  const editor = useEditor(
    {
      immediatelyRender: false,
      editable: true,
      extensions: [
        StarterKit.configure({
          // paragraph: false,
          bulletList: {
            HTMLAttributes: {
              class: 'list-disc ml-3',
            },
          },
          orderedList: {
            HTMLAttributes: {
              class: 'list-decimal ml-3',
            },
          },
          blockquote: {
            HTMLAttributes: {
              class: 'border-l-2 border-zinc-500 text-zinc-600 pl-6 my-4',
            },
          },
        }),

        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Highlight.configure({
          HTMLAttributes: {
            class: 'my-custom-class',
          },
        }),
        Underline.configure({
          HTMLAttributes: {
            class: 'my-custom-class',
          },
        }),
        Link.configure({
          openOnClick: true,
          autolink: true,
          defaultProtocol: 'https',
          protocols: ['http', 'https'],
          isAllowedUri: (url, ctx) => {
            try {
              // construct URL
              const parsedUrl = url.includes(':')
                ? new URL(url)
                : new URL(`${ctx.defaultProtocol}://${url}`);

              // use default validation
              if (!ctx.defaultValidate(parsedUrl.href)) {
                return false;
              }

              // disallowed protocols
              const disallowedProtocols = ['ftp', 'file', 'mailto'];
              const protocol = parsedUrl.protocol.replace(':', '');

              if (disallowedProtocols.includes(protocol)) {
                return false;
              }

              // only allow protocols specified in ctx.protocols
              const allowedProtocols = ctx.protocols.map((p) =>
                typeof p === 'string' ? p : p.scheme,
              );

              if (!allowedProtocols.includes(protocol)) {
                return false;
              }

              // disallowed domains
              const disallowedDomains = [
                'example-phishing.com',
                'malicious-site.net',
              ];
              const domain = parsedUrl.hostname;

              if (disallowedDomains.includes(domain)) {
                return false;
              }

              // all checks have passed
              return true;
            } catch {
              return false;
            }
          },
          shouldAutoLink: (url) => {
            try {
              // construct URL
              const parsedUrl = url.includes(':')
                ? new URL(url)
                : new URL(`https://${url}`);

              // only auto-link if the domain is not in the disallowed list
              const disallowedDomains = [
                'example-no-autolink.com',
                'another-no-autolink.com',
              ];
              const domain = parsedUrl.hostname;

              return !disallowedDomains.includes(domain);
            } catch {
              return false;
            }
          },
        }),
      ],

      content:
        '<p>Hello World! 🌎️</p><p>Hello World! 🌎️</p><p>Hello World! 🌎️</p>',
      editorProps: {
        attributes: {
          class: 'border-none outline-none w-full mb-20',
        },
      },
    },
    [floatingElement],
  );

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

  return (
    <>
      {editor && (
        <BubbleMenu
          className="bg-white rounded-md shadow-md border-2  border-white flex"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <TiptapButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            <Bold className="size-4" />
          </TiptapButton>

          <TiptapButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            <Italic className="size-4" />
          </TiptapButton>

          <TiptapButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <Strikethrough className="size-4" />
          </TiptapButton>

          <TiptapButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active' : ''}
          >
            <UnderlineIcon className="size-4" />
          </TiptapButton>

          <TiptapButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive('highlight') ? 'is-active' : ''}
          >
            <Highlighter className="size-4" />
          </TiptapButton>

          <TiptapButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'is-active' : ''}
          >
            <Code className="size-4" />
          </TiptapButton>

          <TiptapButton
            onClick={setLink}
            className={editor.isActive('link') ? 'is-active' : ''}
          >
            <Link2 className="size-4" />
          </TiptapButton>

          <TiptapButton
            onClick={() => editor.chain().focus().unsetLink().run()}
            className={editor.isActive('link') ? 'is-active' : ''}
          >
            <Unlink2 className="size-4" />
          </TiptapButton>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} ref={editorRef} />
      {editor && (
        <UIFloatingMenu
          editor={editor}
          tippyOptions={{
            getReferenceClientRect: () => {
              const { state, view } = editor;
              const { from } = state.selection;

              // Resolve current position in document
              const resolvedPos = state.doc.resolve(from);

              // Loop upward to find the first block-level node
              for (let depth = resolvedPos.depth; depth > 0; depth--) {
                const node = resolvedPos.node(depth);

                if (node.isBlock) {
                  const pos = resolvedPos.before(depth);
                  const dom = view.nodeDOM(pos) as HTMLElement;

                  if (dom) {
                    return dom.getBoundingClientRect();
                  }
                }
              }

              return new DOMRect(); // fallback
            },

            placement: 'left-start', // anchor to block's top-left
            offset: [0, 8], // adjust spacing from the block
          }}
          shouldShow={({ editor }) => editor.isActive('paragraph')} // only show when the cursor is in a paragraph
        >
          <TiptapDropdownMenu editor={editor} />
        </UIFloatingMenu>
      )}
    </>
  );
};

export default Tiptap;
