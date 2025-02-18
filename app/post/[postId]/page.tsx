import Image from 'next/image';
import { Editor } from './editor';

interface BlogIdPageProps {
  params: Promise<{ postId: string }>;
}

export default async function BlogIdPage({ params }: BlogIdPageProps) {
  const { postId } = await params;

  return (
    <div className="max-w-[750px] mx-auto flex flex-col gap-10 dark:text-muted-foreground">
      <div className="relative w-full md:h-96 h-72">
        <Image src="/preview-image.jpg" alt="Preview" fill objectFit="cover" />
      </div>{' '}
      <div className="flex flex-col gap-4">
        <p className="text-2xl">{postId}</p>
        <Editor />
      </div>
    </div>
  );
}
