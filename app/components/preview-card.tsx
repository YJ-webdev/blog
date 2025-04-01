'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatDateWithoutYear } from '@/app/lib/utils';

import { SquarePen, Trash } from 'lucide-react';
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
import { toast } from 'sonner';
import { PostPreviewType } from '@/app/lib/types';
import { deletePost } from '@/app/actions/post';

export const PreviewCard = ({
  slug,
  title,
  image,
  content,
  createdAt,
}: PostPreviewType) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await deletePost(slug!);
      toast.success('Post deleted successfully');
      router.push('/my-posts');
    } catch {
      toast.error('Failed to delete post');
    }
  };

  return (
    <>
      <div className="relative group">
        <div className="flex flex-col w-full hover:cursor-pointer group p-4 gap-3">
          <Image
            src={image || ''}
            alt="Preview"
            height={200}
            width={700}
            className="object-cover h-60 w-full transition-all duration-300 group-hover:filter group-hover:brightness-110"
          />

          <div className="flex flex-col group-hover:text-black dark:group-hover:text-white gap-y-2">
            <div className="flex justify-between items-start">
              <h3 className="w-full text-lg font-semibold line-clamp-1">
                {title}
              </h3>
              <p className="text-xs font-light text-end min-w-fit">
                {formatDateWithoutYear(createdAt)}
              </p>
            </div>
            <p className="overflow-hidden text-sm/[22px]">{content}</p>
          </div>
        </div>
        <Link
          href={`/edit/${slug}`}
          className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-white/30 dark:bg-[#1f1f1f]/50 rounded-lg"
        >
          <div className="flex gap-10 pointer-events-auto group">
            <div className="absolute top-1/2 left-20 -translate-y-1/2 rounded-full bg-white dark:bg-[#1f1f1f] hover:bg-muted shadow-lg hover:dark:bg-muted-foreground">
              <SquarePen className="p-4" size={56} />
            </div>
          </div>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="absolute hidden group-hover:block top-1/2 right-20 -translate-y-1/2 z-10 items-center justify-center rounded-full bg-white dark:bg-[#1f1f1f] hover:bg-muted shadow-lg hover:dark:bg-muted-foreground">
              <Trash className="p-4" size={56} />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-semibold">
                확실하신가요?
              </AlertDialogTitle>
              <AlertDialogDescription>
                삭제 된 포스트는 되돌릴 수 없습니다. 확인 시, 서버에서 영구 삭제
                됩니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>확인</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>{' '}
        </AlertDialog>
      </div>
    </>
  );
};

export default PreviewCard;
