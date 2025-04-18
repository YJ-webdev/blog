'use client';

import { useState } from 'react';

import LinkPreviews from '../../../components/link-previews';
import { PrevPostType } from '@/app/lib/types';
import { PrevNext } from '../../../components/prev-next';
import { PostTags } from '@/app/components/tag-button';
import Image from 'next/image';
import { Link, Tag } from '@prisma/client';

import Tiptap from '@/components/tiptap/tiptap';

interface PostClientProps {
  postId: string;
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
      <div className="mx-auto max-w-[750px] w-full flex flex-col mt-4">
        <div className="relative w-full mb-2">
          <Image
            className="aspect-video w-full h-auto object-cover"
            src={postImage || 'opengraph-image.jpg'}
            alt="post image"
            width={500}
            height={500}
          />
        </div>

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
