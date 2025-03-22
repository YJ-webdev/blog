'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Editor component
const Editor = dynamic(() => import('./editor'), { ssr: false });

interface EditorWrapperProps {
  editable: boolean;
  postId: string;
  initialContent?: string;
  onContentChange: (content: string) => void;
}

export default function EditorWrapper({
  editable,
  postId,
  initialContent,
  onContentChange,
}: EditorWrapperProps) {
  return (
    <Editor
      editable={editable}
      postId={postId}
      initialContent={initialContent}
      onContentChange={onContentChange}
    />
  );
}
