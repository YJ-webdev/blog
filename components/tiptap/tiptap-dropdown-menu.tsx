import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Plus,
} from 'lucide-react';
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
        <DropdownMenuTrigger className="shadow-none bg-white rounded-sm p-1 text-zinc-500 hover:bg-zinc-100">
          <Plus strokeWidth={1.5} size={24} className="shadow-none" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="m-0 p-1" align="end">
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
            Align
          </DropdownMenuLabel>
          <DropdownMenuItem>
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
          </DropdownMenuItem>
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
