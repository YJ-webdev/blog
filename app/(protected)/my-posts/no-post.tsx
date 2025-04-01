'use client';

import { createPost } from '@/app/actions/post';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export const NoPost = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCreatePost = async () => {
    startTransition(async () => {
      const post = await createPost();
      if (post) {
        router.push(`/new-post/${post}`);
      }
    });
  };
  return (
    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-full max-w-md text-center">
      <div className="flex flex-col gap-2 mb-10">
        <p className="text-muted-foreground">아직 작성 된 글이 없습니다.</p>
        <p className="text-4xl">나의 첫번째 포스트 </p>
        <button
          disabled={isPending}
          onClick={handleCreatePost}
          className="hover:underline text-4xl font-semibold"
        >
          작성하러 가기
        </button>
      </div>
    </div>
  );
};
