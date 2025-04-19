import { JSONContent } from '@tiptap/core';

export const timeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInSeconds / (60 * 60 * 24));

  if (diffInDays === 1) {
    return '어제';
  }

  if (diffInDays <= 6) {
    return `${diffInDays}일 전`;
  }

  if (diffInDays < 30) {
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}주 전`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}달 전`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}년 전`;
};

export const formatDateWithoutYear = (
  dateString: Date,
  locale: string = 'locale',
) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, { month: 'long', day: 'numeric' });
};

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

// Example function to extract the first paragraph's text
export function extractFirstParagraphText(content: JSONContent): string | null {
  if (!content?.content) return null;
  // Iterate through the document nodes to find the first paragraph
  for (const node of content.content) {
    if (node.type === 'paragraph' && Array.isArray(node.content)) {
      // Extract the text from the paragraph's content
      return node.content
        .map((child: JSONContent) => (child.type === 'text' ? child.text : ''))
        .join('');
    }
  }

  return null;
}
