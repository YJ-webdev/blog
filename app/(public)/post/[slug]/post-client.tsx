'use client';

import EditorWrapper from '@/components/dynamic-editor';
import { Suspense, useState } from 'react';

import LinkPreviews from '../../../components/link-previews';
import { PrevPostType } from '@/app/lib/types';
import { PrevNext } from '../../../components/prev-next';
import { PostTags } from '@/app/components/tag-button';
import Image from 'next/image';
import { Link, Tag } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';

interface PostClientProps {
  post: {
    id: string;
    title: string | null;
    image: string | null;
    content: string | null;
    tags: Tag[];
    links: Link[];
    createdAt: Date;
  };
  prevPost?: PrevPostType;
  nextPost?: PrevPostType;
}

export const PostClient = ({ post, prevPost, nextPost }: PostClientProps) => {
  const [content, setContent] = useState(post.content || '');

  return (
    <div className="flex flex-col items-center max-w-[1000px] mx-auto">
      <h1 className="mt-4 md:w-full w-[100vw] resize-none overflow-hidden bg-transparent tracking-tight lg:text-6xl sm:text-5xl text-[2.25rem]/[2.5rem] font-bold focus:outline-none text-primary dark:placeholder-stone-400">
        {post.title}
      </h1>

      <div className="md:max-w-[750px] w-[100vw] mx-auto flex flex-col mt-2">
        <Suspense
          fallback={
            <Skeleton className="mb-5 mt-2 md:h-96 h-52 md:w-[750px] w-[100vw] rounded-lg" />
          }
        >
          <Image
            className="mb-5 mt-2 sm:h-96 h-52 md:w-[750px] w-[100vw] object-cover"
            src={post.image || 'opengraph-image.jpg'}
            alt="post image"
            width={500}
            height={500}
          />
        </Suspense>

        <EditorWrapper
          contentKey={post.id}
          editable={false}
          initialContent={content}
          onContentChange={setContent}
        />

        <div className="md:w-full w-[100vw] flex flex-wrap gap-2 mt-2 md:mb-12 mb-8">
          {post.tags.map((item) => (
            <PostTags key={item.name} item={item} />
          ))}
        </div>

        <LinkPreviews
          isEditable={false}
          linkKey={post.id}
          postLinks={post.links}
          setPostLinks={() => {}}
        />
      </div>

      <PrevNext prevPost={prevPost} nextPost={nextPost} />
    </div>
  );
};
