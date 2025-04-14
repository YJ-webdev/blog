import Image from '@tiptap/extension-image';
import { mergeAttributes } from '@tiptap/core';

export const CaptionedImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      title: {
        default: '',
        parseHTML: (element) => element.getAttribute('title'),
        renderHTML: (attributes) => ({
          title: attributes.title,
        }),
      },
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute('style'),
        renderHTML: (attributes) => ({
          style: attributes.style,
        }),
      },
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute('class'),
        renderHTML: (attributes) => ({
          class: attributes.class,
        }),
      },
      href: {
        default: null,
        parseHTML: (element) => {
          const link = element.querySelector('a');
          return link?.getAttribute('href') || null;
        },
        renderHTML: (attributes) => {
          return attributes.href ? { href: attributes.href } : {};
        },
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    const img = ['img', mergeAttributes(HTMLAttributes)];
    const linkedImg = HTMLAttributes.href
      ? [
          'a',
          {
            href: HTMLAttributes.href,
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          img,
        ]
      : img;

    return [
      'figure',
      { 'data-type': 'captioned-image' },
      linkedImg,
      ['figcaption', {}, HTMLAttributes.title || ''],
    ];
  },
});
