import { getPost } from '@/app/lib/data';
import { extractFirstParagraphText } from '@/app/lib/utils';
import { JSONContent } from '@tiptap/core';

export const dynamic = 'force-static'; // very important!

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(decodeURIComponent(params.slug));

  if (!post) {
    return null;
  }

  const firstParagraph = extractFirstParagraphText(post.content as JSONContent);
  return {
    title: post.title,
    description: firstParagraph ?? 'My blog post',
    openGraph: {
      title: post.title,
      description: firstParagraph ?? 'My blog post',
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/post/${params.slug}`,
      images: [
        {
          url: post.image ?? '/fallback.jpg',
          width: 1200,
          height: 630,
          alt: post?.title,
        },
      ],
    },
  };
}

export default function OGPreview() {
  return null; // This page is not meant to be viewed
}
