import { Block } from '@blocknote/core';

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
