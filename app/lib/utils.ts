import { JsonValue } from '@prisma/client/runtime/library';

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

// export function getFirstParagraph(doc: any): string | null {
//   // Iterate through the content array to find the first paragraph
//   const firstParagraph = doc.content.find(
//     (item: any) => item.type === 'paragraph',
//   );

//   // If a paragraph is found, extract and return its text content
//   if (firstParagraph) {
//     const textContent = firstParagraph.content
//       .map((textNode: any) => textNode.text)
//       .join(' ');
//     return textContent;
//   }
//   return null;
// }

interface TextNode {
  type: 'text';
  text: string;
}

interface ParagraphNode {
  type: 'paragraph';
  content?: TextNode[];
}

interface DocNode {
  type: 'doc';
  content: ParagraphNode[];
}

// Type guard helpers
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isTextNode(node: unknown): node is TextNode {
  return (
    isRecord(node) && node.type === 'text' && typeof node.text === 'string'
  );
}

function isParagraphNode(node: unknown): node is ParagraphNode {
  return (
    isRecord(node) &&
    node.type === 'paragraph' &&
    (node.content === undefined ||
      (Array.isArray(node.content) && node.content.every(isTextNode)))
  );
}

function isDocNode(value: unknown): value is DocNode {
  return (
    isRecord(value) &&
    value.type === 'doc' &&
    Array.isArray(value.content) &&
    value.content.every(isParagraphNode)
  );
}

// Main function
export function getFirstParagraphText(content: JsonValue | null): string {
  if (isDocNode(content)) {
    const firstParagraph = content.content.find((p) => p.type === 'paragraph');

    return firstParagraph?.content?.map((node) => node.text).join('') ?? '';
  }

  return '';
}
