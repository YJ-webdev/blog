'use client';

import EditorWrapper from '@/components/dynamic-editor';
import { useState } from 'react';
import { Link, Post, Tag } from '@prisma/client';

import LinkPreviews from '../../../components/link-previews';
import { PrevPostType } from '@/app/lib/types';
import { PrevNext } from '../../../components/prev-next';
import { PostTags } from '@/app/components/tag-button';
import Image from 'next/image';

interface PostClientProps {
  post: Post & { tags: Tag[]; links: Link[] };
  postLinks: Link[];
  prevPost?: PrevPostType;
  nextPost?: PrevPostType;
  postTags: Tag[];
}

export const PostClient = ({
  post,
  // postLinks,
  prevPost,
  nextPost,
  postTags,
}: PostClientProps) => {
  const [content, setContent] = useState(post.content || '');

  return (
    <div className="flex flex-col items-center max-w-[1000px] mx-auto">
      <h1 className="w-full -mt-1 resize-none overflow-hidden bg-transparent tracking-tight lg:text-6xl sm:text-5xl text-4xl font-bold focus:outline-none text-primary dark:placeholder-stone-400">
        {post.title}
      </h1>

      <div className="max-w-[750px] mx-auto flex flex-col mt-2">
        <Image
          className="mb-5 mt-2 md:h-96 h-72 w-[750px] object-cover"
          src={post.image || '/images/default-image.jpg'}
          alt="post image"
          width={700}
          height={200}
          objectFit="cover"
        />

        <EditorWrapper
          contentKey={post.id}
          editable={false}
          initialContent={content}
          onContentChange={setContent}
        />

        <div className="w-full flex flex-wrap gap-2 mt-2 mb-12">
          {postTags.map((item) => (
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
