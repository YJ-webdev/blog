'use client';

import { ColumnDef } from '@tanstack/react-table';
import { type Link as LinkType, Tag } from '@prisma/client';
import Image from 'next/image';

import { ArrowUpDown, EyeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PostActionsCell } from './post-actions-cell';
import { cn } from '@/lib/utils';

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
    cell: ({ row }) =>
      !row.original.viewcount ? (
        <span className="block text-center text-muted-foreground/30 font-semibold uppercase w-full">
          -
        </span>
      ) : (
        <div className="flex flex-wrap gap-1">{row.original.viewcount}</div>
      ),
  },
  {
    accessorKey: '이미지',
    header: 'Image',
    cell: ({ row }) => {
      const imageSrc = row.original.image || '/images/no-image.png';
      const isPublished = row.original.published;

      return (
        <div className="relative w-16 h-16">
          <Image
            src={imageSrc}
            alt="Post image"
            width={64}
            height={64}
            className={`w-16 h-16 object-cover rounded-lg transition-opacity duration-300 ${
              isPublished || !row.original.image ? '' : 'opacity-20 grayscale'
            }`}
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('title') || '제목 없음'}</div>
    ),
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      if (typeof value !== 'string') return false;
      return value.toLowerCase().includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: '링크',
    header: 'Links',
    cell: ({ row }) => {
      const count = row.original.links?.length ?? 0;
      if (count === 0)
        return (
          <span className="text-muted-foreground/30 font-semibold uppercase">
            -
          </span>
        );
      return <span>{count}</span>;
    },
  },
  {
    accessorKey: '태그',
    header: () => <div className="flex text-center w-fit ml-4">Tags</div>,
    cell: ({ row }) => {
      const isPublished = row.original.published;
      const hasNoTags = row.original.tags.length === 0;

      if (hasNoTags) {
        return (
          <span className="block text-center text-muted-foreground/30 font-semibold uppercase w-full">
            -
          </span>
        );
      }

      return (
        <div className="flex flex-wrap gap-1">
          {row.original.tags.map((tag, index) => (
            <span
              key={index}
              className={cn(
                'text-xs px-2 py-0.5 rounded-full',
                isPublished ? 'bg-gray-200' : 'bg-gray-100',
              )}
            >
              {tag.name}
            </span>
          ))}
        </div>
      );
    },
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
    cell: ({ row }) => {
      const { title, image, createdAt } = row.original;
      const isMissing = !title || !image;
      const baseClass = 'text-sm';
      const conditionalClass = isMissing
        ? 'text-muted-foreground/30 font-semibold'
        : '';

      return (
        <span className={`${baseClass} ${conditionalClass}`}>
          {new Date(createdAt).toLocaleDateString('en-US')}
        </span>
      );
    },
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
