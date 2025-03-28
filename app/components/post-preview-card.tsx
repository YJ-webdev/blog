'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PostPreviewType } from '../lib/types';
import { formatDateWithoutYear } from '../lib/utils';
import { cn } from '@/lib/utils';
import { SquarePen, Trash } from 'lucide-react';
import { deletePost } from '../lib/actions/post';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export const PostPreviewCard = ({
  slug,
  title,
  image,
  content,
  createdAt,
  myPosts,
}: PostPreviewType) => {
  const handleDelete = async () => {
    await deletePost(slug!);
  };
  return (
    <>
      <Link
        href={`/post/${slug}`}
        className={cn(
          'flex flex-col w-full hover:cursor-pointer group relative group p-5 gap-5 rounded-lg',
          myPosts ? '' : '',
        )}
      >
        <div className="">
          <Image
            src={image || ''}
            alt="Preview"
            height={200}
            width={700}
            className="object-cover h-60 w-full transition-all duration-300 group-hover:filter group-hover:brightness-110"
          />
        </div>
        <div className="flex flex-col group-hover:text-black dark:group-hover:text-white gap-y-2">
          <div className="flex justify-between items-start">
            <h3 className="w-full text-lg font-semibold line-clamp-1">
              {title}
            </h3>
            <p className="text-xs font-light text-end min-w-fit">
              {formatDateWithoutYear(createdAt)}
            </p>
          </div>
          <p className="text-sm overflow-hidden">{content}</p>
        </div>

        {myPosts && (
          <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-white/30 dark:bg-[#1f1f1f]/50 rounded-lg">
            <div className="flex gap-5">
              <div className="rounded-full bg-white dark:bg-[#1f1f1f]">
                <SquarePen className="p-4" size={56} />
              </div>

              <AlertDialog>
                <AlertDialogTrigger>
                  {' '}
                  <div className="rounded-full bg-white dark:bg-[#1f1f1f]">
                    <Trash className="p-4" size={56} />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                      <button onClick={handleDelete}>Confirm</button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        )}
      </Link>
    </>
  );
};

export default PostPreviewCard;
