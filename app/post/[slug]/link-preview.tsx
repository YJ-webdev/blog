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
import { Link as LinkType } from '@prisma/client';

const LinkPreview: React.FC<{ preview: LinkType }> = ({ preview }) => {
  return (
    <Link
      href={preview.url!}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary rounded-sm md:max-w-[250px] w-full mx-auto overflow-hidden shadow-md sm:hover:underline transition-all duration-150 ease-linear mt-8 mb-2"
    >
      <Card className="border-none h-full">
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
          <CardTitle className="line-clamp-2 tracking-tight text-xl font-semibold">
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
            <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
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
