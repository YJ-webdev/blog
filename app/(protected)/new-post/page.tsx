import { Editor } from '@/components/dynamic-editor';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { ImageDropZone } from '@/app/components/image-drop-zone';

export default async function NewPostPage() {
  const session = await auth();

  if (!session) {
    return redirect('/');
  }

  return (
    <div className="max-w-[750px] mx-auto flex flex-col gap-10 dark:text-muted-foreground">
      <ImageDropZone />
      <Editor />
    </div>
  );
}
