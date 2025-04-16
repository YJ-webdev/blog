import { JSONContent } from '@tiptap/core';

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

type Content = string | JSONContent;

// Example function to extract the first paragraph's text
export function extractFirstParagraphText(content: Content): string | null {
  // If content is a string, return the first line
  if (typeof content === 'string') {
    return content.split('\n')[0];
  }

  // If content is in JSON format (Tiptap document)
  const doc = content.toJSON ? content.toJSON() : content;

  if (!doc || !Array.isArray(doc.content)) {
    return null;
  }

  // Iterate through the document nodes to find the first paragraph
  for (const node of doc.content) {
    if (node.type === 'paragraph' && Array.isArray(node.content)) {
      // Extract the text from the paragraph's content
      return (
        node.content
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((child: any) => (child.type === 'text' ? child.text : ''))
          .join('')
      );
    }
  }

  return null;
}
