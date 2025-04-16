'use client';

import { Suspense, useState } from 'react';

import LinkPreviews from '../../../components/link-previews';
import { PrevPostType } from '@/app/lib/types';
import { PrevNext } from '../../../components/prev-next';
import { PostTags } from '@/app/components/tag-button';
import Image from 'next/image';
import { Link, Tag } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';
import Tiptap from '@/components/tiptap/tiptap';

interface PostClientProps {
  postId: string;
  postTitle: string | null;
  postImage: string | null;
  postContent: string | null;
  postTags: Tag[];
  postLinks: Link[];
  postCreatedAt: Date;

  prevPost?: PrevPostType;
  nextPost?: PrevPostType;
}

export const PostClient = ({
  postId,
  postTitle,
  postImage,
  postContent,
  postTags,
  postLinks,
  prevPost,
  nextPost,
}: PostClientProps) => {
  const [content, setContent] = useState(postContent || '');

  return (
    <div className="flex flex-col w-full items-center mx-auto">
      <h1 className="mt-4 resize-none overflow-hidden bg-transparent tracking-tight lg:text-6xl sm:text-5xl text-[2.25rem]/[2.5rem] font-bold focus:outline-none text-primary dark:placeholder-stone-400">
        {postTitle}
      </h1>

      <div className="mx-auto md:w-[750px] sm:w-[600px] w-full flex flex-col mt-2">
        <Suspense
          fallback={
            <Skeleton className="mb-5 mt-2 md:h-96 h-52  w-full rounded-lg" />
          }
        >
          <Image
            className="mb-5 mt-2 aspect-video w-full h-auto object-cover"
            src={postImage || 'opengraph-image.jpg'}
            alt="post image"
            width={500}
            height={500}
          />
        </Suspense>

        <Tiptap
          contentKey={postId}
          editable={false}
          initialContent={content}
          setContent={setContent}
        />

        <div className="max-w-[750px] w-full flex flex-wrap gap-2 md:mb-12 mb-8">
          {postTags.map((item) => (
            <PostTags key={item.name} item={item} />
          ))}
        </div>

        <LinkPreviews
          isEditable={false}
          linkKey={postId}
          postLinks={postLinks}
          setPostLinks={() => {}}
        />
      </div>

      <PrevNext prevPost={prevPost} nextPost={nextPost} />
    </div>
  );
};
