'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Editor component
const Editor = dynamic(() => import('./editor'), { ssr: false });

interface EditorWrapperProps {
  editable: boolean;
  contentKey: string;
  initialContent: string;
  onContentChange: (contentKey: string) => void;
}

export default function EditorWrapper({
  editable,
  contentKey,
  initialContent,
  onContentChange,
}: EditorWrapperProps) {
  return (
    <Editor
      editable={editable}
      contentKey={contentKey}
      initialContent={initialContent}
      onContentChange={onContentChange}
    />
  );
}
