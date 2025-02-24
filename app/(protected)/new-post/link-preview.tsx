'use client';

import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export interface LinkViewProps {
  title: string | null;
  description: string | null;
  image: string | null;
  url: string | null;
  siteName: string | null;
  favicon: string | null;
}

const LinkPreview: React.FC<{ preview: LinkViewProps }> = ({ preview }) => {
  console.log(preview);
  // Provide a fallback image if preview.image is null
  const imageUrl = preview.image?.startsWith('//')
    ? 'https:' + preview.image // Add https:// if it starts with //
    : preview.image ||
      'https://images.unsplash.com/photo-1726064856002-fe00cbbd5898?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // Replace with your default image path

  return (
    <Card className="w-full max-w-sm overflow-hidden md:hover:shadow-xl transition-all duration-150 ease-linear">
      <div className="relative aspect-video">
        <Image
          src={imageUrl}
          alt="Link preview"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-2">{preview.title}</CardTitle>
        {preview.siteName && (
          <CardDescription className="flex items-center">
            {preview.favicon && (
              <Image
                src={preview.favicon}
                alt={`${preview.siteName} favicon`}
                width={16}
                height={16}
                className="mr-2"
              />
            )}
            {preview.siteName}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {preview.description && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
            {preview.description}
          </p>
        )}
        {preview.url && (
          <CardDescription>
            <Link
              href={preview.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {new URL(preview.url).hostname}
            </Link>
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
};

export default LinkPreview;
