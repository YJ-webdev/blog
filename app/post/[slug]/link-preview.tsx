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
  return (
    <Link
      href={preview.url!}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary border hover:underline rounded-lg w-full overflow-hidden sm:hover:shadow-xl transition-all duration-150 ease-linear"
    >
      <Card className="border-none shadow-none">
        {preview.image && (
          <div className="relative aspect-video">
            <Image
              src={preview.image}
              alt="Link preview"
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="line-clamp-2 tracking-tight text-lg">
            {preview.title}
          </CardTitle>
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
            <p className="text-sm text-muted-foreground -mt-2 line-clamp-3 mb-2">
              {preview.description}
            </p>
          )}
          {preview.url && (
            <CardDescription>{new URL(preview.url).hostname}</CardDescription>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default LinkPreview;
