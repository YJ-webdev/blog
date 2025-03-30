'use client';

import { ImageDropZone } from '@/app/components/image-drop-zone';
import { Tags } from '@/app/components/tags';
import LinkPreviews from '@/app/post/[slug]/link-previews';
import EditorWrapper from '@/components/dynamic-editor';
import { Button } from '@/components/ui/button';
import { Link, Post, Tag } from '@prisma/client';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useFormStatus } from 'react-dom';

interface EditClientProps {
  post: Post & { tags: Tag[]; links: Link[] };
  tagsData: Tag[];
}

export const EditClient = ({ post, tagsData }: EditClientProps) => {
  const status = useFormStatus();
  const imageKey = `uploadedImage_${post.id}`;
  const tagsKey = `postTags_${post.id}`;

  const [title, setTitle] = useState(post.title || '');
  const [imageUrl, setImageUrl] = useState(post.image || '');
  const [content, setContent] = useState(post.content || '');
  const [postTags, setPostTags] = useState(post.tags || []);
  const [postLinks, setPostLinks] = useState<Array<Link>>(post.links || []);

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
          onChange={(e) => setTitle(e.target.value)}
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
            contentKey={post.id}
            editable={true}
            initialContent={content}
            onContentChange={setContent}
          />

          <Tags
            tagsKey={tagsKey}
            isEditable={true}
            tagsData={tagsData}
            tags={postTags}
            setTags={setPostTags}
          />

          <LinkPreviews
            key={post.id}
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
