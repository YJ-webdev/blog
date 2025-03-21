'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import React, { useEffect, useState } from 'react';
import LinkPreview, { LinkViewProps } from './link-preview';
import { getPreview } from '@/app/lib/actions/preview';
import SimpleLinkPreview from './simple-link-preview';

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

function normalizeUrl(url: string): string {
  if (!/^https?:\/\//i.test(url)) {
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
    if (!url.trim()) {
      setError('Please enter a valid URL.');
      return;
    }
    setError(null);

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
    <div className="w-full max-w-[750px] mx-auto flex flex-col items-center">
      {isEditable && (
        <div className="flex flex-col mb-5">
          <div className="flex w-full gap-5">
            <Input
              value={url}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUrl(e.target.value)
              }
              placeholder="Enter a URL to preview"
              autoFocus={false}
            />
            <Button variant="secondary" type="button" onClick={getData}>
              Add open graph
            </Button>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      )}

      <div className="flex flex-col max-w-[750px]">
        <div className="grid grid-cols-1 sm:flex gap-5 justify-between w-full h-full">
          {links.map((link, index) => {
            if (typeof link === 'string') {
              return <SimpleLinkPreview key={index} url={link} />;
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
