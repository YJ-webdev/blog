'use client';

import { type PutBlobResult } from '@vercel/blob';

import { ImageDropZone } from '@/app/components/image-drop-zone';
import { Tags } from '@/app/components/tags';

import EditorWrapper from '@/components/dynamic-editor';
import { Button } from '@/components/ui/button';
import { Link, Tag } from '@prisma/client';
import { useActionState, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import LinkPreviews from '@/app/components/link-previews';
import { slugify } from '@/app/lib/utils';
import { publishPost } from '@/app/actions/post';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface NewPostClientProps {
  postId: string;
  tagsData: Tag[];
}

// const postId = 'abc123'; // your current post's ID
// const file = selectedFile;

// const res = await fetch('/api/upload', {
//   method: 'POST',
//   body: JSON.stringify({
//     filename: `${postId}/${file.name}`, // 👈 upload to /abc123/filename.jpg
//     contentType: file.type,
//   }),
//   headers: { 'Content-Type': 'application/json' },
// });

export const NewPostClient = ({
  tagsData,

  postId,
}: NewPostClientProps) => {
  // const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const [status, action, isPending] = useActionState(publishPost, null);
  const router = useRouter();

  const titleKey = `postTitle_${postId}`;
  const imageKey = `uploadedImage_${postId}`;
  const contentKey = `postContent_${postId}`;
  const tagsKey = `postTags_${postId}`;
  const linksKey = `postLinks_${postId}`;

  const [title, setTitle] = useState(localStorage.getItem(titleKey) || '');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState(
    localStorage.getItem(contentKey) || '',
  );
  const [postTags, setPostTags] = useState<Tag[]>(() => {
    const storedTags = localStorage.getItem(tagsKey);
    return storedTags ? JSON.parse(storedTags) : [];
  });

  const [postLinks, setPostLinks] = useState<Array<Link>>(() => {
    const storedLinks = localStorage.getItem(linksKey);
    return storedLinks ? JSON.parse(storedLinks) : [];
  });

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
    if (typeof window !== 'undefined') {
      setTitle(localStorage.getItem(titleKey) || '');
      setImageUrl(localStorage.getItem(imageKey) || '');
    }
  }, [setTitle, setImageUrl, titleKey, imageKey]);

  useEffect(() => {
    if (status?.success) {
      toast.success('포스트가 게시되었습니다.');
      router.push('/my-posts');
    } else if (status?.error) {
      toast.error(status.error);
    }
  }, [status, router]);
  return (
    <>
      <form
        action={action}
        className="flex flex-col max-w-[1000px] px-4 mx-auto items-center"
      >
        <input type="hidden" value={postId} name="id" />
        <input type="hidden" value={title ?? ''} name="title" />
        <input type="hidden" value={slugify(title) ?? 'no-slug'} name="slug" />
        <input type="hidden" name="image" value={blob?.url ?? ''} />
        <input type="hidden" value={content ?? ''} name="content" />
        <input
          type="hidden"
          value={JSON.stringify(postTags ?? [])}
          name="tags"
        />
        <input
          type="hidden"
          value={JSON.stringify(postLinks ?? [])}
          name="links"
        />

        <TextareaAutosize
          placeholder="제목"
          autoFocus
          value={title}
          onChange={(e) => {
            localStorage.setItem(titleKey, e.target.value);
            setTitle(e.target.value);
          }}
          className="w-full mt-4 resize-none overflow-hidden bg-transparent tracking-tight lg:text-6xl sm:text-5xl text-4xl font-bold focus:outline-none text-primary dark:placeholder-stone-400"
          spellCheck={false}
        />
        <div className="w-full max-w-[750px] flex flex-col">
          <ImageDropZone imageKey={imageKey} blob={blob} setBlob={setBlob} />

          <EditorWrapper
            contentKey={postId}
            editable={true}
            initialContent={content}
            onContentChange={setContent}
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
          type="submit"
          className="fixed bottom-5 right-5 z-[99999]"
          disabled={!isFormValid || isPending}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {isPending ? '게시중...' : '개시하기'}
        </Button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
};
