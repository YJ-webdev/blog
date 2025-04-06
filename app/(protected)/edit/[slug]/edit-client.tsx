'use client';

import { ImageDropZone } from '@/app/components/image-drop-zone';
import { Tags } from '@/app/components/tags';

import EditorWrapper from '@/components/dynamic-editor';
import { Button } from '@/components/ui/button';
import { Link, Post, Tag } from '@prisma/client';
import { useActionState, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import LinkPreviews from '@/app/components/link-previews';
import { slugify } from '@/app/lib/utils';
import { publishPost } from '@/app/actions/post';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface EditClientProps {
  post: Post & { tags: Tag[]; links: Link[] };
  tagsData: Tag[];
}

export const EditClient = ({ post, tagsData }: EditClientProps) => {
  const [status, action, isPending] = useActionState(publishPost, null);
  const router = useRouter();

  const imageKey = `uploadedImage_${post.id}`;
  const tagsKey = `postTags_${post.id}`;

  const [title, setTitle] = useState(post.title || '');
  const [blob, setBlob] = useState<string | null>(post.image || null);

  // Uploaded image blob as a initial state
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

  const isFormValid = title.trim() !== '' && isContentValid && blob !== null;

  useEffect(() => {
    if (status?.success) {
      toast.success('포스트가 수정되었습니다.');
      router.push('/my-posts');
    } else if (status?.error) {
      toast.error(status.error);
    }
  }, [status, router]);
  return (
    <form
      action={action}
      className="flex flex-col items-center max-w-[1000px] mx-auto"
    >
      <input type="hidden" name="id" value={post.id} />
      <input type="hidden" name="title" value={title} />
      <input type="hidden" name="slug" value={slugify(title)} />
      <input type="hidden" name="image" value={blob || ''} />
      <input type="hidden" name="content" value={content} />
      <input type="hidden" name="tags" value={JSON.stringify(postTags ?? [])} />
      <input
        type="hidden"
        name="links"
        value={JSON.stringify(postLinks ?? [])}
      />

      <TextareaAutosize
        placeholder="제목"
        aria-label="Post title"
        autoFocus
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className="w-full mx-4 px-4 mt-4 resize-none overflow-hidden bg-transparent tracking-tight lg:text-6xl sm:text-5xl text-4xl font-bold focus:outline-none text-primary dark:placeholder-stone-400"
        spellCheck={false}
      />

      <div className="w-full max-w-[750px] px-4 flex flex-col">
        <ImageDropZone imageKey={imageKey} blob={blob} setBlob={setBlob} />

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
          linkKey={post.id}
          postLinks={postLinks}
          setPostLinks={setPostLinks}
          isEditable={true}
          isAuthor={true}
        />
      </div>

      <Button
        type="submit"
        className="fixed bottom-5 right-5 z-[99999] "
        disabled={!isFormValid || isPending}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {isPending ? '저장 후 게시중...' : '변경 사항 개시하기'}
      </Button>
    </form>
  );
};
