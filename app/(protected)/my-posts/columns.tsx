'use client';

import { ColumnDef } from '@tanstack/react-table';
import { type Link as LinkType, Tag } from '@prisma/client';
import Image from 'next/image';

import { ArrowUpDown, EyeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PostActionsCell } from './post-actions-cell';

export type Post = {
  id: string;
  viewcount?: number;
  image: string | null;
  title: string | null;
  slug: string | null;
  links: LinkType[];
  tags: Tag[];
  published: boolean;
  createdAt: Date;
};

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: '뷰 카운트',
    header: () => (
      <div className="flex items-center justify-center">
        <EyeIcon className="w-4 h-4" />
      </div>
    ),
    cell: ({ row }) => <div>{row.original.viewcount ?? '-'}</div>,
  },
  {
    accessorKey: '이미지',
    header: 'Image',
    cell: ({ row }) => (
      <Image
        src={row.original.image || 'opengraph-image.jpg'}
        alt="Post image"
        width={100}
        height={100}
        className="w-16 h-16 object-cover rounded-lg"
      />
    ),
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: '링크',
    header: 'Links',
    cell: ({ row }) => {
      const count = row.original.links?.length ?? 0;
      return <span>{count}</span>;
    },
  },
  {
    accessorKey: '태그',
    header: () => <div className="flex text-center w-fit ml-4">Tags</div>,
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-gray-200 px-2 py-0.5 rounded-full"
          >
            {tag.name}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'createdAt', // must match the key from your Post object
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center self-center">
          Created At
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="px-2 py-0 rounded-lg"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <span>
        {new Date(row.original.createdAt).toLocaleDateString('en-US')}
      </span>
    ),
  },
  {
    accessorKey: '공개',
    header: 'Published',
    cell: ({ row }) => (
      <span
        className={`text-sm font-medium ${
          row.original.published ? 'text-green-600' : 'text-red-500'
        }`}
      >
        {row.original.published ? 'Yes' : 'No'}
      </span>
    ),
  },
  {
    id: '작업',
    cell: ({ row }) => <PostActionsCell post={row.original} />,
  },
];
