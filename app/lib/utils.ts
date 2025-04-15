export const formatDateWithoutYear = (
  dateString: Date,
  locale: string = 'locale',
) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, { month: 'long', day: 'numeric' });
};

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

export function getFirstParagraphText(content: any): string {
  const firstParagraph = content?.content?.find(
    (item: any) => item.type === 'paragraph',
  );
  return (
    firstParagraph?.content?.map((block: any) => block.text ?? '').join('') ??
    ''
  );
}

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
