import { Block } from '@blocknote/core';

export const formatDateWithoutYear = (
  dateString: Date,
  locale: string = 'locale',
) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, { month: 'long', day: 'numeric' });
};

export function timeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec${diffInSeconds === 1 ? '' : 's'}`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min${diffInMinutes === 1 ? '' : 's'}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h`;
  }

  const diffInDays = Math.floor(diffInSeconds / (60 * 60 * 24));

  if (diffInDays === 1) {
    return 'Yesterday';
  }

  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'}`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'}`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}y`;
}

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
