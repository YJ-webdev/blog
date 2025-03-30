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
  // const titleKey = `postTitle_${post.id}`;
  // const imageKey = `uploadedImage_${post.id}`;
  // const slugKey = `postSlug_${post.id}`;

  // const [title, setTitle] = useState(
  //   () => localStorage.getItem(titleKey) ?? post.title ?? '',
  // );
  // const [imageUrl, setImageUrl] = useState(
  //   () => localStorage.getItem(imageKey) ?? post.image ?? '',
  // );
  // const [adLinks, setAdLinks] = useState<Array<LinkPrisma | string>>([]);
  const [content, setContent] = useState(post.content || '');
  // const [slug, setSlug] = useState(
  //   localStorage.getItem(slugKey) || post.slug || '',
  // );

  // const [tags, setTags] = useState<Tag[]>(() => {
  //   const storedTags = localStorage.getItem(tagsKey);
  //   const parsedTags = storedTags ? JSON.parse(storedTags) : post.tags || [];

  //   return parsedTags;
  // });
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const isEditable = userId === post.authorId;

  // const parsedContent =
  //   typeof content === 'string' ? JSON.parse(content || '[]') : content;

  // const isContentValid =
  //   Array.isArray(parsedContent) &&
  //   parsedContent.some(
  //     (block) =>
  //       (block.content && block.content.length > 0) ||
  //       (block.children && block.children.length > 0),
  //   );

  // const isFormValid = title.trim() !== '' && isContentValid && imageUrl !== '';

  // useEffect(() => {
  //   if (!isEditable) return;

  //   setSlug(slugify(title));

  //   const timeoutId = setTimeout(() => {
  //     localStorage.setItem(titleKey, title);
  //     localStorage.setItem(slugKey, slug);
  //   }, 300);
  //   return () => clearTimeout(timeoutId);
  // }, [title, titleKey, isEditable, slug, slugKey]);

  // const gatherFormData = () => {
  //   const formData = new FormData();
  //   const savedTags = localStorage.getItem(tagsKey);

  //   if (savedTags) {
  //     formData.append('tags', savedTags);
  //   }
  //   formData.append('id', post.id);
  //   formData.append('title', title);
  //   formData.append('slug', slug);
  //   formData.append('content', content);
  //   if (imageUrl) formData.append('image', imageUrl);
  //   formData.append('links', JSON.stringify(adLinks));

  //   return formData;
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!isFormValid) {
  //     return toast.error('Please fill in all required fields');
  //   }

  //   try {
  //     setIsSubmitting(true);
  //     const formData = gatherFormData();
  //     const response = await fetch('/api/post', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       toast.success('Post published successfully! 🎉');

  //       router.push('/');
  //     } else {
  //       toast.error('Failed to publish post. Please try again.');
  //     }
  //   } catch {
  //     toast.error('Failed to publish post. Please try again.');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <div className="relative w-full">
      <PrevNext prevPost={prevPost} nextPost={nextPost} />

      <div className="w-full flex flex-col">
        <Image
          className="w-full object-cover md:h-96 h-72 my-5"
          src={post.image || '/images/default-image.jpg'}
          alt="post image"
          width={1000}
          height={500}
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
    </div>
  );
};
