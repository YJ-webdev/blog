import { defaultBlockSchema } from '@blocknote/core';
import { createReactBlockSpec } from '@blocknote/react';
import Image from 'next/image';

export const CustomImageBlock = createReactBlockSpec(
  {
    type: 'image', // Use 'image' type to keep the default block
    content: 'none',
    propSchema: {
      ...defaultBlockSchema.image.propSchema,
      name: { type: 'string', default: undefined }, // Use 'name' for href
    },
  },
  {
    render: ({ block }) => {
      return (
        <div className="flex w-full mx-auto max-w-[500px]">
          {block.props.url && (
            <a
              href={block.props.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={block.props.url}
                alt={block.props.caption || 'Image'}
              />
            </a>
          )}
        </div>
      );
    },
  },
);
