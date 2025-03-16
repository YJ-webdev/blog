'use client';

import { ImageDropZone } from '@/app/components/image-drop-zone';
import EditorWrapper from '@/components/dynamic-editor';

import { useEffect, useState, useTransition } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import LinkPreviews from './link-previews';
import { Button } from '@/components/ui/button';
import { publishPost } from '@/app/actions/post';
import { toast } from 'sonner'; // Importing the toast function

export const ClientPage = ({ postId }: { postId: string }) => {
  const [title, setTitle] = useState('Untitled');
  const [isPending] = useTransition();
  const [isPublishing, setIsPublishing] = useState(false);

  // Unique keys for each post based on postId
  const titleKey = `typedTitle_${postId}`;
  const imageKey = `postImage_${postId}`;

  useEffect(() => {
    // Reset localStorage for a new post or if postId changes
    if (!postId) {
      // Clear localStorage for the new post
      localStorage.removeItem(titleKey); // Remove previous title
      localStorage.removeItem(imageKey); // Remove previous image

      // Reset the title and other state variables for a new post
      setTitle('Untitled');
    } else {
      // Load title from localStorage specific to the current postId
      const storedText = localStorage.getItem(titleKey);
      if (storedText) {
        setTitle(storedText);
      }
    }
  }, [postId, imageKey, titleKey]); // Ensure this runs when the postId changes

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    // Save the title in localStorage for the specific post
    localStorage.setItem(titleKey, e.target.value);
  };

  const handlePublishPost = async () => {
    setIsPublishing(true);

    try {
      await publishPost(postId);
      toast.success('Post published successfully!'); // Success toast
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to publish the post. Please try again.'); // Error toast
    } finally {
      setIsPublishing(false);
    }
  };

  const isFormValid = title.trim() !== ''; // Add any other validation you need here

  return (
    <div className="relative">
      <div className="lg:-ml-24 lg:w-[125%] sm:w-[100%] w-[95%] -mt-14">
        <TextareaAutosize
          placeholder="Title"
          autoFocus
          value={title}
          onChange={handleTitleChange}
          className="w-full resize-none overflow-hidden bg-transparent tracking-tight lg:text-6xl sm:text-5xl text-4xl font-bold focus:outline-none text-primary dark:placeholder-stone-400"
        />
      </div>
      <ImageDropZone postId={postId} />
      <EditorWrapper postId={postId} />

      <LinkPreviews postId={postId} />

      <Button
        className="fixed bottom-5 right-5"
        onClick={handlePublishPost}
        disabled={isPending || !isFormValid || isPublishing}
      >
        {isPublishing ? 'Publishing...' : 'Publish this Post'}
      </Button>
    </div>
  );
};
