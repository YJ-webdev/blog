import { Block } from '@blocknote/core';
import { Post } from '@prisma/client';

export const formatDateWithoutYear = (
  dateString: string | Date,
  locale: string = 'locale',
) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, { month: 'long', day: 'numeric' });
};

// Function to process content and extract text from the first paragraph
export const extractText = (content: string): string => {
  let contentBlocks: Block[] = [];

  try {
    contentBlocks = JSON.parse(content) as Block[]; // Parse content string to Block[]
  } catch (error) {
    console.error('Error parsing content:', error);
    return ''; // Return empty string if parsing fails
  }

  const firstParagraph = contentBlocks.find(
    (item) => item?.type === 'paragraph',
  );

  if (firstParagraph) {
    return firstParagraph.content
      .map((subItem) => (subItem.type === 'text' ? subItem.text : '')) // Extract text
      .join(''); // Join text if there are multiple parts
  }

  return ''; // Return empty string if no paragraph is found
};
