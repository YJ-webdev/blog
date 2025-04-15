'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
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
import {
  BookMinus,
  BookPlus,
  EditIcon,
  EyeIcon,
  MoreHorizontal,
  TrashIcon,
} from 'lucide-react';
import { deletePost, togglePublishPost } from '@/app/actions/post';
import { Post } from './columns';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function PostActionsCell({ post }: { post: Post }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deletePost(post.slug!);
      router.refresh(); // Refresh the current page
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 text-primary">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="center">
        <DropdownMenuItem asChild>
          <Link
            href={post.slug ? `/edit/${post.slug}` : `/new-post/${post.id}`}
            className="flex items-center gap-2 cursor-pointer"
          >
            <EditIcon />
            {post.slug ? '수정' : '작성하기'}
          </Link>
        </DropdownMenuItem>
        {post.slug && (
          <DropdownMenuItem asChild>
            <Link
              href={`/post/${post.slug}`}
              className="flex items-center gap-2 cursor-pointer"
            >
              <EyeIcon />
              보기
            </Link>
          </DropdownMenuItem>
        )}
        {post.slug && post.image && (
          <DropdownMenuItem
            onClick={() =>
              startTransition(() => {
                togglePublishPost(post.slug!);
                toast.success('공개 설정이 변경되었습니다.');
              })
            }
            disabled={isPending}
            className={isPending ? 'opacity-50 pointer-events-none' : ''}
          >
            {post.published ? (
              <>
                <BookMinus /> {isPending ? '변경 중...' : '비공개로 전환'}
              </>
            ) : (
              <>
                <BookPlus /> {isPending ? '변경 중...' : '공개하기'}
              </>
            )}
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator className="my-1" />
        {post.slug ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-red-600 hover:text-red-500"
              >
                <TrashIcon />
                삭제
              </DropdownMenuItem>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {`"${post.title}"를(을) 정말 삭제하시겠습니까?`}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  삭제가 확인된 포스트는 되돌릴 수 없습니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  확인
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <span className="flex gap-2 text-sm p-2 cursor-default text-red-600">
            <TrashIcon size="18" /> 삭제불가
          </span>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
