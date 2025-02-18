'use client';

import {
  List,
  ListOrdered,
  Link as HyperLink,
  GripVertical,
} from 'lucide-react';
import { useEditor, EditorContent, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import Link from '@tiptap/extension-link';
// import History from '@tiptap/extension-history';
import Gapcursor from '@tiptap/extension-gapcursor';

export const Editor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'focus:outline-none flex flex-col cursor-text',
      },
    },
    extensions: [
      StarterKit,
      //   History,
      Gapcursor,
      Image,
      ImageResize,
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
    content: `
    <p>
      Wow, this editor has support for links to the whole <a href="https://en.wikipedia.org/wiki/World_Wide_Web">world wide web</a>. We tested a lot of URLs and I think you can add *every URL* you want. Isn’t that cool? Let’s try <a href="https://statamic.com/">another one!</a> Yep, seems to work.
    </p>
    <p>
      By default every link will get a <code>rel="noopener noreferrer nofollow"</code> attribute. It’s configurable though.
    </p>
  `,
  });

  return (
    <>
      {editor && (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div data-testid="floating-menu" className="floating-menu">
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
              }
            >
              H1
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
              }
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
              <List size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
              <ListOrdered size={16} />
            </button>
          </div>
        </FloatingMenu>
      )}
      <EditorContent editor={editor} spellCheck={false} />
    </>
  );
};
