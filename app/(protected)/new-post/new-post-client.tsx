'use client';

import { ImageDropZone } from '@/app/components/image-drop-zone';
import { Tags } from '@/app/components/tags';
import LinkPreviews from '@/app/post/[slug]/link-previews';
import EditorWrapper from '@/components/dynamic-editor';
import { Button } from '@/components/ui/button';
import { Link, Tag } from '@prisma/client';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useFormStatus } from 'react-dom';

interface NewPostClientProps {
  tagsData: Tag[];
  userId: string;
}

export const NewPostClient = ({ tagsData, userId }: NewPostClientProps) => {
  const status = useFormStatus();

  const titleKey = `postTitle_${userId}`;
  const imageKey = `uploadedImage_${userId}`;
  const contentKey = `postContent_${userId}`;
  const tagsKey = `postTags_${userId}`;
  const linksKey = `postLinks_${userId}`;

  const [title, setTitle] = useState(localStorage.getItem(titleKey) || '');
  const [imageUrl, setImageUrl] = useState(
    localStorage.getItem(imageKey) || '',
  );
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

  return (
    <form className="flex flex-col items-center">
      <div className="w-full">
        <TextareaAutosize
          placeholder="제목"
          autoFocus
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            localStorage.setItem(titleKey, e.target.value);
          }}
          className="w-full resize-none overflow-hidden bg-transparent tracking-tight lg:text-6xl sm:text-5xl text-4xl font-bold focus:outline-none text-primary dark:placeholder-stone-400"
          spellCheck={false}
        />
      </div>

      <div className="w-[1000px] flex flex-col">
        <div className="w-full max-w-[750px] mx-auto flex flex-col">
          <ImageDropZone
            imageKey={imageKey}
            setImageUrl={setImageUrl}
            imageUrl={imageUrl}
          />

          <EditorWrapper
            contentKey={userId}
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
            key={userId}
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
          }}
        >
          {status.pending ? '게시중...' : '개시하기'}
        </Button>
      </div>
    </form>
  );
};
