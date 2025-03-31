'use client';

import { ImageDropZone } from '@/app/components/image-drop-zone';
import { Tags } from '@/app/components/tags';

import EditorWrapper from '@/components/dynamic-editor';
import { Button } from '@/components/ui/button';
import { Link, Tag } from '@prisma/client';
import { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import LinkPreviews from '@/app/components/link-previews';
import { slugify } from '@/app/lib/utils';
import { publishPost } from '@/app/actions/post';

interface NewPostClientProps {
  postId: string;
  tagsData: Tag[];
}

export const NewPostClient = ({
  tagsData,

  postId,
}: NewPostClientProps) => {
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

  return (
    <form
      action={publishPost}
      className="flex flex-col max-w-[1000px] mx-auto items-center"
    >
      <input type="hidden" value={postId} name="id" />
      <input type="hidden" value={title ?? ''} name="title" />
      <input type="hidden" value={slugify(title) ?? 'no-slug'} name="slug" />
      <input type="hidden" value={imageUrl ?? ''} name="image" />
      <input type="hidden" value={content ?? ''} name="content" />
      <input type="hidden" value={JSON.stringify(postTags ?? [])} name="tags" />
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
        className="w-full mx-4 px-4 resize-none overflow-hidden bg-transparent tracking-tight lg:text-6xl sm:text-5xl text-4xl font-bold focus:outline-none text-primary dark:placeholder-stone-400"
        spellCheck={false}
      />
      <div className="w-full max-w-[750px] pl-2 pr-4 flex flex-col">
        <ImageDropZone
          imageKey={imageKey}
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
        />

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
        disabled={!isFormValid}
        onClick={(event) => {
          event.stopPropagation();
          console.log(status);
        }}
      >
        개시하기
      </Button>
    </form>
  );
};
