'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  BookMinus,
  BookPlus,
  EditIcon,
  EyeIcon,
  MoreHorizontal,
  TrashIcon,
} from 'lucide-react';
import Image from 'next/image';
import { Link, Tag } from '@prisma/client';

export type Post = {
  id: string;
  viewcount?: number;
  image: string | null;
  title: string | null;
  links: Link[];
  tags: Tag[];
  published: boolean;
  createdAt: Date;
};

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: '뷰 카운트',
    header: 'View',
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
    header: 'Tags',
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
    accessorKey: '날짜',
    header: 'Created At',
    cell: ({ row }) => (
      <span>
        {new Date(row.original.createdAt).toLocaleDateString('en-US')}
      </span>
    ),
  },
  {
    id: '작업',
    cell: ({ row }) => {
      const post = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="end">
            <DropdownMenuItem onClick={() => console.log('Edit', post.id)}>
              <EditIcon />
              수정
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('View', post.id)}>
              <EyeIcon />
              보기
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                console.log(post.published ? 'Unpublish' : 'Publish', post.id)
              }
            >
              {post.published ? (
                <>
                  <BookMinus /> 비공개로 전환
                </>
              ) : (
                <>
                  <BookPlus /> 공개하기
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => console.log('Delete', post.id)}
              className="text-red-600 hover:text-red-500"
            >
              <TrashIcon />
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
