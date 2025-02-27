'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import React, { useState } from 'react';
import LinkPreview, { LinkViewProps } from './link-preview';
import { getPreview } from '@/app/actions/preview';
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

const LinkPreviews = () => {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState<Array<LinkViewProps | string>>([]);

  const [error, setError] = useState<string | null>(null);

  const getData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      setLinks((prevLinks) => {
        const updatedLinks = [res, ...prevLinks];
        return updatedLinks.slice(0, 3); // Ensure only the most recent 3 entries are kept
      });
      return;
    }
    const linkPreview = transformResponse(res, normalizedUrl);
    setLinks((prevLinks) => {
      const updatedLinks = [linkPreview, ...prevLinks];
      return updatedLinks.slice(0, 3); // Ensure only the most recent 3 entries are kept
    });
  };

  return (
    <form
      className="w-full max-w-[750px] mx-auto flex flex-col items-center gap-4"
      onSubmit={getData}
    >
      <Input
        type="hidden"
        value={url}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUrl(e.target.value)
        }
        placeholder="Enter a URL to preview"
      />

      {error && <p className="text-red-500">{error}</p>}

      <Button className="mb-10 hidden" type="submit">
        Add open graph
      </Button>

      <div className="grid grid-cols-1 sm:flex gap-5 mb-10 justify-between w-full h-full">
        {links.map((link, index) => {
          if (typeof link === 'string') {
            return <SimpleLinkPreview key={index} url={link} />;
          } else {
            return <LinkPreview key={index} preview={link} />;
          }
        })}
      </div>
    </form>
  );
};
export default LinkPreviews;
