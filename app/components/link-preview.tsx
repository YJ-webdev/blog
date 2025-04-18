import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Link as LinkType } from '@prisma/client';
import { X } from 'lucide-react';

interface LinkPreviewProps {
  preview: LinkType;
  isEditable?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const LinkPreview = ({ preview, onClick, isEditable }: LinkPreviewProps) => {
  return (
    <div className="relative mb-2 rounded-sm shadow-md md:max-w-[250px] w-full mx-auto border">
      <Link
        href={preview.url!}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary  overflow-hidden sm:hover:underline transition-all duration-150 ease-linear "
      >
        <Card className="border-none h-full flex md:flex-col rounded-sm overflow-hidden">
          {preview.image && (
            <div className="relative aspect-[3/2] overflow-hidden w-[45%] md:w-full">
              <Image
                src={preview.image}
                alt="Link preview"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover"
              />
            </div>
          )}

          <CardContent className="flex-1 md:flex-none p-5 md:p-6">
            <div className="flex flex-col gap-2">
              <CardTitle className="line-clamp-2 tracking-tight text-xl font-semibold mb-[6px]">
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
            </div>
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
      {isEditable && (
        <button
          type="button"
          className="absolute -top-3 -right-3 rounded-full bg-red-600 hover:scale-95 transition-all duration-100 shadow-lg p-1"
          onClick={onClick}
        >
          <X className="text-white bg-none w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default LinkPreview;
