'use client';

import { ImageDropZone } from '@/app/components/image-drop-zone';
import EditorWrapper from '@/components/dynamic-editor';

import { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import LinkPreviews from './link-previews';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Link as LinkPrisma, Post, Tag } from '@prisma/client';
import { slugify } from '@/app/lib/utils';
import { Tags } from '@/app/components/tags';

import { PrevPostType } from '@/app/lib/types';
import { PrevNext } from './prev-next';
import { useRouter } from 'next/navigation';

interface ClientPageProps {
  post: Post & { tags: Tag[] };
  userId: string;
  postLinks?: LinkPrisma[];
  tagsData: Tag[];
  prevPost: PrevPostType & { tags: Tag[] };
  nextPost: PrevPostType & { tags: Tag[] };
}

export const ClientPage = ({
  post,
  userId,
  postLinks,
  tagsData,
  prevPost,
  nextPost,
}: ClientPageProps) => {
  const router = useRouter();

  const titleKey = `postTitle_${post.id}`;
  const imageKey = `uploadedImage_${post.id}`;
  const slugKey = `postSlug_${post.id}`;
  const tagsKey = `postTags_${post.id}`;

  const [title, setTitle] = useState(
    () => localStorage.getItem(titleKey) ?? post.title ?? '',
  );
  const [imageUrl, setImageUrl] = useState(
    () => localStorage.getItem(imageKey) ?? post.image ?? '',
  );
  const [adLinks, setAdLinks] = useState<Array<LinkPrisma | string>>([]);
  const [content, setContent] = useState(post.content || '');
  const [slug, setSlug] = useState(
    localStorage.getItem(slugKey) || post.slug || '',
  );

  const [tags, setTags] = useState<Tag[]>(() => {
    const storedTags = localStorage.getItem(tagsKey);
    const parsedTags = storedTags ? JSON.parse(storedTags) : post.tags || [];

    return parsedTags;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditable = userId === post.authorId;
  const parsedContent =
    typeof content === 'string' ? JSON.parse(content || '[]') : content;

  const isContentValid =
    Array.isArray(parsedContent) &&
    parsedContent.some(
      (block) =>
        (block.content && block.content.length > 0) ||
        (block.children && block.children.length > 0),
    );

  const isFormValid = title.trim() !== '' && isContentValid && imageUrl !== '';

  useEffect(() => {
    if (!isEditable) return;

    setSlug(slugify(title));

    const timeoutId = setTimeout(() => {
      localStorage.setItem(titleKey, title);
      localStorage.setItem(slugKey, slug);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [title, titleKey, isEditable, slug, slugKey]);

  const gatherFormData = () => {
    const formData = new FormData();
    const savedTags = localStorage.getItem(tagsKey);

    if (savedTags) {
      formData.append('tags', savedTags);
    }
    formData.append('id', post.id);
    formData.append('title', title);
    formData.append('slug', slug);
    formData.append('content', content);
    if (imageUrl) formData.append('image', imageUrl);
    formData.append('links', JSON.stringify(adLinks));

    return formData;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) {
      return toast.error('Please fill in all required fields');
    }

    try {
      setIsSubmitting(true);
      const formData = gatherFormData();
      const response = await fetch('/api/post', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Post published successfully! 🎉');

        router.push('/');
      } else {
        toast.error('Failed to publish post. Please try again.');
      }
    } catch {
      toast.error('Failed to publish post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full">
      <PrevNext prevPost={prevPost} nextPost={nextPost} post={post} />

      <form onSubmit={handleSubmit} className="w-full flex flex-col">
        {isEditable && post.title === null && (
          <TextareaAutosize
            placeholder="제목"
            autoFocus
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="w-full resize-none overflow-hidden bg-transparent tracking-tight lg:text-6xl sm:text-5xl text-4xl font-bold focus:outline-none text-primary dark:placeholder-stone-400"
            disabled={!isEditable}
            spellCheck={false}
          />
        )}

        <ImageDropZone
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          isEditable={isEditable}
          imageKey={imageKey}
        />

        <EditorWrapper
          postId={post.id}
          editable={isEditable}
          initialContent={content}
          onContentChange={setContent}
        />

        <Tags
          tagsKey={tagsKey}
          isEditable={isEditable}
          tagsData={tagsData}
          tags={tags}
          setTags={setTags}
        />

        <LinkPreviews
          isEditable={isEditable}
          postId={post.id}
          setAdLinks={
            setAdLinks as React.Dispatch<React.SetStateAction<LinkPrisma[]>>
          }
          postLinks={postLinks as LinkPrisma[]}
        />

        {isEditable && (
          <Button
            type="submit"
            className="fixed bottom-5 right-5 z-[99999]"
            disabled={!isFormValid || isSubmitting}
            onClick={(event) => event.stopPropagation()}
          >
            {isSubmitting
              ? '게시중...'
              : post.published === false
                ? '게시하기'
                : '수정 완료 및 게시'}
          </Button>
        )}
      </form>
    </div>
  );
};
