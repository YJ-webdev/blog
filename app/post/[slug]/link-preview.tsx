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
import { Noto_Sans_KR } from 'next/font/google';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'], // Ensure Korean characters load
  weight: ['400', '500', '600', '700'], // Adjust weights as needed
  variable: '--font-noto-sans-kr', // Define a CSS variable
});

const LinkPreview: React.FC<{ preview: LinkType }> = ({ preview }) => {
  return (
    <Link
      href={preview.url!}
      target="_blank"
      rel="noopener noreferrer"
      className={`${notoSansKR.className} text-primary border hover:underline rounded-lg w-full overflow-hidden sm:hover:shadow-xl transition-all duration-150 ease-linear`}
    >
      <Card className="border-none h-full shadow-none">
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
          <CardTitle className="line-clamp-2 tracking-tight text-lg font-medium">
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
