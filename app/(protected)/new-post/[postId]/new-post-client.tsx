'use client';

import dynamic from 'next/dynamic';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Link, Tag } from '@prisma/client';
import { publishPost } from '@/app/actions/post';

import LinkPreviews from '@/app/components/link-previews';
import { Tags } from '@/app/components/tags';
import { Button } from '@/components/ui/button';
import TextareaAutosize from 'react-textarea-autosize';
import { slugify } from '@/app/lib/utils';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { upload } from '@vercel/blob/client';
const ImageDropZone = dynamic(
  () => import('@/app/components/image-drop-zone'),
  {
    loading: () => <Skeleton className="w-full aspect-video h-auto" />,
    ssr: false,
  },
);
const Tiptap = dynamic(() => import('@/components/tiptap/tiptap'), {
  loading: () => (
    <div className="flex flex-col gap-4 max-w-[750px] w-full mb-6">
      <Skeleton className="w-full h-6 rounded-full" />
      <Skeleton className="w-full h-6 rounded-full" />
      <Skeleton className="w-full h-6 rounded-full" />
      <Skeleton className="w-full h-6 rounded-full" />
      <Skeleton className="w-full h-6 rounded-full" />
      <Skeleton className="w-full h-6 rounded-full" />
    </div>
  ),
  ssr: false,
});

interface NewPostClientProps {
  postId: string;
  tagsData: Tag[];
}

export const NewPostClient = ({ tagsData, postId }: NewPostClientProps) => {
  const [status, action, isPending] = useActionState(publishPost, null);
  const router = useRouter();

  const titleKey = `postTitle_${postId}`;
  const imageKey = `uploadedImage_${postId}`;
  const contentKey = `postContent_${postId}`;
  const tagsKey = `postTags_${postId}`;
  const linksKey = `postLinks_${postId}`;

  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const [content, setContent] = useState('');

  const [postTags, setPostTags] = useState<Tag[]>([]);
  const [postLinks, setPostLinks] = useState<Array<Link>>([]);

  // Load saved values from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTitle = localStorage.getItem(titleKey);
      const storedTags = localStorage.getItem(tagsKey);
      const storedLinks = localStorage.getItem(linksKey);
      if (storedTitle) setTitle(storedTitle);
      if (storedTags) setPostTags(JSON.parse(storedTags));
      if (storedLinks) setPostLinks(JSON.parse(storedLinks));
    }
  }, [titleKey, imageKey, contentKey, tagsKey, linksKey]);

  const isFormValid = title.trim() !== '' && content !== '' && file !== null;

  useEffect(() => {
    if (status?.success) {
      toast.success('포스트가 게시되었습니다.');
      router.push('/my-posts');
    } else if (status?.error) {
      toast.error(status.error);
    }
  }, [status, router]);

  const handleSubmit = async () => {
    if (!file) {
      return toast.error('이미지를 찾을 수 없습니다.');
    }

    try {
      // Upload the new file with the same key
      const { url } = await upload(imageKey, file, {
        access: 'public',
        handleUploadUrl: '/api/post/upload',
      });

      // Prepare form data
      const formData = new FormData();
      formData.append('id', postId);
      formData.append('title', title);
      formData.append('slug', slugify(title));
      formData.append('content', content);
      formData.append('image', url);
      formData.append('links', JSON.stringify(postLinks));
      formData.append('tags', JSON.stringify(postTags));

      // Submit
      startTransition(() => {
        action(formData);
      });
    } catch (error) {
      console.error('❌ Error during image upload or submission:', error);
      toast.error('업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <form className="flex flex-col max-w-[1000px] px-4 mx-auto items-center">
        <TextareaAutosize
          placeholder="제목"
          autoFocus
          value={title}
          onChange={(e) => {
            localStorage.setItem(titleKey, e.target.value);
            setTitle(e.target.value);
          }}
          className="lg:w-[1000px] w-full mt-4 pb-4 resize-none overflow-hidden bg-white tracking-tight lg:text-6xl sm:text-5xl text-4xl font-bold focus:outline-none text-primary dark:placeholder-stone-400"
          spellCheck={false}
        />

        <div className="w-full max-w-[750px] flex flex-col z-10 gap-4">
          <ImageDropZone imageKey={imageKey} setFile={setFile} />

          <Tiptap
            contentKey={contentKey}
            editable={true}
            setContent={setContent}
          />

          <Tags
            tagsKey={tagsKey}
            tagsData={tagsData}
            tags={postTags}
            setTags={setPostTags}
            isEditable={true}
          />

          <LinkPreviews
            linkKey={postId}
            postLinks={postLinks}
            setPostLinks={setPostLinks}
            isEditable={true}
          />
        </div>

        <Button
          type="button"
          onClick={handleSubmit}
          className="fixed bottom-5 right-5 z-[99999]"
          disabled={!isFormValid || isPending}
        >
          {isPending ? '게시중...' : '개시하기'}
        </Button>
      </form>
    </>
  );
};
