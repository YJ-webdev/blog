import {
  // AlignCenter,
  // AlignLeft,
  // AlignRight,
  GripVertical,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Plus,
  SquareCode,
  Table,
  TextQuote,
} from 'lucide-react';
import { FaYoutube } from 'react-icons/fa6';
import React from 'react';
import { TiptapMenu } from './tiptap-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Editor } from '@tiptap/core';

export const TiptapDropdownMenu = ({ editor }: { editor: Editor }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="z-10 shadow-none items-center justify-center bg-white rounded-sm -mt-[1px] text-zinc-400/80 flex">
          <Plus
            strokeWidth={1.5}
            className="shadow-none h-6 w-6 p-[1px] rounded-sm  hover:bg-zinc-100 "
          />
          <GripVertical
            strokeWidth={1.5}
            className="shadow-none h-6 w-6 p-[2px] rounded-sm  hover:bg-zinc-100 "
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="" align="end">
          <DropdownMenuLabel className="text-xs mx-2 text-muted-foreground font-normal">
            Heading
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <TiptapMenu
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
              }
              icon={<Heading1 />} // Replace with your actual icon
              name="Heading1"
              subname="Top-level heading"
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TiptapMenu
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
              }
              icon={<Heading2 />} // Replace with your actual icon
              name="Heading2"
              subname="Key section heading"
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TiptapMenu
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={
                editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
              }
              icon={<Heading3 />} // Replace with your actual icon
              name="Heading3"
              subname="subsection and group heading"
            />
          </DropdownMenuItem>
          <DropdownMenuLabel className="text-xs mx-2 text-muted-foreground font-normal">
            Basic blocks
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <TiptapMenu
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive('blockquote') ? 'is-active' : ''}
              icon={<TextQuote className="" />} // Replace with your actual icon
              name="Quote"
              subname="Quote or excerpt"
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TiptapMenu
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive('codeBlock') ? 'is-active' : ''} // Replace with your actual icon
              icon={<SquareCode className="" />} // Replace with your actual icon
              name="Code Block"
              subname="Quote or excerpt"
            />
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <TiptapMenu
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={
                editor.isActive('textAlign', 'left') ? 'is-active' : ''
              }
              icon={<AlignLeft className="" />} // Replace with your actual icon
              name="Align Left"
              subname="Aligning content to the left"
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TiptapMenu
              onClick={() =>
                editor.chain().focus().setTextAlign('center').run()
              }
              className={
                editor.isActive('textAlign', 'center') ? 'is-active' : ''
              }
              icon={<AlignCenter className="" />} // Replace with your actual icon
              name="Align Center"
              subname="Aligning content to the center"
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TiptapMenu
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={
                editor.isActive('textAlign', 'right') ? 'is-active' : ''
              }
              icon={<AlignRight className="" />} // Replace with your actual icon
              name="Align Right"
              subname="Aligning content to the right"
            />
          </DropdownMenuItem> */}
          <DropdownMenuLabel className="text-xs mx-2 text-muted-foreground font-normal">
            List
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <TiptapMenu
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'is-active' : ''}
              icon={<List className="" />} // Replace with your actual icon
              name="Bullet List"
              subname="List with unordered items"
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TiptapMenu
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'is-active' : ''}
              icon={<ListOrdered className="" />} // Replace with your actual icon
              name="Ordered List"
              subname="List with ordered items"
            />
          </DropdownMenuItem>
          <DropdownMenuLabel className="text-xs mx-2 text-muted-foreground font-normal">
            Embed
          </DropdownMenuLabel>{' '}
          <DropdownMenuItem>
            <TiptapMenu
              onClick={() => {
                const url = prompt('Enter YouTube URL');
                if (!url) return;
                editor.commands.setYoutubeVideo({
                  src: url,
                });
              }}
              icon={<FaYoutube className="size-4" />} // Replace with your actual icon
              name="Youtube"
              subname="Embed Youtube Video"
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TiptapMenu
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                  .run()
              }
              icon={<Table className="size-4" />} // Replace with your actual icon
              name="Table"
              subname="Table with editable cells"
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
