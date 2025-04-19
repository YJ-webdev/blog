/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import React, { useEffect, useState } from 'react';
import LinkPreview from './link-preview';
import { getPreview } from '@/app/actions/preview';

import { LinkIcon, Loader2 } from 'lucide-react';
import { Link } from '@prisma/client';

function getLargestFavicon(favicons: string[]): string {
  if (!favicons.length) return '';

  return favicons.sort((a, b) => {
    const sizeA = parseInt(a.match(/favicon-(\d+)/)?.[1] ?? '0', 10);
    const sizeB = parseInt(b.match(/favicon-(\d+)/)?.[1] ?? '0', 10);
    return sizeB - sizeA;
  })[0];
}

function transformResponse(res: any, url: string) {
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
  const trimmedUrl = url.trim();
  if (!isValidUrl(trimmedUrl)) return trimmedUrl;

  return /^https?:\/\//i.test(trimmedUrl)
    ? trimmedUrl
    : `https://${trimmedUrl}`;
}

interface LinkPreviewsProps {
  linkKey: string;
  postLinks: Link[];
  setPostLinks: React.Dispatch<React.SetStateAction<Array<Link>>>;
  isEditable: boolean;
}

const LinkPreviews = ({
  linkKey,
  postLinks,
  setPostLinks,
  isEditable,
}: LinkPreviewsProps) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //make it fetch links from the localStorage and setPostLinks as soon as page load
  useEffect(() => {
    const linksKey = `links_${linkKey}`;
    const storedLinks = localStorage.getItem(linksKey);
    if (storedLinks) {
      const parsedLinks: Link[] = JSON.parse(storedLinks);
      setPostLinks(parsedLinks);
    }
  }, [linkKey, setPostLinks]);

  // Push links to localStorage if there are any changes in postLinks
  useEffect(() => {
    if (postLinks.length > 0) {
      const linksKey = `links_${linkKey}`;
      const storedLinks = localStorage.getItem(linksKey);

      // Update localStorage only if there is a change
      if (JSON.stringify(postLinks) !== storedLinks) {
        localStorage.setItem(linksKey, JSON.stringify(postLinks));
      }
    }
  }, [postLinks, linkKey]);

  const getData = async () => {
    const trimmedUrl = url.trim();

    if (!trimmedUrl || !isValidUrl(trimmedUrl)) {
      setError('유효하지 않은 URL입니다.');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setLoading(true);
    setUrl('');

    try {
      const normalizedUrl = normalizeUrl(url);

      if (
        postLinks.some(
          (link) => typeof link !== 'string' && link.url === normalizedUrl,
        )
      ) {
        setError('이미 추가된 링크입니다.');
        setTimeout(() => setError(null), 3000);
        return;
      }

      const res = await getPreview(normalizedUrl);
      const linkPreview =
        typeof res === 'string' ? res : transformResponse(res, normalizedUrl);

      // Update links state for localStorage

      if (typeof linkPreview === 'string') {
        setError(
          'OpenGraph data is not found or blocked by the website. Try later.',
        );
        setTimeout(() => setError(null), 5000);
        return;
      } else {
        // setPostLinks((prevLinks: any) => {
        //   const newLinks = [linkPreview, ...prevLinks].slice(0, 3); // Add new link and keep only top 3
        //   return newLinks;
        // });

        setPostLinks((prevLinks: any) => {
          const newLinks: Link[] = [
            {
              id: crypto.randomUUID(),
              linkKey,

              ...linkPreview,
            },
            ...prevLinks,
          ].slice(0, 3);
          return newLinks;
        });
      }
    } catch {
      setError('Failed to fetch preview. Try again.');
      setTimeout(() => setError(null), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleDelete = (id: string) => {
    setPostLinks((prev) => prev.filter((link) => link.id !== id));
  };

  return (
    <div className=" max-w-[750px] w-full mx-auto flex flex-col items-center">
      {isEditable && (
        <div className="flex flex-col w-full mb-6">
          <div className=" relative flex w-full mb-2">
            <Input
              className=" bg-zinc-100 dark:bg-zinc-800 rounded-none rounded-l-sm text-[14px]"
              value={url}
              onChange={handleUrlChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  getData();
                }
              }}
              placeholder="쿠팡 링크는 포스트당 하나만 입력할 수 있습니다."
              disabled={loading}
              autoFocus={false}
            />
            <Button
              className="rounded-none rounded-r-sm bg-zinc-100 dark:bg-zinc-800 text-primary hover:text-zinc-500 hover:bg-zinc-100  hover:dark:text-slate-100 disabled:opacity-100 disabled:text-zinc-500"
              type="button"
              onClick={getData}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin self-center " />
              ) : (
                <p className="flex items-center justify-center gap-2">
                  <LinkIcon /> 입력
                </p>
              )}
            </Button>{' '}
            {error && (
              <p className="absolute left-1/2 -bottom-4 -translate-x-1/2 flex items-center h-2 pt-2 justify-center text-center mt-1 text-xs font-normal">
                <>{error}</>
              </p>
            )}
          </div>
        </div>
      )}

      <div className="relative flex flex-col max-w-[750px] md:gap-y-5">
        <div className="grid grid-cols-1 md:flex gap-2 md:gap-5 justify-between w-full h-full">
          {postLinks.length > 0 &&
            Array.isArray(postLinks) &&
            postLinks.map((link, index) => (
              <LinkPreview
                key={index}
                preview={link}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete(link.id); // your actual delete logic
                }}
                isEditable={isEditable}
              />
            ))}
        </div>{' '}
      </div>
      <p className="text-xs text-center text-muted-foreground mt-3">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
        제공받습니다.
      </p>
    </div>
  );
};
export default LinkPreviews;
