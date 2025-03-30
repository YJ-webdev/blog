import { Block } from '@blocknote/core';
// import { Post } from '@prisma/client';

export const formatDateWithoutYear = (
  dateString: Date,
  locale: string = 'locale',
) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, { month: 'long', day: 'numeric' });
};

export const extractText = (content: string): string => {
  let contentBlocks: Block[] = [];

  try {
    contentBlocks = JSON.parse(content) as Block[];
  } catch (error) {
    console.error('Error parsing content:', error);
    return '';
  }

  const firstParagraph = contentBlocks.find(
    (item) => item?.type === 'paragraph',
  );

  if (firstParagraph) {
    return firstParagraph.content
      .map((subItem) => (subItem.type === 'text' ? subItem.text : ''))
      .join('');
  }

  return '';
};

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

// export function generateMetadataFromPost(post: Post) {
//   if (!post) {
//     return {
//       title: 'Post Not Found',
//       description: 'This post is no longer available.',
//     };
//   }

//   const postTitle = post.title ?? '새 포스트 작성';
//   const title = `레인지 저널 | ${postTitle}`;
//   const description = post.content
//     ? extractText(post.content).slice(0, 160)
//     : '';
//   const image = post.image || '/images/default-image.jpg';
//   const url = `${process.env.NEXT_PUBLIC_VERCEL_URL}/post/${post.slug}`;

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       url,
//       images: [
//         {
//           url: image,
//           width: 800,
//           height: 600,
//           alt: title,
//         },
//       ],
//     },
//   };
// }
