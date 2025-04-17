import Image from '@tiptap/extension-image';
import { mergeAttributes, Command, RawCommands } from '@tiptap/core';

export const CaptionedImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      title: {
        default: '',
        parseHTML: (element) =>
          element.querySelector('figcaption')?.innerText || '',
        renderHTML: (attributes) => ({
          title: attributes.title,
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

      align: {
        default: 'center',
        parseHTML: (element) => {
          const align = element
            .getAttribute('style')
            ?.match(/text-align:\s*(\w+)/);
          return align?.[1] || 'center';
        },
        renderHTML: ({ align }) => ({
          style: `text-align: ${align}`,
        }),
      },
      small: {
        default: false,
        parseHTML: (element) => element.getAttribute('data-small') === 'true',
        renderHTML: (attributes) =>
          attributes.small ? { 'data-small': 'true', class: 'small' } : {},
      },
    };
  },

  addCommands(): Partial<RawCommands> {
    return {
      setImage:
        (attrs): Command =>
        ({ state, chain }) => {
          const { $from } = state.selection;
          const depth = $from.depth;

          // Prevent inserting image in nested blocks like listItem
          if (depth > 1) {
            return chain()
              .liftEmptyBlock()
              .insertContent({
                type: this.name,
                attrs,
              })
              .run();
          }

          return chain()
            .insertContent({
              type: this.name,
              attrs,
            })
            .run();
        },
    };
  },

  renderHTML({ HTMLAttributes }) {
    const { href } = HTMLAttributes;

    return [
      'figure',
      { 'data-type': 'captioned-image' },
      href
        ? [
            'a',
            {
              href,
              target: '_blank',
              rel: 'noopener noreferrer',
              style: 'display: inline-block',
            },
            ['img', mergeAttributes(HTMLAttributes)],
          ]
        : ['img', mergeAttributes(HTMLAttributes)],
      ['figcaption', {}, HTMLAttributes.title || ''],
    ];
  },
});
