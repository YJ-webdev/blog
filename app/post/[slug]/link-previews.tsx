'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import React, { useEffect, useState } from 'react';
import LinkPreview, { LinkViewProps } from './link-preview';
import { getPreview } from '@/app/lib/actions/preview';

import { Link, TriangleAlert } from 'lucide-react';

function getLargestFavicon(favicons: string[]): string {
  return favicons.sort((a: string, b: string) => {
    const matchA = a.match(/favicon-(\d+)/);
    const matchB = b.match(/favicon-(\d+)/);
    const sizeA = matchA ? parseInt(matchA[1]) : 0;
    const sizeB = matchB ? parseInt(matchB[1]) : 0;
    return sizeB - sizeA;
  })[0];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformResponse(res: any, url: string): LinkViewProps {
  return {
    title: 'title' in res ? res.title : null,
    description: 'description' in res ? res.description : null,
    image: 'images' in res && res.images.length > 0 ? res.images[0] : null,
    url: url,
    siteName: 'siteName' in res ? res.siteName : null,
    favicon: 'favicons' in res ? getLargestFavicon(res.favicons) : null,
  };
}

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

function normalizeUrl(url: string): string {
  if (isValidUrl(url) === false) {
    return url; // Return null or the original string if it's invalid
  } else if (!/^https?:\/\//i.test(url)) {
    return 'https://' + url;
  }
  return url;
}

interface LinkPreviewsProps {
  postId: string;
  isEditable: boolean;
  setOpenGraph?: React.Dispatch<React.SetStateAction<string[]>>;
  openGraph?: string[];
}

const LinkPreviews = ({ postId, isEditable }: LinkPreviewsProps) => {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState<Array<LinkViewProps | string>>([]);

  const [error, setError] = useState<string | null>(null);

  // Load links from localStorage when postId changes
  useEffect(() => {
    const storedLinks = localStorage.getItem(`links_${postId}`);
    if (storedLinks) {
      setLinks(JSON.parse(storedLinks));
    }
  }, [postId]);

  // Save links to localStorage
  useEffect(() => {
    if (links.length > 0) {
      localStorage.setItem(`links_${postId}`, JSON.stringify(links));
    }
  }, [links, postId]);

  const getData = async () => {
    if (!url.trim() || !isValidUrl(url)) {
      setError('Please enter a valid URL.');

      // Clear the error message after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000); // 3000ms = 3 seconds

      return;
    }

    const normalizedUrl = normalizeUrl(url);
    setUrl('');

    const res = await getPreview(normalizedUrl);
    console.log(res);

    if (typeof res === 'string') {
      setLinks((prevLinks) => [res, ...prevLinks].slice(0, 3));
      return;
    }

    const linkPreview = transformResponse(res, normalizedUrl);
    setLinks((prevLinks) => [linkPreview, ...prevLinks].slice(0, 3));
  };

  return (
    <div className="w-full mx-auto flex flex-col items-center">
      {isEditable && (
        <div className="flex flex-col w-full mb-5">
          <div className="flex w-full">
            <Input
              className="border-none bg-zinc-100 dark:bg-zinc-800 rounded-none rounded-l"
              value={url}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUrl(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // Prevent form submission
                  getData(); // Call the function manually (optional)
                }
              }}
              placeholder="Enter a URL to preview"
              autoFocus={false}
            />
            <Button
              className="rounded-none rounded-r bg-zinc-100 dark:bg-zinc-800 text-zinc-800 hover:text-zinc-500 hover:bg-slate-100 dark:text-slate-300 hover:dark:text-slate-100"
              type="button"
              onClick={getData}
            >
              <Link /> Add link
            </Button>
          </div>
          {error && (
            <p className="flex items-center justify-center w-full text-center mt-2 text-sm">
              <TriangleAlert size={16} className="mr-2" />
              {error}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col max-w-[750px]">
        <div className="grid grid-cols-1 sm:flex gap-5 justify-between w-full h-full">
          {links.map((link, index) => {
            if (typeof link === 'string') {
              return;
            } else {
              return <LinkPreview key={index} preview={link} />;
            }
          })}
        </div>
        <p className="text-xs text-center mt-4 text-muted-foreground mb-10">
          This post is part of the Coupang Partners program, and a certain
          commission is provided as a result.
        </p>
      </div>
    </div>
  );
};
export default LinkPreviews;
