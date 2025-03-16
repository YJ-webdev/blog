'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Editor component
const Editor = dynamic(() => import('./editor'), { ssr: false });

interface EditorWrapperProps {
  postId: string; // The postId passed from the parent component
}

export default function EditorWrapper({ postId }: EditorWrapperProps) {
  return <Editor postId={postId} />; // Pass the postId to the Editor component
}
