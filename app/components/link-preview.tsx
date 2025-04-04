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
import { X } from 'lucide-react';

interface LinkPreviewProps {
  preview: LinkType;
  isAuthor?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const LinkPreview = ({ preview, onClick, isAuthor }: LinkPreviewProps) => {
  return (
    <div className="relative mt-8 mb-2 rounded-sm shadow-md md:max-w-[250px] w-full mx-auto">
      <Link
        href={preview.url!}
        target="_blank"
        rel="noopener noreferrer"
        className=" text-primary  overflow-hidden sm:hover:underline transition-all duration-150 ease-linear "
      >
        <Card className="border-none h-full">
          {preview.image && (
            <div className="relative aspect-video  overflow-hidden">
              <Image
                src={preview.image}
                alt="Link preview"
                layout="fill"
                className="object-cover"
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
      </Link>{' '}
      {isAuthor && (
        <button
          type="button"
          className="absolute rounded-full bg-red-600 hover:scale-95 transition-all duration-100 shadow-lg p-1 -top-3 -right-3"
          onClick={onClick}
        >
          <X className="text-white bg-none w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default LinkPreview;
