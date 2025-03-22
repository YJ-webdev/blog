'use client';

import { ImageDropZone } from '@/app/components/image-drop-zone';
import EditorWrapper from '@/components/dynamic-editor';
import { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import LinkPreviews from './link-previews';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Link } from '@prisma/client';

type SelectedPost = {
  id: string;
  title: string | null;
  content: string | null;
  image: string | null;
  authorId: string;
  tags: string[];
  published: boolean;
};

interface ClientPageProps {
  post: SelectedPost;
  userId: string;
  postLinks?: Link[];
}

export const ClientPage = ({ post, userId, postLinks }: ClientPageProps) => {
  const titleKey = `postTitle_${post.id}`;
  const imageKey = `uploadedImage_${post.id}`;

  const [title, setTitle] = useState(
    () => localStorage.getItem(titleKey) ?? post.title ?? '',
  );
  const [imageUrl, setImageUrl] = useState(
    () => localStorage.getItem(imageKey) ?? post.image ?? '',
  );
  const [adLinks, setAdLinks] = useState<Array<Link | string>>([]);
  const [content, setContent] = useState(post.content || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditable = userId === post.authorId;
  const parsedContent =
    typeof content === 'string' ? JSON.parse(content || '[]') : content;

  // const parsedLinks =
  //   typeof post.links === 'string' ? JSON.parse(post.links) : post.links;

  const isContentValid =
    Array.isArray(parsedContent) &&
    parsedContent.some(
      (block) =>
        (block.content && block.content.length > 0) ||
        (block.children && block.children.length > 0),
    );

  const isFormValid =
    title.trim() !== '' && isContentValid && imageUrl !== null;

  useEffect(() => {
    if (!isEditable) return;
    const timeoutId = setTimeout(
      () => localStorage.setItem(titleKey, title),
      300,
    );
    return () => clearTimeout(timeoutId);
  }, [title, titleKey, isEditable]);

  const gatherFormData = () => {
    const formData = new FormData();
    formData.append('id', post.id);
    formData.append('title', title);
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
      await fetch('/api/post', {
        method: 'POST',
        body: formData,
      });

      toast.success('Post published successfully! 🎉');
    } catch {
      toast.error('Failed to publish post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col">
      <input type="hidden" name="id" value={post.id} />
      <input type="hidden" name="title" value={title} />
      <input type="hidden" name="content" value={content} />
      <input type="hidden" name="image" value={imageUrl ?? ''} />
      <input type="hidden" name="links" value={JSON.stringify(adLinks)} />

      <TextareaAutosize
        placeholder="Untitled"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full resize-none overflow-hidden bg-transparent tracking-tight lg:text-6xl sm:text-5xl text-4xl font-bold focus:outline-none text-primary dark:placeholder-stone-400"
        disabled={!isEditable}
        spellCheck={false}
      />

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

      <LinkPreviews
        isEditable={isEditable}
        postId={post.id}
        setAdLinks={setAdLinks as React.Dispatch<React.SetStateAction<Link[]>>}
        postLinks={postLinks as Link[]}
      />

      {isEditable && (
        <Button
          type="submit"
          className="fixed bottom-5 right-5 z-[99999]"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting
            ? 'Publishing...'
            : post.published === false
              ? 'Publish this Post'
              : 'Update & Publish'}
        </Button>
      )}
    </form>
  );
};
