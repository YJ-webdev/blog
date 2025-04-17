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
