'use client';

import {
  Copy,
  GripVertical,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  List,
  ListOrdered,
  Pilcrow,
  Plus,
  SquareCode,
  Table,
  TextQuote,
  Trash,
} from 'lucide-react';
import { FaYoutube } from 'react-icons/fa6';
import { RiAdvertisementFill } from 'react-icons/ri';

import React, { useEffect, useRef, useState } from 'react';
import { TiptapMenu } from './tiptap-menu';
import { Editor } from '@tiptap/core';
import { insertTopLevelBlock } from './insert-top-level-block';
import { createCoupangDeeplink } from '@/app/actions/coupang';

export const TiptapDropdownMenu = ({ editor }: { editor: Editor }) => {
  const [plusOpen, setPlusOpen] = useState(false);
  const [position, setPosition] = useState<'down' | 'up'>('down');
  const [gripOpen, setGripOpen] = useState(false);

  const plusMenuRef = useRef<HTMLDivElement>(null);
  const gripMenuRef = useRef<HTMLDivElement>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);

  const updatePosition = () => {
    if (triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;

      if (spaceBelow < 300 && spaceAbove > spaceBelow) {
        setPosition('up');
      } else {
        setPosition('down');
      }
    }
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        plusMenuRef.current &&
        !plusMenuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setPlusOpen(false);
      }
    };

    if (plusOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [plusOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        gripMenuRef.current &&
        !gripMenuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setGripOpen(false);
      }
    };

    if (gripOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [gripOpen]);

  // Recalculate position on open, scroll, or resize
  useEffect(() => {
    if (!open) return;

    updatePosition(); // initial
    window.addEventListener('scroll', updatePosition, true); // true: capture scroll on any container
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [plusOpen]);

  return (
    <div className="relative inline-block" ref={plusMenuRef}>
      <div className="flex items-center justify-center">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => {
            setGripOpen(false);
            setPlusOpen((prev) => !prev);
          }}
          className="z-10 shadow-none bg-white rounded-sm -mt-[1px] text-zinc-400/80 flex"
        >
          <Plus
            strokeWidth={1.5}
            className="shadow-none h-6 w-6 p-[1px] mt-1 rounded-sm hover:bg-zinc-100"
          />
        </button>{' '}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => {
            setPlusOpen(false);
            setGripOpen((prev) => !prev);
          }}
          className="z-10 shadow-none bg-white rounded-sm -mt-[1px] text-zinc-400/80 flex"
        >
          <GripVertical
            strokeWidth={1.5}
            className="shadow-none h-6 w-6 p-[2px] mt-1 rounded-sm hover:bg-zinc-100"
          />
        </button>
      </div>
      {plusOpen && (
        <div
          ref={plusMenuRef}
          className={`absolute z-20 w-72 bg-white border border-zinc-200 rounded-md shadow-md p-1 space-y-1 ${
            position === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
        >
          {/* Heading Section */}
          <p className="text-xs mx-2 text-muted-foreground font-normal">
            Heading
          </p>
          <TiptapMenu
            onClick={() => {
              insertTopLevelBlock(editor, 'paragraph');
              setPlusOpen(false);
            }}
            icon={<Pilcrow strokeWidth={1.5} />}
            name="Paragraph"
            subname="Plain text"
          />
          <TiptapMenu
            onClick={() => {
              insertTopLevelBlock(editor, 'heading', { level: 1 });
              setPlusOpen(false);
            }}
            icon={<Heading1 strokeWidth={1.5} />}
            name="Heading1"
            subname="Top-level heading"
          />
          <TiptapMenu
            onClick={() => {
              insertTopLevelBlock(editor, 'heading', { level: 2 });
              setPlusOpen(false);
            }}
            icon={<Heading2 strokeWidth={1.5} />}
            name="Heading2"
            subname="Key section heading"
          />
          <TiptapMenu
            onClick={() => {
              insertTopLevelBlock(editor, 'heading', { level: 3 });
              setPlusOpen(false);
            }}
            icon={<Heading3 strokeWidth={1.5} />}
            name="Heading3"
            subname="Subsection heading"
          />

          {/* Basic Blocks */}
          <p className="text-xs mx-2 text-muted-foreground font-normal">
            Basic blocks
          </p>
          <TiptapMenu
            onClick={() => {
              insertTopLevelBlock(editor, 'blockquote');
              setPlusOpen(false);
            }}
            icon={<TextQuote strokeWidth={1.5} />}
            name="Quote"
            subname="Quote or excerpt"
          />
          <TiptapMenu
            onClick={() => {
              insertTopLevelBlock(editor, 'codeBlock');
              setPlusOpen(false);
            }}
            icon={<SquareCode strokeWidth={1.5} />}
            name="Code Block"
            subname="Code blocks are not editable yet"
          />

          {/* Lists */}
          <p className="text-xs mx-2 text-muted-foreground font-normal">List</p>
          <TiptapMenu
            onClick={() => {
              insertTopLevelBlock(editor, 'bulletList');
              setPlusOpen(false);
            }}
            icon={<List strokeWidth={1.5} />}
            name="Bullet List"
            subname="Unordered list"
          />
          <TiptapMenu
            onClick={() => {
              insertTopLevelBlock(editor, 'orderedList');
              setPlusOpen(false);
            }}
            icon={<ListOrdered strokeWidth={1.5} />}
            name="Ordered List"
            subname="Numbered list"
          />

          <TiptapMenu
            onClick={() => {
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run();
              setPlusOpen(false);
            }}
            icon={<Table strokeWidth={1.5} size={24} />}
            name="Table"
            subname="Not editable yet"
          />

          {/* Media */}
          <p className="text-xs mx-2 text-muted-foreground font-normal">
            Media
          </p>
          <TiptapMenu
            onClick={() => {
              {
                const url = prompt('Enter YouTube URL');
                if (url) {
                  editor.commands.setYoutubeVideo({ src: url });
                }
                setPlusOpen(false);
              }
            }}
            icon={<FaYoutube strokeWidth={1.5} size={24} />}
            name="Youtube"
            subname="Comes in full width"
          />
          <TiptapMenu
            onClick={() => {
              {
                const url = prompt('Image URL');
                const caption = prompt('Caption');
                if (url) {
                  editor.commands.setImage({
                    src: url,
                    alt: 'blog image',
                    title: caption || '',
                  });
                }
                setPlusOpen(false);
              }
            }}
            icon={<ImageIcon strokeWidth={1.5} size={24} />}
            name="Image"
            subname="Set to 400px width"
          />
          <TiptapMenu
            onClick={() => {
              createCoupangDeeplink();
              setPlusOpen(false);
            }}
            icon={<RiAdvertisementFill strokeWidth={1} size={24} />}
            name="Coupang Ad"
            subname="Insert a Coupang Ad"
          />
        </div>
      )}
      {gripOpen && (
        <div
          ref={gripMenuRef}
          className={`absolute z-20 w-32 bg-white border border-zinc-200 rounded-md shadow-md p-1 space-y-1 ${
            position === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
        >
          <button
            type="button"
            className="flex items-center gap-5 w-full p-2 text-sm hover:bg-zinc-100 "
            onClick={() => {
              editor?.commands.command(({ state, dispatch }) => {
                const { $from } = state.selection;
                const node = $from.node($from.depth);

                // prevent errors when at root level
                if (!node || !dispatch || $from.depth === 0) return false;

                const pos = $from.before($from.depth);
                dispatch(state.tr.delete(pos, pos + node.nodeSize));
                return true;
              });

              setGripOpen(false);
            }}
          >
            <Trash strokeWidth={1.5} size={20} /> Delete
          </button>

          <button
            type="button"
            className="flex items-center gap-5 w-full p-2 text-sm hover:bg-zinc-100"
            onClick={() => {
              {
                editor.commands.command(({ state, dispatch }) => {
                  const { $from } = state.selection;
                  const node = $from.node($from.depth);

                  if (!node || !dispatch) return false;

                  const pos = $from.after($from.depth);
                  const copiedNode = node.type.create(
                    node.attrs,
                    node.content, // <- no need to copy manually
                    node.marks,
                  );

                  const tr = state.tr.insert(pos, copiedNode);
                  dispatch(tr);
                  return true;
                });

                setGripOpen(false);
              }
            }}
          >
            <Copy strokeWidth={1.5} size={20} /> Duplicate
          </button>
        </div>
      )}
    </div>
  );
};
