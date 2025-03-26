'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import React, { useEffect, useState } from 'react';
import LinkPreview from './link-preview';
import { getPreview } from '@/app/lib/actions/preview';

import { LinkIcon, Loader2 } from 'lucide-react';
import { Link } from '@prisma/client';
import { AffiliateLink } from '@/app/components/affiliate-link';

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
  postId: string;
  isEditable: boolean;
  setAdLinks: React.Dispatch<React.SetStateAction<Array<Link>>>;
  postLinks: Link[];
}

const LinkPreviews = ({
  postId,
  isEditable,
  setAdLinks,
  postLinks,
}: LinkPreviewsProps) => {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState<Array<Link | string>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch links from the localStorage
  useEffect(() => {
    if (!postId) return;

    const storedLinks = localStorage.getItem(`links_${postId}`);
    if (storedLinks) {
      const parsedLinks: Link[] = JSON.parse(storedLinks);

      setAdLinks(parsedLinks);
      setLinks((prevLinks) => {
        const sortedLinks = [...parsedLinks].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        const areSame =
          JSON.stringify(prevLinks) === JSON.stringify(sortedLinks);

        return areSame ? prevLinks : sortedLinks;
      });
    }
  }, [postId, setAdLinks, setLinks]);

  // Save links to localStorage
  useEffect(() => {
    if (links.length > 0) {
      localStorage.setItem(`links_${postId}`, JSON.stringify(links));
    }
  }, [links, postId]);

  const getData = async () => {
    const trimmedUrl = url.trim();

    if (!trimmedUrl || !isValidUrl(trimmedUrl)) {
      setError('Please enter a valid URL');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setLoading(true);
    setUrl('');

    try {
      const normalizedUrl = normalizeUrl(url);

      if (
        links.some(
          (link) => typeof link !== 'string' && link.url === normalizedUrl,
        )
      ) {
        setError('This link is already added');
        setTimeout(() => setError(null), 3000);
        return;
      }

      const res = await getPreview(normalizedUrl);
      const linkPreview =
        typeof res === 'string' ? res : transformResponse(res, normalizedUrl);

      // Update links state for localStorage

      if (typeof linkPreview === 'string') {
        setError(
          'Open Graph data is not found or blocked by the website. Try later.',
        );
        setTimeout(() => setError(null), 5000);
        return;
      } else {
        setLinks((prevLinks) => {
          const newLinks = [linkPreview, ...prevLinks].slice(0, 3); // Add new link and keep only top 3
          return newLinks;
        });

        // Update adLinks state for prisma
        setAdLinks?.((prevLinks: Link[]) => {
          const newLinks: Link[] = [
            {
              id: crypto.randomUUID(),
              postId,
              url: normalizedUrl,
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

  return (
    <div className="w-full mx-auto flex flex-col items-center mb-10">
      {isEditable ? (
        <div className="flex flex-col w-full">
          <div className="flex w-full">
            <Input
              className=" bg-zinc-100 dark:bg-zinc-800 rounded-none rounded-l-sm"
              value={url}
              onChange={handleUrlChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  getData();
                }
              }}
              placeholder="쿠팡 링크는 포스트당 하나만 입력할 수 있습니다."
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
            </Button>
          </div>

          {error && (
            <p className="flex items-center h-2 pt-2 justify-center text-center mt-1 text-xs font-normal">
              <>{error}</>
            </p>
          )}
        </div>
      ) : (
        <AffiliateLink />
      )}

      <div className="flex flex-col max-w-[750px] gap-y-5">
        <div className="grid grid-cols-1 md:flex gap-5 justify-between w-full h-full">
          {isEditable && links.length > 0
            ? Array.isArray(links) &&
              links.map((link, index) =>
                typeof link !== 'string' ? (
                  <LinkPreview key={index} preview={link} />
                ) : (
                  link
                ),
              )
            : Array.isArray(postLinks) &&
              postLinks.map((postLink, index) => (
                <LinkPreview key={index} preview={postLink} />
              ))}
        </div>
      </div>
      <p className="text-xs text-center text-muted-foreground mt-4">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
        제공받습니다.
      </p>
    </div>
  );
};
export default LinkPreviews;
