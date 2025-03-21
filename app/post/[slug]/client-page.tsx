'use client';

import { ImageDropZone } from '@/app/components/image-drop-zone';
import EditorWrapper from '@/components/dynamic-editor';
import { useEffect, useState } from 'react';
import { useActionState } from 'react';

import TextareaAutosize from 'react-textarea-autosize';
import LinkPreviews from './link-previews';
import { Button } from '@/components/ui/button';

import { toast } from 'sonner';

type SelectedPost = {
  id: string;
  title: string | null;
  content: string | null;
  image: string | null;
  authorId: string;
  tags: string[];
  links: string[];
};

interface ClientPageProps {
  post: SelectedPost;
  userId: string; // Pass the userId to the component
}

export const ClientPage = ({ post, userId }: ClientPageProps) => {
  const titleKey = `postTitle_${post.id}`;
  const imageKey = `uploadedImage_${post.id}`;
  const [title, setTitle] = useState(
    () => localStorage.getItem(titleKey) ?? post.title ?? '',
  );
  const [imageUrl, setImageUrl] = useState(
    () => localStorage.getItem(imageKey) ?? post.image ?? '',
  );
  const [content, setContent] = useState(post.content || '');
  // const [tags, setTags] = useState<string[]>(post.tags || []);
  // const [openGraph, setOpenGraph] = useState<string[]>(post.links || []);

  const isEditable = userId === post.authorId;
  const isFormValid = title.trim() !== '' && imageUrl !== null;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(titleKey, title);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [title, titleKey]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(`postContent_${post.id}`, content);
    }, 10000); // 10 seconds

    return () => clearTimeout(timeoutId); // Clean up timeout if content changes
  }, [content, post.id]);

  const [, formAction, isPending] = useActionState(async () => {
    try {
      const formData = new FormData();
      formData.append('id', post.id);
      formData.append('title', title);
      // formData.append('content', content);
      if (imageUrl) {
        formData.append('image', imageUrl);
      }

      await fetch('/api/post', {
        method: 'POST',
        body: formData,
      });

      toast.success('Post published successfully! 🎉');
    } catch {
      toast.error('Failed to publish post. Please try again.');
    }
  }, null);

  return (
    <form onSubmit={formAction}>
      <input type="hidden" name="id" value={post.id} />
      <input type="hidden" name="title" value={title} />
      {/* <input type="hidden" name="content" value={content} /> */}
      <input type="hidden" name="image" value={imageUrl ?? undefined} />

      <div className="relative">
        <div className="lg:-ml-24 lg:w-[125%] sm:w-[100%] w-[95%] -mt-14">
          <TextareaAutosize
            placeholder="Untitled"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full resize-none overflow-hidden bg-transparent tracking-tight lg:text-6xl sm:text-5xl text-4xl font-bold focus:outline-none text-primary dark:placeholder-stone-400"
            disabled={!isEditable} // Disable title input if not editable
          />
        </div>

        <ImageDropZone
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          isEditable={isEditable}
          imageKey={imageKey}
        />

        <EditorWrapper
          postId={post.id}
          editable={isEditable} // Make editor editable only for the author
          initialContent={content}
          onContentChange={setContent}
        />

        <LinkPreviews
          isEditable={isEditable}
          postId={post.id}
          // setOpenGraph={setOpenGraph}
          // openGraph={openGraph}
        />

        {isEditable && (
          <Button
            type="submit"
            className="fixed bottom-5 right-5"
            disabled={!isFormValid || isPending}
          >
            Publish this Post
          </Button>
        )}
      </div>
    </form>
  );
};
